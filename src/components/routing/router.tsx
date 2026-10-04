import { createBrowserRouter } from "react-router";
import App from "@/App";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import NotFound from "./NotFound";
import PageLoader from "./PageLoader";
import ComingSoon from "@/components/ui-interfaces/common/ComingSoon";
import Login from "@/components/ui-interfaces/common/Login";
import Register from "@/components/ui-interfaces/common/Register";
import ForgotPassword from "@/components/ui-interfaces/common/ForgotPassword";
import { ROUTES } from "@/constants/routes";

// Modules are lazy-loaded so each one ships as its own chunk. Wrap a module in <PermissionRoute> when it needs one.
export const router = createBrowserRouter([
  {
    path: ROUTES.LOGIN,
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
    errorElement: <NotFound />,
  },
  {
    path: ROUTES.REGISTER,
    element: (
      <PublicRoute>
        <Register />
      </PublicRoute>
    ),
    errorElement: <NotFound />,
  },
  {
    path: ROUTES.FORGOT_PASSWORD,
    element: (
      <PublicRoute>
        <ForgotPassword />
      </PublicRoute>
    ),
    errorElement: <NotFound />,
  },
  {
    path: ROUTES.DASHBOARD,
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    errorElement: <NotFound />,
    hydrateFallbackElement: <PageLoader />,
    children: [
      {
        index: true,
        lazy: async () => ({ Component: (await import("@/components/ui-interfaces/dashboard")).Dashboard }),
      },
      // Placeholders until each module's requirements arrive.
      { path: ROUTES.PLAN_TOUR, element: <ComingSoon title="Plan Tour" /> },
      { path: ROUTES.PACKAGES, element: <ComingSoon title="My Packages" /> },
      { path: ROUTES.PACKAGE_DETAIL, element: <ComingSoon title="Package details" /> },
      { path: ROUTES.QUOTATIONS, element: <ComingSoon title="Quotations" /> },
      { path: ROUTES.REPORTS, element: <ComingSoon title="Reports" /> },
      { path: ROUTES.INFO, element: <ComingSoon title="Info" /> },
    ],
  },
  { path: "*", element: <NotFound /> },
]);
