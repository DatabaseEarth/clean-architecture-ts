import {
  BaseResponse,
  ApiSuccessResponse,
  ApiErrorResponse,
  MetaData,
  FileAttachment,
} from "./base.response";

export class RestResponse extends BaseResponse {
  static override success<T>(
    data: T | T[] | null,
    message = "Success",
    meta?: MetaData,
    attachment?: FileAttachment
  ): ApiSuccessResponse<T> {
    return { status: "success", message, data, meta, attachment };
  }

  static override error(
    message: string,
    errorCode?: string,
    details?: Record<string, any>
  ): ApiErrorResponse {
    return { status: "error", message, errorCode, details };
  }
}
