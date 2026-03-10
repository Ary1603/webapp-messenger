"use client";

function ChatItemSkeleton() {
  return (
    <div className="flex items-center gap-3 px-4 py-3">
      {/* Avatar */}
      <div className="h-12 w-12 rounded-full bg-gray-200 animate-pulse" />

      {/* Text content */}
      <div className="flex-1 space-y-2">
        <div className="h-4 w-1/3 rounded bg-gray-200 animate-pulse" />
        <div className="h-3 w-2/3 rounded bg-gray-100 animate-pulse" />
      </div>
    </div>
  );
}

function SearchInputSkeleton() {
  return (
    <div className="px-3 mt-3">
      <div className="h-10 w-full rounded-lg bg-gray-200 animate-pulse" />
    </div>
  );
}

function HeaderSkeleton() {
  return (
    <div className="flex items-center justify-between px-4 py-4 border-b">
      <div className="h-6 w-32 rounded bg-gray-200 animate-pulse" />
      <div className="h-8 w-8 rounded-full bg-gray-200 animate-pulse" />
    </div>
  );
}

export default function ChatsSkeletonPage() {
  return (
    <div className="flex h-screen flex-col bg-white">
      {/* Header */}
      <HeaderSkeleton />

      {/* Search */}
      <SearchInputSkeleton />

      {/* Chat list */}
      <div className="flex-1 overflow-hidden mt-5">
        <div className="space-y-2">
          {Array.from({ length: 8 }).map((_, index) => (
            <ChatItemSkeleton key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}