import { ErrorCode, HttpStatusCode } from "../enums/exception.enum";

export const ERROR_CODES: Record<
  ErrorCode,
  { httpStatus: HttpStatusCode; message?: string }
> = {
  // ---------------------- VALIDATION ----------------------
  [ErrorCode.VALIDATION_ERROR]: {
    httpStatus: HttpStatusCode.BAD_REQUEST,
  },
  [ErrorCode.REQUIRED_FIELD]: {
    httpStatus: HttpStatusCode.BAD_REQUEST,
  },
  [ErrorCode.INVALID_FORMAT]: {
    httpStatus: HttpStatusCode.BAD_REQUEST,
  },

  // ---------------------- BUSINESS ----------------------
  [ErrorCode.BUSINESS_RULE_VIOLATION]: {
    httpStatus: HttpStatusCode.CONFLICT,
  },
  [ErrorCode.USER_NOT_FOUND]: {
    httpStatus: HttpStatusCode.NOT_FOUND,
  },
  [ErrorCode.INVALID_CREDENTIALS]: {
    httpStatus: HttpStatusCode.UNAUTHORIZED,
  },
  [ErrorCode.ACCESS_DENIED]: {
    httpStatus: HttpStatusCode.FORBIDDEN,
  },

  // ---------------------- SYSTEM ----------------------
  [ErrorCode.INTERNAL_ERROR]: {
    httpStatus: HttpStatusCode.INTERNAL_SERVER_ERROR,
  },
  [ErrorCode.DATABASE_ERROR]: {
    httpStatus: HttpStatusCode.INTERNAL_SERVER_ERROR,
  },
  [ErrorCode.EXTERNAL_SERVICE_ERROR]: {
    httpStatus: HttpStatusCode.BAD_GATEWAY,
  },

  // ---------------------- AUTH ----------------------
  [ErrorCode.TOKEN_EXPIRED]: {
    httpStatus: HttpStatusCode.UNAUTHORIZED,
  },
  [ErrorCode.TOKEN_INVALID]: {
    httpStatus: HttpStatusCode.UNAUTHORIZED,
  },
  [ErrorCode.UNAUTHORIZED]: {
    httpStatus: HttpStatusCode.UNAUTHORIZED,
  },
} as const;

export type ErrorCodeType = keyof typeof ERROR_CODES;
