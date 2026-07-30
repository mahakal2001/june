import * as React from "react";
import { addDays, format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { type DateRange } from "react-day-picker"

import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"


import { Calendar } from "@/components/ui/calendar";
import { Field, FieldLabel } from "@/components/ui/field";

export default function DateRangePicker() {
 {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), 0, 20),
    to: addDays(new Date(new Date().getFullYear(), 0, 20), 20),
  })
  return (
    <Field className="mx-auto w-auto">
      <FieldLabel htmlFor="date-picker-range" className="text-slate-600 font-semibold">Date Range</FieldLabel>
      <Popover>
        <PopoverTrigger render={<Button variant="outline" id="date-picker-range" className="w-auto justify-start px-2.5 font-normal rounded-sm shadow-sm
            focus:ring-2 focus:ring-blue-200 w-auto bg-white text-sm font-medium text-slate-700">{date?.from ? (
            date.to ? (
              <>
                {format(date.from, "dd LLL y")} -{" "}
                {format(date.to, "dd LLL y")}
              </>
            ) : (
              format(date.from, "dd LLL y")
            )
          ) : (
            <span>Pick a date</span>
          )}
          <CalendarIcon className="h-4 w-4 shrink-0 text-muted-foreground" />
          </Button>} />
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </Field>
  )
}
}