import { AppShell, Burger, Group, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Outlet } from "react-router";
import BrandLogo from "@/components/ui/BrandLogo";
import Sidebar from "@/components/ui-interfaces/common/Sidebar";
import TopBar from "@/components/ui-interfaces/common/TopBar";
import { tokens } from "@/utils/theme";

const NAVBAR_WIDTH = 248;

// Authenticated shell: sidebar + top bar + routed page. Below md the sidebar becomes a drawer behind a burger.
export default function App() {
  const [navOpened, { toggle: toggleNav, close: closeNav }] = useDisclosure(false);

  return (
    <AppShell
      header={{ height: { base: 60, md: 0 } }}
      navbar={{ width: NAVBAR_WIDTH, breakpoint: "md", collapsed: { mobile: !navOpened } }}
      bg={tokens.pageBg}
    >
      <AppShell.Header hiddenFrom="md" px={16} style={{ borderColor: tokens.border }}>
        <Group h="100%" gap={12} wrap="nowrap">
          <Burger opened={navOpened} onClick={toggleNav} size="sm" aria-label="Toggle navigation" />
          <BrandLogo />
        </Group>
      </AppShell.Header>

      <AppShell.Navbar style={{ borderColor: tokens.border }}>
        <Sidebar onNavigate={closeNav} />
      </AppShell.Navbar>

      <AppShell.Main>
        <Stack gap={24} px={{ base: 16, sm: 32 }} pt={24} pb={48}>
          <TopBar />
          <Outlet />
        </Stack>
      </AppShell.Main>
    </AppShell>
  );
}
