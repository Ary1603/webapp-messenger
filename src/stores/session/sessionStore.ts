/* Zustand */
import { create } from "zustand";
/* Repositories */
import ApiRepository from "@/repositories/ApiRepository";
/* Types & Schemas */
import type { CreateUserRequest } from "@/types/api/user/user";
import type { SignUp } from "@/types/api/auth/signup";
import type { User } from "@/types/models/user";
import type { Session } from "@/types/models/session";
/* Helpers */
import { devtools } from "zustand/middleware";
interface SessionState {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  setLoading: (isLoading: boolean) => void;
  initLogin: (payload: SignUp) => ReturnType<typeof ApiRepository.initLogin>;
  signUp: (
    payload: CreateUserRequest
  ) => ReturnType<typeof ApiRepository.signUp>;
  hasSessionActive: () => ReturnType<typeof ApiRepository.haseSessionActive>;
}

export const useSessionStore = create<SessionState>()(
  devtools(
    (set) => ({
      // State
      isLoading: false,
      user: null,
      session: null,

      // Actions
      hasSessionActive: async () => {
        const response = await ApiRepository.haseSessionActive();
        return response;
      },
      initLogin: async (payload) => {
        const response = await ApiRepository.initLogin(payload);
        console.log("sessionStore initLogin response: ", response);
        const { user, session } = response.payload.data;

        set({ user, session }, false, "session/initLogin");

        return response;
      },
      signUp: async (payload) => {
        const response = await ApiRepository.signUp(payload);
        return response;
      },
      setLoading: (isLoading) =>
        set({ isLoading }, false, "session/setLoading"),
    }),
    { name: "sessionStore" }
  )
);
