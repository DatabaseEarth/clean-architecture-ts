import { LoggerPort } from '@/application/common/ports/logger.port';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: LoggerPort) { }
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      tap(() => {
        const req = context.switchToHttp().getRequest();
        this.logger.info(`${req.method} ${req.url}`);
      }),
      catchError((err) => {
        this.logger.error(err.message, err.stack);
        throw err;
      }),
    );
  }
}
