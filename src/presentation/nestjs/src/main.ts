import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { createSwaggerDocument } from './swagger';
import compression from 'compression';
import { isProduction } from './common/utils/env';
import 'reflect-metadata';
import { ConfigPort } from '@/shared-kernel/application/ports/config/config.port';
import { LoggerPort } from '@/shared-kernel/application/ports/logger/logger.port';

export async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
    logger: isProduction()
      ? ['log', 'error']
      : ['log', 'error', 'warn', 'debug', 'verbose'],
  });

  const configService: ConfigPort = app.get('ConfigPort');
  const loggerService: LoggerPort = app.get('LoggerPort');
  app.useLogger(app.get('LoggerPort'));
  app.use(compression());
  app.enableCors({
    origin: true, // 'http://localhost:5173'
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  app.use(cookieParser());
  app.setGlobalPrefix('api');
  app.use(
    helmet({
      xssFilter: true,
      hidePoweredBy: true,
    }),
  );
  app.useBodyParser('json', { limit: '50mb' });
  app.useBodyParser('urlencoded', { extended: true, limit: '50mb' });
  createSwaggerDocument(app);

  const port: number = configService.get<number>('APP_PORT');
  const host: string = configService.get<string>('APP_HOST');
  await app.listen(port, host, () => {
    loggerService.info(`Application listen in ${port}`);
  });
}
