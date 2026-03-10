/* Zustand */
import { create } from "zustand";
/* Repositories */
import ApiRepository from "@/repositories/ApiRepository";
/* Types & Schemas */
/* Helpers */
import { devtools } from "zustand/middleware";
import { RegisterRequest } from "@/contracts/auth/register/register.request";
import { LoginRequest } from "@/contracts/auth/login/login.request";
interface SessionState {
  user: {
    id: string;
  } | null;
  session: unknown;
  isLoading: boolean;
  setLoading: (isLoading: boolean) => void;
  logout: () => ReturnType<typeof ApiRepository.logout>;
  initLogin: (payload: LoginRequest) => ReturnType<typeof ApiRepository.initLogin>;
  registerUser: (payload: RegisterRequest) => ReturnType<typeof ApiRepository.registerUser>;
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
      logout: async () => {
        await ApiRepository.logout();
        return;
      },
      hasSessionActive: async () => {
        const response = await ApiRepository.haseSessionActive();
        return response;
      },
      initLogin: async (payload) => {
        const response = await ApiRepository.initLogin(payload);
        const { user, session } = response.payload.data;

        set({ user, session }, false, "session/initLogin");

        return response;
      },
      registerUser: async (payload) => {
        const response = await ApiRepository.registerUser(payload);
        return response;
      },
      setLoading: (isLoading) =>
        set({ isLoading }, false, "session/setLoading"),
    }),
    { name: "sessionStore" }
  )
);
