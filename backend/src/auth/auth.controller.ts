import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UnauthorizedException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { CreateLoginDto } from './dto/create-login.dto';
import { CreateSecondFactorDto } from './dto/create-second-factor.dto';

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
  ): Promise<{ accessToken: string }> {
    try {
      return await this.authService.verifyAuthCode(
        createSecondFactorDto.username,
        createSecondFactorDto.code,
      );
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
