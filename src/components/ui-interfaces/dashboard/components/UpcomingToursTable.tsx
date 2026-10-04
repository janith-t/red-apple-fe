import { Skeleton, Table, Text } from "@mantine/core";
import { IconCalendarOff } from "@tabler/icons-react";
import SectionCard from "@/components/ui/SectionCard";
import StatusBadge from "@/components/ui/StatusBadge";
import EmptyState from "@/components/ui/EmptyState";
import { ROUTES } from "@/constants/routes";
import { formatDateRange } from "@/utils/format";
import { tokens } from "@/utils/theme";
import type { TourSummary } from "@/types/package";

const COLUMNS = ["Ref", "Client", "Tour type", "Dates", "Pax", "Status"];
const SKELETON_ROWS = 4;

interface UpcomingToursTableProps {
  tours?: TourSummary[];
  loading: boolean;
  className?: string;
}

const cellStyle = { padding: "14px 12px", borderBottom: `1px solid ${tokens.rowDivider}` };

export default function UpcomingToursTable({ tours = [], loading, className }: UpcomingToursTableProps) {
  return (
    <SectionCard
      className={className}
      title="Upcoming tours"
      action={{ label: "View all packages", to: ROUTES.PACKAGES }}
      gap={16}
    >
      {!loading && tours.length === 0 ? (
        <EmptyState icon={IconCalendarOff} title="No upcoming tours" description="Confirmed and quoted tours will show here." />
      ) : (
        <Table.ScrollContainer minWidth={640} type="native">
          <Table fz={14} withRowBorders={false} verticalSpacing={0} horizontalSpacing={0}>
            <Table.Thead>
              <Table.Tr>
                {COLUMNS.map((column) => (
                  <Table.Th
                    key={column}
                    fz={12}
                    fw={600}
                    c={tokens.textMuted}
                    tt="uppercase"
                    lts="0.05em"
                    style={{ padding: "10px 12px", borderBottom: `1px solid ${tokens.border}` }}
                  >
                    {column}
                  </Table.Th>
                ))}
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {loading
                ? Array.from({ length: SKELETON_ROWS }, (_, row) => (
                    <Table.Tr key={row}>
                      {COLUMNS.map((column) => (
                        <Table.Td key={column} style={cellStyle}>
                          <Skeleton h={14} radius="sm" />
                        </Table.Td>
                      ))}
                    </Table.Tr>
                  ))
                : tours.map((tour) => (
                    <Table.Tr key={tour.ref}>
                      <Table.Td style={cellStyle} fw={600}>
                        {tour.ref}
                      </Table.Td>
                      <Table.Td style={cellStyle}>{tour.clientName}</Table.Td>
                      <Table.Td style={cellStyle}>{tour.tourType}</Table.Td>
                      <Table.Td style={cellStyle}>
                        <Text fz={14} c={tokens.textSecondary}>
                          {formatDateRange(tour.startDate, tour.endDate)}
                        </Text>
                      </Table.Td>
                      <Table.Td style={cellStyle}>{tour.pax}</Table.Td>
                      <Table.Td style={cellStyle}>
                        <StatusBadge status={tour.status} />
                      </Table.Td>
                    </Table.Tr>
                  ))}
            </Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      )}
    </SectionCard>
  );
}
