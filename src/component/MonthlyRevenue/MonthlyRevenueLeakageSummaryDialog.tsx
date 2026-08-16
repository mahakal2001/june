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

import { Badge } from "@/components/ui/badge";

import {
  ArrowDown,
  ArrowUp,
  RefreshCcw,
} from "lucide-react";

import ExportMenu from "@/component/RevenueExceptions/ExportMenu";

import RevenueEmptyState from "@/component/RevenueExceptions/RevenueEmptyState";

import { MonthlyExportRevenueSummeryPDF } from "@/lib/MonthlyExportRevenueSummery/MonthlyExportRevenueSummeryPDF";
import { ExportMonthlyRevenueLeakageExcel } from "@/lib/MonthlyExportRevenueSummery/MonthlyExportRevenueSummeryExcel";
import { MonthlyExportRevenueSummaryWhatsapp } from "@/lib/MonthlyExportRevenueSummery/MonthlyExportRevenueSummaryWhatsapp";
import { MonthlyExportRevenueSummaryPrint } from "@/lib/MonthlyExportRevenueSummery/MonthlyExportRevenueSummaryPrint";

import './MonthlyRevenueLeakageSummaryDialog.css';


// ======================================================
// TYPE
// ======================================================

export interface LeakageItem {
  id: number;

  label: string;

  amount: number;

  icon: React.ElementType;
}


// ======================================================
// PROPS
// ======================================================

interface Props {
  open: boolean;

  onOpenChange: (open: boolean) => void;

  items: LeakageItem[];

  totalLeakage: number;

  growth: number;

  monthLabel: string;
}


// ======================================================
// CURRENCY
// ======================================================

function formatCurrency(value: number) {
  return `₹ ${new Intl.NumberFormat("en-IN").format(value)}`;
}


// ======================================================
// COMPONENT
// ======================================================

export default function MonthlyRevenueLeakageSummaryDialog({
  open,
  onOpenChange,
  items,
  totalLeakage,
  growth,
  monthLabel,
}: Props) {


  // ====================================================
  // STATE
  // ====================================================

  const [search, setSearch] =
    useState("");

  const [leakageFilter, setLeakageFilter] =
    useState("all");

  const [sortBy, setSortBy] =
    useState("amount");

  const [sortAscending, setSortAscending] =
    useState(false);

  const [page, setPage] =
    useState(1);

  const [autoRefresh, setAutoRefresh] =
    useState(true);

  const [loading, setLoading] =
    useState(false);

  const [lastUpdated, setLastUpdated] =
    useState(new Date());

  const pageSize = 5;


  // ====================================================
  // LEAKAGE TYPES
  // ====================================================

  const leakageTypes = useMemo(() => {

    return Array.from(
      new Set(
        items.map(
          (item) => item.label
        )
      )
    ).sort();

  }, [items]);

  // ====================================================
  //Export PDF
  // ====================================================

  const exportRevenueSummaryPDF = () => {
    MonthlyExportRevenueSummeryPDF(
      exportData,
      totalLeakage,
      growth,
      monthLabel,
    {
      leakageFilter,
      sortBy,
      sortAscending,
      search,
    }
    );
  }

  
  // ====================================================
  //Export Excel
  // ====================================================

  const exportRevenueSummaryExcel = () => {
    ExportMonthlyRevenueLeakageExcel(
    exportData,
    totalLeakage,
    growth,
    monthLabel,
    {
      leakageFilter,
      sortBy,
      sortAscending,
      search,
      hospitalName:
        "Hospital Management System",
      hospitalSubtitle:
        "Management Information System",
    }
  );
  }

  // ====================================================
  //Export Whatsapp
  // ====================================================

  const exportRevenueSummaryWhatsapp = () => {
    MonthlyExportRevenueSummaryWhatsapp(
    exportData,
    totalLeakage,
    growth,
    monthLabel,
    {
      leakageFilter,
      sortBy,
      sortAscending,
      search,

      hospitalName:
        "Hospital Management System",

      hospitalSubtitle:
        "Management Information System",
    }
  );
  }

  // ====================================================
  //Export Print
  // ====================================================
  const exportRevenueSummaryPrint = () => {
     MonthlyExportRevenueSummaryPrint(
    exportData,
    totalLeakage,
    growth,
    monthLabel,
    {
      leakageFilter,
      sortBy,
      sortAscending,
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

  const filteredItems = useMemo(() => {

    const result = items.filter((item) => {

      const matchesSearch =
        item.label
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );


      const matchesFilter =
        leakageFilter === "all" ||
        item.label === leakageFilter;


      return (
        matchesSearch &&
        matchesFilter
      );

    });


    result.sort((a, b) => {

      let comparison = 0;


      if (sortBy === "amount") {

        comparison =
          a.amount - b.amount;

      }


      if (sortBy === "label") {

        comparison =
          a.label.localeCompare(
            b.label
          );

      }


      return sortAscending
        ? comparison
        : -comparison;

    });


    return result;

  }, [
    items,
    search,
    leakageFilter,
    sortBy,
    sortAscending,
  ]);


  // ====================================================
  // TOTAL PAGES
  // ====================================================

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredItems.length /
        pageSize
    )
  );


  // ====================================================
  // PAGINATION
  // ====================================================

  const paginatedItems =
    filteredItems.slice(
      (page - 1) * pageSize,
      page * pageSize
    );


  // ====================================================
  // PERCENTAGE
  // ====================================================

  const getPercentage = (
    amount: number
  ) => {

    if (!totalLeakage) {
      return 0;
    }

    return (
      (amount / totalLeakage) *
      100
    );

  };


  // ====================================================
  // AUTO REFRESH
  // ====================================================

  useEffect(() => {

    if (!autoRefresh) {
      return;
    }


    const timer = setInterval(() => {

      setLastUpdated(
        new Date()
      );

    }, 30000);


    return () => {

      clearInterval(timer);

    };

  }, [autoRefresh]);


  // ====================================================
  // RESET PAGE
  // ====================================================

  useEffect(() => {

    setPage(1);

  }, [
    search,
    leakageFilter,
    sortBy,
    sortAscending,
  ]);


  // ====================================================
  // RESET FILTERS
  // ====================================================

  const resetFilters = () => {

    setSearch("");

    setLeakageFilter("all");

    setSortBy("amount");

    setSortAscending(false);

    setPage(1);

  };


  // ====================================================
  // REFRESH
  // ====================================================

  const handleRefresh = () => {

    setLoading(true);


    setTimeout(() => {

      setLastUpdated(
        new Date()
      );

      setLoading(false);

    }, 600);

  };


  // ====================================================
  // EXPORT DATA
  // ====================================================

  const exportData = filteredItems.map(
    (item) => ({

      ...item,

      percentage:
        getPercentage(
          item.amount
        ),

    })
  );
  


  // ====================================================
  // RENDER
  // ====================================================

  return (

    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >

      <DialogContent
        className="MonthlyRevenueLeakage-dialog
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
              justify-between
              gap-4
              xl:flex-row
              xl:items-center
              xl:justify-between
            "
          >


            {/* TITLE */}

            <div>

              <DialogTitle
                className="
                  text-lg
                  font-semibold
                  tracking-tight
                  sm:text-xl
                "
              >

                Monthly Revenue Leakage Summary

              </DialogTitle>


              <p
                className="
                  mt-1
                  text-xs
                  text-muted-foreground
                  sm:text-sm
                "
              >

                Revenue leakage analysis
                {" • "}

                <span
                  className="
                    font-medium
                    text-foreground
                  "
                >
                  {monthLabel}
                </span>

              </p>

            </div>


            {/* HEADER ACTIONS */}

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

                onPDF={exportRevenueSummaryPDF}

                onExcel={exportRevenueSummaryExcel}

                onWhatsapp={exportRevenueSummaryWhatsapp}

                onPrint={exportRevenueSummaryPrint}

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
            bg-background
            px-5
            pb-4
            pt-0
            mt-0
            print:hidden
            sm:px-6
          "
        >


          {/* SEARCH */}

          <div
            className="
              relative
              w-full
              sm:w-60
            "
          >


            <Input
              placeholder="Search leakage..."
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value
                )
              }
              className="
                h-9
                rounded-md
                pl-4
                text-sm
              "
            />

          </div>


          {/* PROCEDURE / LEAKAGE FILTER */}

          <Select
            value={leakageFilter}
            onValueChange={(value) =>
              setLeakageFilter(
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
                sm:w-42
              "
            >

              <SelectValue />

            </SelectTrigger>


            <SelectContent>

              <SelectItem value="all">
                All Leakage Types
              </SelectItem>


              {leakageTypes.map(
                (type) => (

                  <SelectItem
                    key={type}
                    value={type}
                  >
                    {type}
                  </SelectItem>

                )
              )}

            </SelectContent>

          </Select>


          {/* SORT */}

          <Select
            value={sortBy}
            onValueChange={(value) =>
              setSortBy(
                value ?? "amount"
              )
            }
          >

            <SelectTrigger
              className="
                h-9
                w-full
                rounded-md
                text-sm
                sm:w-37.5
              "
            >

              <SelectValue />

            </SelectTrigger>


            <SelectContent>

              <SelectItem value="amount">
                Sort: Amount
              </SelectItem>

              <SelectItem value="label">
                Sort: Category
              </SelectItem>

            </SelectContent>

          </Select>


          {/* SORT DIRECTION */}

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

            {sortAscending
              ? "Ascending"
              : "Descending"}

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


          {/* RESET */}

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
          className="MonthlyRevenueLeakagedTables-section
            mx-5
            mt-2
            hidden
            overflow-hidden
            md:block
            sm:mx-6
          "
        >

          {filteredItems.length === 0 ? (

            <div className="h-70">

              <RevenueEmptyState message={""} onReset={function (): void {
                              throw new Error("Function not implemented.");
                          } } />

            </div>

          ) : (

            <div
              className="
                max-h-[48vh]
                overflow-auto
              "
            >

              <Table className="MonthlyRevenueLeakage-Table border rounded-sm">


                {/* HEADER */}

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
                        pl-6
                        min-w-65
                        font-bold
                      "
                    >
                      Leakage Category
                    </TableHead>


                    <TableHead
                      className="
                        text-center
                        font-bold
                      "
                    >
                      Amount
                    </TableHead>


                    <TableHead
                      className="
                        text-center
                        font-bold
                      "
                    >
                      % of Total
                    </TableHead>


                    <TableHead
                      className="
                        text-center
                        font-bold
                      "
                    >
                      Impact
                    </TableHead>


                  </TableRow>

                </TableHeader>


                {/* BODY */}

                <TableBody>

                  {paginatedItems.map(
                    (item) => {

                      const Icon =
                        item.icon;

                      const percentage =
                        getPercentage(
                          item.amount
                        );


                      return (

                        <TableRow
                          key={item.id}
                          className="
                            cursor-pointer
                            border-b
                            transition-colors
                            hover:bg-red-50/40
                          "
                        >


                          {/* CATEGORY */}

                          <TableCell
                            className="
                              pl-5
                            "
                          >

                            <div
                              className="
                                flex
                                items-center
                                gap-3
                              "
                            >

                              <div
                                className="
                                  flex
                                  h-9
                                  w-9
                                  shrink-0
                                  items-center
                                  justify-center
                                  rounded-lg
                                  bg-red-50
                                  text-red-600
                                "
                              >

                                <Icon
                                  className="
                                    h-4
                                    w-4
                                  "
                                />

                              </div>


                              <span
                                className="
                                  text-sm
                                  font-semibold
                                "
                              >
                                {item.label}
                              </span>

                            </div>

                          </TableCell>


                          {/* AMOUNT */}

                          <TableCell
                            className="
                              text-center
                              text-sm
                              font-semibold
                              whitespace-nowrap
                            "
                          >

                            {formatCurrency(
                              item.amount
                            )}

                          </TableCell>


                          {/* PERCENTAGE */}

                          <TableCell
                            className="
                              text-center
                              text-sm
                              font-semibold
                            "
                          >

                            {percentage.toFixed(
                              1
                            )}
                            %

                          </TableCell>


                          {/* IMPACT */}

                          <TableCell
                            className="
                              text-center
                            "
                          >

                            <Badge
                              variant="outline"
                              className="
                                rounded-full
                                border-red-200
                                bg-red-50
                                px-3
                                py-1
                                text-[11px]
                                font-semibold
                                text-red-700
                              "
                            >

                              Leakage

                            </Badge>

                          </TableCell>


                        </TableRow>

                      );

                    }
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

          {filteredItems.length === 0 ? (

            <div
              className="
                min-h-62.5
                flex
                items-center
                justify-center
              "
            >

              <RevenueEmptyState message={""} onReset={function (): void {
                              throw new Error("Function not implemented.");
                          } } />

            </div>

          ) : (

            paginatedItems.map(
              (item) => {

                const Icon =
                  item.icon;

                const percentage =
                  getPercentage(
                    item.amount
                  );


                return (

                  <div
                    key={item.id}
                    className="
                      rounded-xl
                      border
                      bg-card
                      p-4
                      shadow-sm
                    "
                  >

                    {/* HEADER */}

                    <div
                      className="
                        flex
                        items-center
                        justify-between
                        gap-3
                      "
                    >

                      <div
                        className="
                          flex
                          items-center
                          gap-3
                        "
                      >

                        <div
                          className="
                            flex
                            h-10
                            w-10
                            shrink-0
                            items-center
                            justify-center
                            rounded-lg
                            bg-red-50
                            text-red-600
                          "
                        >

                          <Icon
                            className="
                              h-5
                              w-5
                            "
                          />

                        </div>


                        <div>

                          <p
                            className="
                              text-sm
                              font-semibold
                            "
                          >
                            {item.label}
                          </p>


                          <p
                            className="
                              mt-0.5
                              text-xs
                              text-muted-foreground
                            "
                          >
                            Revenue leakage
                          </p>

                        </div>

                      </div>


                      <Badge
                        variant="outline"
                        className="
                          rounded-full
                          border-red-200
                          bg-red-50
                          text-red-700
                        "
                      >
                        Leakage
                      </Badge>

                    </div>


                    {/* METRICS */}

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
                          Amount
                        </p>


                        <p
                          className="
                            mt-1
                            text-sm
                            font-bold
                          "
                        >
                          {formatCurrency(
                            item.amount
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
                          % of Total
                        </p>


                        <p
                          className="
                            mt-1
                            text-sm
                            font-bold
                          "
                        >
                          {percentage.toFixed(
                            1
                          )}
                          %
                        </p>

                      </div>

                    </div>

                  </div>

                );

              }
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


          {/* LAST UPDATED */}

          <div>

            Last Sync
            {" • "}
            {lastUpdated.toLocaleString(
              "en-IN"
            )}

          </div>


          {/* PAGINATION */}

          <div
            className="
              flex
              flex-col
              gap-53
              sm:flex-row
              sm:items-center
            "
          >

            <p
              className="
                whitespace-nowrap
              "
            >

              Showing{" "}

              {filteredItems.length === 0
                ? 0
                : (page - 1) *
                    pageSize +
                  1}

              {" – "}

              {Math.min(
                page * pageSize,
                filteredItems.length
              )}

              {" of "}

              {filteredItems.length}

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
                disabled={page === 1}
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
                  page >= totalPages
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