import { SupabaseLoginAuthSuccessModel } from "../models/supabase-login-auth-success.model";
import type { AuthTokenResponsePassword } from "@supabase/supabase-js";

type SupabaseLoginData = {
  user: NonNullable<AuthTokenResponsePassword["data"]["user"]>;
  session: NonNullable<AuthTokenResponsePassword["data"]["session"]>;
};

export function mapSupabaseLoginToAuthModel(
  data: SupabaseLoginData
): SupabaseLoginAuthSuccessModel {
  return {
    user: {
      id: data.user.id,
      email: data.user.email ?? undefined,
      email_verified: Boolean(data.user.email_confirmed_at),
    },
    session: {
      access_token: data.session.access_token,
      refresh_token: data.session.refresh_token,
      expires_at: data.session.expires_at ?? undefined,
    },
    test: null
  };
}