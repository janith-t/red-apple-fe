import type { PackageStatus } from "@/types/package";
import { tokens } from "@/utils/theme";

// Display label + badge colours per status (light/dark values live in utils/theme.ts). None use the brand red.
export const PACKAGE_STATUS: Record<PackageStatus, { label: string; bg: string; fg: string }> = {
  confirmed: { label: "Confirmed", bg: tokens.statusConfirmedBg, fg: tokens.statusConfirmedFg },
  quoted: { label: "Quoted", bg: tokens.statusQuotedBg, fg: tokens.statusQuotedFg },
  awaitingPayment: { label: "Awaiting payment", bg: tokens.statusAwaitingPaymentBg, fg: tokens.statusAwaitingPaymentFg },
  draft: { label: "Draft", bg: tokens.statusDraftBg, fg: tokens.statusDraftFg },
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
