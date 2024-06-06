import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmpCredentials } from './emp.credentials';
import { DataSource, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { EmpInfo } from '../emp-info/emp.info';

@Injectable()
export class EmpCredentialsService {
  constructor(
    @InjectRepository(EmpCredentials)
    private readonly empCredentialsRepository: Repository<EmpCredentials>,
    @InjectRepository(EmpInfo)
    private readonly empInfoRepository: Repository<EmpInfo>,
    private readonly dataSource: DataSource,
  ) {}

  // emp_credential and emp_info are created simultaneously to ensure data synchronicity.
  async createCredentialAndInfo(
    username: string,
    password: string,
    email: string,
    firstName: string,
    lastName: string,
  ): Promise<EmpCredentials> {
    // Query runner is needed for insert into multiple relations.
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const hashedPassword = await this.hashPassword(password);

      // Create the empInfo object.
      const empInfo = new EmpInfo();
      empInfo.f_name = firstName;
      empInfo.l_name = lastName;
      empInfo.email = email;
      empInfo.username = username;

      // Create the empCredentials object.
      const empCredentials = new EmpCredentials();
      empCredentials.username = username;
      empCredentials.password = hashedPassword;

      // Save empCredentials first, then save the relation holding the foreign key.
      const savedEmpCredentials =
        await queryRunner.manager.save(empCredentials);
      await queryRunner.manager.save(empInfo);

      // Commit the transactions to the database.
      await queryRunner.commitTransaction();

      // This will change to success. We don't want to send the empCredentials back to the client.
      return savedEmpCredentials;
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  // If the employee exists, then compare the hashed password with the plaintext.
  async validateEmployee(username: string, password: string): Promise<boolean> {
    const employee = await this.empCredentialsRepository.findOne({
      where: { username },
    });
    if (!employee) {
      return false;
    }
    return await bcrypt.compare(password, employee.password);
  }

  async employeeExists(username: string): Promise<boolean> {
    const existingEmp = this.empCredentialsRepository.findOne({
      where: { username: username },
    });
    return existingEmp != null;
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = 10;
    return await bcrypt.hash(password, salt);
  }
}
