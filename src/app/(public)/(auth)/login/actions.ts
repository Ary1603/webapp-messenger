'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase/server/server'

export async function login(formData: FormData) {
  const supabase = await createClient()
  console.log("Estoy en el login");

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  console.log("Este es el data del login: ", data);
  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect('/error')
  }

  console.log("Al final del login");
  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()
  console.log("Estoy en signup");

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    username: formData.get('username') as string,
  }

  console.log("este es el data: ", data);
  const { error } = await supabase.auth.signUp(data)

  if (error) {
    console.error("Este el error: ", error);
    redirect('/error')
  }

  console.log("Todo bien");
  revalidatePath('/', 'layout')
  redirect('/register')
}