import type { ReactNode } from "react";
import { Anchor, Box, Group, Stack, Text, Title, type BoxProps } from "@mantine/core";
import { Link } from "react-router";
import { tokens } from "@/utils/theme";

interface SectionCardProps extends BoxProps {
  title?: string;
  subtitle?: ReactNode;
  /** Optional "View all"-style link in the header. */
  action?: { label: string; to: string };
  gap?: number;
  children: ReactNode;
}

// White bento tile: 18px radius, 1px border, 22px padding (dashboard mockup).
export default function SectionCard({ title, subtitle, action, gap = 14, children, ...boxProps }: SectionCardProps) {
  return (
    <Box
      component="section"
      bg={tokens.surface}
      p={22}
      miw={0}
      style={{ border: `1px solid ${tokens.border}`, borderRadius: 18, display: "flex", flexDirection: "column", gap }}
      {...boxProps}
    >
      {(title || action) && (
        <Group justify="space-between" align="center" gap={12} wrap="wrap">
          <Stack gap={2}>
            {title && (
              <Title order={2} fz={18} fw={700}>
                {title}
              </Title>
            )}
            {subtitle && (
              <Text fz={13} c={tokens.textMuted}>
                {subtitle}
              </Text>
            )}
          </Stack>
          {action && (
            <Anchor component={Link} to={action.to} fz={14} fw={600} c="appleRed.7" underline="hover">
              {action.label}
            </Anchor>
          )}
        </Group>
      )}
      {children}
    </Box>
  );
}
