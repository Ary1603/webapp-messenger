import type { Chat } from "@/types/domain/chats/chat";
import type { User } from "@/types/domain/chats/user"; 

export interface SearchConversationsResponse {
  conversations: {
    chats: Chat[];
    users: User[];
  };
}