import type { ReactNode } from "react";
import { Button, Stack, Text, ThemeIcon } from "@mantine/core";
import { IconCircleCheck } from "@tabler/icons-react";
import { Link } from "react-router";
import { ROUTES } from "@/constants/routes";
import { tokens } from "@/utils/theme";

// Confirmation shown in place of a form after a successful register / forgot-password request.
export default function AuthResult({ children }: { children: ReactNode }) {
  return (
    <Stack gap={20} role="status">
      <ThemeIcon size={52} radius="xl" color="green" variant="light">
        <IconCircleCheck size={30} stroke={1.8} />
      </ThemeIcon>
      <Text fz={15} c={tokens.textSecondary} lh={1.6}>
        {children}
      </Text>
      <Button component={Link} to={ROUTES.LOGIN} h={48} fz={16} fw={700} fullWidth>
        Back to sign in
      </Button>
    </Stack>
  );
}
