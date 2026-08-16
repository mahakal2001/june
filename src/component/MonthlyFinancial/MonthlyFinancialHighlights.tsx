import {
  useMemo,
  useState,
} from "react";

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

import {
  ArrowDown,
  ArrowUp,
} from "lucide-react";

import { MonthlyFinancialHighlightsData } from "./MonthlyFinancialHighlightsData";
import './MonthlyFinancialHighlights.css';



// ======================================================
// Month options
// ======================================================

const monthOptions = [
  {
    value: "May, 2026",
    label: "May, 2026",
  },

  {
    value: "April, 2026",
    label: "April, 2026",
  },

  {
    value: "March, 2026",
    label: "March, 2026",
  },
];


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

export default function MonthlyFinancialHighlights() {
  
  // ====================================================
  //  Component state
  // ====================================================

  const [selectedMonth, setSelectedMonth] =
  useState("May, 2026");

  const financialData = useMemo(() => {

  return (
    MonthlyFinancialHighlightsData[
      selectedMonth
    ] ??
    []
  );

  }, [selectedMonth]);

  const monthLabel = useMemo(() => {

  const option = monthOptions.find(
    (item) =>
      item.value === selectedMonth
  );

  return (
    option?.label ??
    "Current Month"
  );

  }, [selectedMonth]);


  // ====================================================
  // RENDER
  // ====================================================

  return (

    <Card
      className="monthlyFinance-card
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
          px-5
          pb-3
          pt-4
          sm:px-6
          sm:pt-5
        "
      >

        <div
          className="
            flex
            flex-wrap justify-between
            items-center
            gap-1.5
          "
        >

           <div className="card-headerTitle flex
            flex-wrap
            items-center
            gap-1.5">
             <h2
            className="
              text-base
              text-[22px]
              font-bold
              tracking-tight
              sm:text-[22px]
            "
          >

            Financial Highlights

          </h2>


          <span
            className="
              text-[16px]
              text-muted-foreground
              sm:text-[16px]
            "
          >

            ({monthLabel})

          </span>
           </div>

            {/* Month SELECT */}

            <Select value={selectedMonth}
            onValueChange={(value) => {
                if (value) {
                    setSelectedMonth(value);
                }
            }}>
              <SelectTrigger className="h-9 w-36.25
              rounded-sm text-xs sm:text-sm">  

                <SelectValue /> 

              </SelectTrigger>

               <SelectContent>
                {monthOptions.map(
                    (item) => (

                        <SelectItem key={item.value}
                        value={item.value}>
                            {item.label}
                        </SelectItem>
                    )
                )}
               </SelectContent>
            </Select>

        </div>


        <p
          className="
            mt-1
            text-xs
            text-muted-foreground
            sm:text-sm
          "
        >

          Key financial performance indicators
          for the selected month

        </p>


      </CardHeader>


      {/* =================================================
          CONTENT
      ================================================= */}

      <CardContent
        className="MFinancial-content
          px-5
          pb-5
          pt-2
          sm:px-6
          sm:pb-6
        "
      >

        <div
          className="MFinancial-Grid
            grid
            grid-cols-1
            gap-x-8
            gap-y-5
            sm:grid-cols-2
            sm:gap-x-10
            sm:gap-y-6
          "
        >

          {financialData.map(
            (item) => {

              const Icon =
                item.icon;

              const isPositive =
                item.change >= 0;


              return (

                <div
                  key={item.id}
                  className="
                    flex
                    min-w-0
                    items-center
                    gap-3
                    rounded-lg
                    p-1
                    transition-colors
                    hover:bg-muted/30
                    sm:gap-4
                  "
                >

                  {/* ====================================
                      ICON
                  ==================================== */}

                  <div
                    className={`
                      flex
                      h-11
                      w-11
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      ${item.iconBg}
                      sm:h-12
                      sm:w-12
                    `}
                  >

                    <Icon
                      className={`
                        h-5
                        w-5
                        ${item.iconColor}
                        sm:h-5.25
                        sm:w-5.25
                      `}
                      strokeWidth={2}
                    />

                  </div>


                  {/* ====================================
                      CONTENT
                  ==================================== */}

                  <div
                    className="
                      min-w-0
                      flex-1
                    "
                  >

                    {/* TITLE */}

                    <p
                      className="
                        truncate
                        text-xs
                        font-medium
                        text-muted-foreground
                        sm:text-sm
                      "
                    >

                      {item.title}

                    </p>


                    {/* VALUE */}

                    <p
                      className="
                        mt-0.5
                        whitespace-nowrap
                        text-base
                        font-bold
                        tracking-tight
                        text-[#1e3a8a]
                        sm:text-lg
                      "
                    >

                      {formatCurrency(
                        item.value
                      )}

                    </p>


                    {/* CHANGE */}

                    <div
                      className="
                        mt-1
                        flex
                        items-center
                        gap-1
                      "
                    >

                      {isPositive ? (

                        <ArrowUp
                          className="
                            h-3
                            w-3
                            text-emerald-500
                            sm:h-3.5
                            sm:w-3.5
                          "
                          strokeWidth={2.5}
                        />

                      ) : (

                        <ArrowDown
                          className="
                            h-3
                            w-3
                            text-red-500
                            sm:h-3.5
                            sm:w-3.5
                          "
                          strokeWidth={2.5}
                        />

                      )}


                      <span
                        className={`
                          text-[10px]
                          font-semibold
                          sm:text-xs
                          ${item.changeColor}
                        `}
                      >

                        {isPositive
                          ? "+"
                          : ""}

                        {item.change.toFixed(
                          1
                        )}%

                      </span>


                      <span
                        className="
                          ml-0.5
                          text-[10px]
                          text-muted-foreground
                          sm:text-xs
                        "
                      >

                        vs Previous Month

                      </span>

                    </div>

                  </div>

                </div>

              );

            }
          )}

        </div>

      </CardContent>

    </Card>

  );

}