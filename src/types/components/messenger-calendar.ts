import { InputHTMLAttributes } from "react";
//import type { textAlignment } from "../const/text-alignment";

type CalendarAlignment = 'start' | 'center' | 'end' | undefined;

export type MessengerCalendarProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> &{
    align?: CalendarAlignment
    label?: string
    errorSpan?: string
    placeholder?: string
    defaultValue?: Date
}