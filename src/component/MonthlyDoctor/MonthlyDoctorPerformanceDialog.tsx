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
  RefreshCcw,
  Star,
} from "lucide-react";

import ExportMenu from "@/component/RevenueExceptions/ExportMenu";

import {
  ExportMonthlyDoctorPerformancePDF,
} from "@/lib/ExportMonthlyDoctorPerformance/MonthlyExportDoctorPerformacePDF";

import {
  ExportMonthlyDoctorPerformanceExcel,
} from "@/lib/ExportMonthlyDoctorPerformance/MonthlyExportDoctorPerformanceExcel";

import {
  ExportMonthlyDoctorPerformanceWhatsapp,
} from "@/lib/ExportMonthlyDoctorPerformance/MonthlyExportDoctorPerformaceWhatsapp";

import {
  MonthlyExportDoctorPerformacePrint,
} from "@/lib/ExportMonthlyDoctorPerformance/MonthlyExportDoctorPerformacePrint";

import "./MonthlyDoctorPerformanceDialog.css";
import RevenueEmptyState from "../RevenueExceptions/RevenueEmptyState";


// ======================================================
// TYPE
// ======================================================

export interface MonthlyDoctorData {
  name: string | undefined;
  avatar: string | undefined;

  id: number | string;

  doctor: string;

  department: string;

  patients: number;

  revenue: number;

  growth: number;

  rating: number;

  photo?: string;

}


// ======================================================
// PROPS
// ======================================================

type Props = {

  open: boolean;

  onOpenChange: (open: boolean) => void;

  data: MonthlyDoctorData[];

  monthLabel: string;

  onRefresh?: () => void | Promise<void>;

};


// ======================================================
// COMPONENT
// ======================================================

export default function MonthlyDoctorPerformanceDialog({

  open,

  onOpenChange,

  data,

  monthLabel,

  onRefresh,

}: Props) {


  // ====================================================
  // STATE
  // ====================================================

  const [loading, setLoading] =
    useState(false);


  const [search, setSearch] =
    useState("");


  const [department, setDepartment] =
    useState("all");


  const [rating, setRating] =
    useState("all");


  const [sortBy, setSortBy] =
    useState("doctor");


  const [sortAscending, setSortAscending] =
    useState(true);


  const [page, setPage] =
    useState(1);


  const [autoRefresh, setAutoRefresh] =
    useState(true);


  const [lastUpdated, setLastUpdated] =
    useState(new Date());


  const pageSize = 4;


  // ====================================================
  // DEPARTMENTS
  // ====================================================

  const departments = useMemo(() => {

    return Array.from(
      new Set(
        data.map(
          (doctor) =>
            doctor.department
        )
      )
    ).sort();

  }, [data]);


  // ====================================================
  // FILTER + SORT
  // ====================================================

  const filteredDoctors = useMemo(() => {

    const result = data.filter(
      (doctor) => {

        const query =
          search
            .toLowerCase()
            .trim();


        const matchesSearch =
          !query ||
          doctor.doctor
            .toLowerCase()
            .includes(query) ||
          doctor.department
            .toLowerCase()
            .includes(query);


        const matchesDepartment =
          department === "all" ||
          doctor.department ===
            department;


        const matchesRating =
          rating === "all" ||
          doctor.rating >=
            Number(rating);


        return (
          matchesSearch &&
          matchesDepartment &&
          matchesRating
        );

      }
    );


    // ==================================================
    // SORT
    // ==================================================

    result.sort((a, b) => {

      let comparison = 0;


      switch (sortBy) {

        case "doctor":

          comparison =
            a.doctor.localeCompare(
              b.doctor
            );

          break;


        case "department":

          comparison =
            a.department.localeCompare(
              b.department
            );

          break;


        case "patients":

          comparison =
            a.patients -
            b.patients;

          break;


        case "revenue":

          comparison =
            a.revenue -
            b.revenue;

          break;


        case "growth":

          comparison =
            a.growth -
            b.growth;

          break;


        case "rating":

          comparison =
            a.rating -
            b.rating;

          break;


        default:

          comparison =
            a.doctor.localeCompare(
              b.doctor
            );

      }


      return sortAscending
        ? comparison
        : -comparison;

    });


    return result;

  }, [
    data,
    search,
    department,
    rating,
    sortBy,
    sortAscending,
  ]);


  // ====================================================
  // PAGINATION
  // ====================================================

  const totalPages =
    Math.max(
      1,
      Math.ceil(
        filteredDoctors.length /
          pageSize
      )
    );


  const paginatedDoctors =
    filteredDoctors.slice(

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
    department,
    rating,
    sortBy,
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

    setDepartment("all");

    setRating("all");

    setSortBy("doctor");

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
  // EXPORT PDF
  // ====================================================

 const exportPDF = () => {

    ExportMonthlyDoctorPerformancePDF(
      filteredDoctors,
      monthLabel,
      {
        department,
        rating,
        search,
      }
    );

  };


  // ====================================================
  // EXPORT EXCEL
  // ====================================================

  const exportExcel = () => {

    ExportMonthlyDoctorPerformanceExcel(
      filteredDoctors,
      monthLabel,
      {
        department,
        rating,
        search,

        hospitalName:
        "Hospital Management System",

        hospitalSubtitle:
        "Management Information System",

      }

    );


  };


  // ====================================================
  // WHATSAPP
  // ====================================================

  const exportWhatsapp = () => {

    ExportMonthlyDoctorPerformanceWhatsapp(
      filteredDoctors,
      monthLabel,
      {
        department,
        rating,
        search,

        hospitalName:
        "Hospital Management System",

        hospitalSubtitle:
        "Management Information System",

      }
    );

  };


  // ====================================================
  // PRINT
  // ====================================================

  const printReport = () => {

     MonthlyExportDoctorPerformacePrint(
       filteredDoctors,
       monthLabel,
       {
        department,
        rating,
        search,

        hospitalName:
        "Hospital Management System",

        hospitalSubtitle:
        "Management Information System",

       }
     );

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
          doctorDialog-dialog
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
            sm:py-3
          "
        >

          <div
            className="
              flex
              flex-wrap
              gap-4
              justify-between
              xl:flex-row
              xl:items-center
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

                Doctor Performance Monthly MIS

              </DialogTitle>


              <p
                className="
                  mt-1
                  text-xs
                  text-muted-foreground
                  sm:text-sm
                "
              >

                Monthly doctor performance overview
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

                onPDF={exportPDF}

                onExcel={exportExcel}

                onWhatsapp={exportWhatsapp}

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
            bg-muted/10
            px-6
            print:hidden
            sm:px-6
          "
        >

          {/* --------------------------------------------- */}
          {/* SEARCH */}
          {/* --------------------------------------------- */}

            <Input
              placeholder="Search Doctor..."
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value
                )
              }
              className="
               h-9
               w-full
               rounded-sm
               text-sm
               sm:w-55
              "
            />


            {search && (

              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() =>
                  setSearch("")
                }
                className="
                  absolute
                  right-1
                  top-1/2
                  h-7
                  w-7
                  -translate-y-1/2
                  text-muted-foreground
                  hover:bg-transparent
                "
              >

              </Button>

            )}



          {/* --------------------------------------------- */}
          {/* DEPARTMENT */}
          {/* --------------------------------------------- */}

          <Select
            value={department}
            onValueChange={(value) =>
              setDepartment(
                value ?? "all"
              )
            }
          >

            <SelectTrigger
              className="
                h-9
                w-full
                rounded-sm
                text-sm
                sm:w-35
              "
            >

              <SelectValue />

            </SelectTrigger>


            <SelectContent>

              <SelectItem value="all">

                All Departments

              </SelectItem>


              {departments.map(
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


          {/* --------------------------------------------- */}
          {/* RATING */}
          {/* --------------------------------------------- */}

          <Select
            value={rating}
            onValueChange={(value) =>
              setRating(
                value ?? "all"
              )
            }
          >

            <SelectTrigger
              className="
                h-9
                w-full
                rounded-sm
                text-sm
                sm:w-35
              "
            >

              <SelectValue />

            </SelectTrigger>


            <SelectContent>

              <SelectItem value="all">

                All Ratings

              </SelectItem>


              <SelectItem value="4.5">

                4.5 & Above

              </SelectItem>


              <SelectItem value="4">

                4.0 & Above

              </SelectItem>


              <SelectItem value="3">

                3.0 & Above

              </SelectItem>

            </SelectContent>

          </Select>


          {/* --------------------------------------------- */}
          {/* SORT BY */}
          {/* --------------------------------------------- */}

          <Select
            value={sortBy}
            onValueChange={(value) =>
              setSortBy(
                value ?? "doctor"
              )
            }
          >

            <SelectTrigger
              className="
                h-9
                w-full
                rounded-sm
                text-sm
                sm:w-35
              "
            >

              <SelectValue />

            </SelectTrigger>


            <SelectContent>

              <SelectItem value="doctor">

                Sort: Doctor

              </SelectItem>


              <SelectItem value="department">

                Sort: Department

              </SelectItem>


              <SelectItem value="patients">

                Sort: Patients

              </SelectItem>


              <SelectItem value="revenue">

                Sort: Revenue

              </SelectItem>


              <SelectItem value="growth">

                Sort: Growth

              </SelectItem>


              <SelectItem value="rating">

                Sort: Rating

              </SelectItem>

            </SelectContent>

          </Select>


          {/* --------------------------------------------- */}
          {/* SORT ORDER */}
          {/* --------------------------------------------- */}

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


          {/* --------------------------------------------- */}
          {/* RESET */}
          {/* --------------------------------------------- */}

          <Button
            variant="ghost"
            size="sm"
            onClick={resetFilters}
            className="
              h-9
              rounded-md
            "
          >

            Reset

          </Button>

        </div>


        {/* ================================================= */}
        {/* DESKTOP TABLE */}
        {/* ================================================= */}

<div
  className="
    dialogTables-section
    mx-0
    mt-0
    hidden
    overflow-hidden
    md:block
    sm:mx-0
  "
>
  {data.length === 0 ? (

    /* --------------------------------------------- */
    /* EMPTY DATA STATE */
    /* --------------------------------------------- */

    <RevenueEmptyState
      message="No doctor performance metrics found."
      onReset={resetFilters}
    />

  ) : filteredDoctors.length === 0 ? (

    /* --------------------------------------------- */
    /* NO FILTER RESULTS */
    /* --------------------------------------------- */

    <RevenueEmptyState
      message="No doctors found matching the selected filters."
      onReset={resetFilters}
    />

  ) : (

    /* --------------------------------------------- */
    /* TABLE */
    /* --------------------------------------------- */

    <div
      className="
        max-h-[55vh]
        overflow-auto
      "
    >
      <Table className="monthlydoc-Table border rounded-sm">

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
              className="
                min-w-60
                pl-7
                font-bold
              "
            >
              Doctor
            </TableHead>

            <TableHead
              className="
                min-w-40
                text-center
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
              Patients
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
                text-center
                font-bold
              "
            >
              Growth %
            </TableHead>

            <TableHead
              className="
                pr-5
                text-center
                font-bold
              "
            >
              Rating
            </TableHead>

          </TableRow>
        </TableHeader>


        {/* ======================================= */}
        {/* BODY */}
        {/* ======================================= */}

        <TableBody>

          {paginatedDoctors.map(
            (doctor) => (

              <TableRow
                key={doctor.id}
                className="
                  transition-colors
                  hover:bg-muted/30
                "
              >

                {/* DOCTOR */}

                <TableCell className="pl-5">

                  <div
                    className="
                      flex
                      items-center
                      gap-3
                    "
                  >

                    <img
                      src={doctor.avatar}
                      alt={doctor.name ?? doctor.doctor}
                      className="
                        h-10
                        w-10
                        rounded-full
                        object-cover
                      "
                    />

                    <div>

                      <p
                        className="
                          whitespace-nowrap
                          text-sm
                          font-medium
                          text-foreground
                        "
                      >
                        {doctor.doctor}
                      </p>

                      <p
                        className="
                          mt-0.5
                          text-xs
                          text-muted-foreground
                        "
                      >
                        Doctor
                      </p>

                    </div>

                  </div>

                </TableCell>


                {/* DEPARTMENT */}

                <TableCell className="text-center">

                  <span
                    className="
                      whitespace-nowrap
                      text-sm
                      text-muted-foreground
                    "
                  >
                    {doctor.department}
                  </span>

                </TableCell>


                {/* PATIENTS */}

                <TableCell
                  className="
                    text-center
                    text-sm
                    font-medium
                  "
                >
                  {doctor.patients.toLocaleString("en-IN")}
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
                  {formatCurrency(doctor.revenue)}
                </TableCell>


                {/* GROWTH */}

                <TableCell className="text-center">

                  <span
                    className={`
                      inline-flex
                      items-center
                      justify-center
                      gap-1
                      whitespace-nowrap
                      text-sm
                      font-medium
                      ${
                        doctor.growth >= 0
                          ? "text-emerald-600"
                          : "text-red-600"
                      }
                    `}
                  >

                    {doctor.growth >= 0 ? (

                      <ArrowUp
                        className="
                          h-3.5
                          w-3.5
                        "
                      />

                    ) : (

                      <ArrowDown
                        className="
                          h-3.5
                          w-3.5
                        "
                      />

                    )}

                    {doctor.growth >= 0 ? "+" : ""}
                    {doctor.growth.toFixed(1)}%

                  </span>

                </TableCell>


                {/* RATING */}

                <TableCell
                  className="
                    pr-5
                    text-center
                  "
                >

                  <div
                    className="
                      inline-flex
                      items-center
                      gap-1.5
                    "
                  >

                    <Star
                      className="
                        h-4
                        w-4
                        fill-yellow-400
                        text-yellow-400
                      "
                    />

                    <span
                      className="
                        text-sm
                        font-semibold
                      "
                    >
                      {doctor.rating.toFixed(1)}
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
           message="No doctor performance metrics found."
           onReset={resetFilters}
           />

          ) : filteredDoctors.length === 0 ? (

          <RevenueEmptyState
           message="No doctors found matching the selected filters."
            onReset={resetFilters}
           />

          ) : (

            paginatedDoctors.map(
              (doctor) => (

                <div
                  key={doctor.id}
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

                  {/* ===================================== */}
                  {/* CARD HEADER */}
                  {/* ===================================== */}

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

                      {/* PHOTO */}

                      {doctor.photo ? (

                        <img
                          src={
                            doctor.photo
                          }
                          alt={
                            doctor.doctor
                          }
                          className="
                            h-11
                            w-11
                            shrink-0
                            rounded-full
                            border
                            object-cover
                            shadow-sm
                          "
                        />

                      ) : (

                        <div
                          className="
                            flex
                            h-11
                            w-11
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            border
                            bg-blue-50
                            text-xs
                            font-semibold
                            text-blue-700
                          "
                        >

                          {doctor.doctor
                            .split(" ")
                            .map(
                              (name) =>
                                name[0]
                            )
                            .slice(
                              0,
                              2
                            )
                            .join("")}

                        </div>

                      )}


                      <div>

                        <p
                          className="
                            text-sm
                            font-semibold
                          "
                        >

                          {doctor.doctor}

                        </p>


                        <p
                          className="
                            mt-0.5
                            text-xs
                            text-muted-foreground
                          "
                        >

                          {doctor.department}

                        </p>

                      </div>

                    </div>


                    {/* RATING */}

                    <div
                      className="
                        flex
                        items-center
                        gap-1
                        rounded-full
                        border
                        bg-yellow-50
                        px-2
                        py-1
                      "
                    >

                      <Star
                        className="
                          h-3.5
                          w-3.5
                          fill-yellow-400
                          text-yellow-400
                        "
                      />

                      <span
                        className="
                          text-xs
                          font-semibold
                          text-yellow-700
                        "
                      >

                        {doctor.rating.toFixed(
                          1
                        )}

                      </span>

                    </div>

                  </div>


                  {/* ===================================== */}
                  {/* METRICS */}
                  {/* ===================================== */}

                  <div
                    className="
                      mt-4
                      grid
                      grid-cols-2
                      gap-x-5
                      gap-y-4
                    "
                  >

                    {/* PATIENTS */}

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

                        {doctor.patients.toLocaleString(
                          "en-IN"
                        )}

                      </p>

                    </div>


                    {/* REVENUE */}

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
                          doctor.revenue
                        )}

                      </p>

                    </div>


                    {/* GROWTH */}

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
                        className={`
                          mt-1
                          text-sm
                          font-semibold
                          ${
                            doctor.growth >= 0
                              ? "text-emerald-600"
                              : "text-red-600"
                          }
                        `}
                      >

                        {doctor.growth >= 0
                          ? "↑"
                          : "↓"}

                        {" "}

                        {doctor.growth >= 0
                          ? "+"
                          : ""}

                        {doctor.growth.toFixed(
                          1
                        )}%

                      </p>

                    </div>


                    {/* RATING */}

                    <div>

                      <p
                        className="
                          text-xs
                          text-muted-foreground
                        "
                      >
                        Rating
                      </p>

                      <div
                        className="
                          mt-1
                          flex
                          items-center
                          gap-1.5
                        "
                      >

                        <Star
                          className="
                            h-3.5
                            w-3.5
                            fill-yellow-400
                            text-yellow-400
                          "
                        />

                        <span
                          className="
                            text-sm
                            font-semibold
                          "
                        >

                          {doctor.rating.toFixed(
                            1
                          )}

                        </span>

                      </div>

                    </div>

                  </div>


                  {/* ===================================== */}
                  {/* FOOTER */}
                  {/* ===================================== */}

                  <div
                    className="
                      mt-4
                      flex
                      items-center
                      justify-between
                      border-t
                      pt-3
                    "
                  >

                    <span
                      className="
                        text-xs
                        text-muted-foreground
                      "
                    >

                      Weekly performance

                    </span>


                    <Badge
                      variant="outline"
                      className="
                        rounded-full
                        border-blue-100
                        bg-blue-50
                        px-3
                        py-1
                        text-[11px]
                        font-medium
                        text-blue-700
                      "
                    >

                      Active

                    </Badge>

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

          {/* --------------------------------------------- */}
          {/* LAST SYNC */}
          {/* --------------------------------------------- */}

          <div>

            Last Sync
            {" • "}

            {lastUpdated.toLocaleString(
              "en-IN"
            )}

          </div>


          {/* --------------------------------------------- */}
          {/* PAGINATION */}
          {/* --------------------------------------------- */}

          <div
            className="
              flex
              items-center
              justify-between
              gap-53
              sm:justify-between
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

                {filteredDoctors.length === 0
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
                  filteredDoctors.length
                )}

              </span>

              {" of "}

              <span
                className="
                  font-medium
                  text-foreground
                "
              >

                {filteredDoctors.length}

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
                  page >=
                  totalPages
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