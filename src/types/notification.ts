export interface AppNotification {
  id: string;
  title: string;
  message: string;
  createdAt: string; // ISO date-time
  read: boolean;
}
