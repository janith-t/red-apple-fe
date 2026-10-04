import type { ReactNode } from "react";
import { Navigate, useLocation, type Location } from "react-router";
import useAuth from "@/hooks/common/useAuth";
import { ROUTES } from "@/constants/routes";

// Must be logged out (login, register, forgot password). A signed-in agent goes back to where they were heading.
export default function PublicRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (isAuthenticated) {
    const from = (location.state as { from?: Location } | null)?.from;
    const target = from && from.pathname !== ROUTES.LOGIN ? `${from.pathname}${from.search}${from.hash}` : ROUTES.DASHBOARD;
    return <Navigate to={target} replace />;
  }
  return <>{children}</>;
}
