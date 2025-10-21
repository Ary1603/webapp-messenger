"use server";

import { createClient } from "@/lib/supabase/server/server";
import type { Login, LoginData, IsUserLoggedData } from "@/types/api/auth/login";
import { ok, fail, type ApiResponse } from "@/types/api/api-response";
import type { AuthError } from "@supabase/supabase-js";

export async function hasSessionActive():Promise<ApiResponse<IsUserLoggedData>> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      const status = (error as AuthError).status ?? 500;
      const errorCode = error.code ? `AUTH_${error.code}` : "INTERNAL_ERROR";

      return fail(status, errorCode, error.message ?? "Failed logged-in user validation", {
        name: error.name,
        status: (error as AuthError).status,
      });
    }

    const data = {
      userLogged: user ? true : false
    }
    return ok<IsUserLoggedData>(data)
  } catch (error) {
    console.log("No hay usuario loggeado: ", error);
    return fail(500, "AUTH_SESSION_ERROR", "Error al verificar sesión activa", error);
  }
}

export async function loginService(
  payload: Login
): Promise<ApiResponse<LoginData>> {
  try {
    const supabase = await createClient();
    const { email, password } = payload;
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    supabase.auth.getSession();

    if (error) {
      const status = (error as AuthError).status ?? 500;
      const errorCode = error.code ? `AUTH_${error.code}` : "INTERNAL_ERROR";

      return fail(status, errorCode, error.message ?? "Signup failed", {
        name: error.name,
        status: (error as AuthError).status,
      });
    }
    return ok<LoginData>(data);
  } catch (e) {
    const message =
      e instanceof Error ? e.message : "Unexpected error during signup";
    return fail(500, "AUTH_SIGNUP_UNEXPECTED", message, e);
  }
}
