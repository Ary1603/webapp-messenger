import type { ChatHeaderProps } from "@/types/components/chat-header";
import React, { forwardRef } from "react";
import { Icon } from "../Icons/Icon";
import Avatar from "../avatar/Avatar";

export const ChatHeader = forwardRef<HTMLDivElement, ChatHeaderProps>(
  function ChatHeader({ title, onClickReturn, onOpenChatInfo }, ref) {
    return (
      <header
        ref={ref}
        className="
          flex items-center justify-between
          h-18
          px-3
          border-b border-gray-200
          bg-white
        "
      >
        {/* Left section: back button, avatar, title */}
        <div className="flex items-center gap-3">
          <button
            onClick={onClickReturn}
            className="
              flex items-center justify-center
              rounded-full
              p-1.5
              text-blue-600
              hover:bg-gray-100
              focus:outline-none
              focus-visible:ring-2
              focus-visible:ring-blue-500
            "
            aria-label="Go back"
          >
            <Icon name="ChevronLeft" />
          </button>

          <Avatar alt="Chat avatar" size={36} src={'https://i.pravatar.cc/150?img=21'}/>

          <p className="text-sm font-medium text-gray-900 truncate max-w-[160px]">
            {title}
          </p>
        </div>

        {/* Right section: options */}
        <button
          onClick={onOpenChatInfo}
          className="
            flex items-center justify-center
            rounded-full
            p-1.5
            text-blue-600
            hover:bg-gray-100
            focus:outline-none
            focus-visible:ring-2
            focus-visible:ring-blue-500
          "
          aria-label="Open chat options"
        >
          <Icon name="Ellipsis" size={25}/>
        </button>
      </header>
    );
  }
);
