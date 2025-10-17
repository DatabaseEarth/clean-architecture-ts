import { Global, Module } from '@nestjs/common';
import { PinoLoggerService } from '@/infrastructure/logger/pino/pino-logger.service';
import { ConfigPort } from '@/application/ports/config';

@Global()
@Module({
  providers: [
    {
      provide: 'LoggerPort',
      useFactory: (config: ConfigPort) => new PinoLoggerService(config),
      inject: ['ConfigPort'],
    },
  ],
  exports: ['LoggerPort'],
})
export class LoggerModule {}
