// Components
import ChatCard from "@/components/cards/ChatCard";
import EmptyChats from "@/templates/chats/EmptyChats";
import { ChatsContentProps } from "@/types/components/chats-content";
import { useI18n } from "../language/LanguageProvider";
// Types


export function ChatsContent({
  chats,
  className,
  onNewChat,
  onOpenChat,
}: ChatsContentProps) {
  const { messages } = useI18n();

  if(!messages) return

  if (chats.length === 0) {
    return <EmptyChats onStartConversation={onNewChat} />;
  }

  return (
    <div className={className}>
      {chats.map((chat) => (
        <ChatCard
          className="mt-2"
          key={chat.chat_id}
          title={chat.display_name}
          lastMessage={chat.last_message_body ?? messages.send_a_message}
          timestamp={chat.last_message_at}
          avatarUrl={chat.photo_url}
          unreadCount={0}
          selected={false}
          onClick={() => onOpenChat(chat)}
          locale="es-MX"
        />
      ))}
    </div>
  );
}