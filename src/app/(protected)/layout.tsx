// src/app/(protected)/chats/layout.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mi App',
  description: 'Ejemplo con Next.js y TypeScript',
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="bg-blueLightest min-h-dvh flex flex-col items-center justify-center text-center">
      <header>WebApp Messenger desde chats</header>
      <main>{children}</main>
    </div>
  )
}