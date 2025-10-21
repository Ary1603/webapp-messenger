import React, { forwardRef } from "react";
import type { MessengerInputProps } from "@/types/components/messenger-inputs";

const MessengerInput = forwardRef<HTMLInputElement, MessengerInputProps>(
  (
    {
      id,
      value,
      label,
      errorSpan,
      align,
      placeholder,
      defaultValue,
      className = "",
      disabled,
      required,
      ...rest
    },
    ref
  ) => {
    const alignClass =
      align === "left"
        ? "text-left"
        : align === "center"
        ? "text-center"
        : align === "right"
        ? "text-right"
        : "";

    return (
      <div className="flex flex-col w-full space-y-1">
        {label && (
          <label
            htmlFor={id}
            className={[
              "mb-2 text-sm font-medium text-gray-700 dark:text-gray-300",
              alignClass,
            ].join(" ")}
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          required={required}
          defaultValue={defaultValue}
          disabled={disabled}
          value={value}
          placeholder={placeholder}
          className={[
            "w-full rounded-md border border-gray-300 dark:border-gray-600",
            "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100",
            "px-3 py-2 text-sm placeholder-gray-400 focus:outline-none",
            "focus:ring-1 focus:ring-blue-300 focus:border-blue-300",
            "disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed",
            className,
          ].join(" ")}
          type="text"
          {...rest}
        />
        <div className="text-orange-700 text-left p-0 pl-1 text-sm">
          <span>{ errorSpan }</span>
        </div>
      </div>
    );
  }
);

MessengerInput.displayName = "MessengerInput";
export default MessengerInput;
