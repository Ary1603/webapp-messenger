import type { GetUserChatsErrorCode } from "../../chats/get-user-chats/get-user-chats.error-code";

const SUPABASE_LOGIN_ERROR_RESULT_MAP: Record<string, GetUserChatsErrorCode> = {
    
}

export function mapSupabaseGetUserChatsError(code?: string): GetUserChatsErrorCode {
  if (!code) return "CHATS_UNEXPECTED_ERROR"

  return (
    SUPABASE_LOGIN_ERROR_RESULT_MAP[code] ?? "CHATS_UNEXPECTED_ERROR"
  );
}
