import { isAxiosError } from "axios";
import type { FieldError } from "@/types/api";
import type { BackendError, NormalizedError } from "@/types/apiError";

export const isFieldErrorList = (payload: unknown): payload is FieldError[] =>
  Array.isArray(payload) &&
  payload.every((item) => typeof item === "object" && item !== null && "field" in item && "error" in item);

// [{ field, error }] → { field: error }, ready for Mantine `form.setErrors()`.
export const mapFieldErrors = (errors: FieldError[]): Record<string, string> =>
  Object.fromEntries(errors.map(({ field, error }) => [field, error]));

// Turns anything thrown by the API layer into one predictable shape for the UI.
export const normalizeError = (error: unknown, fallback = "Something went wrong. Please try again."): NormalizedError => {
  if (isAxiosError<BackendError>(error)) {
    if (!error.response) {
      const timedOut = error.code === "ECONNABORTED";
      return {
        message: timedOut ? "The server took too long to respond." : "Network error: no response from the server.",
        fieldErrors: {},
        isNetworkError: true,
      };
    }
    const data = error.response.data;
    const payload = data?.payload;
    const detailMessage = payload && !Array.isArray(payload) ? payload.message : undefined;
    return {
      message: data?.message || detailMessage || fallback,
      status: error.response.status,
      fieldErrors: isFieldErrorList(payload) ? mapFieldErrors(payload) : {},
      isNetworkError: false,
    };
  }
  if (error instanceof Error) {
    return { message: error.message || fallback, fieldErrors: {}, isNetworkError: false };
  }
  return { message: fallback, fieldErrors: {}, isNetworkError: false };
};
