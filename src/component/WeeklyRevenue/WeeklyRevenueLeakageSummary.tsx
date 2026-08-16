import { useMemo, useState } from "react";



import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";

import {
  ArrowDown,
  ArrowUp,
} from "lucide-react";

import { WeeklyRevenueLeakageSummaryData } from "./WeeklyRevenueLeakageSummaryData";
import WeeklyRevenueLeakageSummaryDialog from "./WeeklyRevenueLeakageSummaryDialog";


// ======================================================
// TYPE
// ======================================================

interface LeakageItem {
  id: number;

  label: string;

  amount: number;

  icon: React.ElementType;

  iconColor: string;

  iconBg: string;
}


interface Props {
  weekLabel?: string;

  totalLeakage?: number;

  growth?: number;

  items?: LeakageItem[];

  onViewAll?: () => void;
}


// ======================================================
// CURRENCY
// ======================================================

function formatCurrency(value: number) {

  return `₹ ${new Intl.NumberFormat(
    "en-IN"
  ).format(value)}`;

}


// ======================================================
// COMPONENT
// ======================================================

export default function WeeklyRevenueLeakageSummary({
  growth = 6.8,
  items,
}: Props) {

  // ====================================================
  // DATA
  // ====================================================

  const isPositive = growth >= 0;

  const weekOptions = [
    {
      value: "current",
      label: "Current Week",
    },
    {
      value: "previous",
      label: "Previous Week",
    },
    {
      value: "last4weeks",
      label: "Last 4 Weeks",
    },
  ];

  const [selectedWeek, setSelectedWeek] = useState("current");
  const [leakageDialogOpen, setLeakageDialogOpen] = useState(false);

  // ====================================================
  // selected data
  // ====================================================

  const leakageData = useMemo(() => {
    return (
      WeeklyRevenueLeakageSummaryData[selectedWeek] ??
      WeeklyRevenueLeakageSummaryData.current
    );
  }, [selectedWeek]);

  const leakageItems = useMemo(
    () => items ?? leakageData.items,
    [items, leakageData]
  );

  // ====================================================
  // week label
  // ====================================================

  const weekLabel = useMemo(() => {

  const option = weekOptions.find(
    (item) =>
      item.value === selectedWeek
  );

   return (
    option?.label ??
    "Current Week"
  );

  }, [selectedWeek]);


  // ====================================================
  // RENDER
  // ====================================================

  return (

    <Card
      className="
        w-full
        overflow-hidden
        rounded-sm
        border
        bg-card
        shadow-sm
      "
    >

      {/* =================================================
          HEADER
      ================================================= */}

      <CardHeader
        className="
          px-4
          pb-3
          pt-2
          sm:px-5
          sm:pt-2
        "
      >

        <div
          className="
            flex
            items-center
            justify-between
            gap-3
          "
        >

          {/* TITLE */}

          <div
            className="
              flex
              min-w-0
              flex-wrap
              items-center
              gap-1.5
            "
          >

            <h2
              className="
                text-[22px]
                font-bold
                tracking-tight
                sm:text-[22px]
              "
            >

              Revenue Leakage Summary

            </h2>


            <span
              className="
                text-[16px]
                font-medium
                text-muted-foreground
                sm:text-[16px]
              "
            >

              ({weekLabel})

            </span>

          </div>

            {/* =============================================
              CONTROLS
            ============================================= */}

            <div className="flex items-center justify-between gap-10
            sm:justify-end">

                {/* WEEK SELECT */}

                <Select value={selectedWeek}
                onValueChange={(value) => {
                    if (value) {
                        setSelectedWeek(value);
                    }
                }}>
                    <SelectTrigger className="h-9 w-36.25 rounded-sm text-xs
                    sm:text-sm">
                        <SelectValue />

                    </SelectTrigger>

                    <SelectContent>
                        {weekOptions.map(
                            (item) => (
                                <SelectItem key={item.value}
                                value={item.value}>
                                   {item.label}
                                </SelectItem>
                            )
                        )}
                    </SelectContent>
                </Select>



              {/* VIEW ALL */}

               <Button
                variant="link"
                size="sm"
                  onClick={() => setLeakageDialogOpen(true)}
                className="
                h-8
                shrink-0
                px-1
                text-xs
                font-medium
                text-blue-600
                hover:text-blue-800 transition-all duration-300 ease-in
                sm:text-sm"
                >

                  View All

                </Button>

          </div>

        </div>

      </CardHeader>


      {/* =================================================
          CONTENT
      ================================================= */}

      <CardContent
        className="
          px-4
          pb-4
          pt-1
          sm:px-5
          sm:pb-5
        "
      >

        {/* =================================================
            LEAKAGE CONTAINER
        ================================================= */}

        <div
          className="
            rounded-sm
            border
            border-red-100
            bg-linear-to-br
            from-red-50/90
            via-rose-50/60
            to-background
            p-4
            sm:p-5
          "
        >

          {/* ===============================================
              SUMMARY HEADER
          =============================================== */}

          <div
            className="
              flex
              flex-col
              gap-3
              sm:flex-row
              sm:items-start
              sm:justify-between
              pb-2
            "
          >

            {/* TOTAL */}

            <div>

              <p
                className="
                  text-xs
                  font-medium
                  text-muted-foreground
                  sm:text-sm
                "
              >

                Total Leakage Amount

              </p>


              <div
                className="
                  mt-1
                  flex
                  items-center
                  gap-1.5
                "
              >

                <p
                  className="
                    text-xl
                    font-bold
                    tracking-tight
                    text-[#1e3a8a]
                    sm:text-2xl
                  "
                >

                  {formatCurrency(
                       leakageData.totalLeakage
                    )}

                </p>

              </div>

            </div>


            {/* GROWTH */}

            <div
              className="
                flex
                items-center
                gap-2
                self-start
                sm:pt-1
              "
            >

              <div
                className={`
                  flex
                  items-center
                  gap-1
                  text-xs
                  font-semibold
                  sm:text-sm
                  ${
                    isPositive
                      ? "text-red-600"
                      : "text-emerald-600"
                  }
                `}
              >

                {isPositive ? (

                  <ArrowUp
                    className="
                      h-3.5
                      w-3.5
                      sm:h-4
                      sm:w-4
                    "
                    strokeWidth={2.5}
                  />

                ) : (

                  <ArrowDown
                    className="
                      h-3.5
                      w-3.5
                      sm:h-4
                      sm:w-4
                    "
                    strokeWidth={2.5}
                  />

                )}


                {isPositive
                  ? "+"
                  : ""}

                {leakageData.growth.toFixed(1)}%

              </div>


              <span
                className="
                  text-xs
                  text-muted-foreground
                  sm:text-sm
                "
              >

                vs Previous Week

              </span>

            </div>

          </div>


          {/* =================================================
              DIVIDER
          ================================================= */}

          <div
            className="
              my-4
              border-t
              border-red-100
            "
          />


          {/* =================================================
              LEAKAGE ITEMS
          ================================================= */}

          <div
            className="
              grid
              grid-cols-1
              gap-1
            "
          >

            {leakageItems.map(
              (item) => {

                const Icon = item.icon;


                return (

                  <div
                    key={item.id}
                    className="
                      group
                      flex
                      min-w-0
                      items-center
                      justify-between
                      gap-3
                      rounded-lg
                      px-1
                      py-2
                      transition-colors
                      hover:bg-white/70
                    "
                  >

                    {/* LEFT */}

                    <div
                      className="
                        flex
                        min-w-0
                        items-center
                        gap-3
                      "
                    >

                      {/* ICON */}

                      <div
                        className="{`
                          flex
                          h-7
                          w-7
                          shrink-0
                          items-center
                          justify-center
                          rounded-md
                          border
                          border-red-100
                          bg-white/80
                          ${item.iconBg} `}
                        "
                      >

                        <Icon
                          className="{`
                            h-3.5
                            w-3.5
                            text-red-500
                            sm:h-4
                            sm:w-4
                           ${item.iconColor} `}"
                          strokeWidth={2}
                        />

                      </div>


                      {/* LABEL */}

                      <span
                        className="
                          truncate
                          text-xs
                          font-medium
                          text-slate-600
                          sm:text-sm
                        "
                      >

                        {item.label}

                      </span>

                    </div>


                    {/* AMOUNT */}

                    <span
                      className="
                        shrink-0
                        whitespace-nowrap
                        text-xs
                        font-semibold
                        text-[#1e3a8a]
                        sm:text-sm
                      "
                    >

                    {formatCurrency(
                       item.amount
                    )}

                    </span>

                  </div>

                );

              }
            )}

          </div>

        </div>

      </CardContent>

      <WeeklyRevenueLeakageSummaryDialog open={leakageDialogOpen}
       onOpenChange={setLeakageDialogOpen}
       items={leakageData.items}
       totalLeakage={leakageData.totalLeakage}
       growth={leakageData.growth} weekLabel={weekLabel} />

    </Card>

  );

}