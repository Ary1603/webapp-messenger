import React, { forwardRef } from "react";
import type { MessengerButtonProps } from "@/types/components/messenger-button";
import type { GeneralSizes } from "@/types/const/general-size";

const MessengerButton = forwardRef<HTMLButtonElement, MessengerButtonProps>(
  (
    { label, size = "md" as GeneralSizes, disabled, className = "", ...props },
    ref
  ) => {
    const sizeStyles: Record<GeneralSizes, string> = {
      sm: "px-3 py-2 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-6 py-3 text-lg",
    };

    const baseStyles =
      "inline-flex items-center justify-center rounded-full font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 cursor-pointer";

    const colorStyles = disabled
      ? "bg-gray-300 text-gray-600 cursor-not-allowed"
      : "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 focus:ring-blue-500";

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={`${baseStyles} ${sizeStyles[size]} ${colorStyles} ${className}`}
        {...props}
      >
        {label}
      </button>
    );
  }
);

MessengerButton.displayName = "MessengerButton";

export default MessengerButton;
