// Components
import ChatCard from "@/components/cards/ChatCard";
import EmptyChats from "@/templates/chats/EmptyChats";
import { ChatsContentProps } from "@/types/components/chats-content";
// Types


export function ChatsContent({
  chats,
  onNewChat,
}: ChatsContentProps) {
  if (chats.length === 0) {
    return <EmptyChats onStartConversation={onNewChat} />;
  }

  return (
    <div>
      {chats.map((chat) => (
        <ChatCard
          key={chat.id}
          title={chat.title}
          lastMessage={chat.lastMessage}
          timestamp={new Date()}
          avatarUrl={chat.photoUrl}
          unreadCount={2}
          selected={false}
          onClick={() => console.log("open chat")}
          locale="es-MX"
        />
      ))}
    </div>
  );
}