import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInfo } from './user-info';
import { Repository } from 'typeorm';

@Injectable()
export class UserInfoService {
  constructor(
    @InjectRepository(UserInfo)
    private readonly empInfoRepository: Repository<UserInfo>,
  ) {}

  async containsInfo(username: string): Promise<boolean> {
    return (
      (await this.empInfoRepository.findOne({
        where: { username: username },
      })) != null
    );
  }

  async getInfo(username: string): Promise<UserInfo> {
    return this.empInfoRepository.findOne({
      where: { username: username },
    });
  }
}
