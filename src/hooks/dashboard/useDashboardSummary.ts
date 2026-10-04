import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/utils/api-request";
import { normalizeError } from "@/utils/error-utils";
import { dashboardKeys } from "@/constants/queryKeys";
import { getMockDashboardSummary } from "@/mocks/dashboard";
import { isMockApiEnabled } from "@/mocks/utils";
import type { DashboardSummary } from "@/types/dashboard";

// GET /dashboard/summary → stats, upcoming tours, quotations awaiting response, next departure.
// The endpoint path is a placeholder until the backend API contract is agreed.
const useDashboardSummary = () => {
  const query = useQuery({
    queryKey: dashboardKeys.summary(),
    queryFn: async ({ signal }) => {
      if (isMockApiEnabled) return getMockDashboardSummary();
      const response = await apiRequest<DashboardSummary>({ endpoint: "/dashboard/summary", signal });
      return response.payload;
    },
  });

  return {
    dashboardSummary: query.data,
    dashboardSummaryLoading: query.isPending,
    dashboardSummaryError: query.error ? normalizeError(query.error).message : null,
    refreshDashboardSummary: query.refetch,
  };
};

export default useDashboardSummary;
