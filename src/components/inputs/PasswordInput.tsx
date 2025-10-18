import React, { forwardRef, useState } from "react";
import type { PasswordInputProps } from "@/types/components/password-input";
import Icon from "@/components/Icons/Icon";

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  (
    {
      label,
      align,
      placeholder,
      value,
      defaultValue,
      onChange,
      id,
      name,
      className = "",
      disabled,
      required,
      autoComplete,
      ...rest
    },
    ref
  ) => {
    const [visible, setVisible] = useState(false);

    const toggleVisibility = () => setVisible((v) => !v);

    const alignClass =
      align === "left"
        ? "text-left"
        : align === "center"
        ? "text-center"
        : align === "right"
        ? "text-right"
        : "";

    return (
      <div className={["relative", className].join(" ")}>
        {label && (
          <label
            htmlFor={id}
            className={[
              "block w-full mb-2",
              "text-sm font-medium text-gray-700 dark:text-gray-300",
              alignClass,
            ].join(" ")}
          >
            {label}
          </label>
        )}

        <div className="relative">
          {" "}
          {/* 👈 nuevo contenedor solo para el input y el botón */}
          <input
            ref={ref}
            id={id}
            name={name}
            type={visible ? "text" : "password"}
            placeholder={placeholder}
            value={value}
            defaultValue={defaultValue}
            onChange={onChange}
            disabled={disabled}
            required={required}
            autoComplete={autoComplete}
            className={[
              "block w-full rounded-md border bg-white px-3 py-2 text-sm",
              "border-gray-300 placeholder:text-gray-400",
              "focus:outline-none focus:ring-1 focus:ring-blue-300 focus:border-blue-300",
              "disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed",
              "pr-10",
            ].join(" ")}
            {...rest}
          />
          <button
            type="button"
            onClick={toggleVisibility}
            className="absolute inset-y-0 right-3 flex items-center justify-center focus:outline-none"
            aria-label={visible ? "Ocultar contraseña" : "Mostrar contraseña"}
            aria-pressed={visible}
            tabIndex={-1}
          >
            <Icon size={18} name={visible ? "eye" : "eye_off"} />
          </button>
        </div>
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";
export default PasswordInput;
