import { InputHTMLAttributes } from "react";
import type { textAlignment } from "../const/text-alignment";

export type PasswordInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> & {
  align?: textAlignment;
  label?: string;
  errorSpan?: string,
  placeholder?: string;
  value?: string;
  defaultValue?: string;
};
