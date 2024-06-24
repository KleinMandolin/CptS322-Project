import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
// ------------------------------- Uncomment to start emailing ---------------------------------------------
// import { UserInfo } from '@/user-info/user-info'; // <==================================
// import { EmailService } from '@/email/email.service';
// -------------------- Look into login and uncomment those lines as well ----------------------------------
import * as bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import { Repository } from 'typeorm';
import { UserCredentials } from '@/user-management/entities/user-credentials';
import { UserInfoService } from '@/user-management/services/user-info.service';
import { UserInfo } from '@/user-management/entities/user-info';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserCredentials)
    private readonly userCredentialsRepository: Repository<UserCredentials>,
    private readonly jwtService: JwtService,
    private readonly userInfoService: UserInfoService,
    // Uncomment for the email service. <============================
    // private readonly email: EmailService,
  ) {}

  // Login and two-factor authentication -------------------------------------------------------------------------

  // Login -------------------
  async validateUser(
    username: string,
    password: string,
  ): Promise<UserCredentials> {
    // Get the employee's credentials.
    const userCredentials = await this.userCredentialsRepository.findOne({
      where: { username: username },
      relations: ['userInfo'], // Load the userInfo relation for easy data access.
    });

    if (!userCredentials) {
      throw new UnauthorizedException('Username or password incorrect');
    } else if (
      !(await this.comparePassPlainToHash(password, userCredentials))
    ) {
      throw new InternalServerErrorException(
        'Cannot obtain the email associated with this user',
      );
    }

    await this.sendOtp(userCredentials);

    return userCredentials;
  }

  // Send OTP for two-factor auth.
  async sendOtp(
    userCredentials: UserCredentials,
  ): Promise<{ success: boolean }> {
    // Generate authentication code.
    userCredentials.twoFactorCode = await this.genTwoFactorCode();
    userCredentials.twoFactorCodeExpires = new Date(
      Date.now() + 30 * 60 * 1000,
    ); // Code expires in thirty minutes.
    await this.userCredentialsRepository.save(userCredentials); // Save the authentication code and expiration date.

    // Get personal info for email.
    const userInfo = userCredentials.userInfo;
    if (!userInfo) {
      throw new InternalServerErrorException('User information not found.');
    }
    // Uncomment these lines to receive emails.
    // -----------------------------------------------------------------
    // const subject = `Authentication Code`; // Subject: authentication code
    // const text = `Hello, ${userInfo.f_name}, this is your authentication code: // <================================
    // ${authCode}`; // Personalized message for the authentication code.
    // await this.email.sendEmail(userInfo.email, subject, text);
    // -----------------------------------------------------------------

    return { success: true };
  }

  // Two-factor authentication.

  async verifyOtp(username: string, authCode: string): Promise<string> {
    const userCredentials = await this.userCredentialsRepository.findOne({
      where: { username: username },
    });
    if (
      userCredentials.twoFactorCode !== authCode ||
      userCredentials.twoFactorCodeExpires < new Date()
    ) {
      throw new UnauthorizedException('Invalid or expired OTP');
    }

    userCredentials.twoFactorCode = null;
    userCredentials.twoFactorCodeExpires = null;
    await this.userCredentialsRepository.save(userCredentials);
    return await this.generateToken(userCredentials);
  }

  private async generateToken(
    userCredentials: UserCredentials,
  ): Promise<string> {
    // Put the user roles into a payload.
    const userInfo = await this.userInfoService.getInfo(
      userCredentials.username,
    );
    const payload = {
      sub: userCredentials.username,
      roles: userInfo.userRole,
      iat: Math.floor(Date.now() / 1000), // Add timestamps to the cookies to reduce the risk of reuse
    };
    return this.jwtService.sign(payload);
  }

  async validateCookiePayload(payload: any): Promise<UserInfo> {
    const userInfo = await this.userInfoService.getInfo(payload.sub);
    if (!userInfo) {
      throw new UnauthorizedException('This is a protected route');
    }

    // Return userInfo object for middleware access to roles.
    return userInfo;
  }

  // Compare this password to the hashed password from this employee object.
  private async comparePassPlainToHash(
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
