import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '@/auth/auth.service';
import { UserInfo } from '@/user-management/entities/user-info';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  // passport strategy's name is 'jwt'; for use in guards.
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    // Extract the JWT token from the cookie, end session if cookie expires, pass the jwt secret to the parent constructor.
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  // Get a userInfo entity from the decoded payload's json and return it for further use in other guards.
  async validate(payload: any): Promise<UserInfo> {
    const user = await this.authService.validateCookiePayload(payload);
    if (!user) {
      throw new UnauthorizedException('This is a protected path');
    }
    return user;
  }
}
