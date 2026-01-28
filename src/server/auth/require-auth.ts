import { createSupabaseServerClient } from "../infrastructure/supabase/supabase.server";

export async function requireAuth() {
  const supabase = await createSupabaseServerClient();

  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError || !session) {
    throw new Error("UNAUTHORIZED");
  }

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("UNAUTHORIZED");
  }

  return {
    supabase,
    session,
    user,
    accessToken: session.access_token,
  };
}