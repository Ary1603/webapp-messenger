import z from "zod";
import type { User, Session } from "@supabase/supabase-js";

export const signUpSchema = z.object({
    email: z.string(),
    password: z.string().min(6)
})

export type SignupData = { user: User | null; session: Session | null };

export type SignUp = z.infer<typeof signUpSchema>