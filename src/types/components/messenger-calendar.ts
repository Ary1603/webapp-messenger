import { InputHTMLAttributes } from "react";

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