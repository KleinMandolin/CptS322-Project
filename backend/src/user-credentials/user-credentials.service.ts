import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCredentials } from './user-credentials';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserCredentialsService {
  constructor(
    @InjectRepository(UserCredentials)
    private readonly empCredentialsRepository: Repository<UserCredentials>,
  ) {}

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
}
