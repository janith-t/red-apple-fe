// DEVELOPMENT ONLY. Used while VITE_USE_MOCK_AUTH=true and no backend exists.
// Builds an unsigned JWT-shaped token so the real decode/expiry/permission code paths are exercised.
import type { LoginRequest } from "@/types/auth";
import { ROLES } from "@/constants/permissions";

const MOCK_SESSION_HOURS = 8;
const MOCK_LATENCY_MS = 600;

const base64Url = (value: object) =>
  btoa(String.fromCharCode(...new TextEncoder().encode(JSON.stringify(value))))
    .replace(/=+$/, "").replace(/\+/g, "-").replace(/\//g, "_");

export const isMockAuthEnabled = import.meta.env.VITE_USE_MOCK_AUTH === "true";

export const createMockToken = async ({ username }: LoginRequest): Promise<string> => {
  await new Promise((resolve) => setTimeout(resolve, MOCK_LATENCY_MS));
  const now = Math.floor(Date.now() / 1000);
  const header = base64Url({ alg: "none", typ: "JWT" });
  const payload = base64Url({
    sub: username,
    name: "Demo Agent",
    agentId: "AG-0001",
    roles: [ROLES.AGENT],
    permissions: [],
    iat: now,
    exp: now + MOCK_SESSION_HOURS * 60 * 60,
  });
  return `${header}.${payload}.mock`;
};
