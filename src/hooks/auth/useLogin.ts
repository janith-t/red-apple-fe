import { useMutation } from "@tanstack/react-query";
import useAuth from "../common/useAuth";
import { apiRequest } from "@/utils/api-request";
import { createMockToken, isMockAuthEnabled } from "@/utils/mock-auth";
import type { LoginFormValues } from "@/types/auth";

// POST /auth/login → payload is the raw JWT. Starts the session on success.
const useLogin = () => {
  const { startSession } = useAuth();

  const mutation = useMutation({
    mutationFn: async ({ username, password }: LoginFormValues) => {
      if (isMockAuthEnabled) return createMockToken({ username, password });
      const response = await apiRequest<string>({
        endpoint: "/auth/login",
        method: "POST",
        body: { username, password },
      });
      return response.payload;
    },
    onSuccess: (token, { rememberMe }) => startSession(token, rememberMe),
  });

  return {
    login: mutation.mutateAsync,
    loginLoading: mutation.isPending,
    loginError: mutation.error,
    isSuccess: mutation.isSuccess,
    reset: mutation.reset,
  };
};

export default useLogin;
