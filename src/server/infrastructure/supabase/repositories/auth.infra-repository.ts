/* Supabase */
import { createClient } from "@/lib/supabase/server/server";
/* Types */
import type { AuthRepository } from "@/server/application/ports/auth.repository";
/* Mappers */
import { mapSupabaseAuthError } from "../mappers/supabase-auth-error.mapper"; 
import { LoginCredentials } from "@/server/application/auth/models/login-credentials";
import { AuthSession } from "@/server/application/auth/models/auth-session";
import { PortError, PortResult } from "@/server/application/models/port.model";
import { UserCredentials } from "@/server/application/auth/models/register-credentials";
import { AuthUser } from "@/server/application/auth/models/auth-user";

export class AuthInfraRepository implements AuthRepository {
  async login(
    input: LoginCredentials,
  ): Promise<PortResult<AuthSession, PortError>> {
    const supabase = await createClient();

    const { email, password } = input;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return {
        success: false,
        data: {
          errorCode: mapSupabaseAuthError(error),
          error,
          description: error.message,
        },
      };
    }

    if (!data?.user || !data?.session) {
      return {
        success: false,
        data: {
          errorCode: "invalid_auth_response",
        },
      };
    }

    return {
      success: true,
      data: {
        user: {
          user_id: data.user.id,
          email: data.user.email ?? null,
          user_metadata: {
            email_verified: data.user.user_metadata.email_verified
          }
        },
        session: {
          access_token: data.session.access_token,
          expires_at: data.session.expires_at ?? null,
          refresh_token: data.session.refresh_token
        }
      },
    };
  }

  async getCurrentUser(): Promise<PortResult<AuthUser, PortError>> {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.getUser();

    if (error) {
      return {
        success: false,
        data: {
          errorCode: mapSupabaseAuthError(error),
          description: error.message,
          error: error,
        },
      };
    }

    return {
      success: true,
      data: {
        id: data.user.id,
        email: data.user.email ?? null,
        //email_verified: data.user.email_confirmed_at
      },
    };
  }

  async logout(): Promise<PortResult<void, PortError>> {
    const supabase = await createClient();

    const { error } = await supabase.auth.signOut();

    if (error) {
      return {
        success: false,
        data: {
          errorCode: mapSupabaseAuthError(error),
          description: error.message,
          error: error,
        },
      };
    }

    return {
      success: true,
      data: undefined,
    };
  }

  async registerUserCredentials(
    input: LoginCredentials,
  ): Promise<PortResult<UserCredentials, PortError>> {
    const supabase = await createClient({ persistSession: false });

    const { email, password } = input;

    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      return {
        success: false,
        data: {
          errorCode: mapSupabaseAuthError(error),
          description: error.message,
          error: error,
        },
      };
    }

    if (!data?.user) {
      return {
        success: false,
        data: {
          errorCode: "INVALID_AUTH_RESPONSE",
        },
      };
    }

    return {
      success: true,
      data: {
        userId: data.user.id,
        email: data.user.email!,
      },
    };
  }
}
