"use server";

import { createClient } from "@/lib/supabase/server/server";
import type { SignUp, SignupData } from "@/types/api/auth/signup";
import { ok, fail, type ApiResponse } from "@/types/api/api-response";
import type { AuthError } from "@supabase/supabase-js";
import { CreateUserRequest } from "@/types/api/user/user";

// Services
import { createUser } from "../user/create-user.service";



export async function signupService(
  payload: CreateUserRequest
): Promise<ApiResponse<SignupData>> {
  try {
    console.log("Llegue hasta aca");
    const supabase = await createClient();
    const { email, password, ...userInsertionPayload } = payload;

    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      const status = (error as AuthError).status ?? 500;
      const errorCode = error.code ? `AUTH_${error.code}` :"INTERNAL_ERROR";

      return fail(
        status,
        errorCode,
        error.message ?? "Signup failed",
        { name: error.name, status: (error as AuthError).status }
      );
    }



    //* User creation
    await createUser(userInsertionPayload);
    //console.clear()
    console.log("Este es el data del registro: ", data);
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