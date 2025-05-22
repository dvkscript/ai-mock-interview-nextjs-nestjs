import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { logger } from './libs/api/middlewares/logger.middleware';
import * as express from 'express'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });

  app.setGlobalPrefix('api');

  app.use(
    session({
      secret: 'some-secret',
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false }, // Đặt true nếu chạy HTTPS
    }),
  );

  app.use(logger);
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Swagger Setup
  const config = new DocumentBuilder()
    .setTitle('AI Mock Interview API')
    .setDescription('API documentation for AI Mock Interview application')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    ignoreGlobalPrefix: false,
  });
  SwaggerModule.setup('docs', app, document);


  // Static assets
  app.useStaticAssets(join(__dirname, '../public', '/'), {
    prefix: '/',
    setHeaders: (res) => res.set('Cache-Control', 'max-age=2592000'),
  });

  // Cấu hình Validation Pipe
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
