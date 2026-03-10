"use client";

import { useEffect } from "react";
import { setTokenProvider } from "@/auth/tokenProvider";
import { useSessionStore } from "@/stores/session/sessionStore";

export function TokenProviderSetup() {
  useEffect(() => {
    setTokenProvider(() => {
      return useSessionStore.getState().session?.access_token ?? null;
    });
  }, []);
  return null;
}
