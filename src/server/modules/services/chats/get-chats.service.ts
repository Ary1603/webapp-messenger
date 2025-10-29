import { createClient } from "@/lib/supabase/server/server";
import { ok, fail, type ApiResponse } from "@/types/api/api-response";

/**
 * Obtiene los chats de un usuario desde la tabla `chats`.
 * - Filtra por `user_id` (ajústalo si tu columna se llama diferente).
 * - Ordena por `updated_at` (desc) para retornar primero los más recientes.
 * - Usa helpers `ok/fail` para respuestas consistentes.
 */
export async function getUserChats(userId: string): Promise<ApiResponse> {
  // Validación temprana: evita llamadas innecesarias a la DB
  if (!userId || typeof userId !== "string" || userId.trim().length === 0) {
    return fail("El id de usuario es inválido.");
  }

  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from("chats")
      .select("*")
      .eq("user_id", userId)            // Ajusta a tu esquema real si fuese `owner_id` o similar
      .order("updated_at", { ascending: false });

    if (error) {
      // Log útil para monitoreo sin filtrar detalles sensibles al cliente
      console.warn("Error en getUserChats (Supabase):", error);
      return fail("No se pudieron obtener los chats del usuario.");
    }

    // `data` podría venir null; normaliza a arreglo vacío
    return ok(data ?? []);
  } catch (err) {
    console.warn("Error inesperado en getUserChats:", err);
    return fail("Ocurrió un error inesperado al obtener los chats.");
  }
}