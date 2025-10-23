import { createClient } from "@/lib/supabase/server/server";
import type { CreateUserPayloadService, createUserServicePayloadSchema } from "@/types/api/user/user";
//import { ok, fail, type ApiResponse } from "@/types/api/api-response";

export async function createUser(payload: CreateUserPayloadService) {
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
    const { data, error } = await supabase
      .from("Users")
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

    console.log(
      "Este es el data despues de insrtar los datos en la Tabla User: ",
      data
    );
    if (error) {
      console.log(
        "Estos nos los errores que regreso la inserción de datos en la tabla User: ",
        error
      );
    }
  } catch (error) {
    console.log("Error en la funcion createUser: ", error);
  }
}
