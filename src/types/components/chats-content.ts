import type { Chat } from "../domain/chats/chat";

export interface ChatsContentProps {
    chats: Chat[];
    onNewChat: () => void;
}