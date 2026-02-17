import React, { forwardRef } from "react";
import Icon from "../Icons/Icon";
import { useI18n } from "@/components/language/LanguageProvider";
import type { ChatsHeaderProps } from "@/types/components/chats-header";

export const ChatsHeader = forwardRef<HTMLDivElement, ChatsHeaderProps>(
  function ChatHeader(
    {
      title,
      onCreateNewChat,
      onOpenConfig,
      className,
      hideActions = false,
    },
    ref
  ) {
    const { messages } = useI18n();

    if (!messages) return null;

    return (
      <header
        ref={ref}
        role="banner"
        className={[
          "chat-header",
          // Estilos por defecto (puedes mapear a tu sistema de diseño o Tailwind, etc.)
          // Layout
          "flex items-center justify-between",
          // Espaciado y dimensiones
          "px-4 py-3",
          // Borde/base
          "border-b",
          // Colores neutros por defecto (que tu tema sobrescriba)
          "bg-white text-neutral-900 border-neutral-200",
          // Soporte de modo oscuro si existiera
          "dark:bg-neutral-900 dark:text-neutral-50 dark:border-neutral-800",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {/* IZQUIERDA: Logo/Marca */}
        <div className="chat-header__logo flex items-center min-w-0">
          <span
            className="truncate font-semibold text-lg tracking-tight select-none"
            aria-label={`${title}, página principal`}
          >
            {title}
          </span>
        </div>

        {/* DERECHA: Acciones */}
        {!hideActions && (
          <div className="chat-header__actions flex items-center gap-3">
            <button
              onClick={onOpenConfig}
            >
              <Icon name="Cog" />
            </button>

            <button
              onClick={onCreateNewChat}
            >
              <Icon name="SquarePen" />
            </button>
          </div>
        )}
      </header>
    );
  }
);



export default ChatsHeader;
