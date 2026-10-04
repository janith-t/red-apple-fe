import { Alert, Box, Button } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";
import PageHeader from "@/components/ui/PageHeader";
import useAuth from "@/hooks/common/useAuth";
import useDashboardSummary from "@/hooks/dashboard/useDashboardSummary";
import useGreeting from "./hooks/useGreeting";
import {
  AwaitingQuotations,
  NextDeparture,
  PlanTourTile,
  QuickActions,
  StatTiles,
  UpcomingToursTable,
} from "./components";
import classes from "./Dashboard.module.css";

export default function Dashboard() {
  const { userInfo } = useAuth();
  const { greeting, todayLabel, now } = useGreeting();
  const { dashboardSummary, dashboardSummaryLoading, dashboardSummaryError, refreshDashboardSummary } =
    useDashboardSummary();

  const firstName = userInfo?.displayName.split(" ")[0] ?? "";

  return (
    <>
      <PageHeader
        title={`${greeting}, ${firstName}`}
        subtitle={`${todayLabel} · Here's where your tours and quotations stand.`}
      />

      {dashboardSummaryError && (
        <Alert
          color="red"
          variant="light"
          icon={<IconAlertCircle size={18} />}
          title="Couldn't load your dashboard"
          role="alert"
        >
          {dashboardSummaryError}
          <Button variant="light" color="red" size="xs" mt={10} display="block" onClick={() => refreshDashboardSummary()}>
            Try again
          </Button>
        </Alert>
      )}

      <Box className={classes.wrapper}>
        <Box className={classes.bento}>
          <PlanTourTile className={classes.planTour} />
          <StatTiles
            stats={dashboardSummary?.stats}
            loading={dashboardSummaryLoading}
            monthName={now.format("MMMM")}
          />
          <UpcomingToursTable
            className={classes.span3}
            tours={dashboardSummary?.upcomingTours}
            loading={dashboardSummaryLoading}
          />
          <QuickActions className={classes.span2Narrow} />
          <AwaitingQuotations
            className={classes.span2}
            quotations={dashboardSummary?.quotationsAwaitingResponse}
            loading={dashboardSummaryLoading}
          />
          <NextDeparture
            className={classes.span2}
            departure={dashboardSummary?.nextDeparture}
            loading={dashboardSummaryLoading}
          />
        </Box>
      </Box>
    </>
  );
}
