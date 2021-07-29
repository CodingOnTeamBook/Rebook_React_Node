import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './http-exception.filter';
import * as express from 'express';
import { join } from 'path';
import * as helmet from 'helmet';
import { logger } from './logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use('/', express.static(join(__dirname, '../uploads')));
  app.useGlobalFilters(new HttpExceptionFilter());
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );
  if (process.env.NODE_ENV !== 'dev') {
    app.use(helmet());
  }

  await app.listen(process.env.PORT, () => {
    logger.info(`Server listening on port ${process.env.PORT}`);
  });
}
bootstrap();
