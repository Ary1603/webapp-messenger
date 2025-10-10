/* Zustand */ 
import { create } from "zustand";
/* Supabase */
import { createClient } from '@/lib/supabase/server/server'
/* Repositories */
import ApiRepository from "@/repositories/ApiRepository";
/* Types & Schemas */
import type { SignUp } from "@/schemas/api/auth/signup";
interface SessionState {
  test: string
  isLoading: boolean
  setLoading: (isLoading: boolean) => void
  initLogin: (payload: SignUp) => ReturnType<typeof ApiRepository.initLogin>
  signUp: (payload: SignUp) => ReturnType<typeof ApiRepository.signUp>
}

export const useSessionStore = create<SessionState>((set) => ({
    // State
    test: '',
    isLoading: false,

    // Actions
    initLogin: async (payload) => {
        const response = await ApiRepository.initLogin(payload)
        return response
        // const supabase = await createClient();
        // await supabase.auth.signUp(payload)
    },
    signUp: async (payload) => {
        const response = await ApiRepository.signUp(payload)
        return response
    },
    setLoading: (isLoading) => set({ isLoading }),
    // testPost: async () => {
    //     const response = await ApiRepository.testConection()
    //     console.log("Desde la session store: " ,response)
    // }
}))