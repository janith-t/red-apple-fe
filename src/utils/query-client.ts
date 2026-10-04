import { QueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";

const MAX_RETRIES = 2;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      refetchOnWindowFocus: false,
      // Retry network/5xx failures only; a 4xx will not fix itself.
      retry: (failureCount, error) => {
        const status = isAxiosError(error) ? error.response?.status : undefined;
        if (status && status >= 400 && status < 500) return false;
        return failureCount < MAX_RETRIES;
      },
    },
    mutations: {
      retry: false,
    },
  },
});
