import type { AuthUser } from "@/types/domain/auth/user";
import type { User } from "@supabase/supabase-js";

export function mapSupabaseUserToAuthUser(user: User): AuthUser {
  return {
    id: user.id,
    email: user.email ?? "",
    emailVerified: !!user.email_confirmed_at,
  };
}