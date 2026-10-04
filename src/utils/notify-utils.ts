import { notifications } from "@mantine/notifications";

// Thin wrappers so call sites stay one line and styling stays consistent.
// Error notifications use Mantine's red, which is visibly different from the brand apple red.
export const showSuccess = (title: string, message?: string) =>
  notifications.show({ title, message, color: "green" });

export const showError = (title: string, message?: string) =>
  notifications.show({ title, message, color: "red", autoClose: 6000 });

export const showWarning = (title: string, message?: string) =>
  notifications.show({ title, message, color: "yellow" });

export const showInfo = (title: string, message?: string) =>
  notifications.show({ title, message, color: "blue" });
