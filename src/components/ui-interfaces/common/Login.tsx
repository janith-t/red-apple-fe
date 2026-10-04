import { Alert, Anchor, Box, Button, Checkbox, Divider, Group, PasswordInput, Stack, Text, TextInput } from "@mantine/core";
import { schemaResolver, useForm } from "@mantine/form";
import { IconAlertCircle } from "@tabler/icons-react";
import { Link } from "react-router";
import { z } from "zod";
import AuthPageLayout from "./AuthPageLayout";
import SupportContactLine from "./SupportContactLine";
import useLogin from "@/hooks/auth/useLogin";
import { INITIAL_LOGIN_FORM } from "@/constants/formDefaults";
import { ROUTES } from "@/constants/routes";
import { normalizeError } from "@/utils/error-utils";
import { tokens } from "@/utils/theme";
import type { LoginFormValues } from "@/types/auth";
import classes from "./Auth.module.css";

const loginSchema = z.object({
  username: z.string().trim().min(1, "Enter your email or Agent ID"),
  password: z.string().min(1, "Enter your password"),
  rememberMe: z.boolean(),
});

const inputClassNames = { input: classes.input, label: classes.label };

// Generic message on 401 so the page never reveals whether an account exists.
const loginErrorMessage = (error: unknown) => {
  const normalized = normalizeError(error);
  return normalized.status === 401 ? "The email/Agent ID or password is incorrect." : normalized.message;
};

export default function Login() {
  const { login, loginLoading, loginError, reset } = useLogin();
  const form = useForm<LoginFormValues>({
    initialValues: INITIAL_LOGIN_FORM,
    validate: schemaResolver(loginSchema, { sync: true }),
    onValuesChange: () => loginError && reset(),
  });

  const handleSubmit = async (values: LoginFormValues) => {
    try {
      await login({ ...values, username: values.username.trim() });
    } catch (error) {
      form.setErrors(normalizeError(error).fieldErrors);
    }
  };

  return (
    <AuthPageLayout title="Agent sign in" subtitle="Welcome back. Sign in to continue planning tours.">
      <form onSubmit={form.onSubmit(handleSubmit)} noValidate>
        <Stack gap={18}>
          {loginError && (
            <Alert color="red" variant="light" icon={<IconAlertCircle size={18} />} role="alert">
              {loginErrorMessage(loginError)}
            </Alert>
          )}

          <TextInput
            label="Email or Agent ID"
            placeholder="you@agency.lk"
            autoComplete="username"
            classNames={inputClassNames}
            disabled={loginLoading}
            {...form.getInputProps("username")}
          />

          <Box>
            <Group justify="space-between" align="baseline" mb={6}>
              <Text component="label" htmlFor="login-password" fz={14} fw={600}>
                Password
              </Text>
              <Anchor component={Link} to={ROUTES.FORGOT_PASSWORD} fz={13} underline="never" className={classes.link}>
                Forgot password?
              </Anchor>
            </Group>
            <PasswordInput
              id="login-password"
              placeholder="Enter your password"
              autoComplete="current-password"
              classNames={{ input: classes.input }}
              disabled={loginLoading}
              visibilityToggleButtonProps={{ "aria-label": "Show or hide password" }}
              {...form.getInputProps("password")}
            />
          </Box>

          <Checkbox
            label="Keep me signed in on this device"
            c={tokens.textSecondary}
            styles={{ label: { fontSize: 14 } }}
            disabled={loginLoading}
            {...form.getInputProps("rememberMe", { type: "checkbox" })}
          />

          <Button type="submit" h={48} fz={16} fw={700} mt={4} fullWidth loading={loginLoading}>
            Sign in
          </Button>
        </Stack>
      </form>

      <Divider
        label="New to the portal?"
        labelPosition="center"
        color={tokens.border}
        styles={{ label: { color: tokens.placeholder, fontSize: 13 } }}
      />

      <Button
        component={Link}
        to={ROUTES.REGISTER}
        variant="default"
        h={48}
        fz={15}
        fw={600}
        c={tokens.textPrimary}
        styles={{ root: { borderColor: tokens.inputBorder } }}
      >
        Register as an agent
      </Button>

      <SupportContactLine />
    </AuthPageLayout>
  );
}
