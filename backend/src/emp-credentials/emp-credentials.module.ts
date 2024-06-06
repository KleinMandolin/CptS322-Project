import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmpCredentials } from './emp.credentials';
import { EmpCredentialsService } from './emp-credentials.service';
import { EmpCredentialsController } from './emp-credentials.controller';
import { EmpInfo } from '../emp-info/emp.info';

@Module({
  imports: [TypeOrmModule.forFeature([EmpCredentials, EmpInfo])],
  providers: [EmpCredentialsService],
  controllers: [EmpCredentialsController],
})
export class EmpCredentialsModule {}
