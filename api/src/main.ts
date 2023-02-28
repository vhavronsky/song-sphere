import helmet from 'helmet';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import configuration from '#config/configuration';
import { AppModule } from '#src/app.module';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule, {
    logger: new Logger(configuration().appTitle, { timestamp: true }),
    cors: true,
  });

  const configService = app.get<ConfigService>(ConfigService);
  const [port, appUrlPrefix, appTitle] = [
    'port',
    'appUrlPrefix',
    'appTitle',
  ].map((str) => configService.get(str));

  app.use(helmet());
  app.setGlobalPrefix(appUrlPrefix);
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('SongSphere')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);

  Logger.log(`Logger ${appTitle} is listening on port: ${port}`);
};

bootstrap().catch((err) => Logger.error(err));
