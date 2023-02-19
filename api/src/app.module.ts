import * as path from 'path';

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';

import configuration from './config/configuration';
import { CommentModule } from './infrastructure/comment.module';
import { FileModule } from './infrastructure/file.module';
import { TrackModule } from './infrastructure/track.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('database.uri'),
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      envFilePath: '.env', // TODO: dynamic .env file (production or development)
      isGlobal: true,
      load: [configuration],
      cache: true, // TODO: use only on dev
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),
    TrackModule,
    CommentModule,
    FileModule,
  ],
  providers: [],
  exports: [],
  controllers: [],
})
export class AppModule {}
