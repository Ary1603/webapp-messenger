import { SupabaseSearchChatItem } from "@/server/infrastructure/search/models/supabase-search-chat-item.infra";
import { Chat } from "../search-conversations.success-output";

export class SearchConversationsChatMapper {
  static toDomain(
    infraChat: SupabaseSearchChatItem
  ): Chat {
    return {
      chatId: infraChat.id,
      chatName: infraChat.title,
      photoUrl: infraChat.photoUrl ?? undefined,
    };
  }

  static toDomainList(
    infraChats: SupabaseSearchChatItem[]
  ): Chat[] {
    return infraChats.map(this.toDomain);
  }
}