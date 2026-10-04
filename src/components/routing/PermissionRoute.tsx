import type { ReactNode } from "react";
import Can from "@/components/ui/Can";
import AccessDenied from "./AccessDenied";
import type { Permission, Role } from "@/constants/permissions";

interface PermissionRouteProps {
  permission?: Permission | Permission[];
  role?: Role | Role[];
  children: ReactNode;
}

// Route-level guard for modules that need a role or permission. Use inside ProtectedRoute.
export default function PermissionRoute({ permission, role, children }: PermissionRouteProps) {
  return (
    <Can permission={permission} role={role} fallback={<AccessDenied />}>
      {children}
    </Can>
  );
}
