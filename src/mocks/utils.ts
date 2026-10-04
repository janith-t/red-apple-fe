// DEVELOPMENT ONLY helpers for mock responses while no backend exists.
const MOCK_LATENCY_MS = 600;

// true = data hooks return mock data instead of calling the API.
export const isMockApiEnabled = import.meta.env.VITE_USE_MOCK_API === "true";

export const mockDelay = (ms = MOCK_LATENCY_MS) => new Promise((resolve) => setTimeout(resolve, ms));
