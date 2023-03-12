import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import { USER_SERVICE_TOKEN } from '#shared/injection-tokens';
import { IUserService } from '#interfaces/services';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    @Inject(USER_SERVICE_TOKEN)
    private readonly userService: IUserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('jwt.secret'),
      ignoreExpiration: false,
    });
  }

  async validate(payload: { id: string }) {
    const { id } = payload;

    const user = await this.userService.findOneByParams({ id });

    if (!user)
      throw new UnauthorizedException(
        'You must be logged in to access this endpoint',
      );

    return user;
  }
}
