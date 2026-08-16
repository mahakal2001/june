import { useEffect, useMemo, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

import { Switch } from "@/components/ui/switch";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { ArrowDown, ArrowUp, RefreshCcw } from "lucide-react";

import ExportMenu from "@/component/RevenueExceptions/ExportMenu";
import { WeeklyExportProcedurePDF } from "@/lib/WeeklyExportProcedure/WeeklyExportProcedurePDF";
import {
  ExportWeeklyProcedureExcel,
} from "@/lib/WeeklyExportProcedure/WeeklyExportProcedureExcel";
import {
  ExportWeeklyProcedureWhatsapp,
} from "@/lib/WeeklyExportProcedure/WeeklyExportProcedureWhatsapp";
import {
  WeeklyExportProcedurePrint,
} from "@/lib/WeeklyExportProcedure/WeeklyExportProcedurePrint";

import RevenueEmptyState from "@/component/RevenueExceptions/RevenueEmptyState";

import './WeeklyTopProceduresDialog.css';




// ======================================================
// TYPE
// ======================================================

export interface WeeklyProcedureData {
  id: number | string;

  procedure: string;

  count: number;

  revenue: number;

  growth: number;
}


// ======================================================
// PROPS
// ======================================================

type Props = {
  open: boolean;

  onOpenChange: (open: boolean) => void;

  data: WeeklyProcedureData[];

  weekLabel: string;

  onRefresh?: () => void | Promise<void>;
};


// ======================================================
// COMPONENT
// ======================================================

export default function WeeklyTopProceduresDialog({
  open,
  onOpenChange,
  data,
  weekLabel,
  onRefresh,
}: Props) {

  // ====================================================
  // STATE
  // ====================================================

  const [loading, setLoading] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const [growth, setGrowth] =
    useState("all");

  const [procedureFilter, setProcedureFilter] =
    useState("all");

  const [sortAscending, setSortAscending] =
    useState(true);

  const [page, setPage] =
    useState(1);

  const [autoRefresh, setAutoRefresh] =
    useState(true);

  const [lastUpdated, setLastUpdated] =
    useState(new Date());


  const pageSize = 5;


  // ====================================================
  //Export PDF
  // ====================================================

  const exportProcedurePDF = () => {
  
    WeeklyExportProcedurePDF(
      data,
      weekLabel,
      {
        procedure: procedureFilter,
        growth,
        search,
      }
    );
  
  };

  // ====================================================
  // Export Excel
  // ====================================================

  const exportProcedureExcel = () => {
  ExportWeeklyProcedureExcel(
    filteredProcedures,
    weekLabel,
    {
      procedure: procedureFilter,
      growth,
      search,

      hospitalName:
        "Hospital Management System",

      hospitalSubtitle:
        "Management Information System",
    }
  );
  };

  // ====================================================
  // Export Whatsapp
  // ====================================================

  const exportProcedureWhatsapp= () => {

   ExportWeeklyProcedureWhatsapp(
    filteredProcedures,
    weekLabel,
    {
      procedure: procedureFilter,
      growth,
      search,

      hospitalName:
        "Hospital Management System",

      hospitalSubtitle:
        "Management Information System",
    }
  );

  }

  // ====================================================
  // Export Print
  // ====================================================

  const exportProcedurePrint= () => {

  WeeklyExportProcedurePrint(
    filteredProcedures,
    weekLabel,
    {
      procedure: procedureFilter,
      growth,
      search,

      hospitalName:
        "Hospital Management System",

      hospitalSubtitle:
        "Management Information System",
    }
  );

 }


  // ====================================================
  // FILTER + SORT
  // ====================================================

  const procedures = useMemo(() => {
  return Array.from(
    new Set(
      data.map((item) => item.procedure)
    )
  ).sort();
  }, [data]);

  const filteredProcedures = useMemo(() => {

    const result = data.filter(
      (procedure) => {

        const query =
          search
            .toLowerCase()
            .trim();


        const matchesSearch =
          !query ||
          procedure.procedure
            .toLowerCase()
            .includes(query);


        const matchesGrowth =
          growth === "all" ||
          (growth === "positive" &&
            procedure.growth >= 0) ||
          (growth === "high" &&
            procedure.growth >= 15) ||
          (growth === "low" &&
            procedure.growth < 15);

        
        const matchesProcedure = procedureFilter === "all" || 
         procedure.procedure === procedureFilter;


        return (
          matchesSearch &&
          matchesGrowth &&
          matchesProcedure
        );
      }
    );


    return result;

  }, [
    data,
    search,
    growth,
    procedureFilter,
    sortAscending,
  ]);


  // ====================================================
  // PAGINATION
  // ====================================================

  const totalPages =
    Math.max(
      1,
      Math.ceil(
        filteredProcedures.length /
          pageSize
      )
    );


  const paginatedProcedures =
    filteredProcedures.slice(
      (page - 1) * pageSize,
      page * pageSize
    );


  // ====================================================
  // RESET PAGE WHEN FILTER CHANGES
  // ====================================================

  useEffect(() => {

    setPage(1);

  }, [
    search,
    growth,
    procedureFilter,
    sortAscending,
  ]);


  // ====================================================
  // AUTO REFRESH
  // ====================================================

  useEffect(() => {

    if (!autoRefresh) {
      return;
    }


    const timer =
      setInterval(
        async () => {

          setLastUpdated(
            new Date()
          );


          if (onRefresh) {

            await onRefresh();

          }

        },
        30000
      );


    return () => {

      clearInterval(timer);

    };

  }, [
    autoRefresh,
    onRefresh,
  ]);


  // ====================================================
  // RESET FILTERS
  // ====================================================

  const resetFilters = () => {

    setSearch("");

    setGrowth("all");

    setProcedureFilter("all");

    setSortAscending(true);

    setPage(1);

  };


  // ====================================================
  // REFRESH
  // ====================================================

  const handleRefresh =
    async () => {

      setLoading(true);

      try {

        if (onRefresh) {

          await onRefresh();

        }

        setLastUpdated(
          new Date()
        );

      } finally {

        setTimeout(() => {

          setLoading(false);

        }, 500);

      }

    };


  // ====================================================
  // CURRENCY
  // ====================================================

  const formatCurrency =
    (value: number) => {

      return `₹ ${new Intl.NumberFormat(
        "en-IN"
      ).format(value)}`;

    };


  // ====================================================
  // RENDER
  // ====================================================

  return (

    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >

      <DialogContent
        className="WeeklyProcedureDialog-dialog
          w-[96vw]
          max-w-6xl
          overflow-hidden
          rounded-sm
          p-0
        "
      >

        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        <DialogHeader
          className="
            border-b
            px-5
            py-4
            sm:px-6
            sm:py-5
          "
        >

          <div
            className="
              flex
              flex-wrap
              items-center
              justify-between
              gap-4
            "
          >

            {/* =============================================
                TITLE
            ============================================= */}

            <div>

              <DialogTitle
                className="
                  text-lg
                  font-semibold
                  tracking-tight
                  sm:text-xl
                "
              >

                Weekly Top Procedures

              </DialogTitle>


              <p
                className="
                  mt-1
                  text-xs
                  text-muted-foreground
                  sm:text-sm
                "
              >

                Procedure-wise performance overview
                {" • "}

                <span
                  className="
                    font-medium
                    text-foreground
                  "
                >
                  {weekLabel}
                </span>

              </p>

            </div>


            {/* =============================================
                ACTIONS
            ============================================= */}

            <div
              className="
                flex
                flex-wrap
                items-center
                gap-2
                print:hidden
              "
            >

              {/* REFRESH */}

              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                disabled={loading}
                className="
                  h-9
                  rounded-md
                  px-3
                "
              >

                <RefreshCcw
                  className={`
                    mr-2
                    h-4
                    w-4
                    ${
                      loading
                        ? "animate-spin"
                        : ""
                    }
                  `}
                />

                Refresh

              </Button>


              {/* AUTO REFRESH */}

              <div
                className="
                  flex
                  h-9
                  items-center
                  gap-2
                  rounded-md
                  border
                  bg-background
                  px-3
                "
              >

                <Label
                  className="
                    whitespace-nowrap
                    text-xs
                    font-medium
                  "
                >

                  Auto Refresh

                </Label>


                <Switch
                  checked={autoRefresh}
                  onCheckedChange={
                    setAutoRefresh
                  }
                />

              </div>


              {/* EXPORT */}

              <ExportMenu

                onPDF={exportProcedurePDF}

                onExcel={exportProcedureExcel}

                onWhatsapp={exportProcedureWhatsapp}

                onPrint= {exportProcedurePrint}

              />

            </div>

          </div>

        </DialogHeader>


        {/* ================================================= */}
        {/* TOOLBAR */}
        {/* ================================================= */}

        <div
          className="
            flex
            flex-wrap
            items-center
            gap-2
            border-b
            bg-muted/10
            px-5
            pb-4
            pt-0
            print:hidden
            sm:px-6
          "
        >

          {/* =============================================
              SEARCH
          ============================================= */}

          <Input
            placeholder="Search Procedure..."
            value={search}
            onChange={(event) =>
              setSearch(
                event.target.value
              )
            }
            className="
              h-9
              w-full
              rounded-md
              text-sm
              sm:w-[320px]
            "
          />

          {/* =============================================
             * PROCEDURE FILTER 
          ============================================= */}

          <Select
           value={procedureFilter}
            onValueChange={(value) =>
              setProcedureFilter(value ?? "all")
            }
          >

            <SelectTrigger
              className="
                h-9
                w-full
                rounded-md
                text-sm
                sm:w-[145px]
              "
            >

               <SelectValue placeholder="Procedure" />

            </SelectTrigger>

              
            <SelectContent>

              {/* ALL PROCEDURES */}

              <SelectItem value="all">

                All Procedures

              </SelectItem>

              {/* PROCEDURE OPTIONS */}
               {procedures.map((procedure) => (

              <SelectItem
                key={procedure}
                value={procedure} 
                >

                    {procedure}

               </SelectItem>

               ))}

            </SelectContent>

          </Select>


          {/* =============================================
              GROWTH FILTER
          ============================================= */}

          <Select
            value={growth}
            onValueChange={(value) =>
              setGrowth(
                value ?? "all"
              )
            }
          >

            <SelectTrigger
              className="
                h-9
                w-full
                rounded-md
                text-sm
                sm:w-[145px]
              "
            >

              <SelectValue />

            </SelectTrigger>


            <SelectContent>

              <SelectItem value="all">

                All Growth

              </SelectItem>


              <SelectItem value="positive">

                Positive Growth

              </SelectItem>


              <SelectItem value="high">

                15% & Above

              </SelectItem>


              <SelectItem value="low">

                Below 15%

              </SelectItem>

            </SelectContent>

          </Select>



          {/* =============================================
              SORT ORDER
          ============================================= */}

          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setSortAscending(
                (value) => !value
              )
            }
            className="
              h-9
              rounded-md
            "
          >

            Sort

            {sortAscending ? (

              <ArrowUp
                className="
                  ml-2
                  h-4
                  w-4
                "
              />

            ) : (

              <ArrowDown
                className="
                  ml-2
                  h-4
                  w-4
                "
              />

            )}

          </Button>


          {/* =============================================
              RESET
          ============================================= */}

          <Button
            variant="ghost"
            size="sm"
            onClick={resetFilters}
            className="
              h-9
              rounded-md
            "
          >

            Reset Filters

          </Button>

        </div>


        {/* ================================================= */}
        {/* DESKTOP TABLE */}
        {/* ================================================= */}

        <div
          className="WeeklyProceduredialogTables-section
            mx-5
            mt-4
            hidden
            overflow-hidden
            md:block
            sm:mx-6
          "
        >

          {/* ===============================================
              ORIGINAL DATA EMPTY
          =============================================== */}

          {data.length === 0 ? (

            <RevenueEmptyState
              message="No procedure metrics found."
              onReset={resetFilters}
            />

          ) : filteredProcedures.length === 0 ? (

            /* =============================================
               FILTERED EMPTY
            ============================================= */

            <RevenueEmptyState
              message="No matching procedures found."
              onReset={resetFilters}
            />

          ) : (

            <div
              className="
                max-h-[55vh]
                overflow-auto
              "
            >

              <Table
                className="WeeklyProcedure-Table border rounded-sm"
              >

                {/* =========================================
                    HEADER
                ========================================= */}

                <TableHeader
                  className="
                    sticky
                    top-0
                    z-20
                    bg-background
                  "
                >

                  <TableRow
                    className="
                      bg-muted/40
                      hover:bg-muted/40
                    "
                  >

                    <TableHead
                      className="
                        min-w-[230px]
                        pl-7
                        font-bold
                      "
                    >
                      Procedure
                    </TableHead>


                    <TableHead
                      className="
                        text-center
                        font-bold
                      "
                    >
                      Count
                    </TableHead>


                    <TableHead
                      className="
                        text-center
                        font-bold
                      "
                    >
                      Revenue (₹)
                    </TableHead>


                    <TableHead
                      className="
                        pr-7
                        text-center
                        font-bold
                      "
                    >
                      Growth %
                    </TableHead>

                  </TableRow>

                </TableHeader>


                {/* =========================================
                    BODY
                ========================================= */}

                <TableBody>

                  {paginatedProcedures.map(
                    (procedure) => (

                      <TableRow
                        key={procedure.id}
                        className="
                          transition-colors
                          hover:bg-blue-50/40
                        "
                      >

                        {/* PROCEDURE */}

                        <TableCell
                          className="
                            pl-7
                          "
                        >

                          <span
                            className="
                              text-sm
                              font-semibold
                              text-foreground
                            "
                          >

                            {procedure.procedure}

                          </span>

                        </TableCell>


                        {/* COUNT */}

                        <TableCell
                          className="
                            text-center
                            text-sm
                            font-semibold
                            text-[#1e3a8a]
                          "
                        >

                          {procedure.count.toLocaleString(
                            "en-IN"
                          )}

                        </TableCell>


                        {/* REVENUE */}

                        <TableCell
                          className="
                            whitespace-nowrap
                            text-center
                            text-sm
                            font-semibold
                            text-[#1e3a8a]
                          "
                        >

                          {formatCurrency(
                            procedure.revenue
                          )}

                        </TableCell>


                        {/* GROWTH */}

                        <TableCell
                          className="
                            pr-7
                            text-center
                          "
                        >

                          <div
                            className="
                              inline-flex
                              items-center
                              justify-center
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
                                text-sm
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

                        </TableCell>

                      </TableRow>

                    )
                  )}

                </TableBody>

              </Table>

            </div>

          )}

        </div>


        {/* ================================================= */}
        {/* MOBILE CARDS */}
        {/* ================================================= */}

        <div
          className="
            grid
            gap-3
            px-5
            pt-4
            md:hidden
            sm:px-6
          "
        >

          {data.length === 0 ? (

            <RevenueEmptyState
              message="No procedure metrics found."
              onReset={resetFilters}
            />

          ) : filteredProcedures.length === 0 ? (

            <RevenueEmptyState
              message="No matching procedures found."
              onReset={resetFilters}
            />

          ) : (

            paginatedProcedures.map(
              (procedure) => (

                <div
                  key={procedure.id}
                  className="
                    rounded-xl
                    border
                    bg-card
                    p-4
                    shadow-sm
                    transition-all
                    hover:shadow-md
                  "
                >

                  {/* =======================================
                      CARD HEADER
                  ======================================= */}

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
                      "
                    >

                      {procedure.procedure}

                    </p>


                    {/* GROWTH */}

                    <div
                      className="
                        flex
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


                  {/* =======================================
                      METRICS
                  ======================================= */}

                  <div
                    className="
                      mt-4
                      grid
                      grid-cols-2
                      gap-4
                    "
                  >

                    <div>

                      <p
                        className="
                          text-xs
                          text-muted-foreground
                        "
                      >
                        Count
                      </p>

                      <p
                        className="
                          mt-1
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


                    <div>

                      <p
                        className="
                          text-xs
                          text-muted-foreground
                        "
                      >
                        Revenue
                      </p>

                      <p
                        className="
                          mt-1
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
            )

          )}

        </div>


        {/* ================================================= */}
        {/* FOOTER */}
        {/* ================================================= */}

        <div
          className="
            flex
            flex-col
            gap-3
            border-t
            px-5
            py-3
            text-xs
            text-muted-foreground
            print:hidden
            sm:px-6
            md:flex-row
            md:items-center
            md:justify-between
          "
        >

          {/* ===============================================
              LAST SYNC
          =============================================== */}

          <div>

            Last Sync
            {" • "}

            {lastUpdated.toLocaleString(
              "en-IN"
            )}

          </div>


          {/* ===============================================
              PAGINATION
          =============================================== */}

          <div
            className="
              flex
              items-center
              justify-between
              gap-53
              sm:justify-end
            "
          >

            <p
              className="
                whitespace-nowrap
              "
            >

              Showing{" "}

              <span
                className="
                  font-medium
                  text-foreground
                "
              >

                {filteredProcedures.length ===
                0
                  ? 0
                  : (page - 1) *
                      pageSize +
                    1}

              </span>

              {" – "}

              <span
                className="
                  font-medium
                  text-foreground
                "
              >

                {Math.min(
                  page * pageSize,
                  filteredProcedures.length
                )}

              </span>

              {" of "}

              <span
                className="
                  font-medium
                  text-foreground
                "
              >

                {filteredProcedures.length}

              </span>

            </p>


            <div
              className="
                flex
                items-center
                gap-4
              "
            >

              <Button
                variant="outline"
                size="sm"
                disabled={
                  page === 1 ||
                  filteredProcedures.length === 0
                }
                onClick={() =>
                  setPage(
                    (value) =>
                      Math.max(
                        1,
                        value - 1
                      )
                  )
                }
                className="
                  h-8
                  rounded-sm
                "
              >

                Previous

              </Button>


              <Button
                variant="outline"
                size="sm"
                disabled={
                  page >= totalPages ||
                  filteredProcedures.length === 0
                }
                onClick={() =>
                  setPage(
                    (value) =>
                      Math.min(
                        totalPages,
                        value + 1
                      )
                  )
                }
                className="
                  h-8
                  rounded-sm
                "
              >

                Next

              </Button>

            </div>

          </div>

        </div>

      </DialogContent>

    </Dialog>
  );
}