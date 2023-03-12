import { Module, Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AUTH_SERVICE_TOKEN } from '#shared/injection-tokens';
import { AuthController } from '#controllers/auth.controller';
import { AuthService } from '#services/auth.service';
import { UserModule } from '#infrastructure/user.module';

const providers: Provider[] = [
  {
    provide: AUTH_SERVICE_TOKEN,
    useClass: AuthService,
  },
];

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('jwt.secret'),
        signOptions: {
          expiresIn: configService.get<string>('jwt.expiresIn'),
        },
      }),
    }),
    UserModule,
  ],
  providers,
  exports: [],
  controllers: [AuthController],
})
export class AuthModule {}
