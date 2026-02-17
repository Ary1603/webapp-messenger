import React from "react";

export interface SearchInputProps {
    value?: string;
    onChange: (value: string) => void;
    onFocus?: () => void;
    onBlur?: () => void;
    placeholder?: string;
    rightIcon?: React.ReactNode;
    ariaLabel?: string;
    disabled?: boolean;
    className?: string;
}