import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { BaseException } from '@/shared-kernel/exceptions';
import { ERROR_CODES } from '@/shared-kernel/constants';
import { ErrorCode } from '@/shared-kernel/enums/exception.enum';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    let payload: any;

    if (exception instanceof BaseException) {
      const errorMeta = ERROR_CODES[exception.code];
      httpStatus =
        Number(errorMeta?.httpStatus) || HttpStatus.INTERNAL_SERVER_ERROR;
      payload = exception.toResponse();
    } else if (exception instanceof Error) {
      if (process.env.NODE_ENV !== 'production') {
        console.error('[Unhandled Exception]', exception);
      }

      httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
      payload = {
        status: 'error',
        message: exception.message || 'Internal server error',
        errorCode: ErrorCode.INTERNAL_ERROR,
      };
    } else {
      httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
      payload = {
        status: 'error',
        message: 'Unknown error occurred',
        errorCode: ErrorCode.INTERNAL_ERROR,
      };
    }

    response.status(httpStatus).json(payload);
  }
}
