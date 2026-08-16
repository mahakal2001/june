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

import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  ArrowUp,
  Eye,
} from "lucide-react";

import { MonthlyDepartmentData } from "./MonthlyDepartmentData";

import MonthlyDepartmentMISDialog from "./MonthlyDepartmentMISDialog";

import MonthlyDepartmentDetailbox from "./MonthlyDepartmentDetailbox/MonthlyDepartmentDetailbox";

import "./MonthlyDepartmentTable.css";


// ==================================================
// MONTH OPTIONS
// ==================================================

const monthOptions = [
  {
    value: "May 2026",
    label: "May 2026",
  },

  {
    value: "April 2026",
    label: "April 2026",
  },

  {
    value: "March 2026",
    label: "March 2026",
  },
  
];


// ==================================================
// COMPONENT
// ==================================================

export default function WeeklyDepartmentTable() {

  const [selectedMonth, setSelectedMonth] =
  useState("May 2026");


  const [detailsOpen, setDetailsOpen] =
  useState(false);

  const [selectedDepartment, setSelectedDepartment] =
  useState<any | null>(null);
  
  const [departmentDetailOpen, setDepartmentDetailOpen] =
  useState(false);


  // ==================================================
  // CURRENT DATA
  // ==================================================

  const departmentData = useMemo(() => {

    return (
      MonthlyDepartmentData[selectedMonth] ??
      []
    );

  }, [selectedMonth]);


  // ==================================================
  // WEEK LABEL
  // ==================================================

  const monthLabel = useMemo(() => {

    const option = monthOptions.find(
      (item) => item.value === selectedMonth
    );

    return option?.label ?? selectedMonth;

  }, [selectedMonth]);


  // ==================================================
  // CURRENCY FORMAT
  // ==================================================

  const formatCurrency = (value: number) => {

    return `₹ ${new Intl.NumberFormat("en-IN").format(value)}`;

  };

  // ====================================================
  // OPEN DEPARTMENT DETAILS
  // ====================================================

  const openDepartmentDetails = (
    department: any
  ) => {

    setSelectedDepartment(
      department
    );

    setDepartmentDetailOpen(true);

  };



  // ==================================================
  // RENDER
  // ==================================================

  return (

    <Card
      className="Weeklydepartment-Card
        w-full
        overflow-hidden
        rounded-sm
        border
        bg-card
        shadow-sm
      "
    >

      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <CardHeader className="px-4 pb-3 pt-2 sm:px-6 sm:pt-2">

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

          {/* --------------------------------------------- */}
          {/* TITLE */}
          {/* --------------------------------------------- */}

          <div>

            <div className="flex items-center gap-1.5">

              <h2
                className="
                  text-base
                  text-[22px]
                  font-bold
                  tracking-tight
                  text-foreground
                  sm:text-[22px]
                "
              >
                Department-wise Weekly MIS
              </h2>

              <span
                className="
                  text-[16px]
                  font-normal
                  text-muted-foreground
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
              Department performance summary for the selected period
            </p>

          </div>


          {/* --------------------------------------------- */}
          {/* CONTROLS */}
          {/* --------------------------------------------- */}

          <div className="flex items-center justify-between gap-10 sm:justify-end">

            <Select
              value={selectedMonth}
              onValueChange={(value) => {
                if (value !== null) setSelectedMonth(value);
              }}
            >

              <SelectTrigger
                className="
                  h-9
                  w-37
                  text-[14px]
                  sm:w-37
                  rounded-sm
                "
              >

                <SelectValue />

              </SelectTrigger>

              <SelectContent>

                {monthOptions.map((item) => (

                  <SelectItem
                    key={item.value}
                    value={item.value}
                  >
                    {item.label}
                  </SelectItem>

                ))}

              </SelectContent>

            </Select>


            <Button
              variant="link"
              onClick={() => setDetailsOpen(true)}
              className="button-Class
                h-9
                px-2
                font-medium
                text-blue-600
                hover:text-blue-800
              "
            >
              View All
            </Button>

          </div>

        </div>

      </CardHeader>


      {/* ================================================= */}
      {/* TABLE */}
      {/* ================================================= */}

      <CardContent className="p-0">

        {/* Horizontal scroll on mobile/tablet */}
        <div className="w-full overflow-x-auto">

          <Table className="WDepartment-table">


            {/* =========================================== */}
            {/* HEADER */}
            {/* =========================================== */}

            <TableHeader>

              <TableRow
                className="
                  border-y
                  bg-muted/30
                  hover:bg-muted/30
                "
              >

                <TableHead
                  className="Departmenttable-Head
                    w-52.5
                    text-center font-bold
                  "
                >
                  Department
                </TableHead>


                <TableHead
                  className="
                    text-center font-bold
                  "
                >
                  Revenue (₹)
                </TableHead>


                <TableHead
                  className="
                    text-center font-bold
                  "
                >
                  Growth %
                </TableHead>


                <TableHead
                  className="
                    text-center font-bold
                  "
                >
                  Patients
                </TableHead>


                <TableHead
                  className="
                    text-center font-bold
                  "
                >
                  Collection (₹)
                </TableHead>


                <TableHead
                  className="
                    text-center font-bold
                  "
                >
                  Collection %
                </TableHead>


                <TableHead
                  className="
                    text-center font-bold
                  "
                >
                  Avg. LOS
                </TableHead>


                <TableHead
                  className="
                    text-center font-bold
                  "
                >
                  Status
                </TableHead>


                <TableHead
                  className="
                    pr-6
                    text-center font-bold
                  "
                >
                  Action
                </TableHead>

              </TableRow>

            </TableHeader>


            {/* =========================================== */}
            {/* BODY */}
            {/* =========================================== */}

            <TableBody>

              {departmentData.map((item) => {

                const Icon = item.icon;



                return (

                  <TableRow
                    key={item.id}
                    className="
                      border-b
                      transition-colors
                      hover:bg-muted/20
                    "
                  >

                    {/* ----------------------------------- */}
                    {/* DEPARTMENT */}
                    {/* ----------------------------------- */}

                    <TableCell className="pl-6 text-center font-medium">

                      <div className="flex items-center gap-3">

                        <div
                          className={`
                            flex
                            h-8
                            w-8
                            shrink-0
                            items-center
                            justify-center
                            rounded-lg
                            ${item.iconBg}
                            ${item.iconColor}
                          `}
                        >

                          <Icon className="h-4 w-4" />

                        </div>

                        <span
                          className="
                            whitespace-nowrap
                            text-sm
                            font-medium
                            text-foreground
                          "
                        >
                          {item.department}
                        </span>

                      </div>

                    </TableCell>


                    {/* ----------------------------------- */}
                    {/* REVENUE */}
                    {/* ----------------------------------- */}

                    <TableCell className="text-center font-medium">

                      <span
                        className="
                          whitespace-nowrap
                          text-sm
                          font-medium
                        "
                      >
                        {formatCurrency(item.revenue)}
                      </span>

                    </TableCell>


                    {/* ----------------------------------- */}
                    {/* GROWTH */}
                    {/* ----------------------------------- */}

                    <TableCell className="text-center font-medium">

                      <div
                        className="
                          flex
                          items-center
                          justify-center
                          gap-1
                        "
                      >

                        <ArrowUp
                          className="
                            h-3.5
                            w-3.5
                            stroke-[2.5]
                            text-emerald-500
                          "
                        />

                        <span
                          className="
                            whitespace-nowrap
                            text-sm
                            font-medium
                            text-emerald-600
                          "
                        >
                          {item.growth.toFixed(1)}%
                        </span>

                      </div>

                    </TableCell>


                    {/* ----------------------------------- */}
                    {/* PATIENTS */}
                    {/* ----------------------------------- */}

                    <TableCell className="text-center font-medium">

                      <span className="text-sm font-medium">

                        {item.patients.toLocaleString("en-IN")}

                      </span>

                    </TableCell>


                    {/* ----------------------------------- */}
                    {/* COLLECTION */}
                    {/* ----------------------------------- */}

                    <TableCell className="text-center font-medium">

                      <span
                        className="
                          whitespace-nowrap
                          text-sm
                          font-medium
                        "
                      >
                        {formatCurrency(item.collection)}
                      </span>

                    </TableCell>


                    {/* ----------------------------------- */}
                    {/* COLLECTION % */}
                    {/* ----------------------------------- */}

                    <TableCell className="text-center font-medium">

                      <span className="text-sm">

                        {item.collectionPercentage.toFixed(1)}%

                      </span>

                    </TableCell>


                    {/* ----------------------------------- */}
                    {/* AVG LOS */}
                    {/* ----------------------------------- */}

                    <TableCell className="text-center">

                      <span className="text-sm font-medium">

                        {item.avgLOS.toFixed(1)}

                      </span>

                    </TableCell>


                    {/* ----------------------------------- */}
                    {/* STATUS */}
                    {/* ----------------------------------- */}

                    <TableCell className="text-center">

                      <Badge
                        variant="outline"
                        className={`
                          rounded-md
                          px-3
                          py-1
                          text-[11px]
                          font-medium
                          ${
                            item.status === "Good"
                              ? `
                                border-emerald-200
                                bg-emerald-50
                                text-emerald-600
                              `
                              : `
                                border-orange-200
                                bg-orange-50
                                text-orange-600
                              `
                          }
                        `}
                      >
                        {item.status}
                      </Badge>

                    </TableCell>


                    {/* ----------------------------------- */}
                    {/* ACTION */}
                    {/* ----------------------------------- */}

                    <TableCell className="pr-6 text-center">

                      <Button
                        variant="outline"
                        size="icon"
                        className="
                          h-8
                          w-8
                          rounded-md
                          border-blue-100
                          bg-background
                          text-blue-600
                          shadow-none
                          transition-all
                          hover:border-blue-200
                          hover:bg-blue-50
                          hover:text-blue-700
                        "
                        aria-label={`View ${item.department} details`}
                         onClick={() =>
                            openDepartmentDetails(
                              item
                            )
                          }
                      >

                        <Eye className="h-4 w-4" />

                      </Button>

                    </TableCell>

                  </TableRow>

                );

              })}

            </TableBody>

          </Table>

        </div>


        {/* ================================================= */}
        {/* MOBILE VIEW ALL */}
        {/* ================================================= */}

        <div
          className="
            flex
            justify-center
            border-t
            p-3
            sm:hidden
          "
        >

          <Button
            variant="ghost"
            size="sm"
            className="
              text-xs
              font-medium
              text-blue-600
              hover:bg-blue-50
              hover:text-blue-700
            "
          >
            View All Departments
          </Button>

        </div>

      </CardContent>

      
      {/* ================================================= */}
      {/* VIEW ALL DIALOG */}
      {/* ================================================= */}

      <MonthlyDepartmentMISDialog
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        data={departmentData}
        monthLabel={monthLabel}
      />


      {/* ================================================= */}
      {/* DEPARTMENT DETAIL */}
      {/* ================================================= */}

      <MonthlyDepartmentDetailbox
        open={departmentDetailOpen}
        onOpenChange={setDepartmentDetailOpen}
        department={selectedDepartment}
        monthLabel={monthLabel}
      />



    </Card>
  );
}