import { createTheme, type MantineColorsTuple } from "@mantine/core";

// Approximate scale built around the brand apple red #C41E3A (index 6).
// Regenerate (mantine.dev/colors-generator) once the client confirms the exact brand hex.
const appleRed: MantineColorsTuple = [
  "#FDECEF",
  "#F9D4DA",
  "#F1A8B4",
  "#E9798B",
  "#E25269",
  "#DD3A53",
  "#C41E3A",
  "#A3172F",
  "#851226",
  "#690D1D",
];

const FONT_STACK = "'Plus Jakarta Sans Variable', 'Plus Jakarta Sans', 'Segoe UI', system-ui, sans-serif";

// Design tokens from the project brief that Mantine has no slot for.
export const tokens = {
  pageBg: "#F6F7F9",
  surface: "#FFFFFF",
  border: "#E4E6EA",
  inputBorder: "#D3D7DD",
  rowDivider: "#F0F1F4",
  textPrimary: "#1D2025",
  textSecondary: "#3A3F47",
  textMuted: "#5A606B",
  placeholder: "#8A9099",
  primaryTint: "#FCEBEE",
  status: {
    confirmed: { bg: "#E6F4EC", fg: "#1A6B45" },
    quoted: { bg: "#E8F0FB", fg: "#1F55A0" },
    awaitingPayment: { bg: "#FFF4DB", fg: "#7A5000" },
    draft: { bg: "#EEF0F3", fg: "#3A3F47" },
  },
} as const;

export const theme = createTheme({
  primaryColor: "appleRed",
  primaryShade: 6,
  colors: { appleRed },
  black: tokens.textPrimary,
  fontFamily: FONT_STACK,
  headings: { fontFamily: FONT_STACK, fontWeight: "800" },
  defaultRadius: "md",
  radius: { md: "10px", lg: "18px" },
  cursorType: "pointer",
  other: tokens,
});
