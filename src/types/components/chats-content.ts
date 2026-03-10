import type { Chat } from "../domain/chats/chat";

export interface ChatsContentProps {
    chats: Chat[];
    className?: string;
    onNewChat: () => void;
    onOpenChat: (chat: Chat) => void;
}