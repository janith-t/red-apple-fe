import { Center, Group, Stack, Text } from "@mantine/core";
import BrandMark from "./brand/BrandMark";
import { SERENE_ICON, SERENE_WORDMARK, TRAVELS_WORDMARK } from "./brand/paths";
import { tokens } from "@/utils/theme";

interface BrandLogoProps {
  /** "onBrand" = white tile on the red brand panel; "default" = red tile on white surfaces. */
  variant?: "default" | "onBrand";
  size?: "md" | "lg";
  /** Text under SERENE (e.g. "Agent portal"). Omit to show the logo's own TRAVELS lettering. */
  subtitle?: string;
}

// Icon fits the same box as the previous logo mark; wordmark height matches the previous name text.
const SIZES = {
  md: { tile: 38, radius: 10, icon: 22, wordmark: 12, travels: 7, subtitle: 12, gap: 10 },
  lg: { tile: 44, radius: 12, icon: 26, wordmark: 15, travels: 8.5, subtitle: 13, gap: 12 },
} as const;

export default function BrandLogo({ variant = "default", size = "md", subtitle }: BrandLogoProps) {
  const s = SIZES[size];
  const onBrand = variant === "onBrand";

  return (
    <Group gap={s.gap} wrap="nowrap">
      <Center
        w={s.tile}
        h={s.tile}
        bg={onBrand ? "white" : "appleRed.6"}
        c={onBrand ? "appleRed.6" : "white"}
        style={{ borderRadius: s.radius, flexShrink: 0 }}
      >
        <BrandMark shape={SERENE_ICON} height={s.icon} />
      </Center>
      <Stack gap={subtitle ? 4 : 5} c={onBrand ? "white" : tokens.textPrimary}>
        <BrandMark shape={SERENE_WORDMARK} height={s.wordmark} label="Serene Travels" />
        {subtitle ? (
          <Text
            component="span"
            fz={s.subtitle}
            lh={1.2}
            c={onBrand ? "white" : tokens.textMuted}
            style={onBrand ? { opacity: 0.9 } : undefined}
          >
            {subtitle}
          </Text>
        ) : (
          <BrandMark shape={TRAVELS_WORDMARK} height={s.travels} />
        )}
      </Stack>
    </Group>
  );
}
