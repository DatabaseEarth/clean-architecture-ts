import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { ApiErrorResponse } from '@/shared-kernel/responses';

@Catch()
export class CatchEverythingFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    let httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let errorCode = 'INTERNAL_SERVER_ERROR';
    let details: any = undefined;

    if (exception instanceof HttpException) {
      httpStatus = exception.getStatus();
      const response = exception.getResponse();

      if (typeof response === 'string') {
        message = response;
        details = exception.stack;
      } else if (typeof response === 'object' && response !== null) {
        message = response['message'] || message;
        errorCode = response['error'] || errorCode;
        details = response['details'] || response['errors'] || undefined;
      }
    } else if (exception instanceof Error) {
      message = exception.message;
      details = exception.stack;
    }

    const responseBody: ApiErrorResponse = {
      status: 'error',
      message,
      errorCode,
      details,
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
