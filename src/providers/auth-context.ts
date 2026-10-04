import { createContext } from "react";
import type { UserInfo } from "@/types/auth";

export interface AuthContextValue {
  userInfo: UserInfo | null;
  isAuthenticated: boolean;
  startSession: (token: string, persist: boolean) => void;
  logout: (reason?: "manual" | "expired") => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);
