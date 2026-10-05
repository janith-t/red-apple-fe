import { createTheme, type CSSVariablesResolver, type MantineColorsTuple } from "@mantine/core";

// Approximate scale built around the brand red #C41E3A (index 6).
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

// Design tokens Mantine has no slot for, with a value per colour scheme.
// Light values come from the project brief; dark values follow Mantine's dark palette.
const TOKEN_VALUES = {
  pageBg: { light: "#F6F7F9", dark: "#1A1A1A" },
  surface: { light: "#FFFFFF", dark: "#242424" },
  border: { light: "#E4E6EA", dark: "#383838" },
  inputBorder: { light: "#D3D7DD", dark: "#4A4A4A" },
  rowDivider: { light: "#F0F1F4", dark: "#2E2E2E" },
  textPrimary: { light: "#1D2025", dark: "#E6E6E6" },
  textSecondary: { light: "#3A3F47", dark: "#C9C9C9" },
  textMuted: { light: "#5A606B", dark: "#A3A3A3" },
  placeholder: { light: "#8A9099", dark: "#7A7A7A" },
  // Brand red on light surfaces; a lighter shade in dark mode so text and icons keep enough contrast.
  primaryTint: { light: "#FCEBEE", dark: "rgba(196, 30, 58, 0.22)" },
  brandText: { light: "#C41E3A", dark: "#E9798B" },
  link: { light: "#A3172F", dark: "#F1A8B4" },
  linkHover: { light: "#851226", dark: "#F9D4DA" },
  // Package status badges (never red – red is the brand colour).
  statusConfirmedBg: { light: "#E6F4EC", dark: "rgba(46, 160, 103, 0.22)" },
  statusConfirmedFg: { light: "#1A6B45", dark: "#7DD9A9" },
  statusQuotedBg: { light: "#E8F0FB", dark: "rgba(62, 130, 220, 0.24)" },
  statusQuotedFg: { light: "#1F55A0", dark: "#9DC2F5" },
  statusAwaitingPaymentBg: { light: "#FFF4DB", dark: "rgba(214, 150, 20, 0.24)" },
  statusAwaitingPaymentFg: { light: "#7A5000", dark: "#F2CB74" },
  statusDraftBg: { light: "#EEF0F3", dark: "#383838" },
  statusDraftFg: { light: "#3A3F47", dark: "#C9C9C9" },
} as const;

type TokenName = keyof typeof TOKEN_VALUES;

const cssVarName = (name: string) => `--app-${name.replace(/[A-Z]/g, (char) => `-${char.toLowerCase()}`)}`;

// Components use these (e.g. bg={tokens.surface}); each resolves to a CSS variable that flips with the colour scheme.
export const tokens = Object.fromEntries(
  Object.keys(TOKEN_VALUES).map((name) => [name, `var(${cssVarName(name)})`]),
) as Record<TokenName, string>;

const variablesFor = (scheme: "light" | "dark") =>
  Object.fromEntries(Object.entries(TOKEN_VALUES).map(([name, value]) => [cssVarName(name), value[scheme]]));

// Registered on MantineProvider; Mantine writes the light/dark sets under [data-mantine-color-scheme].
export const cssVariablesResolver: CSSVariablesResolver = () => ({
  variables: {},
  light: variablesFor("light"),
  // Default body text in dark mode matches textPrimary (Mantine's default is a little dimmer).
  dark: { ...variablesFor("dark"), "--mantine-color-text": TOKEN_VALUES.textPrimary.dark },
});

export const theme = createTheme({
  primaryColor: "appleRed",
  primaryShade: 6,
  colors: { appleRed },
  black: TOKEN_VALUES.textPrimary.light,
  fontFamily: FONT_STACK,
  headings: { fontFamily: FONT_STACK, fontWeight: "800" },
  defaultRadius: "md",
  radius: { md: "10px", lg: "18px" },
  cursorType: "pointer",
  other: tokens,
});
