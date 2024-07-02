import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateSecondFactorDto } from './dto/create-second-factor.dto';
import { AuthGuard } from '@nestjs/passport';
import { CreateLoginDto } from '@/auth/dto/create-login.dto';
import { UserInfoService } from '@/user-management/services/user-info.service';
import { UserInfo } from '@/user-management/entities/user-info';
import { JwtService } from '@nestjs/jwt';
import { _Role } from '@/user-management/enums/role-enum';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userInfoService: UserInfoService,
    private readonly jwtService: JwtService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @UsePipes(new ValidationPipe())
  @Post('login')
  async login(
    @Body() createLoginDto: CreateLoginDto,
    @Res() res: any,
  ): Promise<{ success: boolean }> {
    const userInfo = await this.userInfoService.getInfo(
      createLoginDto.username,
    );

    const otpToken = await this.authService.generateOtpToken(userInfo);

    res.cookie('jwt', otpToken, {
      maxAge: 300000,
      sameSite: 'strict',
      //secure: true,
      httpOnly: true,
    });

    return res.status(202).send({
      success: true,
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('get-role')
  async getRole(@Req() req): Promise<{ role: _Role }> {
    return { role: req.user.userRole };
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('clear-cookies')
  async logout(@Res() res, @Req() req): Promise<{ success: boolean }> {
    res.clearCookie('jwt');
    req.user = null;
    return res.status(200).send({ success: true });
  }

  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  @Post('verify-otp')
  async secondFactor(
    @Body() createSecondFactorDto: CreateSecondFactorDto,
    @Res() res: any,
    @Req() req: any,
  ): Promise<{ success: boolean }> {
    const token = await this.authService.verifyOtp(
      req.user.sub,
      createSecondFactorDto.code,
    );
    if (!token) {
      throw new UnauthorizedException('Incorrect or expired OTP');
    }

    // Send jwt token.
    res.cookie('jwt', token, {
      maxAge: 1800000,
      sameSite: 'strict',
      //secure: true,
      httpOnly: true,
    });

    return res.status(200).send({ success: true });
  }
}
