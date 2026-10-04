// PLACEHOLDER shell – replaced by the AppShell (sidebar + top bar) from the dashboard mockup in step D.
import { AppShell, Button, Group, Text } from "@mantine/core";
import { Outlet } from "react-router";
import useAuth from "@/hooks/common/useAuth";
import { tokens } from "@/utils/theme";

export default function App() {
  const { userInfo, logout } = useAuth();

  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header px="md">
        <Group h="100%" justify="space-between">
          <Text fw={800} c="appleRed">
            Red Apple
          </Text>
          <Group gap="sm">
            <Text size="sm" c="dimmed">
              {userInfo?.displayName}
            </Text>
            <Button variant="default" size="xs" onClick={() => logout()}>
              Sign out
            </Button>
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Main bg={tokens.pageBg}>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
