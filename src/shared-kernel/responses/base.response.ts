export interface MetaData {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

export interface FileAttachment {
  fileName: string;
  mimeType: string;
  size: number;
}

export interface ApiSuccessResponse<T> {
  status: "success";
  message?: string;
  data: T | T[] | null;
  meta?: MetaData;
  attachment?: FileAttachment;
}

export interface ApiErrorResponse {
  status: "error";
  message: string;
  errorCode?: string;
  details?: Record<string, any>;
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

/**
 * BaseResponse: Chuẩn gốc để framework khác kế thừa.
 */
export abstract class BaseResponse {
  static success<T>(
    data: T | T[] | null,
    message = "Success",
    meta?: MetaData,
    attachment?: FileAttachment
  ): ApiSuccessResponse<T> {
    return { status: "success", message, data, meta, attachment };
  }

  static error(
    message: string,
    errorCode?: string,
    details?: Record<string, any>
  ): ApiErrorResponse {
    return { status: "error", message, errorCode, details };
  }
}
