import { Center, Group, Stack, Text } from "@mantine/core";
import AppleMark from "./AppleMark";
import { tokens } from "@/utils/theme";

interface BrandLogoProps {
  /** "onBrand" = white tile on the red brand panel; "default" = red tile on white surfaces. */
  variant?: "default" | "onBrand";
  size?: "md" | "lg";
  subtitle?: string;
}

const SIZES = {
  md: { tile: 38, radius: 10, icon: 22, title: 16, subtitle: 12, gap: 10 },
  lg: { tile: 44, radius: 12, icon: 26, title: 20, subtitle: 13, gap: 12 },
} as const;

export default function BrandLogo({ variant = "default", size = "md", subtitle = "Agent portal" }: BrandLogoProps) {
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
        <AppleMark size={s.icon} />
      </Center>
      <Stack gap={0} style={{ lineHeight: 1.2 }}>
        <Text component="span" fw={800} fz={s.title} lh={1.2} lts="-0.01em" c={onBrand ? "white" : undefined}>
          Red Apple
        </Text>
        <Text
          component="span"
          fz={s.subtitle}
          lh={1.2}
          c={onBrand ? "white" : tokens.textMuted}
          style={onBrand ? { opacity: 0.9 } : undefined}
        >
          {subtitle}
        </Text>
      </Stack>
    </Group>
  );
}
