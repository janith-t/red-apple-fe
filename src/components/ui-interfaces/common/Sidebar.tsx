import { Avatar, Box, Group, NavLink, ScrollArea, Stack, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconLogout } from "@tabler/icons-react";
import { Link, matchPath, useLocation } from "react-router";
import BrandLogo from "@/components/ui/BrandLogo";
import useAuth from "@/hooks/common/useAuth";
import usePermissions from "@/hooks/common/usePermissions";
import { MAIN_NAV } from "@/constants/navigation";
import { ROUTES } from "@/constants/routes";
import { getInitials } from "@/utils/format";
import { tokens } from "@/utils/theme";
import classes from "./Sidebar.module.css";

interface SidebarProps {
  /** Called after a nav link is chosen (closes the mobile drawer). */
  onNavigate?: () => void;
}

export default function Sidebar({ onNavigate }: SidebarProps) {
  const { userInfo, logout } = useAuth();
  const { can } = usePermissions();
  const { pathname } = useLocation();
  const navItems = MAIN_NAV.filter((item) => !item.permission || can(item.permission));
  const displayName = userInfo?.displayName ?? "";

  const confirmSignOut = () =>
    modals.openConfirmModal({
      title: "Sign out?",
      children: <Text fz={14}>You'll need to sign in again to continue planning tours.</Text>,
      labels: { confirm: "Sign out", cancel: "Stay signed in" },
      onConfirm: () => logout(),
    });

  return (
    <Stack h="100%" gap={28} px={16} py={24}>
      <Box px={8} visibleFrom="md">
        <BrandLogo subtitle="Agent portal" />
      </Box>

      <ScrollArea type="never" style={{ flex: 1 }}>
        <Stack component="nav" aria-label="Main" gap={4}>
          {navItems.map(({ label, to, icon: Icon }) => {
            const isActive = !!matchPath({ path: to, end: to === ROUTES.DASHBOARD }, pathname);
            return (
              <NavLink
                key={to}
                component={Link}
                to={to}
                active={isActive}
                aria-current={isActive ? "page" : undefined}
                label={label}
                leftSection={<Icon size={20} stroke={1.8} aria-hidden />}
                classNames={{ root: classes.link, label: classes.linkLabel, section: classes.linkSection }}
                onClick={onNavigate}
              />
            );
          })}
        </Stack>
      </ScrollArea>

      <Stack gap={12} pt={16} style={{ borderTop: `1px solid ${tokens.border}` }}>
        <Group gap={10} px={8} wrap="nowrap">
          <Avatar radius="xl" size={38} color="gray" variant="light" fz={13} fw={700}>
            {getInitials(displayName)}
          </Avatar>
          <Stack gap={0} miw={0}>
            <Text fz={14} fw={600} truncate>
              {displayName}
            </Text>
            {userInfo?.agentId && (
              <Text fz={12} c={tokens.textMuted}>
                Agent ID {userInfo.agentId}
              </Text>
            )}
          </Stack>
        </Group>
        <NavLink
          component="button"
          type="button"
          label="Sign out"
          leftSection={<IconLogout size={20} stroke={1.8} aria-hidden />}
          classNames={{ root: classes.signOut, label: classes.linkLabel, section: classes.linkSection }}
          onClick={confirmSignOut}
        />
      </Stack>
    </Stack>
  );
}
