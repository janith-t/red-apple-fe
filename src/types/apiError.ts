import type { AxiosError } from "axios";
import type { FieldError } from "./api";

export interface BackendErrorDetail {
  exception: string;
  code: number;
  message: string;
}

// Error envelope: payload is either an exception detail or a list of field validation errors.
export interface BackendError {
  payload?: BackendErrorDetail | FieldError[];
  message?: string;
  status?: number;
}

export type ApiError = AxiosError<BackendError>;

// What components consume after normalizeError(); never the raw Axios error.
export interface NormalizedError {
  message: string;
  status?: number;
  fieldErrors: Record<string, string>;
  isNetworkError: boolean;
}
