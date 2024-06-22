import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { UserCredentials } from '@/user-credentials/user-credentials';
// ------------------------------- Uncomment to start emailing ---------------------------------------------
// import { UserInfo } from '@/user-info/user-info';
// -------------------- Look into login and uncomment those lines as well ----------------------------------
import * as bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import { EmailService } from '@/email/email.service';
import { Response } from 'express';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserCredentials)
    private readonly empCredentialsRepository: Repository<UserCredentials>,

    private readonly jwtService: JwtService,
    private readonly email: EmailService,
  ) {}

  // Login and two-factor authentication -------------------------------------------------------------------------

  // Login -------------------

  async login(
    username: string,
    password: string,
  ): Promise<{ waitingForCode: boolean }> {
    // Get the employee's credentials.
    const empCredentials = await this.empCredentialsRepository.findOne({
      where: { username: username },
      relations: ['empInfo'], // Load the empInfo relation for easy data access.
    });
    // Send vague messages if user credentials don't match up.
    if (!empCredentials) {
      throw new UnauthorizedException('Invalid login');
    }

    if (!(await this.matchPassword(password, empCredentials))) {
      throw new UnauthorizedException('Invalid login');
    }

    // Generate authentication code.
    empCredentials.twoFactorCode = await this.genTwoFactorCode();
    empCredentials.twoFactorCodeExpires = new Date(Date.now() + 30 * 60 * 1000); // Code expires in thirty minutes.
    await this.empCredentialsRepository.save(empCredentials); // Save the authentication code and expiration date.

    // Get personal info for email.
    const empInfo = empCredentials.empInfo;
    if (!empInfo) {
      throw new UnauthorizedException('User information not found.');
    }
    // Uncomment these lines to receive emails.
    // -----------------------------------------------------------------
    // const subject = `Authentication Code`; // Subject: authentication code
    // const text = `Hello, ${empInfo.f_name}, this is your authentication code:
    // ${authCode}`; // Personalized message for the authentication code.
    // await this.email.sendEmail(empInfo.email, subject, text);
    // -----------------------------------------------------------------
    return { waitingForCode: true };
  }

  // Two-factor authentication.

  async verifyAuthCode(
    username: string,
    authCode: string,
    res: Response,
  ): Promise<{ success: boolean }> {
    const empCredentials = await this.empCredentialsRepository.findOne({
      where: { username: username },
    });
    // Throw an exception if the entered authCode is not the generated authCode.
    // Throw an exception if the authCode has expired.
    if (
      empCredentials.twoFactorCode !== authCode ||
      empCredentials.twoFactorCodeExpires < new Date()
    ) {
      throw new UnauthorizedException('Invalid or expired auth code.');
    }

    empCredentials.twoFactorCode = null;
    empCredentials.twoFactorCodeExpires = null;
    await this.empCredentialsRepository.save(empCredentials);

    // Include userRole in the token payload to utilize it for role-based access control in the application.
    const payload = {
      sub: empCredentials.username,
      role: empCredentials.userRole,
    };
    const accessToken = await this.generateToken(payload);

    res.cookie('jwt', accessToken, {
      httpOnly: true,
      maxAge: 3600000,
      sameSite: 'strict',
    });

    res.json({ success: true });
    return { success: true };
  }

  // Validate user by returning roles from a JWT cookie.
  async getRolesFromCookie(token: string): Promise<string[]> {
    try {
      const decoded = this.jwtService.verify(token);
      return decoded.roles;
    }
  }

  // Receive a payload; sign that payload and return a jwt token.
  async generateToken(payload: any): Promise<string> {
    return this.jwtService.sign(payload);
  }

  // Compare this password to the hashed password from this employee object.
  private async matchPassword(
    plaintext: string,
    employee: UserCredentials,
  ): Promise<boolean> {
    return bcrypt.compare(plaintext, employee.password);
  }

  // Generate a two-factor authentication code.
  private async genTwoFactorCode(): Promise<string> {
    return randomBytes(3).toString('hex');
  }
}
