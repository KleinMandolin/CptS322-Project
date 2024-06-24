import {
  Body,
  Controller,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateSecondFactorDto } from './dto/create-second-factor.dto';
import { AuthGuard } from '@nestjs/passport';
import { CreateLoginDto } from '@/auth/dto/create-login.dto';
import { GetResponse } from '@/auth/decorators/get-response.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(
    @Body() createLoginDto: CreateLoginDto,
  ): Promise<{ success: boolean }> {
    const { username, password } = createLoginDto;

    if (!(await this.authService.validateUser(username, password))) {
      throw new UnauthorizedException('Username or password invalid');
    }
    return { success: true };
  }

  @UsePipes(new ValidationPipe())
  @Post('verify-otp')
  async secondFactor(
    @Body() createSecondFactorDto: CreateSecondFactorDto,
    @GetResponse() res,
  ): Promise<{ success: boolean }> {
    // Username will be saved client-side.
    const { username, code } = createSecondFactorDto;
    const token = await this.authService.verifyOtp(username, code);
    if (!token) {
      throw new UnauthorizedException('Incorrect or expired OTP');
    }
    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: 1800000,
      sameSite: 'strict',
    });

    return { success: true };
  }
}
