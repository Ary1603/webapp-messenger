/* Zustand */ 
import { create } from "zustand";
/* Repositories */
import ApiRepository from "@/repositories/ApiRepository";
/* Types & Schemas */
import type { CreateUserRequest } from "@/types/api/user/user";
import type { SignUp } from "@/types/api/auth/signup";
interface SessionState {
  test: string
  isLoading: boolean
  setLoading: (isLoading: boolean) => void
  initLogin: (payload: SignUp) => ReturnType<typeof ApiRepository.initLogin>
  signUp: (payload: CreateUserRequest) => ReturnType<typeof ApiRepository.signUp>
  hasSessionActive: () => ReturnType<typeof ApiRepository.haseSessionActive>
}

export const useSessionStore = create<SessionState>((set) => ({
    // State
    test: '',
    isLoading: false,

    // Actions
    hasSessionActive: async () => {
        const response = await ApiRepository.haseSessionActive();
        return response;
    },
    initLogin: async (payload) => {
        const response = await ApiRepository.initLogin(payload)
        return response
    },
    signUp: async (payload) => {
        const response = await ApiRepository.signUp(payload)
        return response
    },
    setLoading: (isLoading) => set({ isLoading }),
}))