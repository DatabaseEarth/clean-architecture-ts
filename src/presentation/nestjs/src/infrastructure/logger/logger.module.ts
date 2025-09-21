import { Global, Module, RequestMethod } from '@nestjs/common';
import { LoggerPort } from '@/application/common/ports/logger.port';
import { PinoLoggerService } from '@/infrastructure/logger/pino/pino-logger.service';

@Global()
@Module({
  providers: [
    {
      provide: LoggerPort,
      useClass: PinoLoggerService,
    }
  ],
  exports: [LoggerPort]
})
export class LoggerModule { }
