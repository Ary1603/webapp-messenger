import Image from "next/image";
import React, { memo } from "react";
import type { ConversationSearchContentProps } from "@/types/components/search-chats-content";

const ConversationSearchContent = memo(function ConversationSearchContent({
  chats,
  onChatClick,
  emptyDescription = "No chats found",
  className = "",
}: ConversationSearchContentProps) {
  // Empty state
  if (chats.length === 0) {
    return (
      <div
        className={`flex flex-col items-center justify-center gap-3 py-10 text-gray-500 ${className}`}
        role="status"
        aria-live="polite"
      >
        {/* Icon */}
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
          <span className="text-xl">🔍</span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-500 text-center">{emptyDescription}</p>
      </div>
    );
  }

  return (
    <ul className={`flex flex-col ${className}`} role="list">
      {chats.map((chat) => (
        <li key={chat.id}>
          <button
            type="button"
            onClick={() => onChatClick(chat.id)}
            className="
              flex w-full items-center gap-3
              px-3 py-2
              rounded-lg
              text-left
              hover:bg-gray-100
              focus:outline-none
              focus-visible:ring-2
              focus-visible:ring-blue-500
              transition
            "
          >
            {/* Avatar */}
            <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gray-200">
              {chat.photoUrl ? (
                <Image
                  width={14}
                  height={14}
                  src={chat.photoUrl}
                  alt={`${chat.name} avatar`}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-sm font-medium text-gray-600">
                  {chat.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>

            {/* Chat name */}
            <span className="truncate text-sm font-medium text-gray-900">
              {chat.name}
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
});

export default ConversationSearchContent;
