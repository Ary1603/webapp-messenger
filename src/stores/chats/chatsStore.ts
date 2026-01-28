/* Zustand */
import { create } from "zustand";
/* Repositories */
import ApiRepository from "@/repositories/ApiRepository";
/* Types & Schemas */
import type { CreateUserRequest } from "@/types/api/user/user";
import type { SignUp } from "@/types/api/auth/signup";
import type { Chat } from "@/types/domain/chats/chat";
import { devtools } from "zustand/middleware";
interface ChatsState {
  isLoading: boolean;
  chats: Chat[];
  getUserChats: () => Promise<unknown>;
  setLoading: (isLoading: boolean) => void;
  initLogin: (payload: SignUp) => ReturnType<typeof ApiRepository.initLogin>;
  signUp: (
    payload: CreateUserRequest
  ) => ReturnType<typeof ApiRepository.signUp>;
  hasSessionActive: () => ReturnType<typeof ApiRepository.haseSessionActive>;
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
        console.log("Este es el response en el action getUserChats: ", response);
        // set(
        //   { chats: response, isLoading: false },
        //   false,
        //   "chats/getUserChats:success"
        // );
        return response;
      },
      hasSessionActive: async () => {
        const response = await ApiRepository.haseSessionActive();
        return response;
      },
      initLogin: async (payload) => {
        const response = await ApiRepository.initLogin(payload);
        return response;
      },
      signUp: async (payload) => {
        const response = await ApiRepository.signUp(payload);
        return response;
      },
      setLoading: (isLoading) =>
        set({ isLoading }, false, "session/setLoading"),
    }),
    { name: "chatsStore" }
  )
);
