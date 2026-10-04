import type { ComponentType } from "react";
import { Center, Group, Skeleton, Text } from "@mantine/core";
import type { IconProps } from "@tabler/icons-react";
import SectionCard from "./SectionCard";
import { tokens } from "@/utils/theme";

interface StatCardProps {
  label: string;
  value: string | number;
  caption: string;
  icon: ComponentType<IconProps>;
  loading?: boolean;
  /** Full value for screen readers / hover when `value` is abbreviated. */
  title?: string;
}

export default function StatCard({ label, value, caption, icon: Icon, loading, title }: StatCardProps) {
  return (
    <SectionCard>
      <Group justify="space-between" align="center" wrap="nowrap">
        <Text fz={14} fw={600} c={tokens.textMuted}>
          {label}
        </Text>
        <Center w={36} h={36} bg={tokens.primaryTint} c="appleRed.6" style={{ borderRadius: 10, flexShrink: 0 }}>
          <Icon size={18} stroke={1.8} aria-hidden />
        </Center>
      </Group>
      {loading ? (
        <Skeleton h={40} w="60%" radius="md" />
      ) : (
        <Text fz={34} fw={800} lts="-0.02em" lh={1.2} title={title} style={{ overflowWrap: "anywhere" }}>
          {value}
        </Text>
      )}
      <Text fz={13} c={tokens.textMuted}>
        {caption}
      </Text>
    </SectionCard>
  );
}
