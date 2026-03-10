/* Zustand */
import { create } from "zustand";
/* Repositories */
import ApiRepository from "@/repositories/ApiRepository";
/* Types & Schemas */
import type { Chat } from "@/types/domain/chats/chat";
import { devtools } from "zustand/middleware";
import { SearchConversationsRequest } from "@/contracts/search/conversations/search-conversations.request";
import { GetInitialMessagesRequest } from "@/contracts/chats/get-initial-messages/get-initial-messages.request";
import { SendMessageRequest } from "@/contracts/chats/send-message/send-message.request";
interface ChatsState {
  isLoading: boolean;
  chats: Array<Chat>;
  getUserChats: () => Promise<unknown>;
  setLoading: (isLoading: boolean) => void;
  initLogin: (payload: unknown) => ReturnType<typeof ApiRepository.initLogin>;
  sendMessage: (payload: SendMessageRequest) => ReturnType<typeof ApiRepository.sendMessage>;
  searchUsersNChats: (payload: SearchConversationsRequest) => ReturnType<typeof ApiRepository.searchUsersNChats>;
  getInitialChatMessages: (payload: GetInitialMessagesRequest) => ReturnType<typeof ApiRepository.getChatInitialMessages>;
  getOrCreateDirectChatBetweenUsers: (payload: any) => ReturnType<typeof ApiRepository.getOrCreateDirectChatBetweenUsers>;
}

export const useChatsStore = create<ChatsState>()(
  devtools(
    (set) => ({
      // State
      test: "",
      isLoading: false,
      chats: [],

      // Actions
      getUserChats: async () => {
        const response = await ApiRepository.gerUserChats();
        const { chats } = response.payload.data
        set(
          { chats, isLoading: false },
          false,
          "chats/getUserChats:success"
        );
        return response;
      },
      searchUsersNChats: async (payload) => {
        const response = await ApiRepository.searchUsersNChats(payload);
        return response;
      },
      getOrCreateDirectChatBetweenUsers: async (payload) => {
        const response = await ApiRepository.getOrCreateDirectChatBetweenUsers(payload);
        return response.data;
      },
      getInitialChatMessages: async (payload) => {
        const response = await ApiRepository.getChatInitialMessages(payload);
        return response.payload.data;
      },
      sendMessage: async (payload) => {
        const response = await ApiRepository.sendMessage(payload);
        return response.payload.data;
      },
      setLoading: (isLoading) =>
        set({ isLoading }, false, "session/setLoading"),
    }),
    { name: "chatsStore" }
  )
);
