enum AuthInfraError {
  INVALID_CREDENTIALS = "invalid_credentials",
  EMAIL_ALREADY_EXISTS = "email_already_exists",
  WEAK_PASSWORD = "waek_password",
  USER_NOT_FOUND = "user_not_found",
  PROVIDER_ERROR = "provider_error",
  UNEXPECTED_ERROR = "unexpected_error",
}

interface SupabaseAuthError {
  code?: string;
}

const SUPABASE_AUTH_ERROR_MAP: Record<string, AuthInfraError> = {
  invalid_login: AuthInfraError.INVALID_CREDENTIALS,
  invalid_credentials: AuthInfraError.INVALID_CREDENTIALS,
  email_exists: AuthInfraError.EMAIL_ALREADY_EXISTS,
  weak_password: AuthInfraError.WEAK_PASSWORD,
};

export function mapSupabaseAuthError(
  error: SupabaseAuthError
): AuthInfraError {
  if (!error?.code) {
    return AuthInfraError.UNEXPECTED_ERROR;
  }

  console.log(" ------- supabase-auth-error.mapper.ts ------- ");
  console.log(error.code);
  return (
    SUPABASE_AUTH_ERROR_MAP[error.code] ??
    AuthInfraError.UNEXPECTED_ERROR
  );
}