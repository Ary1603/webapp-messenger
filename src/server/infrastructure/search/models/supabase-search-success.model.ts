import { SupabaseSearchChatItem } from "./supabase-search-chat-item.infra";
import { SupabaseSearchUserItem } from "./supabase-search-user-item.infra";

export interface SupabaseSearchSuccessModel {
    users: SupabaseSearchUserItem[];
    chats: SupabaseSearchChatItem[];
}