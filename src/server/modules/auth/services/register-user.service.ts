"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server/server";
import type { SignUp } from "@/schemas/api/auth/signup";

// export async function login(formData: FormData) {
//   const supabase = await createClient()

//   // type-casting here for convenience
//   // in practice, you should validate your inputs
//   const data = {
//     email: formData.get('email') as string,
//     password: formData.get('password') as string,
//   }

//   const { error } = await supabase.auth.signInWithPassword(data)

//   if (error) {
//     redirect('/error')
//   }

//   revalidatePath('/', 'layout')
//   redirect('/')
// }

export async function signupService(payload: SignUp) {
  try {
    const { email, password } = payload;
    const supabase = await createClient();

    const registerPayload = {
      email: email, //formData.get('email') as string,
      password: password, //formData.get('password') as string,
    };

    const { error, data } = await supabase.auth.signUp(registerPayload);

    if (error) {
      console.error("❌ Supabase signup error:", {
        message: error.message,
        status: error.status,
        details: error,
      });

      // Lanza un error más claro y tipado
      throw new Error(`Signup failed: ${error.message}`);
    }

    return data
    console.log("Este es el data del servicio: ", data);
  } catch (error) {
    console.log(error)
  }

  // type-casting here for convenience
  // in practice, you should validate your inputs

  // if (error) {
  //   redirect('/error')
  // }

  // revalidatePath('/', 'layout')
  // redirect('/')
}
