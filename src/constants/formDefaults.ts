import type { ForgotPasswordRequest, LoginFormValues, RegisterFormValues } from "@/types/auth";

export const INITIAL_LOGIN_FORM: LoginFormValues = {
  username: "",
  password: "",
  rememberMe: false,
};

export const INITIAL_REGISTER_FORM: RegisterFormValues = {
  fullName: "",
  agencyName: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  acceptTerms: false,
};

export const INITIAL_FORGOT_PASSWORD_FORM: ForgotPasswordRequest = {
  username: "",
};
