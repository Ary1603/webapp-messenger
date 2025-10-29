import { createClient } from "@/lib/supabase/server/server";
import type { CreateUserPayloadService } from "@/types/api/user/user";
import type { CreateUserResponseData } from "@/types/api/services/create-user";
import { ok, fail, type ApiResponse } from "@/types/api/api-response";

//import { ok, fail, type ApiResponse } from "@/types/api/api-response";

export async function createUser(
  payload: CreateUserPayloadService
): Promise<ApiResponse<CreateUserResponseData>> {
  try {
    const {
      id,
      name,
      last_name_father,
      last_name_mother,
      avatar_url = null,
      updated_at,
      username = null,
    } = payload;

    const supabase = await createClient();
    // data
    const { error } = await supabase
      .from("users")
      .insert([
        {
          id: id,
          name: name,
          last_name_father: last_name_father,
          last_name_mother: last_name_mother,
          avatar_url: avatar_url,
          updated_at: updated_at,
          username: username,
        },
      ])
      .select();

    if (error) {
      const status = 500;
      const errorCode = error.code ? `DB_${error.code}` : "INTERNAL_ERROR";

      return fail(
        status,
        errorCode,
        error.message ?? "User row insertion failed"
      );
    }

    const response: CreateUserResponseData = {
      user_created: true,
      message: "User created successfuly.",
    };

    return ok<CreateUserResponseData>(response);
  } catch (e) {
    console.log("Error en la funcion createUser: ", e);
    const message =
      e instanceof Error ? e.message : "Unexpected error during signup";
    return fail(500, "AUTH_SIGNUP_UNEXPECTED", message, e);
  }
}
