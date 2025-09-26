import { create } from "zustand";
import ApiRepository from "@/repositories/ApiRepository";

interface SessionState {
    test: string
    isLoading: boolean
    setLoading: (isLoading: boolean) => void
    testPost: () => ReturnType<typeof ApiRepository.testConection>
}

export const useSessionStore = create<SessionState>((set) => ({
    // State
    test: '',
    isLoading: false,

    // Actions
    // initLogin: async () => {
        
    // }
    setLoading: (isLoading) => set({ isLoading }),
    testPost: async () => {
        const response = await ApiRepository.testConection()
        console.log("Desde la session store: " ,response)
    }
}))