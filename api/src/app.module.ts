import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import configuration from './config/configuration';
import { TrackModule } from './track/track.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env', // TODO: dynamic .env file (production or development)
      isGlobal: true,
      load: [configuration],
      cache: true, // TODO: use only on dev
    }),
    TrackModule,
  ],
  providers: [],
  exports: [],
  controllers: [],
})
export class AppModule {}
