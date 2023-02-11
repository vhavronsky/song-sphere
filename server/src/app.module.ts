import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  providers: [AppService],
  exports: [],
  controllers: [AppController],
})
export class AppModule {}
