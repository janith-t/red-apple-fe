import type { ComponentType } from "react";
import {
  IconChartBar,
  IconFileText,
  IconInfoCircle,
  IconLayoutDashboard,
  IconMapPin,
  IconPackage,
  type IconProps,
} from "@tabler/icons-react";
import { ROUTES } from "./routes";
import type { Permission } from "./permissions";

export interface NavItem {
  label: string;
  to: string;
  icon: ComponentType<IconProps>;
  /** Hide the item unless the user has this permission (ADMIN always sees it). */
  permission?: Permission;
}

// Sidebar order (dashboard mockup).
export const MAIN_NAV: NavItem[] = [
  { label: "Dashboard", to: ROUTES.DASHBOARD, icon: IconLayoutDashboard },
  { label: "Plan Tour", to: ROUTES.PLAN_TOUR, icon: IconMapPin },
  { label: "My Packages", to: ROUTES.PACKAGES, icon: IconPackage },
  { label: "Quotations", to: ROUTES.QUOTATIONS, icon: IconFileText },
  { label: "Reports", to: ROUTES.REPORTS, icon: IconChartBar },
  { label: "Info", to: ROUTES.INFO, icon: IconInfoCircle },
];
