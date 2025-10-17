import { InputHTMLAttributes } from "react";

export type PasswordInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> & {
  placeholder?: string;
  value?: string;
  defaultValue?: string;
};
