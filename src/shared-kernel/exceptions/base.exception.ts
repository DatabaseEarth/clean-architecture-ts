import { ErrorCode, HttpStatusCode } from "../enums/exception.enum";
import { ApiErrorResponse, BaseResponse } from "../responses/base.response";
import { ERROR_CODES } from "../constants";

interface BaseExceptionParams {
  code: ErrorCode;
  message?: string;
  httpStatus?: number;
  details?: Record<string, any>;
}

export class BaseException extends Error implements ApiErrorResponse {
  public readonly code: ErrorCode;
  public readonly httpStatus: HttpStatusCode;
  public readonly details?: Record<string, any>;

  status: "error" = "error";
  message: string;

  constructor({ code, message, httpStatus, details }: BaseExceptionParams) {
    const errorConfig = ERROR_CODES[code];
    const finalMessage = message || errorConfig?.message || "Unexpected error";

    super(finalMessage);
    this.code = code;
    this.message = finalMessage;
    this.details = details;
    this.httpStatus =
      errorConfig?.httpStatus ?? HttpStatusCode.INTERNAL_SERVER_ERROR;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  /**
   * Trả về response chuẩn hóa (theo BaseResponse.error)
   */
  toResponse(): ApiErrorResponse {
    return BaseResponse.error(this.message, this.code, this.details);
  }
}
