import React, { memo } from "react";
import type { ConversationSearchContentProps } from "@/types/components/search-chats-content";
import Avatar from "../avatar/Avatar";
import { useI18n } from "../language/LanguageProvider";

const ConversationSearchContent = memo(function ConversationSearchContent({
  searchedData,
  onChatClick,
  emptyDescription,
  className = "",
}: ConversationSearchContentProps) {
  const { messages } = useI18n();

  if (!messages) return null;

  {/* Empty state */}
  if (!searchedData) {
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
    <div className="px-6 pt-5">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
          {messages.users}
        </p>
      </div>
      <div className="mt-3 h-px w-full bg-gray-100" />
      <div className="w-full pt-4">
        {/* Users section */}
        <div className="space-y-3">
          {searchedData.users.map((user) => (
            <div key={user.id} className="flex items-center gap-3" onClick={() => onChatClick(user)}>
              {/* Avatar */}
              <Avatar src={user.avatar_url} alt={user.username} size={40} />

              {/* Username / Fullname */}
              <div className="flex items-center">
                <p className="text-sm font-medium text-gray-900">
                  {user.full_name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <pre>{JSON.stringify(searchedData, null, 2)}</pre>;
    </div>
  );
});

export default ConversationSearchContent;
