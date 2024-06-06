import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmpInfo } from './emp.info';
import { Repository } from 'typeorm';

@Injectable()
export class EmpInfoService {
  constructor(
    @InjectRepository(EmpInfo)
    private readonly empInfoRepository: Repository<EmpInfo>,
  ) {}

  async containsInfo(username: string): Promise<boolean> {
    return (
      (await this.empInfoRepository.findOne({
        where: { username: username },
      })) != null
    );
  }

  async getInfo(username: string): Promise<EmpInfo> {
    return this.empInfoRepository.findOne({
      where: { username: username },
    });
  }
}
