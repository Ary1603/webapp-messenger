import { InputHTMLAttributes } from "react";
import type { textAlignment } from "../const/text-alignment";

export type MessengerInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> &{
    align?: textAlignment;
    label?: string
    placeholder?: string
    value?: string
    defaultValue?: string
}