import z from "zod";

export const signUpSchema = z.object({
    email: z.string(),
    password: z.string().min(6)
})

export type SignUp = z.infer<typeof signUpSchema>