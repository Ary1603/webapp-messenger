import { memo, useState } from "react";
import Image from "next/image";
import type { AvatarProps } from "@/types/components/avatar";
import Icon from "../Icons/Icon";

const Avatar = memo(function Avatar({
  src,
  alt,
  size = 40,
  width,
  height,
  className = "",
}: AvatarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const avatarWidth = width ?? size;
  const avatarHeight = height ?? size;

  // Generate deterministic color based on alt (so it doesn't change on re-render)
  const colorVariants = [
    { bg: "bg-red-100", text: "text-red-700" },
    { bg: "bg-blue-100", text: "text-blue-700" },
    { bg: "bg-green-100", text: "text-green-700" },
    { bg: "bg-yellow-100", text: "text-yellow-700" },
    { bg: "bg-purple-100", text: "text-purple-700" },
    { bg: "bg-pink-100", text: "text-pink-700" },
    { bg: "bg-indigo-100", text: "text-indigo-700" },
    { bg: "bg-teal-100", text: "text-teal-700" },
  ];

  const getColorFromString = (value: string) => {
    let hash = 0;
    for (let i = 0; i < value.length; i++) {
      hash = value.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colorVariants[Math.abs(hash) % colorVariants.length];
  };

  const fallbackColors = getColorFromString(alt || "U");

  return (
    <>
      {/* Avatar button */}
      <button
        type="button"
        onClick={() => src && setIsOpen(true)}
        className={`relative overflow-hidden rounded-full ${
          src ? "bg-gray-200" : fallbackColors.bg
        } focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${className}`}
        style={{ width: avatarWidth, height: avatarHeight }}
        aria-label="Open avatar image"
      >
        {src ? (
          <Image
            src={src}
            alt={alt}
            fill
            sizes={`${avatarWidth}px`}
            className="object-cover"
          />
        ) : (
          <span
            className={`flex h-full w-full items-center justify-center text-sm font-semibold ${fallbackColors.text}`}
          >
            {alt.charAt(0).toUpperCase()}
          </span>
        )}
      </button>

      {/* Fullscreen viewer */}
      {isOpen && src && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 z-10 rounded-full p-2 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Close image preview"
          >
            <Icon name="X"/>
          </button>

          {/* Fullscreen image */}
          <div className="relative h-full w-full">
            <Image
              src={src}
              alt={alt}
              fill
              priority
              className="object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
});

export default Avatar;