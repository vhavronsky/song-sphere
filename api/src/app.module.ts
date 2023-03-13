import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';

import configuration from '#config/configuration';
import {
  AuthModule,
  CommentModule,
  FileModule,
  TrackModule,
  UserModule,
} from '#src/infrastructure';
import { HealthController } from '#controllers/health.controller';

import { AppEnv } from './shared/enums/app-env';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:
        process.env.NODE_ENV === AppEnv.PRODUCTION
          ? '.env'
          : `.env.${process.env.NODE_ENV}`, // dynamic env file path
      isGlobal: true,
      load: [configuration],
      cache: process.env.NODE_ENV === AppEnv.LOCAL, // caching only locally
    }),
    DevtoolsModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        http: configService.get<string>('appEnv') !== 'production',
      }),
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('database.uri'),
      }),
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
      serveStaticOptions: {
        index: false,
      },
    }),
    AuthModule,
    UserModule,
    TrackModule,
    CommentModule,
    FileModule,
  ],
  providers: [],
  exports: [],
  controllers: [HealthController],
})
export class AppModule {}
