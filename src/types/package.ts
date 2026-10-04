import type { Currency } from "./common";

// Lifecycle of a tour package. Values must match the backend once the API contract exists.
export type PackageStatus = "draft" | "quoted" | "awaitingPayment" | "confirmed";

export interface TourSummary {
  ref: string; // e.g. "RA-0001"
  clientName: string;
  tourType: string;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  pax: number;
  status: PackageStatus;
}

export interface QuotationSummary {
  ref: string;
  clientName: string;
  nights: number;
  sentDate: string; // YYYY-MM-DD
  amount: number;
  currency: Currency;
}

export interface ItineraryDay {
  dayNumber: number;
  place: string;
  activity: string;
  hotelName: string;
}

export interface DepartureSummary {
  ref: string;
  clientName: string;
  pax: number;
  startDate: string; // YYYY-MM-DD
  days: ItineraryDay[];
}
