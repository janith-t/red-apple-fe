// JWT claims the frontend expects. Confirm the claim names with the backend.
export interface DecodedToken {
  sub: string; // username / agent ID
  name?: string;
  agentId?: string;
  roles: string[];
  permissions?: string[];
  iat: number;
  exp: number; // seconds since epoch
}

export interface UserInfo {
  username: string;
  displayName: string;
  agentId?: string;
  roles: string[];
  permissions: string[];
  expiresAt: number; // seconds since epoch
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginFormValues extends LoginRequest {
  rememberMe: boolean;
}

export interface RegisterRequest {
  fullName: string;
  agencyName: string;
  email: string;
  phone: string;
  password: string;
}

export interface RegisterFormValues extends RegisterRequest {
  confirmPassword: string;
  acceptTerms: boolean;
}

export interface ForgotPasswordRequest {
  username: string; // email or Agent ID
}
