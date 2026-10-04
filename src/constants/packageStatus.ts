import type { PackageStatus } from "@/types/package";

// Display label + badge colours per status. Colours come from the brief; none of them use the brand red.
export const PACKAGE_STATUS: Record<PackageStatus, { label: string; bg: string; fg: string }> = {
  confirmed: { label: "Confirmed", bg: "#E6F4EC", fg: "#1A6B45" },
  quoted: { label: "Quoted", bg: "#E8F0FB", fg: "#1F55A0" },
  awaitingPayment: { label: "Awaiting payment", bg: "#FFF4DB", fg: "#7A5000" },
  draft: { label: "Draft", bg: "#EEF0F3", fg: "#3A3F47" },
};

// Order of the Plan Tour wizard steps (shown on the dashboard CTA; the wizard will reuse it).
export const PLAN_TOUR_STEPS = [
  "Tour details",
  "Accommodation",
  "Meals",
  "Transport & guide",
  "Activities",
  "Quotation",
] as const;
