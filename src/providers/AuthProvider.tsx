import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { AuthContext, type AuthContextValue } from "./auth-context";
import { tokenStorage } from "@/utils/token-storage";
import { extractUserInfo, isTokenExpired } from "@/utils/token-utils";
import { setUnauthorizedHandler } from "@/utils/api-client";
import { showInfo, showWarning } from "@/utils/notify-utils";
import type { UserInfo } from "@/types/auth";

// setTimeout overflows above ~24.8 days and would fire immediately.
const MAX_TIMEOUT_MS = 2_147_483_647;

// Session is always derived from the token; userInfo is never stored separately, so it can't be edited out of sync.
const readSession = (): UserInfo | null => {
  const token = tokenStorage.get();
  if (!token) return null;
  if (isTokenExpired(token)) {
    tokenStorage.clear();
    return null;
  }
  return extractUserInfo(token);
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(readSession);

  const logout = useCallback<AuthContextValue["logout"]>(
    (reason = "manual") => {
      tokenStorage.clear();
      setUserInfo(null);
      queryClient.clear();
      if (reason === "expired") showWarning("Session expired", "Please sign in again to continue.");
      else showInfo("Signed out", "You have been signed out.");
    },
    [queryClient],
  );

  const startSession = useCallback<AuthContextValue["startSession"]>((token, persist) => {
    const info = extractUserInfo(token);
    if (!info || isTokenExpired(token)) throw new Error("The server returned an invalid or expired session token.");
    tokenStorage.set(token, persist);
    setUserInfo(info);
  }, []);

  // Any 401 from the API ⇒ log out via state; route guards then redirect to /login.
  const userInfoRef = useRef(userInfo);
  useEffect(() => {
    userInfoRef.current = userInfo;
  }, [userInfo]);

  useEffect(() => {
    setUnauthorizedHandler(() => {
      if (userInfoRef.current) logout("expired");
    });
    return () => setUnauthorizedHandler(null);
  }, [logout]);

  // Log out exactly when the token expires, even if the agent is idle.
  useEffect(() => {
    if (!userInfo) return;
    const msLeft = userInfo.expiresAt * 1000 - Date.now();
    if (msLeft > MAX_TIMEOUT_MS) return;
    const timer = window.setTimeout(() => logout("expired"), Math.max(msLeft, 0));
    return () => window.clearTimeout(timer);
  }, [userInfo, logout]);

  // Keep tabs in sync: signing in/out in one tab updates the others (localStorage sessions only).
  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key === tokenStorage.key || event.key === null) setUserInfo(readSession());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({ userInfo, isAuthenticated: !!userInfo, startSession, logout }),
    [userInfo, startSession, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
