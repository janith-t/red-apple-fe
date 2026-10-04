import type { DepartureSummary, QuotationSummary, TourSummary } from "./package";

export interface DashboardStats {
  activePackages: number;
  pendingQuotations: number;
  departuresThisMonth: number;
  quotedValueThisMonth: number; // LKR
}

export interface DashboardSummary {
  stats: DashboardStats;
  upcomingTours: TourSummary[];
  quotationsAwaitingResponse: QuotationSummary[];
  nextDeparture: DepartureSummary | null;
}
