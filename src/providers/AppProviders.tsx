import type { ReactNode } from "react";
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./AuthProvider";
import { queryClient } from "@/utils/query-client";
import { cssVariablesResolver, theme } from "@/utils/theme";

// Order (outer → inner): Mantine → Modals + Notifications → TanStack Query → Auth. The router is mounted inside.
export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <MantineProvider theme={theme} defaultColorScheme="light" cssVariablesResolver={cssVariablesResolver}>
      <ModalsProvider>
        <Notifications position="top-right" />
        <QueryClientProvider client={queryClient}>
          <AuthProvider>{children}</AuthProvider>
        </QueryClientProvider>
      </ModalsProvider>
    </MantineProvider>
  );
}
