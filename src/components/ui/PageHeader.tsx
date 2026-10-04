import type { ReactNode } from "react";
import { Group, Stack, Text, Title } from "@mantine/core";
import { tokens } from "@/utils/theme";

interface PageHeaderProps {
  title: string;
  subtitle?: ReactNode;
  actions?: ReactNode;
}

export default function PageHeader({ title, subtitle, actions }: PageHeaderProps) {
  return (
    <Group justify="space-between" align="flex-end" gap={12} wrap="wrap">
      <Stack gap={4}>
        <Title order={1} fz={28} fw={800} lts="-0.02em">
          {title}
        </Title>
        {subtitle && (
          <Text fz={15} c={tokens.textMuted}>
            {subtitle}
          </Text>
        )}
      </Stack>
      {actions}
    </Group>
  );
}
