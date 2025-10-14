import { BaseException } from "./base.exception";
import { ErrorCode } from "../enums/exception.enum";
import { ERROR_CODES, VALIDATION_MESSAGES } from "../constants";

export class UnauthorizedException extends BaseException {
  constructor(message?: string) {
    super({
      code: ErrorCode.UNAUTHORIZED,
      message: message || VALIDATION_MESSAGES.UNAUTHORIZED,
      httpStatus: ERROR_CODES[ErrorCode.UNAUTHORIZED].httpStatus,
    });
  }
}

export class TokenExpiredException extends BaseException {
  constructor(message?: string) {
    super({
      code: ErrorCode.TOKEN_EXPIRED,
      message: message || VALIDATION_MESSAGES.TOKEN_EXPIRED,
      httpStatus: ERROR_CODES[ErrorCode.TOKEN_EXPIRED].httpStatus,
    });
  }
}

export class InvalidTokenException extends BaseException {
  constructor(message?: string) {
    super({
      code: ErrorCode.TOKEN_INVALID,
      message: message || VALIDATION_MESSAGES.INVALID_TOKEN,
      httpStatus: ERROR_CODES[ErrorCode.TOKEN_INVALID].httpStatus,
    });
  }
}

export class AccessTokenRequiredException extends BaseException {
  constructor(message?: string) {
    super({
      code: ErrorCode.UNAUTHORIZED,
      message: message || VALIDATION_MESSAGES.ACCESS_TOKEN_REQUIRED,
      httpStatus: ERROR_CODES[ErrorCode.UNAUTHORIZED].httpStatus,
    });
  }
}
