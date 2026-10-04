// Backend response envelope: every endpoint wraps its result as { payload, message, status }.
export interface ApiResponse<T> {
  payload: T;
  message?: string;
  status?: number;
}

// One entry of a server-side validation error list.
export interface FieldError {
  field: string;
  error: string;
}

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type QueryParams = Record<string, string | number | boolean | null | undefined>;

export interface ApiRequestOptions {
  endpoint: string;
  method?: HttpMethod;
  body?: unknown;
  params?: QueryParams;
  headers?: Record<string, string>;
  signal?: AbortSignal;
}
