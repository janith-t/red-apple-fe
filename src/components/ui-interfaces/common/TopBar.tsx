import { useState, type FormEvent } from "react";
import {
  ActionIcon,
  Button,
  Divider,
  Group,
  Indicator,
  Loader,
  Popover,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { IconBell, IconPlus, IconSearch } from "@tabler/icons-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Link, useNavigate } from "react-router";
import ColorSchemeToggle from "@/components/ui/ColorSchemeToggle";
import useAllNotifications from "@/hooks/notifications/useAllNotifications";
import { ROUTES } from "@/constants/routes";
import { tokens } from "@/utils/theme";

dayjs.extend(relativeTime);

export default function TopBar() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const { notifications, unreadCount, notificationsLoading } = useAllNotifications();

  // Search lands on My Packages with the query; that page will do the filtering once it exists.
  const handleSearch = (event: FormEvent) => {
    event.preventDefault();
    const term = search.trim();
    if (term) navigate(`${ROUTES.PACKAGES}?q=${encodeURIComponent(term)}`);
  };

  return (
    <Group gap={12} wrap="wrap" align="center">
      <form onSubmit={handleSearch} role="search" style={{ flex: "1 1 280px", maxWidth: 480 }}>
        <TextInput
          type="search"
          aria-label="Search"
          placeholder="Search packages, clients, quotation refs"
          leftSection={<IconSearch size={18} stroke={2} style={{ color: tokens.textMuted }} aria-hidden />}
          leftSectionWidth={42}
          value={search}
          onChange={(event) => setSearch(event.currentTarget.value)}
          styles={{ input: { height: 44, borderColor: tokens.border, fontSize: 14, backgroundColor: tokens.surface } }}
        />
      </form>

      <Group gap={10} ml="auto" wrap="nowrap">
        <ColorSchemeToggle />
        <Popover width={320} position="bottom-end" shadow="md" radius="md">
          <Popover.Target>
            <Indicator color="appleRed.6" size={8} offset={11} disabled={unreadCount === 0} processing={false}>
              <ActionIcon
                variant="default"
                size={44}
                radius="md"
                aria-label={unreadCount ? `Notifications, ${unreadCount} unread` : "Notifications"}
                c={tokens.textSecondary}
                styles={{ root: { borderColor: tokens.border } }}
              >
                <IconBell size={20} stroke={1.8} />
              </ActionIcon>
            </Indicator>
          </Popover.Target>
          <Popover.Dropdown p={0}>
            <Text fz={14} fw={700} px={16} py={12}>
              Notifications
            </Text>
            <Divider color={tokens.border} />
            {notificationsLoading ? (
              <Group justify="center" py={20}>
                <Loader size="sm" />
              </Group>
            ) : notifications.length === 0 ? (
              <Text fz={14} c={tokens.textMuted} px={16} py={20} ta="center">
                You're all caught up.
              </Text>
            ) : (
              <Stack gap={0}>
                {notifications.map((notification) => (
                  <Stack
                    key={notification.id}
                    gap={2}
                    px={16}
                    py={10}
                    bg={notification.read ? undefined : tokens.primaryTint}
                    style={{ borderBottom: `1px solid ${tokens.rowDivider}` }}
                  >
                    <Text fz={14} fw={600}>
                      {notification.title}
                    </Text>
                    <Text fz={13} c={tokens.textSecondary}>
                      {notification.message}
                    </Text>
                    <Text fz={12} c={tokens.textMuted}>
                      {dayjs(notification.createdAt).fromNow()}
                    </Text>
                  </Stack>
                ))}
              </Stack>
            )}
          </Popover.Dropdown>
        </Popover>

        <Button
          component={Link}
          to={ROUTES.PLAN_TOUR}
          h={44}
          px={18}
          fz={14}
          fw={700}
          leftSection={<IconPlus size={18} stroke={2.2} aria-hidden />}
        >
          Plan new tour
        </Button>
      </Group>
    </Group>
  );
}
