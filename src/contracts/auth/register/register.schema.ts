import z from "zod";

export const registerSchema = z.object({
    name: z.string().min(3),
    last_name_father: z.string().min(3),
    last_name_mother: z.string().nullable().optional(),
    birthday: z.string(),
    email: z.string().email(),
    // TODO: Change min to 6
    //* Note: min 1 just for testing
    password: z.string().min(1),
    username: z.string().min(1)
})

export type RegisterSchema = z.infer<typeof registerSchema>;