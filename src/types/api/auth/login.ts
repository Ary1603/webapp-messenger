import z from "zod";
import type { User, Session, AuthError } from "@supabase/supabase-js";

export type LoginData = { user: User | null; session: Session | null };

export const LoginUpSchema = z.object({
    email: z.string(),
    password: z.string().min(6)
})


export type Login = z.infer<typeof LoginUpSchema>