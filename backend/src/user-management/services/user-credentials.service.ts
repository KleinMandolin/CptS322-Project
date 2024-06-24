import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCredentials } from '../entities/user-credentials';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserCredentialsService {
  constructor(
    @InjectRepository(UserCredentials)
    private readonly userCredentialsRepository: Repository<UserCredentials>,
  ) {}

  // If the employee exists, then compare the hashed password with the plaintext.
  async validateUser(
    username: string,
    password: string,
  ): Promise<UserCredentials> {
    const userCredential = await this.userCredentialsRepository.findOne({
      where: { username },
    });
    if (
      !userCredential ||
      !(await bcrypt.compare(password, userCredential.password))
    ) {
      throw new UnauthorizedException('Incorrect username or password');
    }
    return userCredential;
  }

  async findUser(username: string): Promise<UserCredentials> {
    return await this.userCredentialsRepository.findOne({
      where: { username: username },
    });
  }

  async createUser(
    username: string,
    password: string,
  ): Promise<{ success: boolean }> {
    if (
      await this.userCredentialsRepository.findOne({
        where: { username: username },
      })
    ) {
      throw new UnauthorizedException('User already exists');
    }

    const hashedPass = await bcrypt.hash(password, 10);
    const user = this.userCredentialsRepository.create({
      username: username,
      password: hashedPass,
    });
    await this.userCredentialsRepository.save(user);
    return { success: true };
  }
}
