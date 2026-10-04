import { Button, Center, Group, Stack, Text, Title } from "@mantine/core";
import { isRouteErrorResponse, Link, useNavigate, useRouteError } from "react-router";
import { ROUTES } from "@/constants/routes";

// Used both as the "*" route and as errorElement. Without a route error it is a plain 404.
export default function NotFound() {
  const error = useRouteError();
  const navigate = useNavigate();

  const isNotFound = !error || (isRouteErrorResponse(error) && error.status === 404);
  const title = isNotFound ? "Page not found" : "Something went wrong";
  const message = isNotFound
    ? "The page you are looking for doesn't exist or has moved."
    : "An unexpected error occurred. Try again, or go back to the dashboard.";

  if (error && !isNotFound && import.meta.env.DEV) console.error(error);

  return (
    <Center mih="100vh" p="md">
      <Stack align="center" gap="sm" maw={460} ta="center">
        <Text fw={800} fz={64} c="appleRed" lh={1}>
          {isNotFound ? "404" : "Oops"}
        </Text>
        <Title order={2}>{title}</Title>
        <Text c="dimmed">{message}</Text>
        <Group mt="sm">
          <Button variant="default" onClick={() => navigate(-1)}>
            Go back
          </Button>
          <Button component={Link} to={ROUTES.DASHBOARD}>
            Go to dashboard
          </Button>
        </Group>
      </Stack>
    </Center>
  );
}
