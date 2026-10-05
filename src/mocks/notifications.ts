// DEVELOPMENT ONLY.
import dayjs from "dayjs";
import { mockDelay } from "./utils";
import type { AppNotification } from "@/types/notification";

export const getMockNotifications = async (): Promise<AppNotification[]> => {
  await mockDelay(300);
  return [
    {
      id: "n1",
      title: "Quotation accepted",
      message: "Sophie Laurent accepted quotation ST-0142.",
      createdAt: dayjs().subtract(25, "minute").toISOString(),
      read: false,
    },
    {
      id: "n2",
      title: "Payment reminder",
      message: "ST-0145 (Mehta family) is still awaiting payment.",
      createdAt: dayjs().subtract(3, "hour").toISOString(),
      read: false,
    },
    {
      id: "n3",
      title: "Hotel rates updated",
      message: "New rates for Heritance Tea Factory are available.",
      createdAt: dayjs().subtract(1, "day").toISOString(),
      read: true,
    },
  ];
};
