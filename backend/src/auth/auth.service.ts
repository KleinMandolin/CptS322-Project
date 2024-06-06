import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { EmpCredentials } from '../emp-credentials/emp.credentials';
import { DataSource, Repository } from 'typeorm';
import { EmpInfo } from '../emp-info/emp.info';
import * as bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import { EmailService } from '../email/email.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(EmpCredentials)
    private readonly empCredentialsRepository: Repository<EmpCredentials>,
    @InjectRepository(EmpInfo)
    private readonly empInfoRepository: Repository<EmpInfo>,

    private readonly dataSource: DataSource,
    private readonly jwtService: JwtService,
    private readonly email: EmailService,
  ) {}

  // emp_credential and emp_info are created simultaneously to ensure data synchronicity.
  async createAuth(
    username: string,
    password: string,
    email: string,
    firstName: string,
    lastName: string,
  ): Promise<{ success: boolean }> {
    // Query runner is needed for insert into multiple relations.
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const hashedPassword = await this.hashPassword(password);

      // Create the empCredentials object.
      const empCredentials = new EmpCredentials();
      empCredentials.username = username;
      empCredentials.password = hashedPassword;

      // Create the empInfo object.
      const empInfo = new EmpInfo();
      empInfo.username = username;
      empInfo.f_name = firstName;
      empInfo.l_name = lastName;
      empInfo.email = email;

      empCredentials.empInfo = empInfo; // Check if relationship is both ways.

      // Save empCredentials first, then save the relation holding the foreign key.
      await queryRunner.manager.save(empCredentials);
      await queryRunner.manager.save(empInfo);

      // Commit the transactions to the database.
      await queryRunner.commitTransaction();

      // Transaction is successful at this point, return true.
      return { success: true };
    } catch (error) {
      // Rollback transaction if transaction was unsuccessful.
      await queryRunner.rollbackTransaction();
      throw new Error(`Failed to create user: ${error.message}`);
    } finally {
      // Release the connection back to connection pool.
      await queryRunner.release();
    }
  }

  async login(
    username: string,
    password: string,
  ): Promise<{ waitingForCode: boolean }> {
    // Get the employee's credentials.
    const empCredentials = await this.empCredentialsRepository.findOne({
      where: { username: username },
      relations: ['empInfo'], // Load the empInfo relation.
    });
    // Send vague messages if user credentials don't match up.
    if (!empCredentials) {
      throw new UnauthorizedException('Invalid login');
    }

    if (!this.matchPassword(password, empCredentials)) {
      throw new UnauthorizedException('Invalid login');
    }

    const authCode = await this.genTwoFactorCode(); // Generate authentication code.
    empCredentials.twoFactorCode = authCode;
    empCredentials.twoFactorCodeExpires = new Date(Date.now() + 30 * 60 * 1000); // Code expires in thirty minutes.
    await this.empCredentialsRepository.save(empCredentials); // Save the authentication code and expiration date.

    // Get personal info for email.
    const empInfo = empCredentials.empInfo;
    if (!empInfo) {
      throw new UnauthorizedException('User information not found.');
    }

    const subject = `Authentication Code`; // Subject: authentication code
    const text = `Hello, ${empInfo.f_name}, this is your authentication code:
    <br/><br/> <h1>${authCode}</h1>`; // Personalized message for the authentication code.
    await this.email.sendEmail(empInfo.email, subject, text);

    return { waitingForCode: true };
  }

  async verifyAuthCode(
    username: string,
    authCode: string,
  ): Promise<{ accessToken: string }> {
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

    // Reset twoFactor auth code fields.
    empCredentials.twoFactorCode = null;
    empCredentials.twoFactorCodeExpires = null;
    await this.empCredentialsRepository.save(empCredentials);

    // sub is the unique identifier of this user. Since username is unique in this system, I used username.
    const payload = {
      username: empCredentials.username,
      sub: empCredentials.username,
    };
    const accessToken = await this.generateToken(payload);

    return { accessToken };
  }

  // Receive a payload; sign that payload and return a jwt token.
  async generateToken(payload: any): Promise<string> {
    return this.jwtService.sign(payload);
  }

  // Check the signature of this token.
  async verifyToken(token: string): Promise<any> {
    return this.jwtService.verify(token);
  }

  // Compare this password to the hashed password from this employee object.
  private async matchPassword(
    plaintext: string,
    employee: EmpCredentials,
  ): Promise<boolean> {
    return bcrypt.compare(plaintext, employee.password);
  }

  // Hash a plaintext password with salt rounds: 10.
  private async hashPassword(password: string): Promise<string> {
    const salt = 10;
    return await bcrypt.hash(password, salt);
  }

  // Generate a two factor authentication code.
  private async genTwoFactorCode(): Promise<string> {
    return randomBytes(3).toString('hex');
  }
}
