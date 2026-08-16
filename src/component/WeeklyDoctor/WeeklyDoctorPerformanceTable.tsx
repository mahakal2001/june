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
  ArrowUp,
  Star,
} from "lucide-react";

import WeeklyDoctorPerformanceDialog from "./WeeklyDoctorPerformanceDialog";

import {
  WeeklyDoctorPerformanceData,
} from "./WeeklyDoctorPerformance";


// ======================================================
// WEEK OPTIONS
// ======================================================

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

export default function WeeklyDoctorPerformance() {

  // ====================================================
  // SELECTED WEEK
  // ====================================================

  const [selectedWeek, setSelectedWeek] =
  useState("current");

  const [doctorDialogOpen, setDoctorDialogOpen] =
  useState(false);


  // ====================================================
  // DOCTOR DATA
  // ====================================================

  const doctorData = useMemo(() => {

    return (
      WeeklyDoctorPerformanceData[
        selectedWeek
      ] ??
      WeeklyDoctorPerformanceData.current
    );

  }, [selectedWeek]);


  // ====================================================
  // WEEK LABEL
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
          sm:px-6
          sm:pt-2
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
                Doctor Performance Summary
              </h2>

              <span
                className="
                  text-[16px]
                  text-xs
                  font-normal
                  text-muted-foreground
                  sm:text-[16px]
                "
              >
                ({weekLabel})
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
              Doctor-wise performance summary
              for the selected week
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
              value={selectedWeek}
              onValueChange={(value) => {

                if (value !== null) {
                  setSelectedWeek(value);
                }

              }}
            >

              <SelectTrigger
                className="
                  h-9
                  w-[148px]
                  text-[14px]
                  sm:w-[148px]
                  rounded-sm
                "
              >

                <SelectValue />

              </SelectTrigger>


              <SelectContent>

                {weekOptions.map(
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
                setDoctorDialogOpen(true)
              }
              className="
                h-9
                px-1
                font-medium
                text-blue-600
                hover:text-blue-800 transition: ease-in duration-300
              "
            >
              View All
            </Button>

          </div>

        </div>

      </CardHeader>


      {/* =================================================
          TABLE
      ================================================= */}

      <CardContent className="p-0">

        <div className="w-full overflow-x-auto">

          <Table
            className="Wdoctor-Table
              max-w-[760px]
            "
          >

            {/* ===========================================
                HEADER
            =========================================== */}

            <TableHeader>

              <TableRow
                className="
                  border-y
                  bg-muted/20
                  hover:bg-muted/20
                "
              >

                {/* DOCTOR */}

                <TableHead
                  className="
                    font-bold pl-8
                  "
                >
                  Doctor
                </TableHead>


                {/* DEPARTMENT */}

                <TableHead
                  className="
                    text-center font-bold
                  "
                >
                  Department
                </TableHead>


                {/* PATIENTS */}

                <TableHead
                  className="
                    text-center font-bold
                  "
                >
                  Patients
                </TableHead>


                {/* REVENUE */}

                <TableHead
                  className="
                   text-center font-bold
                  "
                >
                  Revenue (₹)
                </TableHead>


                {/* GROWTH */}

                <TableHead
                  className="
                   text-center font-bold
                  "
                >
                  Growth %
                </TableHead>


                {/* RATING */}

                <TableHead
                  className="
                    text-center font-bold
                  "
                >
                  Rating
                </TableHead>

              </TableRow>

            </TableHeader>


            {/* ===========================================
                BODY
            =========================================== */}

            <TableBody>

              {doctorData
                .slice(0, 6)
                .map((doctor) => (

                  <TableRow
                    key={doctor.id}
                    className="
                      border-b
                      transition-colors
                      hover:bg-blue-50/40
                    "
                  >

                    {/* =================================
                        DOCTOR
                    ================================= */}

                    <TableCell
                      className="doctor-cell
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

                         <img src={doctor.avatar} alt={doctor.name} 
                          className="h-10 w-10 rounded-full object-cover"/>


                        <span
                          className="
                            text-center font-semibold
                          "
                        >
                          {doctor.doctor}
                        </span>

                      </div>

                    </TableCell>


                    {/* =================================
                        DEPARTMENT
                    ================================= */}

                    <TableCell className="text-center font-semibold">

                      <span
                        className="
                          whitespace-nowrap
                          text-xs
                          text-[#1e3a8a]
                          sm:text-sm
                        "
                      >
                        {doctor.department}
                      </span>

                    </TableCell>


                    {/* =================================
                        PATIENTS
                    ================================= */}

                    <TableCell
                      className="
                        text-center font-semibold
                      "
                    >

                      <span
                        className="
                          text-xs
                          text-[#1e3a8a]
                          sm:text-sm
                        "
                      >
                        {doctor.patients.toLocaleString(
                          "en-IN"
                        )}
                      </span>

                    </TableCell>


                    {/* =================================
                        REVENUE
                    ================================= */}

                    <TableCell
                      className="
                       text-center font-semibold
                      "
                    >

                      <span
                        className="
                          whitespace-nowrap
                          text-xs
                          text-[#1e3a8a]
                          sm:text-sm
                        "
                      >
                        {formatCurrency(
                          doctor.revenue
                        )}
                      </span>

                    </TableCell>


                    {/* =================================
                        GROWTH
                    ================================= */}

                    <TableCell
                      className="
                       text-center font-semibold
                      "
                    >

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
                            text-xs
                            font-semibold
                            text-emerald-600
                            sm:text-sm
                          "
                        >
                          {doctor.growth.toFixed(1)}%
                        </span>

                      </div>

                    </TableCell>


                    {/* =================================
                        RATING
                    ================================= */}

                    <TableCell
                      className="
                        pr-5
                        text-center font-semibold
                      "
                    >

                      <div
                        className="
                          flex
                          items-center
                          justify-center
                          gap-1.5
                        "
                      >

                        <Star
                          className="
                            h-3.5
                            w-3.5
                            fill-amber-400
                            text-amber-400
                          "
                        />

                        <span
                          className="
                            text-xs
                            font-semibold
                            text-[#1e3a8a]
                            sm:text-sm
                          "
                        >
                          {doctor.rating.toFixed(1)}
                        </span>

                      </div>

                    </TableCell>

                  </TableRow>

              ))}

            </TableBody>

          </Table>

        </div>


        {/* =================================================
            MOBILE VIEW ALL
        ================================================= */}

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
            View All Doctors
          </Button>

        </div>

      </CardContent>

      <WeeklyDoctorPerformanceDialog
      open={doctorDialogOpen}
      onOpenChange={setDoctorDialogOpen}
      data={doctorData}
      weekLabel={weekLabel}
      />

    </Card>
  );
}