import React, { forwardRef, useState } from "react";
import type { PasswordInputProps } from "@/types/components/password-input";
import Icon from "@/components/Icons/Icon"


const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  (
    {
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

    return (
      <div className="relative">
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
            // Base
            "block w-full rounded-md border bg-white px-3 py-2 text-sm",
            // Borde y placeholder
            "border-gray-300 placeholder:text-gray-400",
            // Focus visible
            "focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500",
            // Disabled
            "disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed",
            // Espacio para el botón del ojo
            "pr-10",
            className,
          ].join(" ")}
          {...rest}
        />

        <button
          type="button"
          onClick={toggleVisibility}
          className="absolute inset-y-0 right-0 flex items-center px-3 focus:outline-none"
          aria-label={visible ? "Ocultar contraseña" : "Mostrar contraseña"}
          aria-pressed={visible}
          tabIndex={-1}
        >
          <Icon name={visible ? "eye" : "eye_off"} />
        </button>
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";
export default PasswordInput;
