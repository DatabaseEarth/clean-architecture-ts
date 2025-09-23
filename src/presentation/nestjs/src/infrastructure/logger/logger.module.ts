import { Global, Module } from '@nestjs/common';
import { PinoLoggerService } from '@/infrastructure/logger/pino/pino-logger.service';

@Global()
@Module({
  providers: [
    {
      provide: 'LoggerPort',
      useClass: PinoLoggerService,
    },
  ],
  exports: ['LoggerPort'],
})
export class LoggerModule {}
