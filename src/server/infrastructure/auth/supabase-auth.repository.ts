/* Supabase */
import { createClient } from "@/lib/supabase/server/server";
/* Types */
import type { AuthRepository } from "./auth.repository";
import type { AuthUser } from "@/types/domain/auth/user";
/* Mappers */
import { mapSupabaseLoginToAuthModel } from "./mappers/login.mapper";
import { mapSupabaseUserToAuthUser } from "./mappers/user.mapper";
import { AuthLoginInfraResult } from "./models/auth-login.infra-result";

export class SupabaseAuthRepository implements AuthRepository {
  async getCurrentUser(): Promise<AuthUser | null> {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.getUser();

    if (error || !data.user) {
      return null;
    }

    return mapSupabaseUserToAuthUser(data.user);
  }

  async login(email: string, password: string): Promise<AuthLoginInfraResult> {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return {
        type: "ERROR",
        errorCode: error.code ?? 'UNEXPECTED_ERROR',
        error,
      };
    }

    if (!data?.user || !data?.session) {
      return {
        type: "ERROR",
        errorCode: "UNEXPECTED_ERROR",
      };
    }

    const authModel = mapSupabaseLoginToAuthModel(data);

    return {
      type: "SUCCESS",
      data: authModel,
    };
  }

  async checkIfSessionIsActive(): Promise<void> {
    //const supabase = await createClient();
    // const {
    //   data: { user },
    //   error,
    // } = await supabase.auth.getUser();
  }
}
