// Permission strings are a contract with the backend: values must match the JWT "permissions" claim.
// Naming: <MODULE>_<ACTION>_ACCESS = "<module>_<action>_access". Add one group per module, then merge below.
//
// export const PACKAGE_PERMISSIONS = {
//   PACKAGE_CANCEL_ACCESS: "package_cancel_access",
// } as const;

export const ROLES = {
  ADMIN: "ADMIN",
  AGENT: "AGENT",
} as const;

export const PERMISSIONS = {
  // ...PACKAGE_PERMISSIONS,
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];
export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];
