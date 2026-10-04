// Single source of truth for URLs. Modules are added to the router as they are built.
export const ROUTES = {
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",
  DASHBOARD: "/",
  PLAN_TOUR: "/plan-tour",
  PACKAGES: "/packages",
  PACKAGE_DETAIL: "/packages/:id",
  QUOTATIONS: "/quotations",
  REPORTS: "/reports",
  INFO: "/info",
} as const;

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES];
