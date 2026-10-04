import axios from "axios";
import { tokenStorage } from "./token-storage";
import { generateUUID } from "./uuid";
import { showError } from "./notify-utils";

// Endpoints that must never carry a bearer token and whose 401 means "bad credentials", not "session expired".
const PUBLIC_ENDPOINTS = ["/auth/login", "/auth/register", "/auth/forgot-password"];

const isPublicEndpoint = (url?: string) => !!url && PUBLIC_ENDPOINTS.some((endpoint) => url.includes(endpoint));

// Registered by AuthProvider so a 401 logs the user out through React state (and the router), not a page reload.
let unauthorizedHandler: (() => void) | null = null;
export const setUnauthorizedHandler = (handler: (() => void) | null) => {
  unauthorizedHandler = handler;
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL?.trim();

// Without a base URL, requests silently hit the Vite dev server and fail with a generic 404.
// Fail loudly instead so a missing env setup is obvious.
const MISSING_BASE_URL_MESSAGE =
  "VITE_API_BASE_URL is not set. Run `npm run dev` (it loads .env.development) or set it in your env file, then restart the dev server.";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30_000,
  headers: { "Content-Type": "application/json" },
});

// REQUEST: correlation id on every call; bearer token on every non-public call.
apiClient.interceptors.request.use((config) => {
  if (!API_BASE_URL) {
    console.error(MISSING_BASE_URL_MESSAGE);
    throw new Error(MISSING_BASE_URL_MESSAGE);
  }
  config.headers.set("uuid", generateUUID());
  if (!isPublicEndpoint(config.url)) {
    const token = tokenStorage.get();
    if (token) config.headers.set("Authorization", `Bearer ${token}`);
  }
  return config;
});

// RESPONSE: 401 ⇒ session is gone, log out immediately. 403 ⇒ logged in but not allowed, stay put.
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    if (status === 401 && !isPublicEndpoint(error.config?.url)) {
      tokenStorage.clear();
      unauthorizedHandler?.();
    } else if (status === 403) {
      showError("Access denied", error.response?.data?.message || "You don't have permission to perform this action.");
    }
    return Promise.reject(error);
  },
);

export default apiClient;
