import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/utils/api-request";
import { normalizeError } from "@/utils/error-utils";
import { notificationKeys } from "@/constants/queryKeys";
import { getMockNotifications } from "@/mocks/notifications";
import { isMockApiEnabled } from "@/mocks/utils";
import type { AppNotification } from "@/types/notification";

const POLL_INTERVAL_MS = 60_000;

// GET /notifications (placeholder path). Polls once a minute while the app is open.
const useAllNotifications = () => {
  const query = useQuery({
    queryKey: notificationKeys.list(),
    queryFn: async ({ signal }) => {
      if (isMockApiEnabled) return getMockNotifications();
      const response = await apiRequest<AppNotification[]>({ endpoint: "/notifications", signal });
      return response.payload;
    },
    refetchInterval: POLL_INTERVAL_MS,
  });

  const notifications = query.data ?? [];

  return {
    notifications,
    unreadCount: notifications.filter((notification) => !notification.read).length,
    notificationsLoading: query.isPending,
    notificationsError: query.error ? normalizeError(query.error).message : null,
    refreshNotifications: query.refetch,
  };
};

export default useAllNotifications;
