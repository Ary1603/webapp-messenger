'use client'

import { useI18n } from "@/components/language/LanguageProvider";

export default function AuthLayoutClient({ children }: { children: React.ReactNode }) {
  const { messages } = useI18n();
  if (!messages) return null;

  return (
    <div className="bg-blueLightest min-h-dvh flex flex-col items-center justify-center text-center">
      <header className='mb-8 text-2xl'>{messages.app_name}</header>
      <main>{children}</main>
    </div>
  )
}