// src/app/(protected)/layout.tsx
'use client'

import { useEffect } from 'react'
import { useSessionStore } from '@/stores/session/sessionStore'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    // “Tocar” el store y mantener una suscripción no-op
    // Esto NO re-renderiza el layout; solo asegura que el store vive en cliente.
    useSessionStore.getState() // accede una vez al estado actual
    const unsub = useSessionStore.subscribe(() => {})
    return unsub
  }, [])

  return (
    <div className="">
      {children}
    </div>
  )
}