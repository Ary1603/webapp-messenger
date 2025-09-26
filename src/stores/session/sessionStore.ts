import { create } from "zustand";
import ApiRepository from "@/repositories/ApiRepository";

interface SessionState {
    test: string
    isLoading: boolean
    setLoading: (isLoading: boolean) => void
    testPost: () => ReturnType<typeof ApiRepository.startLogin>
}

export const useSessionStore = create<SessionState>((set) => ({
    // State
    test: '',
    isLoading: false,

    // Actions
    // initLogin: async () => {
        
    // }
    setLoading: (isLoading) => set({ isLoading }),
    testPost: () => ApiRepository.startLogin()
}))