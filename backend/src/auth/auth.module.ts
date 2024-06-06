import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmpCredentials } from '../emp-credentials/emp.credentials';
import { EmpInfo } from '../emp-info/emp.info';
import { EmailService } from '../email/email.service';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '60m' },
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([EmpCredentials, EmpInfo]),
  ],
  providers: [AuthService, EmailService],
  controllers: [AuthController],
})
export class AuthModule {}
