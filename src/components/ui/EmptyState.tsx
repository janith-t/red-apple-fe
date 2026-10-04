import type { ComponentType, ReactNode } from "react";
import { Center, Stack, Text, Title } from "@mantine/core";
import type { IconProps } from "@tabler/icons-react";
import { tokens } from "@/utils/theme";

interface EmptyStateProps {
  icon: ComponentType<IconProps>;
  title: string;
  description?: ReactNode;
  action?: ReactNode;
}

export default function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <Center py={48} px={16}>
      <Stack align="center" gap={10} maw={420} ta="center">
        <Center w={56} h={56} bg={tokens.primaryTint} c="appleRed.6" style={{ borderRadius: 16 }}>
          <Icon size={28} stroke={1.6} aria-hidden />
        </Center>
        <Title order={3} fz={18} fw={700}>
          {title}
        </Title>
        {description && (
          <Text fz={14} c={tokens.textMuted} lh={1.55}>
            {description}
          </Text>
        )}
        {action}
      </Stack>
    </Center>
  );
}
