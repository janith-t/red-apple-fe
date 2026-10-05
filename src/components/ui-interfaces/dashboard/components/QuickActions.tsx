import { UnstyledButton, Text } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import { Link } from "react-router";
import SectionCard from "@/components/ui/SectionCard";
import { ROUTES } from "@/constants/routes";
import { tokens } from "@/utils/theme";

// Targets point at the module that will own each action; they open the module's page until it exists.
const QUICK_ACTIONS = [
  { label: "New quotation", to: ROUTES.QUOTATIONS },
  { label: "Add hotel or supplier", to: ROUTES.INFO },
  { label: "Download itinerary PDF", to: ROUTES.PACKAGES },
  { label: "Monthly report", to: ROUTES.REPORTS },
];

export default function QuickActions({ className }: { className?: string }) {
  return (
    <SectionCard className={className} title="Quick actions" gap={12}>
      {QUICK_ACTIONS.map(({ label, to }) => (
        <UnstyledButton
          key={label}
          component={Link}
          to={to}
          mih={48}
          px={14}
          bg={tokens.pageBg}
          style={{ borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "space-between" }}
        >
          <Text fz={14} fw={600}>
            {label}
          </Text>
          <IconChevronRight size={16} stroke={2} style={{ color: tokens.textMuted }} aria-hidden />
        </UnstyledButton>
      ))}
    </SectionCard>
  );
}
