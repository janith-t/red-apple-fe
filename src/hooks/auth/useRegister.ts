import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/utils/api-request";
import { isMockAuthEnabled, mockRegister } from "@/mocks/auth";
import type { RegisterRequest } from "@/types/auth";

// POST /auth/register → new agent accounts are created pending approval; no session is started.
const useRegister = () => {
  const mutation = useMutation({
    mutationFn: async (request: RegisterRequest) => {
      if (isMockAuthEnabled) return mockRegister(request);
      return apiRequest<null>({ endpoint: "/auth/register", method: "POST", body: request });
    },
  });

  return {
    register: mutation.mutateAsync,
    registerLoading: mutation.isPending,
    registerError: mutation.error,
    isSuccess: mutation.isSuccess,
    reset: mutation.reset,
  };
};

export default useRegister;
