import { Skeleton, Stack, Text, Timeline } from "@mantine/core";
import { IconPlaneDeparture } from "@tabler/icons-react";
import { generatePath } from "react-router";
import SectionCard from "@/components/ui/SectionCard";
import EmptyState from "@/components/ui/EmptyState";
import { ROUTES } from "@/constants/routes";
import { tokens } from "@/utils/theme";
import type { DepartureSummary } from "@/types/package";
import classes from "../Dashboard.module.css";

interface NextDepartureProps {
  departure?: DepartureSummary | null;
  loading: boolean;
  className?: string;
}

export default function NextDeparture({ departure, loading, className }: NextDepartureProps) {
  return (
    <SectionCard
      className={className}
      title="Next departure"
      subtitle={departure ? `${departure.ref} · ${departure.clientName} · ${departure.pax} pax` : undefined}
      action={departure ? { label: "Full itinerary", to: generatePath(ROUTES.PACKAGE_DETAIL, { id: departure.ref }) } : undefined}
    >
      {loading ? (
        <Stack gap={12}>
          {[0, 1, 2, 3].map((row) => (
            <Skeleton key={row} h={40} radius="md" />
          ))}
        </Stack>
      ) : !departure ? (
        <EmptyState icon={IconPlaneDeparture} title="No departures scheduled" description="Confirmed tours will appear here." />
      ) : (
        <Timeline
          active={-1}
          bulletSize={12}
          lineWidth={2}
          styles={{
            itemBullet: {
              border: "3px solid var(--mantine-color-appleRed-6)",
              backgroundColor: "white",
            },
          }}
          classNames={{ item: classes.timelineItem }}
          color={tokens.border}
        >
          {departure.days.map((day) => (
            <Timeline.Item key={day.dayNumber}>
              <Text fz={12} fw={700} c={tokens.textMuted} tt="uppercase" lts="0.05em">
                Day {day.dayNumber}
              </Text>
              <Text fz={14} fw={600}>
                {day.place}
              </Text>
              <Text fz={13} c={tokens.textMuted}>
                {day.activity} · {day.hotelName}
              </Text>
            </Timeline.Item>
          ))}
        </Timeline>
      )}
    </SectionCard>
  );
}
