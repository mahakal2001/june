import { useMemo, useState } from "react";

import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";

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

import RevenueEmptyState from "@/component/RevenueExceptions/RevenueEmptyState";
import { MonthlyTopProcedureData } from "./MonthlyTopProduresData";
import MonthlyTopProceduresDialog from "./MonthlyTopProceduresDialog";

// ======================================================
// WEEK OPTIONS
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

export default function MonthlyTopProceduresTable() {
    

  // ====================================================
  // STATE
  // ====================================================

  const [selectedMonth, setSelectedMonth] =
    useState("May, 2026");


  const [viewAll, setViewAll] =
    useState(false);

  const [procedureDialogOpen, setProcedureDialogOpen] =
  useState(false);


  // ====================================================
  // PROCEDURE DATA
  // ====================================================

  const procedureData = useMemo(() => {

    return (
      MonthlyTopProcedureData[
        selectedMonth
      ] ??
      []
    );

  }, [selectedMonth]);


  // ====================================================
  // WEEK LABEL
  // ====================================================

  const monthLabel = useMemo(() => {

    const option =
      monthOptions.find(
        (item) =>
          item.value === selectedMonth
      );

    return (
      option?.label ??
      "May, 2026"
    );

  }, [selectedMonth]);


  // ====================================================
  // DISPLAY DATA
  // ====================================================

  const displayedProcedures =
    viewAll
      ? procedureData
      : procedureData.slice(0, 5);


  // ====================================================
  // RENDER
  // ====================================================

  return (

    <Card
      className="Monthlyprocedure-Card
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
          pt-1
          sm:px-6
          sm:pt-1
        "
      >

        <div
          className="
            flex
            flex-col
            gap-3
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >

          {/* =============================================
              TITLE
          ============================================= */}

          <div>

            <div
              className="
                flex
                flex-wrap
                items-center
                gap-1.5
              "
            >

              <h2
                className="
                  text-[22px]
                  text-base
                  font-bold
                  tracking-tight
                  sm:text-[22px]
                "
              >
                Top Procedures
              </h2>


              <span
                className="
                  text-[16px]
                  font-normal
                  text-muted-foreground
                  sm:text-[16px]
                "
              >
                ({monthLabel})
              </span>

            </div>


            <p
              className="
                mt-1
                text-xs
                text-muted-foreground
                sm:text-sm
              "
            >
              Procedure-wise performance summary
              for the selected month
            </p>

          </div>


          {/* =============================================
              CONTROLS
          ============================================= */}

          <div
            className="
              flex
              items-center
              justify-between
              gap-10
              sm:justify-end
            "
          >

            {/* WEEK SELECT */}

            <Select
              value={selectedMonth}
              onValueChange={(value) => {

                if (value) {
                  setSelectedMonth(value);
                  setViewAll(false);
                }

              }}
            >

              <SelectTrigger
                className="
                  h-9
                  w-36.25
                  rounded-md
                  text-xs
                  sm:text-sm
                "
              >

                <SelectValue />

              </SelectTrigger>


              <SelectContent>

                {monthOptions.map(
                  (item) => (

                    <SelectItem
                      key={item.value}
                      value={item.value}
                    >
                      {item.label}
                    </SelectItem>

                  )
                )}

              </SelectContent>

            </Select>


            {/* VIEW ALL */}

            <Button
              variant="link"
              onClick={() => 
                setProcedureDialogOpen(true)
              }
              className="
                h-9
                shrink-0
                px-1
                text-xs
                font-medium
                text-blue-600
                hover:text-blue-800 transition: ease-in duration-300
                sm:text-sm
              "
            >

              View All

            </Button>

          </div>

        </div>

      </CardHeader>


      {/* =================================================
          TABLE / CONTENT
      ================================================= */}

      <CardContent className="p-0">

        {procedureData.length === 0 ? (

          <div
            className="
              border-t
              px-4
              py-4
              sm:px-6
            "
          >

            <RevenueEmptyState
              message="No procedure metrics found."
              onReset={() => {
                setSelectedMonth("May, 2026");
                setViewAll(false);
              }}
            />

          </div>

        ) : (

          <>
            {/* ===========================================
                DESKTOP / TABLET TABLE
            =========================================== */}

            <div
              className="
                hidden
                w-full
                overflow-x-auto
                md:block
              "
            >

              <Table
                className="Mprocedure-table
                  max-w-155
                "
              >

                {/* =======================================
                    TABLE HEADER
                ======================================= */}

                <TableHeader>

                  <TableRow
                    className="
                      border-y
                      bg-muted/20
                      hover:bg-muted/20
                    "
                  >

                    {/* PROCEDURE */}

                    <TableHead
                      className="
                        pl-6
                        text-xs
                        font-bold
                        text-foreground
                        sm:pl-7
                        sm:text-sm
                      "
                    >
                      Procedure
                    </TableHead>


                    {/* COUNT */}

                    <TableHead
                      className="
                        text-center
                        text-xs
                        font-bold
                        text-foreground
                        sm:text-sm
                      "
                    >
                      Count
                    </TableHead>


                    {/* REVENUE */}

                    <TableHead
                      className="
                        text-center
                        text-xs
                        font-bold
                        text-foreground
                        sm:text-sm
                      "
                    >
                      Revenue (₹)
                    </TableHead>


                    {/* GROWTH */}

                    <TableHead
                      className="
                        pr-6
                        text-center
                        text-xs
                        font-bold
                        text-foreground
                        sm:pr-7
                        sm:text-sm
                      "
                    >
                      Growth %
                    </TableHead>

                  </TableRow>

                </TableHeader>


                {/* =======================================
                    TABLE BODY
                ======================================= */}

                <TableBody>

                  {displayedProcedures.map(
                    (procedure) => (

                      <TableRow
                        key={procedure.id}
                        className="
                          border-b
                          transition-colors
                          hover:bg-blue-50/40
                        "
                      >

                        {/* PROCEDURE */}

                        <TableCell
                          className="Procedure-cell
                            pl-6
                            sm:pl-7
                          "
                        >

                          <span
                            className="
                              whitespace-nowrap
                              text-xs
                              font-semibold
                              text-foreground
                              sm:text-sm
                            "
                          >
                            {procedure.procedure}
                          </span>

                        </TableCell>


                        {/* COUNT */}

                        <TableCell
                          className="count-cell
                            text-center
                          "
                        >

                          <span
                            className="
                              text-xs
                              font-semibold
                              text-[#1e3a8a]
                              sm:text-sm
                            "
                          >
                            {procedure.count.toLocaleString(
                              "en-IN"
                            )}
                          </span>

                        </TableCell>


                        {/* REVENUE */}

                        <TableCell
                          className="Revenue-cell
                            text-center
                          "
                        >

                          <span
                            className="
                              whitespace-nowrap
                              text-xs
                              font-semibold
                              text-[#1e3a8a]
                              sm:text-sm
                            "
                          >
                            {formatCurrency(
                              procedure.revenue
                            )}
                          </span>

                        </TableCell>


                        {/* GROWTH */}

                        <TableCell
                          className="Growth-cell
                            pr-6
                            text-center
                            sm:pr-7
                          "
                        >

                          <div
                            className="
                              flex
                              items-center
                              justify-center
                              font-semibold
                              gap-1
                            "
                          >

                            {procedure.growth >=
                            0 ? (

                              <ArrowUp
                                className="
                                  h-3.5
                                  w-3.5
                                  stroke-[2.5]
                                  text-emerald-500
                                "
                              />

                            ) : (

                              <ArrowDown
                                className="
                                  h-3.5
                                  w-3.5
                                  stroke-[2.5]
                                  text-red-500
                                "
                              />

                            )}


                            <span
                              className={`
                                whitespace-nowrap
                                text-xs
                                font-semibold
                                sm:text-sm
                                ${
                                  procedure.growth >=
                                  0
                                    ? "text-emerald-600"
                                    : "text-red-600"
                                }
                              `}
                            >

                              {procedure.growth >=
                              0
                                ? "+"
                                : ""}

                              {procedure.growth.toFixed(
                                1
                              )}%

                            </span>

                          </div>

                        </TableCell>

                      </TableRow>

                    )
                  )}

                </TableBody>

              </Table>

            </div>


            {/* ===========================================
                MOBILE CARDS
            =========================================== */}

            <div
              className="
                grid
                gap-0
                border-t
                md:hidden
              "
            >

              {displayedProcedures.map(
                (procedure) => (

                  <div
                    key={procedure.id}
                    className="
                      border-b
                      px-4
                      py-3.5
                      transition-colors
                      hover:bg-muted/20
                      last:border-b-0
                    "
                  >

                    {/* CARD HEADER */}

                    <div
                      className="
                        flex
                        items-center
                        justify-between
                        gap-3
                      "
                    >

                      <p
                        className="
                          text-sm
                          font-semibold
                          text-foreground
                        "
                      >
                        {procedure.procedure}
                      </p>


                      {/* GROWTH */}

                      <div
                        className="
                          flex
                          shrink-0
                          items-center
                          gap-1
                        "
                      >

                        {procedure.growth >=
                        0 ? (

                          <ArrowUp
                            className="
                              h-3.5
                              w-3.5
                              text-emerald-500
                            "
                          />

                        ) : (

                          <ArrowDown
                            className="
                              h-3.5
                              w-3.5
                              text-red-500
                            "
                          />

                        )}


                        <span
                          className={`
                            text-xs
                            font-semibold
                            ${
                              procedure.growth >=
                              0
                                ? "text-emerald-600"
                                : "text-red-600"
                            }
                          `}
                        >

                          {procedure.growth >=
                          0
                            ? "+"
                            : ""}

                          {procedure.growth.toFixed(
                            1
                          )}%

                        </span>

                      </div>

                    </div>


                    {/* MOBILE METRICS */}

                    <div
                      className="
                        mt-2.5
                        grid
                        grid-cols-2
                        gap-3
                      "
                    >

                      {/* COUNT */}

                      <div>

                        <p
                          className="
                            text-[11px]
                            text-muted-foreground
                          "
                        >
                          Count
                        </p>

                        <p
                          className="
                            mt-0.5
                            text-sm
                            font-semibold
                            text-[#1e3a8a]
                          "
                        >
                          {procedure.count.toLocaleString(
                            "en-IN"
                          )}
                        </p>

                      </div>


                      {/* REVENUE */}

                      <div>

                        <p
                          className="
                            text-[11px]
                            text-muted-foreground
                          "
                        >
                          Revenue
                        </p>

                        <p
                          className="
                            mt-0.5
                            whitespace-nowrap
                            text-sm
                            font-semibold
                            text-[#1e3a8a]
                          "
                        >
                          {formatCurrency(
                            procedure.revenue
                          )}
                        </p>

                      </div>

                    </div>

                  </div>

                )
              )}

            </div>

          </>

        )}

      </CardContent>

      <MonthlyTopProceduresDialog 
      open={procedureDialogOpen}
      onOpenChange={setProcedureDialogOpen}
      data={procedureData}
      monthLabel={monthLabel}
      />

    </Card>
  );
}