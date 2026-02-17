

export type SearchChatItem = {
  id: string;
  name: string;
  photoUrl?: string | null;
};

export interface ConversationSearchContentProps {
    chats: SearchChatItem[];
    onChatClick: (chatId: string) => void;
    emptyDescription?: string;
    className?: string;
}