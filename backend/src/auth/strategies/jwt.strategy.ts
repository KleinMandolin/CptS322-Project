import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '@/auth/auth.service';
import { _Role } from '@/user-management/enums/role-enum';
import { UserCredentialsService } from '@/user-management/services/user-credentials.service';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  // passport strategy's name is 'jwt'; for use in guards.
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
    private readonly userCredentialsService: UserCredentialsService,
  ) {
    // Extract the JWT token from the cookie, end session if cookie expires, pass the jwt secret to the parent constructor.
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([jwtExtractor]),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  // Get a userInfo entity from the decoded payload's json and return it for further use in other guards.
  async validate(payload: any): Promise<{ userRole: _Role; sub: string }> {
    const userRole = payload.role === null ? 'none' : payload.role;
    const usernameInCookie = payload.sub;
    console.log(`sub: ${usernameInCookie} role: ${userRole}`);

    if (!(await this.userCredentialsService.findUser(usernameInCookie))) {
      throw new ForbiddenException('Jwt has been manipulated');
    }

    if (!usernameInCookie) {
      throw new UnauthorizedException('This is a protected path');
    }
    return { userRole: userRole, sub: usernameInCookie };
  }
}

const jwtExtractor = (req: Request): string | null => {
  console.log(`Req: ${JSON.stringify(req.cookies)}`);
  if (req.cookies && 'jwt' in req.cookies) {
    return req.cookies.jwt;
  } else if (req.cookies && 'otp_token' in req.cookies) {
    return req.cookies.otp_token;
  }
  return null;
};
