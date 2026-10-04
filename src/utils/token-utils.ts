import { jwtDecode } from "jwt-decode";
import type { DecodedToken, UserInfo } from "@/types/auth";
import { ROLES } from "@/constants/permissions";

// Decoding does NOT verify the signature: claims drive the UI only, the backend authorises every request.
export const decodeToken = (token: string): DecodedToken | null => {
  try {
    return jwtDecode<DecodedToken>(token);
  } catch {
    return null;
  }
};

// Undecodable or missing exp ⇒ treated as expired (fail closed).
export const isTokenExpired = (token: string): boolean => {
  const decoded = decodeToken(token);
  if (!decoded?.exp) return true;
  return decoded.exp < Date.now() / 1000;
};

export const extractUserInfo = (token: string): UserInfo | null => {
  const decoded = decodeToken(token);
  if (!decoded) return null;
  return {
    username: decoded.sub,
    displayName: decoded.name ?? decoded.sub,
    agentId: decoded.agentId,
    roles: decoded.roles ?? [],
    permissions: decoded.permissions ?? [],
    expiresAt: decoded.exp,
  };
};

export const hasRole = (user: UserInfo | null, role: string): boolean =>
  !!user && user.roles.includes(role);

export const hasAnyRole = (user: UserInfo | null, roles: string[]): boolean =>
  !!user && roles.some((role) => user.roles.includes(role));

export const hasAllRoles = (user: UserInfo | null, roles: string[]): boolean =>
  !!user && roles.every((role) => user.roles.includes(role));

export const hasPermission = (user: UserInfo | null, permission: string): boolean =>
  !!user && user.permissions.includes(permission);

// ADMIN is a super-user bypass; otherwise the exact permission string must be present.
export const canAccess = (user: UserInfo | null, permission: string): boolean =>
  hasRole(user, ROLES.ADMIN) || hasPermission(user, permission);
