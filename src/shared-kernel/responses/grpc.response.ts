import {
  BaseResponse,
  ApiSuccessResponse,
  ApiErrorResponse,
} from "./base.response";

export class GrpcResponse extends BaseResponse {
  static override success<T>(
    data: T | T[] | null,
    message = "OK"
  ): ApiSuccessResponse<T> {
    return { status: "success", message, data };
  }

  static override error(
    message: string,
    errorCode?: string,
    details?: Record<string, any>
  ): ApiErrorResponse {
    return { status: "error", message, errorCode, details };
  }
}
