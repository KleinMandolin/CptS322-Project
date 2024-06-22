import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCredentials } from '@/user-credentials/user-credentials';
import { UserInfo } from '@/user-info/user-info';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserCredentialsInfoService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(UserCredentials)
    private readonly userCredentials: Repository<UserCredentials>,
  ) {}

  // emp_credential and emp_info are created simultaneously to ensure data synchronicity.
  async createAuth(
    username: string,
    password: string,
    email: string,
    firstName: string,
    lastName: string,
    userRole: 'worker' | 'admin', // Added userRole parameter to function signature
  ): Promise<{ success: boolean }> {
    // Query runner is needed for insert into multiple relations.
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const hashedPassword = await this.hashPassword(password);

      // Create the empCredentials object.
      const empCredentials = new UserCredentials();
      empCredentials.username = username;
      empCredentials.password = hashedPassword;
      empCredentials.userRole = userRole; // Set the userRole in empCredentials

      // Create the empInfo object.
      const empInfo = new UserInfo();
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
      throw new InternalServerErrorException('Failed to create user');
    } finally {
      // Release the connection back to connection pool.
      await queryRunner.release();
    }
  }

  // Hash a plaintext password with salt rounds: 10.
  private async hashPassword(password: string): Promise<string> {
    const salt = 10;
    return await bcrypt.hash(password, salt);
  }
}
