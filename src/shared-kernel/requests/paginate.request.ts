export interface PaginateRequest {
  page?: number;
  size?: number;
}

export interface PaginateWithQueryRequest {
  page?: number;
  size?: number;
  query?: string;
}
