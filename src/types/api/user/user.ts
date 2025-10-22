import z, { email } from "zod";

/**
 * Buenas prácticas:
 * - Mantén esquemas separados para ENTRADA (lo que manda el front) y SALIDA (lo que regresa el back).
 * - No hagas `id` opcional en el esquema "User" completo; en su lugar, omítelo del esquema de creación.
 */

// Esquema de usuario tal como lo devuelve el backend (con id obligatorio)
export const userFromApiSchema = z.object({
  id: z.number().int().positive(),
  name: z.string(),
  email: z.email(),
  password: z.string().min(6),
  last_name_father: z.string(),
  last_name_mother: z.string(),
  // Fecha de nacimiento (enviado/recibido como string con formato YYYY-MM-DD)
  birthday: z.string().datetime(),
  // Si el backend puede mandar null, usa nullable(); si puede omitir, usa nullish()
  username: z.string().nullable(),
  avatar_url: z.string().url().nullable(),
  // Si recibes fecha como string ISO
  updated_at: z.string().datetime(),
});

// Esquema para crear/mandar desde el front (sin id ni updated_at)
export const createUserRequestSchema = userFromApiSchema.omit({
  id: true,
  updated_at: true,
  avatar_url: true,
});

export const insertUserPayloadSchema = userFromApiSchema.omit({})

// Tipos inferidos
export type User = z.infer<typeof userFromApiSchema>;
export type CreateUserRequest = z.infer<typeof createUserRequestSchema>;