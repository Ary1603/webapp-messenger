import { AuthInfraError } from "../models/auth-infra-error";

interface SupabaseAuthError {
  code?: string;
}

const SUPABASE_AUTH_ERROR_MAP: Record<string, AuthInfraError> = {
  invalid_login: AuthInfraError.INVALID_CREDENTIALS,
  email_exists: AuthInfraError.EMAIL_ALREADY_EXISTS,
  weak_password: AuthInfraError.WEAK_PASSWORD,
};

export function mapSupabaseAuthError(
  error: SupabaseAuthError
): AuthInfraError {
  if (!error?.code) {
    return AuthInfraError.UNEXPECTED_ERROR;
  }

  return (
    SUPABASE_AUTH_ERROR_MAP[error.code] ??
    AuthInfraError.UNEXPECTED_ERROR
  );
}