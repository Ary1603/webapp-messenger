/* Types */
import type { LoginResponseDTO } from "@/contracts/auth/login/login.response";
import type { SupabaseLoginAuthSuccessModel } from "@/server/infrastructure/auth/models/supabase-login-auth-success.model";

export function presentLoginSuccess(
  model: SupabaseLoginAuthSuccessModel
): LoginResponseDTO {
  return {
    type: "SUCCESS",
    user: {
      id: model.user.id,
      email: model.user.email,
      email_verified: model.user.email_verified,
    },
    session: {
      access_token: model.session.access_token,
      refresh_token: model.session.refresh_token,
      expires_at: model.session.expires_at,
    },
  };
}