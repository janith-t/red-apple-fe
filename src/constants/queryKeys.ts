// TanStack Query key factories, one per domain. Invalidate with the "all" key after mutations.
export const dashboardKeys = {
  all: ["dashboard"] as const,
  summary: () => [...dashboardKeys.all, "summary"] as const,
};
