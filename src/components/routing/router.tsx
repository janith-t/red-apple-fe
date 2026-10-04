import { createBrowserRouter } from "react-router";
import App from "@/App";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import NotFound from "./NotFound";
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
    children: [
      {
        index: true,
        lazy: async () => ({ Component: (await import("@/components/ui-interfaces/dashboard")).Dashboard }),
      },
    ],
  },
  { path: "*", element: <NotFound /> },
]);
