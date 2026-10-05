// DEVELOPMENT ONLY. Fictional clients and tours. Dates are relative to today so the dashboard always looks current.
import dayjs from "dayjs";
import { mockDelay } from "./utils";
import type { DashboardSummary } from "@/types/dashboard";

const fromToday = (days: number) => dayjs().add(days, "day").format("YYYY-MM-DD");

export const getMockDashboardSummary = async (): Promise<DashboardSummary> => {
  await mockDelay();
  return {
    stats: {
      activePackages: 18,
      pendingQuotations: 7,
      departuresThisMonth: 5,
      quotedValueThisMonth: 4_850_000,
    },
    upcomingTours: [
      { ref: "ST-0142", clientName: "Sophie Laurent", tourType: "Cultural", startDate: fromToday(3), endDate: fromToday(10), pax: 2, status: "confirmed" },
      { ref: "ST-0145", clientName: "Mehta family", tourType: "Beach & leisure", startDate: fromToday(6), endDate: fromToday(13), pax: 4, status: "awaitingPayment" },
      { ref: "ST-0149", clientName: "Daniel Okafor", tourType: "Wildlife", startDate: fromToday(11), endDate: fromToday(16), pax: 3, status: "quoted" },
      { ref: "ST-0151", clientName: "Hannah Weber", tourType: "Hill country", startDate: fromToday(19), endDate: fromToday(25), pax: 2, status: "draft" },
      { ref: "ST-0153", clientName: "Kenji Tanaka", tourType: "Cultural", startDate: fromToday(24), endDate: fromToday(32), pax: 5, status: "confirmed" },
    ],
    quotationsAwaitingResponse: [
      { ref: "ST-0155", clientName: "Olivia Bennett", nights: 7, sentDate: fromToday(-2), amount: 3_480, currency: "USD" },
      { ref: "ST-0156", clientName: "Perera & Sons Ltd", nights: 4, sentDate: fromToday(-3), amount: 685_000, currency: "LKR" },
      { ref: "ST-0158", clientName: "Lucas Moreau", nights: 10, sentDate: fromToday(-5), amount: 5_120, currency: "USD" },
    ],
    nextDeparture: {
      ref: "ST-0142",
      clientName: "Sophie Laurent",
      pax: 2,
      startDate: fromToday(3),
      days: [
        { dayNumber: 1, place: "Arrival – Colombo / Negombo", activity: "Airport pickup", hotelName: "Jetwing Lagoon" },
        { dayNumber: 2, place: "Sigiriya", activity: "Rock fortress visit", hotelName: "Aliya Resort & Spa" },
        { dayNumber: 3, place: "Kandy", activity: "Temple of the Tooth", hotelName: "Earl's Regency" },
        { dayNumber: 4, place: "Nuwara Eliya", activity: "Tea estate tour", hotelName: "Heritance Tea Factory" },
      ],
    },
  };
};
