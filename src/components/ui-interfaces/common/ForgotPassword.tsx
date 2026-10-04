import { Alert, Anchor, Button, Stack, Text, TextInput } from "@mantine/core";
import { schemaResolver, useForm } from "@mantine/form";
import { IconAlertCircle, IconArrowLeft } from "@tabler/icons-react";
import { Link } from "react-router";
import { z } from "zod";
import AuthPageLayout from "./AuthPageLayout";
import AuthResult from "./AuthResult";
import SupportContactLine from "./SupportContactLine";
import useForgotPassword from "@/hooks/auth/useForgotPassword";
import { INITIAL_FORGOT_PASSWORD_FORM } from "@/constants/formDefaults";
import { ROUTES } from "@/constants/routes";
import { normalizeError } from "@/utils/error-utils";
import type { ForgotPasswordRequest } from "@/types/auth";
import classes from "./Auth.module.css";

const forgotPasswordSchema = z.object({
  username: z.string().trim().min(1, "Enter your email or Agent ID"),
});

export default function ForgotPassword() {
  const { requestReset, requestResetLoading, requestResetError, isSuccess, reset } = useForgotPassword();
  const form = useForm<ForgotPasswordRequest>({
    initialValues: INITIAL_FORGOT_PASSWORD_FORM,
    validate: schemaResolver(forgotPasswordSchema, { sync: true }),
    onValuesChange: () => requestResetError && reset(),
  });

  const handleSubmit = async (values: ForgotPasswordRequest) => {
    try {
      await requestReset({ username: values.username.trim() });
    } catch {
      // shown via requestResetError
    }
  };

  // Same confirmation whether or not the account exists, so the page can't be used to discover accounts.
  if (isSuccess) {
    return (
      <AuthPageLayout title="Check your email" subtitle="Password reset requested.">
        <AuthResult>
          If an account matches <strong>{form.values.username.trim()}</strong>, we've sent instructions to reset your
          password to its registered email address. The link expires after a short time.
        </AuthResult>
        <SupportContactLine prefix="Didn't get the email?" />
      </AuthPageLayout>
    );
  }

  return (
    <AuthPageLayout
      title="Reset your password"
      subtitle="Enter your email or Agent ID and we'll send you instructions to reset your password."
    >
      <form onSubmit={form.onSubmit(handleSubmit)} noValidate>
        <Stack gap={18}>
          {requestResetError && (
            <Alert color="red" variant="light" icon={<IconAlertCircle size={18} />} role="alert">
              {normalizeError(requestResetError).message}
            </Alert>
          )}

          <TextInput
            label="Email or Agent ID"
            placeholder="you@agency.lk"
            autoComplete="username"
            classNames={{ input: classes.input, label: classes.label }}
            disabled={requestResetLoading}
            {...form.getInputProps("username")}
          />

          <Button type="submit" h={48} fz={16} fw={700} mt={4} fullWidth loading={requestResetLoading}>
            Send reset instructions
          </Button>
        </Stack>
      </form>

      <Text fz={14} ta="center">
        <Anchor
          component={Link}
          to={ROUTES.LOGIN}
          fz={14}
          underline="never"
          className={classes.link}
          inline
          style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
        >
          <IconArrowLeft size={16} aria-hidden />
          Back to sign in
        </Anchor>
      </Text>

      <SupportContactLine />
    </AuthPageLayout>
  );
}
