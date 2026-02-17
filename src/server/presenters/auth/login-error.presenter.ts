type CodeValue = {
    type: string
}

const SUPABASE_LOGIN_ERROR_RESULT_MAP: Record<string, CodeValue> = {
  // Credenciales
  invalid_credentials: {
    type: "AUTH_INVALID_CREDENTIALS",
  },

  // Cuenta no verificada
  email_not_confirmed: {
    type: "AUTH_ACCOUNT_NOT_VERIFIED",
  },
  phone_not_confirmed: {
    type: "AUTH_ACCOUNT_NOT_VERIFIED",
  },
  provider_email_needs_verification: {
    type: "AUTH_ACCOUNT_NOT_VERIFIED",
  },

  // Cuenta bloqueada
  user_banned: {
    type: "AUTH_ACCOUNT_DISABLED",
  },

  // Rate limit
  over_request_rate_limit: {
    type: "AUTH_RATE_LIMITED",
  },
  over_email_send_rate_limit: {
    type: "AUTH_RATE_LIMITED",
  },
  over_sms_send_rate_limit: {
    type: "AUTH_RATE_LIMITED",
  },
};

export function loginErrorPresenter(code?: string) {
  if (!code) {
    return { type: "AUTH_UNEXPECTED_ERROR" };
  }

  return (
    SUPABASE_LOGIN_ERROR_RESULT_MAP[code] ?? {
      type: "AUTH_UNEXPECTED_ERROR",
      error: code,
    }
  );
}
