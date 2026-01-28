"use server";

import { createClient } from "@/lib/supabase/server/server";
import type { LogoutResponseData } from "@/types/api/auth/logout";
import { ok, fail, type ApiResponse } from "@/types/transport/http/api-response";
import type { AuthError } from "@supabase/supabase-js";

export async function logout(): Promise<ApiResponse<LogoutResponseData>> {
  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
      const status = (error as AuthError).status ?? 500;
      const errorCode = error.code ? `AUTH_${error.code}` : "INTERNAL_ERROR";

      return fail(status, errorCode, error.message ?? "Failed logout", {
        name: error.name,
        status: (error as AuthError).status,
      });
    }

    return ok<LogoutResponseData>({ isLogout: true });
  } catch (error) {
    console.log("Logout error: ", error);
    return fail(
      500,
      "AUTH_SESSION_ERROR",
      "Error al verificar sesión activa",
      error
    );
  }
}
