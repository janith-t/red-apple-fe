import dayjs from "dayjs";
import type { Currency } from "@/types/common";

const NBSP = String.fromCharCode(160);

const currencyFormatters: Record<Currency, Intl.NumberFormat> = {
  LKR: new Intl.NumberFormat("en-US", { style: "currency", currency: "LKR", currencyDisplay: "code" }),
  USD: new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", currencyDisplay: "code" }),
};

// "LKR 1,250,000.00" / "USD 3,400.00" (Intl inserts a non-breaking space; normalised to a normal space)
export const formatCurrency = (amount: number, currency: Currency = "LKR"): string =>
  currencyFormatters[currency].format(amount).replaceAll(NBSP, " ");

export const formatDate = (value: string | Date, pattern = "DD MMM YYYY"): string => dayjs(value).format(pattern);

export const formatDateRange = (start: string | Date, end: string | Date): string => {
  const from = dayjs(start);
  const to = dayjs(end);
  return from.isSame(to, "year")
    ? `${from.format("DD MMM")} – ${to.format("DD MMM YYYY")}`
    : `${from.format("DD MMM YYYY")} – ${to.format("DD MMM YYYY")}`;
};

// Date-only values are sent to the backend as "YYYY-MM-DD" in local time (avoids the UTC off-by-one of toISOString()).
export const toApiDate = (value: string | Date): string => dayjs(value).format("YYYY-MM-DD");
