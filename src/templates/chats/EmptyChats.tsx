import React, { forwardRef } from "react";
import Image from "next/image";

interface EmptyChatsProps {
  onStartConversation?: () => void;
  className?: string;
}

export const EmptyChats = forwardRef<HTMLDivElement, EmptyChatsProps>(
  function EmptyChats({ onStartConversation, className }, ref) {
    return (
      <div
        ref={ref}
        className={`${
          className ?? ""
        } h-full flex flex-col items-center justify-center p-6 text-center bg-gray-50`}
      >
        {/* Imagen ilustrativa */}
        <Image
          src="/img/chat.svg"
          alt="Sin conversaciones"
          width={260}
          height={260}
          priority
          className="mb-6"
        />

        {/* Título */}
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          Aún no tienes chats
        </h2>

        {/* Descripción */}
        <p className="text-sm text-gray-500 max-w-xl mb-6 leading-relaxed">
          Inicia una conversación y comienza a chatear con tus contactos de
          forma rápida y sencilla.
        </p>

        {/* Acción principal */}
        <button
          type="button"
          onClick={() => onStartConversation?.()}
          className="px-5 py-3 rounded-lg bg-blue-600 text-white text-sm font-medium cursor-pointer transition-colors duration-200 hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        >
          Iniciar conversación
        </button>
      </div>
    );
  }
);

export default EmptyChats;
