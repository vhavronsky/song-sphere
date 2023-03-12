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

import * as path from 'path';

@Module({
  imports: [
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
    ConfigModule.forRoot({
      envFilePath: '.env', // TODO: dynamic .env file (production or development)
      isGlobal: true,
      load: [configuration],
      cache: true, // TODO: use only on dev
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
