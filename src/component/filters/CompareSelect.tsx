import { useState } from "react";
import { format, subDays, subMonths, subYears } from "date-fns";
import { Field,FieldLabel } from "@/components/ui/field";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const compareOptions = [
  {
    value: "previous-day",
    label: "Previous Day",
  },
  {
    value: "previous-week",
    label: "Previous Week",
  },
  {
    value: "previous-month",
    label: "Previous Month",
  },
  {
    value: "previous-year",
    label: "Previous Year",
  },
];

function getCompareRange(value: string) {
  const today = new Date();

  switch (value) {
    case "previous-day": {
      const previousDay = subDays(today, 1);

      return `${format(previousDay, "dd MMM yyyy")} - ${format(
        previousDay,
        "dd MMM yyyy"
      )}`;
    }

    case "previous-week": {
      const start = subDays(today, 7);
      const end = subDays(today, 1);

      return `${format(start, "dd MMM yyyy")} - ${format(
        end,
        "dd MMM yyyy"
      )}`;
    }

    case "previous-month": {
      const previousMonth = subMonths(today, 1);

      return format(previousMonth, "MMM yyyy");
    }

    case "previous-year": {
      const previousYear = subYears(today, 1);

      return format(previousYear, "yyyy");
    }

    default:
      return "";
  }
}

export default function CompareSelect() {
  const [compare, setCompare] = useState("previous-day");

  return (
    <Field className="mx-auto w-auto">
      <FieldLabel htmlFor="compare-with" className="text-slate-600 font-semibold">Compare With</FieldLabel>
      
      <Select
        value={compare}
        onValueChange={(value) => setCompare(value ?? "previous-day")}
      >
        <SelectTrigger
          className="w-auto px-2.5 font-normal bg-white text-sm rounded-sm font-medium text-slate-700
            shadow-sm focus:ring-2 focus:ring-blue-200">
          <SelectValue>
            {getCompareRange(compare)}
          </SelectValue>
        </SelectTrigger>

        <SelectContent>
          {compareOptions.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </Field>
  );
}