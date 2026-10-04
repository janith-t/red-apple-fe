import { Alert, Anchor, Button, Checkbox, PasswordInput, SimpleGrid, Stack, Text, TextInput } from "@mantine/core";
import { schemaResolver, useForm } from "@mantine/form";
import { IconAlertCircle } from "@tabler/icons-react";
import { Link } from "react-router";
import { z } from "zod";
import AuthPageLayout from "./AuthPageLayout";
import AuthResult from "./AuthResult";
import SupportContactLine from "./SupportContactLine";
import useRegister from "@/hooks/auth/useRegister";
import { INITIAL_REGISTER_FORM } from "@/constants/formDefaults";
import { ROUTES } from "@/constants/routes";
import { normalizeError } from "@/utils/error-utils";
import { showWarning } from "@/utils/notify-utils";
import { tokens } from "@/utils/theme";
import type { RegisterFormValues } from "@/types/auth";
import classes from "./Auth.module.css";

const MIN_PASSWORD_LENGTH = 8;

const registerSchema = z
  .object({
    fullName: z.string().trim().min(2, "Enter your full name"),
    agencyName: z.string().trim().min(2, "Enter your agency name"),
    email: z.string().trim().min(1, "Enter your email").pipe(z.email("Enter a valid email address")),
    phone: z
      .string()
      .trim()
      .regex(/^\+?[0-9\s-]{9,15}$/, "Enter a valid phone number, e.g. +94 77 123 4567"),
    password: z
      .string()
      .min(MIN_PASSWORD_LENGTH, `Use at least ${MIN_PASSWORD_LENGTH} characters`)
      .regex(/[A-Za-z]/, "Include at least one letter")
      .regex(/[0-9]/, "Include at least one number"),
    confirmPassword: z.string().min(1, "Re-enter your password"),
    acceptTerms: z.literal(true, { error: "Please confirm to continue" }),
  })
  .refine((values) => values.password === values.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords don't match",
  });

const inputClassNames = { input: classes.input, label: classes.label };

export default function Register() {
  const { register, registerLoading, registerError, isSuccess, reset } = useRegister();
  const form = useForm<RegisterFormValues>({
    initialValues: INITIAL_REGISTER_FORM,
    validate: schemaResolver(registerSchema, { sync: true }),
    onValuesChange: () => registerError && reset(),
  });

  const handleSubmit = async ({ confirmPassword: _confirm, acceptTerms: _terms, ...values }: RegisterFormValues) => {
    try {
      await register({
        ...values,
        fullName: values.fullName.trim(),
        agencyName: values.agencyName.trim(),
        email: values.email.trim(),
        phone: values.phone.trim(),
      });
    } catch (error) {
      const { fieldErrors } = normalizeError(error);
      if (Object.keys(fieldErrors).length > 0) {
        form.setErrors(fieldErrors);
        showWarning("Check your details", "Please correct the highlighted fields.");
      }
    }
  };

  if (isSuccess) {
    return (
      <AuthPageLayout title="Registration submitted" subtitle="Thanks for registering with Red Apple.">
        <AuthResult>
          Your agent account for <strong>{form.values.email.trim()}</strong> is waiting for approval. We'll email you
          your Agent ID once an administrator has reviewed it.
        </AuthResult>
        <SupportContactLine prefix="Questions about your registration?" />
      </AuthPageLayout>
    );
  }

  const generalError =
    registerError && Object.keys(normalizeError(registerError).fieldErrors).length === 0
      ? normalizeError(registerError).message
      : null;

  return (
    <AuthPageLayout
      title="Register as an agent"
      subtitle="Create your agent account. An administrator will review it before you can sign in."
      contentWidth={440}
    >
      <form onSubmit={form.onSubmit(handleSubmit)} noValidate>
        <Stack gap={18}>
          {generalError && (
            <Alert color="red" variant="light" icon={<IconAlertCircle size={18} />} role="alert">
              {generalError}
            </Alert>
          )}

          <TextInput
            label="Full name"
            placeholder="Nimal Perera"
            autoComplete="name"
            classNames={inputClassNames}
            disabled={registerLoading}
            {...form.getInputProps("fullName")}
          />
          <TextInput
            label="Agency name"
            placeholder="Your travel agency"
            autoComplete="organization"
            classNames={inputClassNames}
            disabled={registerLoading}
            {...form.getInputProps("agencyName")}
          />
          <SimpleGrid cols={{ base: 1, xs: 2 }} spacing={18} verticalSpacing={18}>
            <TextInput
              label="Email"
              type="email"
              placeholder="you@agency.lk"
              autoComplete="email"
              classNames={inputClassNames}
              disabled={registerLoading}
              {...form.getInputProps("email")}
            />
            <TextInput
              label="Phone"
              type="tel"
              placeholder="+94 77 123 4567"
              autoComplete="tel"
              classNames={inputClassNames}
              disabled={registerLoading}
              {...form.getInputProps("phone")}
            />
          </SimpleGrid>
          <PasswordInput
            label="Password"
            description={`At least ${MIN_PASSWORD_LENGTH} characters, with a letter and a number`}
            placeholder="Create a password"
            autoComplete="new-password"
            classNames={inputClassNames}
            disabled={registerLoading}
            visibilityToggleButtonProps={{ "aria-label": "Show or hide password" }}
            {...form.getInputProps("password")}
          />
          <PasswordInput
            label="Confirm password"
            placeholder="Re-enter your password"
            autoComplete="new-password"
            classNames={inputClassNames}
            disabled={registerLoading}
            visibilityToggleButtonProps={{ "aria-label": "Show or hide password" }}
            {...form.getInputProps("confirmPassword")}
          />
          <Checkbox
            label="I confirm these details are correct and I'm authorised to act for this agency"
            c={tokens.textSecondary}
            styles={{ label: { fontSize: 14 } }}
            disabled={registerLoading}
            {...form.getInputProps("acceptTerms", { type: "checkbox" })}
          />

          <Button type="submit" h={48} fz={16} fw={700} mt={4} fullWidth loading={registerLoading}>
            Create account
          </Button>
        </Stack>
      </form>

      <Text fz={14} c={tokens.textMuted} ta="center">
        Already have an account?{" "}
        <Anchor component={Link} to={ROUTES.LOGIN} fz={14} underline="never" className={classes.link}>
          Sign in
        </Anchor>
      </Text>
    </AuthPageLayout>
  );
}
