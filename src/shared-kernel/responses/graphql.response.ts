import {
  BaseResponse,
  ApiSuccessResponse,
  ApiErrorResponse,
  MetaData,
} from "./base.response";

export class GraphQLResponse extends BaseResponse {
  static override success<T>(
    data: T | T[] | null,
    message = "Success",
    meta?: MetaData
  ): ApiSuccessResponse<T> {
    return { status: "success", message, data, meta };
  }

  static override error(
    message: string,
    errorCode?: string,
    details?: Record<string, any>
  ): ApiErrorResponse {
    return { status: "error", message, errorCode, details };
  }
}
