import { LoggerPort } from '@/application/ports/logger/logger.port';
import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(
    @Inject('LoggerPort')
    private readonly loggerService: LoggerPort,
  ) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      tap(() => {
        const req = context.switchToHttp().getRequest();
        this.loggerService.info(`${req.method} ${req.url}`);
      }),
      catchError((err) => {
        this.loggerService.error(err.message, err.stack);
        throw err;
      }),
    );
  }
}
