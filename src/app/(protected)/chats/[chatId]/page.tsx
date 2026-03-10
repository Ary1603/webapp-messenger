"use client";
import ChatContent from "@/components/chats/ChatContent";
import { useChatsStore } from "@/stores/chats/chatsStore";
import { errorHandler, type ApiError } from "@/utils/error/errorHandler";
import { useEffect, useMemo, useState } from "react";
import { getLastPathSegment } from "@/utils/url";
import { usePathname } from "next/navigation";

function Chat() {
  const [isLoading, setIsLoading] = useState(false);
  const getInitialChatMessages = useChatsStore(
    (state) => state.getInitialChatMessages,
  );
  const sendMessage = useChatsStore((state) => state.sendMessage);

  const pathname = usePathname();

  const chatId = useMemo(() => {
    if (!pathname) return null;
    return getLastPathSegment(pathname);
  }, [pathname]);

  const handlers = useMemo(
    () => ({
      // "AUTH-1077": async () => {
      //   console.log()
      // },
    }),
    [],
  );

  useEffect(() => {
    if (!chatId) return;

    const fetchInitialMessages = async () => {
      try {
        setIsLoading(true);
        await getInitialChatMessages({
          chatId,
          cursor: null,
          limit: 20,
        });
      } catch (error) {
        errorHandler(error as ApiError, handlers);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialMessages();
  }, [chatId, getInitialChatMessages, handlers]);

  const handleSendMessage = async (payload: { body: string }) => {
    if (!chatId) return;

    try {
      await sendMessage({
        chatId,
        body: payload.body,
      });
    } catch (error) {
      errorHandler(error as ApiError, handlers);
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <ChatContent chat={{}} onSendMessage={handleSendMessage} />
    </div>
  );
}

export default Chat;
