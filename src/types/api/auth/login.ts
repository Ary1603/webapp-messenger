import z from "zod";
import type { User, Session } from "@supabase/supabase-js";

export type LoginData = { user: User | null; session: Session | null };

export type IsUserLoggedData = { userLogged: boolean };

export const LoginSchema = z.object({
    email: z.string(),
    password: z.string().min(6)
})


export type Login = z.infer<typeof LoginSchema>