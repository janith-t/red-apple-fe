# red-apple-fe

Agent portal for **Red Apple Travel & Holidays Lanka (Pvt) Ltd** — plan tours, build itineraries, price them and send quotations to clients.

React · TypeScript · Vite · Mantine

---

## 1. Business domain

An internal, login-protected **agent system**. Travel agents use it to plan tours across Sri Lanka, price them and send quotations to their clients. It is not a public marketing site.

**Current phase:** frontend first; the backend and API contract are not decided yet, so the app runs on mock data (see [Mock mode](#mock-mode)). Requirements are awaiting client confirmation and may change.

### Modules

| # | Module | Status |
|---|---|---|
| 1 | Agent registration / login / forgot password | ✅ Built (mock auth) |
| – | Dashboard | ✅ Built (mock data) |
| 2 | **Plan Tour** wizard – tour type, nationality, dates, flight info, pax, destinations | ⏳ Placeholder |
| 3 | Accommodation | ⏳ |
| 4 | Meals | ⏳ |
| 5 | Transport | ⏳ |
| 6 | Guide | ⏳ |
| 7 | Activities & entry fees | ⏳ |
| 8 | Itinerary | ⏳ |
| 9 | Quotation / Bill (LKR / USD) | ⏳ Placeholder |
| 10 | My Packages | ⏳ Placeholder |
| 11 | Info | ⏳ Placeholder |
| 12 | Reports & outputs | ⏳ Placeholder |

**Package lifecycle:** `Draft → Quoted → Awaiting payment → Confirmed`. Reference format: `RA-0001`.

---

## 2. Getting started

**Requirements:** Node.js `^20.19` or `>=22.12`, npm.

```bash
npm install
cp .env.example .env
npm run dev          # http://localhost:5173
```

| Script | What it does |
|---|---|
| `npm run dev` | Start the Vite dev server with hot reload |
| `npm run build` | Type-check (`tsc -b`) and build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint |

### Environment variables

| Variable | Purpose |
|---|---|
| `VITE_API_BASE_URL` | Base URL of the backend REST API |
| `VITE_USE_MOCK_AUTH` | `true` = sign in without a backend (any credentials work) |
| `VITE_USE_MOCK_API` | `true` = data hooks return mock data instead of calling the API |

### Mock mode

Until the backend exists, both mock flags are `true`. Mock login builds a JWT-shaped token locally, so the real decode / expiry / permission code paths still run. Mock data lives in `src/mocks/` and uses dates relative to today. Turning a flag off switches the hooks to the real API — no component changes needed.

---

## 3. Tech stack — what we use and why

### Core

| Library | Used for |
|---|---|
| **React 19** | UI library |
| **TypeScript 6** (strict) | Type safety across the codebase |
| **Vite 8** + `@vitejs/plugin-react` | Dev server, hot reload and production bundling |
| **React Router 8** (`react-router`) | URL routing, route guards, lazy-loaded modules |

### UI

| Library | Used for |
|---|---|
| **@mantine/core** | Component library and theme (inputs, buttons, AppShell, tables, badges, timeline…) |
| **@mantine/hooks** | Utility hooks (`useDisclosure`, media queries…) |
| **@mantine/form** | Form state and validation (with Zod via `schemaResolver`) |
| **@mantine/dates** + **dayjs** | Date pickers (tour date ranges, flight times) and date formatting |
| **@mantine/notifications** | Toast notifications (`utils/notify-utils.ts`) |
| **@mantine/modals** | Confirmation dialogs (e.g. sign out) |
| **@mantine/charts** + **recharts** | Charts for dashboard and reports |
| **@tabler/icons-react** | Icon set (Mantine's default) |
| **@fontsource-variable/plus-jakarta-sans** | Brand font, self-hosted (no Google Fonts request) |

### Data & security

| Library | Used for |
|---|---|
| **@tanstack/react-query** | Server state: fetching, caching, refetching, mutations |
| **axios** | HTTP client with interceptors (auth header, request id, 401/403 handling) |
| **jwt-decode** | Reading JWT claims (user, roles, permissions, expiry) for the UI — no signature check client-side |
| **zod** | Form validation schemas |

### Tooling

| Tool | Used for |
|---|---|
| **ESLint 10** + `typescript-eslint`, `react-hooks`, `react-refresh` | Linting (`no-console` warns, `_`-prefixed unused vars allowed) |
| **PostCSS** + `postcss-preset-mantine`, `postcss-simple-vars` | Mantine's CSS helpers and breakpoint variables in CSS modules |

---

## 4. Architecture

### 4.1 Layering

```
Component ──► domain hook (useQuery / useMutation) ──► apiRequest() ──► apiClient (Axios + interceptors) ──► REST API
                    └── mock branch (src/mocks) when VITE_USE_MOCK_API / VITE_USE_MOCK_AUTH is true
```

Components never call Axios directly. Only domain hooks and `usePdf` touch the API layer.

### 4.2 Folder structure

```
src/
├─ main.tsx                     ← entry: global styles, providers, router
├─ App.tsx                      ← authenticated shell: AppShell (sidebar + top bar) + <Outlet/>
├─ components/
│  ├─ routing/                  ← router.tsx, ProtectedRoute, PublicRoute, PermissionRoute,
│  │                              NotFound, AccessDenied, PageLoader
│  ├─ ui/                       ← business-neutral building blocks: BrandLogo, Can, SectionCard,
│  │                              StatCard, StatusBadge, PageHeader, EmptyState
│  └─ ui-interfaces/            ← screens, one folder per module
│     ├─ common/                (Login, Register, ForgotPassword, Sidebar, TopBar, ComingSoon…)
│     └─ dashboard/             (Dashboard.tsx, index.ts barrel, components/*, hooks/*)
├─ providers/                   ← AppProviders (Mantine, Modals, Notifications, Query, Auth), AuthProvider
├─ hooks/
│  ├─ common/                   (useAuth, usePermissions, usePdf)
│  └─ <domain>/                 ← one hook per backend operation (auth/, dashboard/, notifications/…)
├─ types/                       ← one file per domain (api, apiError, auth, package, dashboard…)
├─ constants/                   ← routes, permissions, queryKeys, navigation, formDefaults,
│                                 selectOptions, packageStatus, contact
├─ mocks/                       ← development-only mock responses
└─ utils/                       ← api-client, api-request, token-storage, token-utils, error-utils,
                                  notify-utils, query-client, format, theme, uuid
```

**Organisation rules**

1. Split by responsibility first (`components`, `hooks`, `types`, `constants`, `utils`), then by business domain.
2. One hook per backend operation; file name == hook name; `export default`.
3. One component file per screen or dialog. A module folder has a container, a table, and one dialog per action.
4. `types/<domain>.ts` mirrors `hooks/<domain>/`.
5. Feature-private hooks and components may live inside the feature folder (e.g. `dashboard/hooks/useGreeting.ts`).
6. Naming: components `PascalCase.tsx`, hooks `useCamelCase.ts`, utils `kebab-case.ts`, CSS modules `Name.module.css`.
7. Import from `src` with the `@/` alias.

### 4.3 Routing

React Router data router (`createBrowserRouter`) in `components/routing/router.tsx`. Every page has its own URL, so back/forward, refresh and deep links work.

| Path | Guard | Element |
|---|---|---|
| `/login`, `/register`, `/forgot-password` | `PublicRoute` | Auth pages (split layout) |
| `/` | `ProtectedRoute` | `App` shell → `Dashboard` (lazy-loaded) |
| `/plan-tour`, `/packages`, `/packages/:id`, `/quotations`, `/reports`, `/info` | `ProtectedRoute` (+ `PermissionRoute` where needed) | Modules (placeholders for now) |
| `*` | – | `NotFound` |

- `ProtectedRoute` remembers where the user was going; after login they are sent back there.
- `PermissionRoute` shows `AccessDenied` when the user lacks the role/permission.
- All paths live in `constants/routes.ts` — never hard-code URLs.

### 4.4 Authentication & security

- **Login** → `POST /auth/login` returns a JWT → `AuthProvider.startSession()` stores it via `token-storage.ts`.
  - "Keep me signed in" → `localStorage`; otherwise `sessionStorage` (cleared when the tab closes).
  - `token-storage.ts` is the only file that touches storage, so the strategy (e.g. httpOnly cookie) can change in one place.
- **Session state** is always derived from the token (`token-utils.ts`), never stored separately. `AuthProvider` logs out automatically at token expiry and keeps browser tabs in sync.
- **Axios interceptors** (`utils/api-client.ts`):
  - add `Authorization: Bearer <token>` and a `uuid` request-correlation header to every call (except public auth endpoints);
  - **401** → session cleared, user returned to `/login` via React state (no page reload);
  - **403** → "Access denied" notification, user stays signed in.
- **Permissions:** JWT claims `roles[]` / `permissions[]`. `ADMIN` bypasses all checks; otherwise the exact permission string is required (`<module>_<action>_access`, defined in `constants/permissions.ts`). Use `<Can permission="…">` or `usePermissions()`; disallowed controls are **hidden**, not disabled.
- Client-side checks are for UX only — **the backend must authorise every request.**
- Auth pages never reveal whether an account exists (generic login error, neutral forgot-password confirmation).

### 4.5 Data fetching & hooks

Domain hooks wrap TanStack Query and return **domain-prefixed** values so several hooks can be used in one component:

```ts
const { dashboardSummary, dashboardSummaryLoading, dashboardSummaryError, refreshDashboardSummary } = useDashboardSummary();
const { login, loginLoading, loginError, reset } = useLogin();
```

| Hook type | Naming | Built on |
|---|---|---|
| List | `useAll<Entities>` | `useQuery` |
| By id | `use<Entity>ById` | `useQuery` |
| Mutation | `useCreate<Entity>`, `useUpdate…`, `useCancel…` | `useMutation` + invalidate query keys |
| Composite / feature-private | e.g. `useGreeting` | local to the feature |

- Query keys come from factories in `constants/queryKeys.ts`.
- Errors are turned into one shape by `normalizeError()`; server validation errors (`[{ field, error }]`) map straight onto Mantine form fields with `form.setErrors()`.
- Backend envelope expected: `{ payload, message, status }`.

### 4.6 Types & constants

- One types file per domain; `import type { … }` (required by `verbatimModuleSyntax`).
- No `enum`s (`erasableSyntaxOnly`) — use string-literal unions and `as const` objects.
- Constants are `UPPER_SNAKE_CASE`; form initial values (`INITIAL_*_FORM`) and select options live in `constants/`, not in components.

### 4.7 UI & theme

- Mantine theme in `utils/theme.ts`: brand **apple red `#C41E3A`** (`appleRed` scale), Plus Jakarta Sans, radius 10px (inputs/buttons) and 18px (cards).
- Extra design tokens (page background, borders, text shades) are exported as `tokens`.
- Status colours never use red (red = brand): Confirmed (green), Quoted (blue), Awaiting payment (amber), Draft (grey) — `constants/packageStatus.ts`.
- Design direction: functional minimalism; bento grid on the dashboard only; travel imagery only on auth screens, empty states, itinerary cards and PDFs.
- Touch targets ≥ 44px, real `<button>`/`<a>` elements, labelled inputs.
- Dashboard grid uses a CSS container query: 4 / 2 / 1 columns depending on the space beside the sidebar.

---

## 5. Adding a new module

1. **Types** — `src/types/<domain>.ts`.
2. **Mock** — `src/mocks/<domain>.ts` (while there's no backend).
3. **Query keys** — add a factory to `constants/queryKeys.ts`.
4. **Hooks** — `src/hooks/<domain>/useAll…`, `use…ById`, `useCreate…`, etc.
5. **Permissions** — add a `<MODULE>_PERMISSIONS` group to `constants/permissions.ts` (must match backend strings).
6. **Screens** — `src/components/ui-interfaces/<module>/` (container, table, dialogs).
7. **Route** — replace the `ComingSoon` route in `router.tsx` (lazy-load it; wrap in `PermissionRoute` if needed).
8. **Nav** — update `constants/navigation.ts` if the module needs a sidebar entry.
9. Run `npm run lint` and `npm run build`.

---

## 6. Open items

- Client confirmation of the requirements document.
- Brand red hex and logo files from the client.
- Real support email and hotline (`constants/contact.ts` holds mock values).
- Backend stack and API contract: endpoints, response envelope, JWT claim names, permission strings.
- Currencies beyond LKR / USD and whether quotations need conversion.
- Split the main JS bundle (Mantine) into a separately cached vendor chunk.
