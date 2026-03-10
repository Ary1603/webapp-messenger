"use client"

import React, { forwardRef, useId, useMemo, useState } from "react";
import { ChevronDownIcon } from "lucide-react"
import type { MessengerCalendarProps } from "@/types/components/messenger-calendar";
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const MessengerCalendar = forwardRef<HTMLInputElement, MessengerCalendarProps>(
  (
    {
      id,
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
  const [open, setOpen] = useState(false)

  // Generate a stable id if not provided
  const generatedId = useId()
  const fieldId = id ?? generatedId

  // Support controlled (via rest.value) and uncontrolled (via defaultValue) usage
  type ChangeHandler = (d?: Date) => void

  const extractOnChange = (obj: object): ChangeHandler | undefined => {
    const candidate = (obj as Record<string, unknown>).onChange
    return typeof candidate === "function" ? (candidate as ChangeHandler) : undefined
  }

  const maybeValueUnknown = (rest as Record<string, unknown>).value
  const isControlled = typeof maybeValueUnknown !== "undefined"
  const controlledDate = maybeValueUnknown instanceof Date ? maybeValueUnknown : undefined

  const [uncontrolledDate, setUncontrolledDate] = useState<Date | undefined>(defaultValue)
  const selectedDate: Date | undefined = isControlled ? controlledDate : uncontrolledDate

  const onChangeHandler = extractOnChange(rest)

  const setSelectedDate = (d?: Date) => {
    if (!isControlled) setUncontrolledDate(d)
    onChangeHandler?.(d)
  }

  const formattedDate = useMemo(() => (
    selectedDate ? selectedDate.toLocaleDateString() : undefined
  ), [selectedDate])

  return (
    <div id={fieldId} className={`flex flex-col gap-3 ${className ?? ""}`}>
      {label && (
        <Label htmlFor={`${fieldId}-button`} className="px-1">
          {label}
        </Label>
      )}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id={`${fieldId}-button`}
            className="w-48 justify-between font-normal"
            aria-haspopup="dialog"
            aria-expanded={open}
            disabled={disabled}
            onClick={() => setOpen(!open)}
          >
            {formattedDate ?? placeholder}
            <ChevronDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align={align ?? "start"}>
          <Calendar
            mode="single"
            selected={selectedDate}
            captionLayout="dropdown"
            onSelect={(d) => {
              setSelectedDate(d)
              setOpen(false)
            }}
            // spread any Calendar-specific props passed via rest.calendarProps if provided in the future
          />
        </PopoverContent>
      </Popover>

      {/* Hidden input to integrate with HTML forms; keeps ref on an input element */}
      <input
        type="hidden"
        id={`${fieldId}-input`}
        name={fieldId}
        value={selectedDate ? selectedDate.toISOString() : ""}
        required={required}
        disabled={disabled}
        readOnly
        ref={ref}
      />

      {errorSpan && (
        <span className="px-1 text-sm text-destructive" role="alert">
          {errorSpan}
        </span>
      )}
    </div>
  )
  }
);

MessengerCalendar.displayName = "MessengerCalendar";
export default MessengerCalendar;