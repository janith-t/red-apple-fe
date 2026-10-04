import type { Currency, SelectOption } from "@/types/common";

// Plain { label, value } arrays plug straight into Mantine Select / MultiSelect `data`.
export const CURRENCY_OPTIONS: SelectOption<Currency>[] = [
  { label: "LKR – Sri Lankan Rupee", value: "LKR" },
  { label: "USD – US Dollar", value: "USD" },
];
