import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Res,
  UnauthorizedException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { CreateLoginDto } from './dto/create-login.dto';
import { CreateSecondFactorDto } from './dto/create-second-factor.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  // Validation pipe scrubs input against defined parameters.
  @UsePipes(new ValidationPipe())
  async register(
    // Use the CreateAuthDto object for this input.
    @Body() createAuthDto: CreateAuthDto,
  ): Promise<{ success: boolean }> {
    try {
      return await this.authService.createAuth(
        createAuthDto.username,
        createAuthDto.password,
        createAuthDto.email,
        createAuthDto.firstName,
        createAuthDto.lastName,
        createAuthDto.userRole,
      );
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  async login(
    @Body() createLoginDto: CreateLoginDto,
  ): Promise<{ waitingForCode: boolean }> {
    try {
      return await this.authService.login(
        createLoginDto.username,
        createLoginDto.password,
      );
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('verify2fa')
  @UsePipes(new ValidationPipe())
  async verifyTwoFactor(
    @Body() createSecondFactorDto: CreateSecondFactorDto,
    @Res() res: Response,
  ): Promise<{ void }> {
    try {
      const result = await this.authService.verifyAuthCode(
        createSecondFactorDto.username,
        createSecondFactorDto.code,
        res,
      );
      res.send(result);
      return;
    } catch (error) {
      res.status(401).send({ message: error.message });
    }
  }
}
