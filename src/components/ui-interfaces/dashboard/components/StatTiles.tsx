import { IconCalendar, IconChartBar, IconFileText, IconPackage } from "@tabler/icons-react";
import StatCard from "@/components/ui/StatCard";
import { formatCompactCurrency, formatCurrency } from "@/utils/format";
import type { DashboardStats } from "@/types/dashboard";

interface StatTilesProps {
  stats?: DashboardStats;
  loading: boolean;
  monthName: string;
}

// Four 1 × 1 tiles. Rendered as a fragment so each card is its own grid cell.
export default function StatTiles({ stats, loading, monthName }: StatTilesProps) {
  return (
    <>
      <StatCard
        label="Active packages"
        value={stats?.activePackages ?? 0}
        caption="Confirmed and in progress"
        icon={IconPackage}
        loading={loading}
      />
      <StatCard
        label="Pending quotations"
        value={stats?.pendingQuotations ?? 0}
        caption="Waiting for client response"
        icon={IconFileText}
        loading={loading}
      />
      <StatCard
        label="Departures this month"
        value={stats?.departuresThisMonth ?? 0}
        caption={`Tours starting in ${monthName}`}
        icon={IconCalendar}
        loading={loading}
      />
      <StatCard
        label="Quoted value"
        value={formatCompactCurrency(stats?.quotedValueThisMonth ?? 0, "LKR")}
        title={formatCurrency(stats?.quotedValueThisMonth ?? 0, "LKR")}
        caption="This month, all quotations"
        icon={IconChartBar}
        loading={loading}
      />
    </>
  );
}
