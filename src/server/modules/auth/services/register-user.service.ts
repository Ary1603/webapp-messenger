"use server";

import { createClient } from "@/lib/supabase/server/server";
import type { SignUp } from "@/types/api/auth/signup";
import { ok, fail, type ApiResponse } from "@/types/api/api-response";
import type { User, Session, AuthError } from "@supabase/supabase-js";

type SignupData = { user: User | null; session: Session | null };

export async function signupService(
  payload: SignUp
): Promise<ApiResponse<SignupData>> {
  try {
    const supabase = await createClient();
    const { email, password } = payload;

    const { data, error } = await supabase.auth.signUp({ email, password });

    console.log("============ DATA ============");
    console.log(data);
    console.log("============ Error ============");
    console.log(error);
    if (error) {
      const status = (error as AuthError).status ?? 500;
      const errorCode = error.code ? `REGISTER-SUPABASE-${error.code}` :"INTERNAL_ERROR";

      return fail(
        status,
        errorCode,
        error.message ?? "Signup failed",
        { name: error.name, status: (error as AuthError).status }
      );
    }

    return ok<SignupData>(data);
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unexpected error during signup";
    return fail(
      500,
      "AUTH_SIGNUP_UNEXPECTED",
      message,
      e
    );
  }
}

const registerSupabaseErrors = {
  over_email_send_rate_limit: "AUTH_1000",
  unexpected_failure: "",
  validation_failed: "",
  bad_json: ""
}