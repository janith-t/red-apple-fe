import apiClient from "./api-client";
import type { ApiRequestOptions, ApiResponse } from "@/types/api";

// The one function domain hooks call. Resolves to the backend envelope; throws the raw Axios error
// (use normalizeError() to present it).
export const apiRequest = async <T>({
  endpoint,
  method = "GET",
  body,
  params,
  headers,
  signal,
}: ApiRequestOptions): Promise<ApiResponse<T>> => {
  const response = await apiClient.request<ApiResponse<T>>({
    url: endpoint,
    method,
    data: body,
    params,
    headers,
    signal,
  });
  return response.data;
};
