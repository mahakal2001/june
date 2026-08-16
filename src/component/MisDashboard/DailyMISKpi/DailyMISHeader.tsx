import {
  CalendarDays,
  RefreshCcw,
} from "lucide-react";

import { Button } from "@/components/ui/button";

export default function DailyMISHeader() {

  const today = new Date();

  return (

    <div className="mb-8">

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

        <div>

          <h1 className="text-3xl font-bold tracking-tight">

            Daily MIS Dashboard

          </h1>

          <p className="text-muted-foreground mt-1">

            Daily hospital operational analytics and financial summary.

          </p>

        </div>

        <div className="flex items-center gap-3">

          <div className="flex items-center gap-2 rounded-xl border bg-white px-4 py-2 shadow-sm">

            <CalendarDays className="h-5 w-5 text-blue-600"/>

            <span className="font-medium">

              {today.toLocaleDateString("en-IN",{
                weekday:"long",
                day:"numeric",
                month:"long",
                year:"numeric",
              })}

            </span>

          </div>

          <Button>

            <RefreshCcw className="mr-2 h-4 w-4"/>

            Refresh

          </Button>

        </div>

      </div>

    </div>

  );

}