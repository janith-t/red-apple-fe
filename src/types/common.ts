export type Currency = "LKR" | "USD";

export interface SelectOption<V extends string = string> {
  label: string;
  value: V;
}
