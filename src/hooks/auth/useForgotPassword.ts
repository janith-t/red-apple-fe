import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/utils/api-request";
import { isMockAuthEnabled, mockForgotPassword } from "@/mocks/auth";
import type { ForgotPasswordRequest } from "@/types/auth";

// POST /auth/forgot-password → the backend emails reset instructions to the registered address.
const useForgotPassword = () => {
  const mutation = useMutation({
    mutationFn: async (request: ForgotPasswordRequest) => {
      if (isMockAuthEnabled) return mockForgotPassword(request);
      return apiRequest<null>({ endpoint: "/auth/forgot-password", method: "POST", body: request });
    },
  });

  return {
    requestReset: mutation.mutateAsync,
    requestResetLoading: mutation.isPending,
    requestResetError: mutation.error,
    isSuccess: mutation.isSuccess,
    reset: mutation.reset,
  };
};

export default useForgotPassword;
