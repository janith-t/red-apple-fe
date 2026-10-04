// PLACEHOLDER login – replaced by the split-layout design from the HTML mockup in step D.
// The wiring (Zod schema, useLogin, server field errors) stays.
import { Alert, Button, Center, Checkbox, Paper, PasswordInput, Stack, TextInput, Title } from "@mantine/core";
import { schemaResolver, useForm } from "@mantine/form";
import { z } from "zod";
import useLogin from "@/hooks/auth/useLogin";
import { INITIAL_LOGIN_FORM } from "@/constants/formDefaults";
import { normalizeError } from "@/utils/error-utils";
import type { LoginFormValues } from "@/types/auth";
import { tokens } from "@/utils/theme";

const loginSchema = z.object({
  username: z.string().trim().min(1, "Enter your email or Agent ID"),
  password: z.string().min(1, "Enter your password"),
  rememberMe: z.boolean(),
});

export default function Login() {
  const { login, loginLoading, loginError } = useLogin();
  const form = useForm<LoginFormValues>({
    initialValues: INITIAL_LOGIN_FORM,
    validate: schemaResolver(loginSchema, { sync: true }),
  });

  const handleSubmit = async (values: LoginFormValues) => {
    try {
      await login(values);
    } catch (error) {
      form.setErrors(normalizeError(error).fieldErrors);
    }
  };

  // Generic message on 401 so the UI never reveals whether the account exists.
  const errorMessage = loginError
    ? normalizeError(loginError).status === 401
      ? "Invalid email/Agent ID or password."
      : normalizeError(loginError).message
    : null;

  return (
    <Center mih="100vh" bg={tokens.pageBg} p="md">
      <Paper withBorder radius="lg" p="xl" w="100%" maw={400}>
        <form onSubmit={form.onSubmit(handleSubmit)} noValidate>
          <Stack>
            <Title order={2}>Agent sign in</Title>
            {errorMessage && (
              <Alert color="red" variant="light">
                {errorMessage}
              </Alert>
            )}
            <TextInput label="Email or Agent ID" autoComplete="username" disabled={loginLoading} {...form.getInputProps("username")} />
            <PasswordInput label="Password" autoComplete="current-password" disabled={loginLoading} {...form.getInputProps("password")} />
            <Checkbox label="Keep me signed in on this device" {...form.getInputProps("rememberMe", { type: "checkbox" })} />
            <Button type="submit" size="md" loading={loginLoading} fullWidth>
              Sign in
            </Button>
          </Stack>
        </form>
      </Paper>
    </Center>
  );
}
