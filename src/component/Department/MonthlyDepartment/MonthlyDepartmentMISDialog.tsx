import { useEffect, useMemo, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Button,
} from "@/components/ui/button";

import {
  Input,
} from "@/components/ui/input";

import {
  Label,
} from "@/components/ui/label";

import {
  Switch,
} from "@/components/ui/switch";

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
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

import {
  Badge,
} from "@/components/ui/badge";

import {
  ArrowDown,
  ArrowUp,
  Eye,
  RefreshCcw,
} from "lucide-react";


import { formatCurrency } from "@/lib/formatCurrency";
import ExportMenu from "@/component/RevenueExceptions/ExportMenu";
import MonthlyDepartmentDetailbox from "./MonthlyDepartmentDetailbox/MonthlyDepartmentDetailbox";
import { ExportMonthlyMISDepartmentPDF } from "@/lib/ExportMonthlyMISDepartment/ExportMonthyMISDepartmentPDF";
import { ExportMonthlyMISDepartmentExcel } from "@/lib/ExportMonthlyMISDepartment/ExportMonthlyMISDepartmentExcel";
import { ExportMonthlyMISWhatsappReport } from "@/lib/ExportMonthlyMISDepartment/ExportMonthlyMISWhatsappReport";
import { MonthlyMISDepartmentPrintReport } from "@/lib/ExportMonthlyMISDepartment/MonthlyMISDepartmentPrintReport";

import "./MonthlyDepartmentMisDialog.css";
import RevenueEmptyState from "@/component/RevenueExceptions/RevenueEmptyState";



// ======================================================
// TYPE
// ======================================================

interface DepartmentData {
  id: number;

  department: string;

  revenue: number;

  growth: number;

  patients: number;

  collection: number;

  collectionPercentage: number;

  avgLOS: number;

  status: "Good" | "Average";

  icon: React.ElementType;

  iconColor: string;

  iconBg: string;
}


// ======================================================
// PROPS
// ======================================================

type Props = {

  open: boolean;

  onOpenChange: (open: boolean) => void;

  data: DepartmentData[];

  monthLabel: string;

};


// ======================================================
// COMPONENT
// ======================================================

export default function MonthlyDepartmentMISDialog({

  open,

  onOpenChange,

  data,

  monthLabel,

}: Props) {


  // ====================================================
  // STATE
  // ====================================================

  
  const [departmentDetailOpen, setDepartmentDetailOpen] =
  useState(false);

  const [loading, setLoading] =
    useState(false);


  const [search, setSearch] =
    useState("");


  const [status, setStatus] =
    useState("all");


  const [sortAscending, setSortAscending] =
    useState(true);


  const [page, setPage] =
    useState(1);


  const [autoRefresh, setAutoRefresh] =
    useState(true);


  const [lastUpdated, setLastUpdated] =
    useState(new Date());

  const [selectedDepartment, setSelectedDepartment] =
    useState<DepartmentData | null>(null);


  const [_detailsOpen, setDetailsOpen] =
    useState(false);


  const pageSize = 5;


  // ====================================================
  // STATUS OPTIONS
  // ====================================================

  const statuses = [
    "Good",
    "Average",
  ];


  // ====================================================
  // FILTER + SORT
  // ====================================================

  const filteredDepartments = useMemo(() => {

    return data

      .filter((department) => {

        const matchesSearch =
          department.department
            .toLowerCase()
            .includes(
              search.toLowerCase()
            );


        const matchesStatus =
          status === "all" ||
          department.status === status;


        return (
          matchesSearch &&
          matchesStatus
        );

      })


      .sort((a, b) => {

        return sortAscending

          ? a.department.localeCompare(
              b.department
            )

          : b.department.localeCompare(
              a.department
            );

      });

  }, [
    data,
    search,
    status,
    sortAscending,
  ]);


  // ====================================================
  // PAGINATION
  // ====================================================

  const totalPages =
    Math.max(
      1,
      Math.ceil(
        filteredDepartments.length /
          pageSize
      )
    );


  const paginatedDepartments =
    filteredDepartments.slice(

      (page - 1) * pageSize,

      page * pageSize

    );


  // ====================================================
  // AUTO REFRESH
  // ====================================================

  useEffect(() => {

    if (!autoRefresh) {
      return;
    }


    const timer =
      setInterval(() => {

        setLastUpdated(
          new Date()
        );

      }, 30000);


    return () => {
      clearInterval(timer);
    };

  }, [autoRefresh]);


  // ====================================================
  // RESET PAGE WHEN FILTER CHANGES
  // ====================================================

  useEffect(() => {

    setPage(1);

  }, [
    search,
    status,
    sortAscending,
  ]);


  // ====================================================
  // RESET FILTERS
  // ====================================================

  const resetFilters = () => {

    setSearch("");

    setStatus("all");

    setSortAscending(true);

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
  // PRINT
  // ====================================================

  const printReport = () => {
  MonthlyMISDepartmentPrintReport(
    filteredDepartments,
    monthLabel,
    {
      hospitalName:
        "Hospital Management System",

      hospitalSubtitle:
        "Management Information System",
    }
  );
 };


  // ====================================================
  // OPEN DETAILS
  // ====================================================

  const openDepartmentDetails = (
    department: DepartmentData
  ) => {

    setSelectedDepartment(
      department
    );

    setDetailsOpen(true);

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
        className="
          monthly-department-dialog
          w-[96vw]
          max-w-7xl
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
            sm:py-4
          "
        >

          <div
            className="
              flex
              flex-wrap
              gap-4
              xl:flex-row
              xl:items-center
              justify-between
            "
          >

            {/* --------------------------------------------- */}
            {/* TITLE */}
            {/* --------------------------------------------- */}

            <div>

              <DialogTitle
                className="
                  text-lg
                  font-bold
                  tracking-tight
                  sm:text-xl
                "
              >

                Department-wise Monthly MIS

              </DialogTitle>


              <p
                className="
                  mt-1
                  text-xs
                  text-muted-foreground
                  sm:text-sm
                "
              >

                Monthly department performance overview
                {" • "}
                <span className="font-medium text-foreground">
                  {monthLabel}
                </span>

              </p>

            </div>


            {/* --------------------------------------------- */}
            {/* ACTIONS */}
            {/* --------------------------------------------- */}

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
              
                onPDF={() => 
                   ExportMonthlyMISDepartmentPDF(
                    filteredDepartments,
                    monthLabel,
                    status,
                    search
                 )
                }
                onExcel={() => 
                    ExportMonthlyMISDepartmentExcel({
                        data: filteredDepartments,
                        search,
                        status,
                        monthLabel,

                    })
                }
                onWhatsapp={() => 
                    ExportMonthlyMISWhatsappReport({
                        departments: filteredDepartments,
                        monthLabel,
                        search,
                        status,
                    })
                }

                onPrint={printReport}
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
            py-4
            pt-0
            print:hidden
            sm:px-6
          "
        >

          {/* SEARCH */}

          <Input
            placeholder="Search Department..."
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
              sm:w-85
            "
          />


          {/* STATUS */}

          <Select
            value={status}
            onValueChange={(value) =>
              setStatus(
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
                sm:w-38.75
              "
            >

              <SelectValue />

            </SelectTrigger>


            <SelectContent>

              <SelectItem value="all">
                All Status
              </SelectItem>


              {statuses.map(
                (item) => (

                  <SelectItem
                    key={item}
                    value={item}
                  >
                    {item}
                  </SelectItem>

                )
              )}

            </SelectContent>

          </Select>


          {/* SORT */}

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
          className="departmentdialogTables-section
            mx-5
            mt-4
            hidden
            overflow-hidden
            rounded-sm
            md:block
            sm:mx-6
            h-76.5
          "
        >
          
          {data.length === 0 ? (
          
          <RevenueEmptyState
           message="No metrics found."
           onReset={resetFilters}
          />

          ) : filteredDepartments.length === 0 ? (

         <RevenueEmptyState
           message="No departments found."
           onReset={resetFilters}
          />

          ) : (

            <div
              className="
                max-h-[55vh]
                overflow-auto
              "
            >

              <Table className="departmentdialog-table border rounded-sm">

                {/* ======================================= */}
                {/* HEADER */}
                {/* ======================================= */}

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
                      className="pl-7
                        min-w-45
                        font-bold
                      "
                    >
                      Department
                    </TableHead>


                    <TableHead
                      className="
                        text-center
                        font-bold
                      "
                    >
                      Revenue
                    </TableHead>


                    <TableHead
                      className="
                        text-center
                        font-bold
                      "
                    >
                      Growth
                    </TableHead>


                    <TableHead
                      className="
                        text-center
                        font-bold
                      "
                    >
                      Patients
                    </TableHead>


                    <TableHead
                      className="
                        text-center
                        font-bold
                      "
                    >
                      Collection
                    </TableHead>


                    <TableHead
                      className="
                        text-center
                        font-bold
                      "
                    >
                      Collection %
                    </TableHead>


                    <TableHead
                      className="
                        text-center
                        font-bold
                      "
                    >
                      Avg. LOS
                    </TableHead>


                    <TableHead
                      className="
                        text-center
                        font-bold
                      "
                    >
                      Status
                    </TableHead>


                    <TableHead
                      className="
                        pr-5
                        text-center
                        font-bold
                      "
                    >
                      Action
                    </TableHead>

                  </TableRow>

                </TableHeader>


                {/* ======================================= */}
                {/* BODY */}
                {/* ======================================= */}

                <TableBody>

                  {paginatedDepartments.map(
                    (department) => {

                      const Icon =
                        department.icon;


                      return (

                        <TableRow
                          key={
                            department.id
                          }
                          onClick={() =>
                            openDepartmentDetails(
                              department
                            )
                          }
                          className="
                            cursor-pointer
                            transition-colors
                            hover:bg-muted/30
                          "
                        >

                          {/* DEPARTMENT */}

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
                                className={`
                                  flex
                                  h-9
                                  w-9
                                  shrink-0
                                  items-center
                                  justify-center
                                  rounded-lg
                                  ${department.iconBg}
                                `}
                              >

                                <Icon
                                  className={`
                                    h-4
                                    w-4
                                    ${department.iconColor}
                                  `}
                                />

                              </div>


                              <span
                                className="
                                  whitespace-nowrap
                                  text-sm
                                  font-medium
                                "
                              >

                                {
                                  department.department
                                }

                              </span>

                            </div>

                          </TableCell>


                          {/* REVENUE */}

                          <TableCell
                            className="
                              whitespace-nowrap
                              text-center
                              text-sm
                              font-medium
                            "
                          >

                            {formatCurrency(
                              department.revenue
                            )}

                          </TableCell>


                          {/* GROWTH */}

                          <TableCell
                            className="
                              text-center font-medium
                            "
                          >

                            <span
                              className="
                                inline-flex
                                items-center
                                gap-1
                                whitespace-nowrap
                                text-sm
                                font-medium
                                text-emerald-600
                              "
                            >

                              <ArrowUp
                                className="
                                  h-3.5
                                  w-3.5
                                "
                              />

                              {department.growth.toFixed(
                                1
                              )}%

                            </span>

                          </TableCell>


                          {/* PATIENTS */}

                          <TableCell
                            className="
                              text-center font-medium
                              text-sm
                            "
                          >

                            {department.patients.toLocaleString(
                              "en-IN"
                            )}

                          </TableCell>


                          {/* COLLECTION */}

                          <TableCell
                            className="
                              whitespace-nowrap
                              text-center font-medium
                              text-sm
                            "
                          >

                            {formatCurrency(
                              department.collection
                            )}

                          </TableCell>


                          {/* COLLECTION % */}

                          <TableCell
                            className="
                              text-center font-medium
                              text-sm
                            "
                          >

                            {department.collectionPercentage.toFixed(
                              1
                            )}%

                          </TableCell>


                          {/* LOS */}

                          <TableCell
                            className="
                              text-center
                              text-sm
                              font-medium
                            "
                          >

                            {department.avgLOS.toFixed(
                              1
                            )}

                          </TableCell>


                          {/* STATUS */}

                          <TableCell
                            className="
                              text-center
                            "
                          >

                            <Badge
                              variant="outline"
                              className={`
                                rounded-full
                                px-3
                                py-1
                                text-[11px]
                                font-semibold
                                ${
                                  department.status ===
                                  "Good"
                                    ? `
                                      border-emerald-200
                                      bg-emerald-50
                                      text-emerald-700
                                    `
                                    : `
                                      border-orange-200
                                      bg-orange-50
                                      text-orange-700
                                    `
                                }
                              `}
                            >

                              {
                                department.status
                              }

                            </Badge>

                          </TableCell>


                          {/* ACTION */}

                          <TableCell
                            className="
                              pr-5
                              text-center
                            "
                          >

                            <Button
                              variant="outline"
                              size="icon"
                              aria-label={`View ${department.department} details`}
                              onClick={() => {
                                setSelectedDepartment(department);
                                setDepartmentDetailOpen(true);
                              }}
                              className="
                                h-8
                                w-8
                                rounded-md
                                border-blue-100
                                text-blue-600
                                hover:bg-blue-50
                              "
                            >

                              <Eye
                                className="
                                  h-4
                                  w-4
                                "
                              />

                            </Button>

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
          {data.length === 0 ? (
            <RevenueEmptyState
             message="No metrics found."
             onReset={resetFilters}
            />
            ) : filteredDepartments.length === 0 ? (
              <RevenueEmptyState
              message="No departments found."
              onReset={resetFilters} />
            ) : (
           paginatedDepartments.map(
            (department) => {

              const Icon =
                department.icon;


              return (

                <div
                  key={department.id}
                  onClick={() =>
                    openDepartmentDetails(
                      department
                    )
                  }
                  className="
                    cursor-pointer
                    rounded-xl
                    border
                    bg-card
                    p-4
                    shadow-sm
                    transition-all
                    hover:shadow-md
                  "
                >

                  {/* CARD HEADER */}

                  <div
                    className="
                      flex
                      items-start
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
                        className={`
                          flex
                          h-10
                          w-10
                          shrink-0
                          items-center
                          justify-center
                          rounded-lg
                          ${department.iconBg}
                        `}
                      >

                        <Icon
                          className={`
                            h-5
                            w-5
                            ${department.iconColor}
                          `}
                        />

                      </div>


                      <div>

                        <p
                          className="
                            text-sm
                            font-semibold
                          "
                        >

                          {
                            department.department
                          }

                        </p>


                        <p
                          className="
                            mt-0.5
                            text-xs
                            text-muted-foreground
                          "
                        >

                          Monthly performance

                        </p>

                      </div>

                    </div>


                    <Badge
                      variant="outline"
                      className={
                        department.status ===
                        "Good"

                          ? `
                            border-emerald-200
                            bg-emerald-50
                            text-emerald-700
                          `

                          : `
                            border-orange-200
                            bg-orange-50
                            text-orange-700
                          `
                      }
                    >

                      {
                        department.status
                      }

                    </Badge>

                  </div>


                  {/* METRICS */}

                  <div
                    className="
                      mt-4
                      grid
                      grid-cols-2
                      gap-x-5
                      gap-y-4
                    "
                  >

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
                          text-sm
                          font-semibold
                        "
                      >

                        {formatCurrency(
                          department.revenue
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
                        Growth
                      </p>

                      <p
                        className="
                          mt-1
                          text-sm
                          font-semibold
                          text-emerald-600
                        "
                      >

                        ↑{" "}
                        {department.growth.toFixed(
                          1
                        )}%

                      </p>

                    </div>


                    <div>

                      <p
                        className="
                          text-xs
                          text-muted-foreground
                        "
                      >
                        Patients
                      </p>

                      <p
                        className="
                          mt-1
                          text-sm
                          font-semibold
                        "
                      >

                        {department.patients.toLocaleString(
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
                        Collection
                      </p>

                      <p
                        className="
                          mt-1
                          text-sm
                          font-semibold
                        "
                      >

                        {formatCurrency(
                          department.collection
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
                        Collection %
                      </p>

                      <p
                        className="
                          mt-1
                          text-sm
                          font-semibold
                        "
                      >

                        {department.collectionPercentage.toFixed(
                          1
                        )}%

                      </p>

                    </div>


                    <div>

                      <p
                        className="
                          text-xs
                          text-muted-foreground
                        "
                      >
                        Avg. LOS
                      </p>

                      <p
                        className="
                          mt-1
                          text-sm
                          font-semibold
                        "
                      >

                        {department.avgLOS.toFixed(
                          1
                        )}

                      </p>

                    </div>

                  </div>


                  {/* VIEW DETAILS */}

                  <div
                    className="
                      mt-4
                      flex
                      items-center
                      justify-end
                      border-t
                      pt-3
                    "
                  >

                    <Button
                      variant="ghost"
                      size="sm"
                      className="
                        h-8
                        text-xs
                        text-blue-600
                      "
                      onClick={(event) => {

                        event.stopPropagation();

                        openDepartmentDetails(
                          department
                        );

                      }}
                    >

                      <Eye
                        className="
                          mr-1.5
                          h-3.5
                          w-3.5
                        "
                      />

                      View Details

                    </Button>

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

          {/* LAST SYNC */}

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
              items-center
              justify-between
              gap-53
              sm:justify-end
            "
          >

            <p className="whitespace-nowrap">

              Showing{" "}

              {filteredDepartments.length === 0
                ? 0
                : (page - 1) *
                    pageSize +
                  1}

              {" – "}

              {Math.min(
                page * pageSize,
                filteredDepartments.length
              )}

              {" of "}

              {filteredDepartments.length}

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
                  page === 1
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


      {/* ================================================= */}
      {/* DEPARTMENT DETAILS */}
      {/* ================================================= */}

      <MonthlyDepartmentDetailbox open={departmentDetailOpen}
        onOpenChange={setDepartmentDetailOpen} department={selectedDepartment}
        monthLabel={monthLabel} />


    </Dialog>

  );

}