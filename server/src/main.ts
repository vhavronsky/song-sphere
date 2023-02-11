import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const bootstrap = async () => {
  try {
    const app = await NestFactory.create(AppModule, {
      // logger: undefined, // TODO: implement Logger
      cors: true,
    });

    const configService = app.get<ConfigService>(ConfigService);

    const port = configService.get<string>('port');

    await app.listen(port, () => console.log('Running on port:', port));
  } catch (err) {
    console.error(err); // TODO: log via Logger
  }
};

bootstrap();
