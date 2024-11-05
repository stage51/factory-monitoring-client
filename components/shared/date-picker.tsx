"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DatePickerProps {
  value: Date | undefined;
  className?: string;
  placeholder?: string;
}

export function DatePicker({
  value,
  className,
  placeholder = "Выберите дату",
}: DatePickerProps) {
  const [date, setDate] = React.useState<Date>()

  React.useEffect(() => {
    setDate(value);
  }, [value]);

  const handleDateChange = (newDate: Date | undefined) => {
    setDate(newDate);
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover modal>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-auto justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "LLL dd, y") : <span>{placeholder}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            defaultMonth={date}
            selected={date}
            onSelect={handleDateChange}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
