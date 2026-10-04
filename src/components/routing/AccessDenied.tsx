import { Button, Center, Stack, Text, Title } from "@mantine/core";
import { IconLock } from "@tabler/icons-react";
import { Link } from "react-router";
import { ROUTES } from "@/constants/routes";

export default function AccessDenied() {
  return (
    <Center mih="60vh" p="md">
      <Stack align="center" gap="sm" maw={420} ta="center">
        <IconLock size={40} stroke={1.5} aria-hidden />
        <Title order={2}>You don't have access to this page</Title>
        <Text c="dimmed">Ask an administrator to grant you access if you need it.</Text>
        <Button component={Link} to={ROUTES.DASHBOARD} mt="sm">
          Back to dashboard
        </Button>
      </Stack>
    </Center>
  );
}
