import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmpInfo } from './emp.info';
import { EmpInfoService } from './emp-info.service';
import { EmpInfoController } from './emp-info.controller';

@Module({
  // Get the entity, EmpInfo.
  imports: [TypeOrmModule.forFeature([EmpInfo])],
  // providers = services.
  providers: [EmpInfoService],
  controllers: [EmpInfoController],
})
export class EmpInfoModule {}
