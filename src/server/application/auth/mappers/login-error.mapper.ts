import type { LoginErrorCode } from "../login/login.error-code"

const USECASE_LOGIN_ERROR_MAP: Record<string, LoginErrorCode> = {
    // Credentials
    invalid_credentials: "AUTH_INVALID_CREDENTIALS",

    // Account not verified
    email_not_confirmed: 'AUTH_ACCOUNT_NOT_VERIFIED',
    phone_not_confirmed: 'AUTH_ACCOUNT_NOT_VERIFIED',
    provider_email_needs_verification: "AUTH_ACCOUNT_NOT_VERIFIED",

    // Blocked account
    user_banned: "AUTH_ACCOUNT_DISABLED",

    // Rate limit
    over_request_rate_limit: "AUTH_RATE_LIMITED",
    over_email_send_rate_limit: "AUTH_RATE_LIMITED",
    over_sms_send_rate_limit: "AUTH_RATE_LIMITED"
}

export function mapToUsecaseLoginError(code?: string): LoginErrorCode {
  if (!code) return "AUTH_UNEXPECTED_ERROR"

  return (
    USECASE_LOGIN_ERROR_MAP[code] ?? "AUTH_UNEXPECTED_ERROR"
  );
}
