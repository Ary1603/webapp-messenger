import React, { memo, ChangeEvent } from "react";
import type { SearchInputProps } from "@/types/components/search-input";

const SearchInput = memo(function SearchInput({
  value = "",
  onChange,
  onBlur,
  onFocus,
  placeholder = "Search...",
  rightIcon,
  ariaLabel = "Search input",
  disabled = false,
  className = "",
}: SearchInputProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div
      className={`relative flex items-center ${className}`}
      aria-disabled={disabled}
    >
      <input
        type="search"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        aria-label={ariaLabel}
        disabled={disabled}
        className="
          w-full
          rounded-full
          border
          border-gray-200
          bg-gray-100
          px-4
          py-2.5
          pr-11
          text-sm
          text-gray-900
          placeholder-gray-400
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
          focus:border-transparent
          transition
          disabled:cursor-not-allowed
          disabled:bg-gray-200
        "
        onFocus={onFocus}
        onBlur={onBlur}
      />

      {rightIcon && (
        <div className="absolute right-3 flex items-center text-gray-400 pointer-events-none">
          {rightIcon}
        </div>
      )}
    </div>
  );
});

export default SearchInput;
