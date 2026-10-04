import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router";
import useAuth from "@/hooks/common/useAuth";
import { ROUTES } from "@/constants/routes";

// Must be logged in. Remembers where the agent was going so login can send them back.
export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) return <Navigate to={ROUTES.LOGIN} replace state={{ from: location }} />;
  return <>{children}</>;
}
