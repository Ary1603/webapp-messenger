"use server";

import { createClient } from "@/lib/supabase/server/server";
//import type { SignUp, SignupData } from "@/types/api/auth/signup";
import type { CreateUserResponseData } from "@/types/api/services/create-user";
import { ok, fail, type ApiResponse } from "@/types/api/api-response";
import type { AuthError } from "@supabase/supabase-js";
import { CreateUserRequest } from "@/types/api/user/user";
import { logout } from "./logout.service";

// Services
import { createUser } from "../user/create-user.service";



export async function signupService(
  payload: CreateUserRequest
): Promise<ApiResponse<CreateUserResponseData>> {
  try {
    const supabase = await createClient();
    const { email, password, ...rest } = payload;

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

    const userDataExtracted = {
      id: data.user!.id,
      updated_at: data.user!.updated_at as string,
      avatar_url: null
    }

    const userInsertionPayload = { ...rest, ...userDataExtracted}

    //* User creation
    const response = await createUser(userInsertionPayload);

    const { user_created, message } = response.data.data;

    await logout();

    return ok<CreateUserResponseData>({ user_created, message});
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