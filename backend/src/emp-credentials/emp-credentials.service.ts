import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmpCredentials } from './emp.credentials';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EmpCredentialsService {
  constructor(
    @InjectRepository(EmpCredentials)
    private readonly empCredentialsRepository: Repository<EmpCredentials>,
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
