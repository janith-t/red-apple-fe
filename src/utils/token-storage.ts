// The only module that touches Web Storage for auth. Swap the strategy here (e.g. httpOnly cookie) without touching callers.
// "Keep me signed in" → localStorage (survives browser restart); otherwise sessionStorage (cleared when the tab closes).
const TOKEN_KEY = "ra.authToken";

const safely = <T>(fn: () => T, fallback: T): T => {
  try {
    return fn();
  } catch {
    return fallback;
  }
};

export const tokenStorage = {
  get(): string | null {
    return safely(() => localStorage.getItem(TOKEN_KEY) ?? sessionStorage.getItem(TOKEN_KEY), null);
  },
  set(token: string, persist: boolean): void {
    tokenStorage.clear();
    safely(() => (persist ? localStorage : sessionStorage).setItem(TOKEN_KEY, token), undefined);
  },
  clear(): void {
    safely(() => {
      localStorage.removeItem(TOKEN_KEY);
      sessionStorage.removeItem(TOKEN_KEY);
    }, undefined);
  },
  key: TOKEN_KEY,
};
