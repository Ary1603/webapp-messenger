import type { ChatContentProps } from "@/types/components/chat-content";
import { ChatHeader } from "../Headers/ChatHeader";
import SendMessageInput from "../inputs/SendMessageInput";
import { useRouter } from "next/navigation";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useState } from "react";

function ChatContent({ chat, onSendMessage }: ChatContentProps & { onSendMessage?: (message: { body?: string; replyToId?: string | null; metadata?: Record<string, unknown> | null; clientId?: string }) => void }) {
  const router = useRouter();
  const [isChatInfoOpen, setIsChatInfoOpen] = useState(false);

  const returnToChats = () => {
    router.push(`/chats`);
  };

  const handleOpenChatInfo = () => {
    setIsChatInfoOpen(true);
  };

  return (
    <>
      <div className="flex h-full flex-col">
        <ChatHeader title="Titulo dummy" onClickReturn={returnToChats} onOpenChatInfo={handleOpenChatInfo}/>
        <div className="flex-1 overflow-y-auto">
          {/* Messages list goes here */}
        </div>
        <div className="border-t border-gray-200 px-2 pb-3 pt-2">
          <SendMessageInput
            onSend={(message) => {
              console.log("[ChatContent.tsx] message: ", message);
              if (onSendMessage) {
                onSendMessage({ body: message });
              }
            }}
          />
        </div>
      </div>
      <Sheet open={isChatInfoOpen} onOpenChange={setIsChatInfoOpen}>
        <SheetContent
          side="right"
          className="w-full sm:max-w-md"
        >
          <SheetHeader>
            <SheetTitle>Chat info</SheetTitle>
          </SheetHeader>

          <div className="mt-4">
            {/* Chat info content goes here */}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default ChatContent;
