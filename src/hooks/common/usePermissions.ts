import { useMemo } from "react";
import useAuth from "./useAuth";
import { ROLES } from "@/constants/permissions";
import { canAccess, hasAnyRole, hasRole } from "@/utils/token-utils";

// UI-only checks. Hiding a control is not security: the backend must enforce every permission.
const usePermissions = () => {
  const { userInfo } = useAuth();

  return useMemo(
    () => ({
      isAdmin: hasRole(userInfo, ROLES.ADMIN),
      hasRole: (role: string) => hasRole(userInfo, role),
      hasAnyRole: (roles: string[]) => hasAnyRole(userInfo, roles),
      can: (permission: string) => canAccess(userInfo, permission),
      canAny: (permissions: string[]) => permissions.some((permission) => canAccess(userInfo, permission)),
    }),
    [userInfo],
  );
};

export default usePermissions;
