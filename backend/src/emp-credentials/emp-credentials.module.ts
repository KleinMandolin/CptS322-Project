import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmpCredentials } from './emp.credentials';
import { EmpCredentialsService } from './emp-credentials.service';
import { EmpCredentialsController } from './emp-credentials.controller';

@Module({
  // Need both empCredentials and empInfo entities for simultaneous insert operations.
  imports: [TypeOrmModule.forFeature([EmpCredentials])],
  providers: [EmpCredentialsService],
  controllers: [EmpCredentialsController],
})
export class EmpCredentialsModule {}
