import helmet from 'helmet';

import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import configuration from './config/configuration';
import { AppModule } from './app.module';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule, {
    logger: new Logger(configuration().appTitle, { timestamp: true }),
    cors: true,
  });

  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe());

  const configService = app.get<ConfigService>(ConfigService);
  const [port, appTitle] = ['port', 'appTitle'].map((str) =>
    configService.get(str),
  );

  await app.listen(port);

  Logger.log(`Logger ${appTitle} is listening on port: ${port}`);
};

bootstrap().catch((err) => Logger.error(err));
