import type { ReactNode } from "react";
import usePermissions from "@/hooks/common/usePermissions";
import type { Permission, Role } from "@/constants/permissions";

interface CanProps {
  /** Any one of these permissions is enough. ADMIN always passes. */
  permission?: Permission | Permission[];
  /** Any one of these roles is enough. */
  role?: Role | Role[];
  /** Rendered when not allowed. Defaults to nothing: disallowed controls are hidden, not disabled. */
  fallback?: ReactNode;
  children: ReactNode;
}

// UI gating only. The backend must still authorise every request.
export default function Can({ permission, role, fallback = null, children }: CanProps) {
  const { canAny, hasAnyRole } = usePermissions();
  const permissions = permission === undefined ? [] : ([] as string[]).concat(permission);
  const roles = role === undefined ? [] : ([] as string[]).concat(role);

  const allowed = (permissions.length === 0 || canAny(permissions)) && (roles.length === 0 || hasAnyRole(roles));
  return <>{allowed ? children : fallback}</>;
}
