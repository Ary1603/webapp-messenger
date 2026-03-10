import type { RegisterUserErrorCode } from "../register-user.error-code";

const USECASE_REGISTER_USER_ERROR_MAP: Record<string, RegisterUserErrorCode> = {
    // Credentials
    invalid_credentials: "AUTH_INVALID_CREDENTIALS",
}

export function mapToUsecaseRegisterUserError(code?: string): RegisterUserErrorCode {
  if (!code) return "AUTH_UNEXPECTED_ERROR"

  return (
    USECASE_REGISTER_USER_ERROR_MAP[code] ?? "AUTH_UNEXPECTED_ERROR"
  );
}
