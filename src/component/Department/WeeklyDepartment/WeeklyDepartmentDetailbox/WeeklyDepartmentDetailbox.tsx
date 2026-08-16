import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import {
  Badge,
} from "@/components/ui/badge";

import {
  Separator,
} from "@/components/ui/separator";

import {
  Activity,
  ArrowDown,
  ArrowUp,
  BedDouble,
  CalendarDays,
  IndianRupee,
  Percent,
  Users,
  Wallet,
} from "lucide-react";

import { formatCurrency } from "@/lib/formatCurrency";
import './WeeklyDepartmentDetailbox.css';


// ==================================================
// TYPE
// ==================================================

type Department = {
  id: number | string;

  department: string;

  revenue: number;

  growth: number;

  patients: number;

  collection: number;

  collectionPercentage: number;

  avgLOS: number;

  status: string;

  icon: any;

  iconBg: string;

  iconColor: string;
};


// ==================================================
// PROPS
// ==================================================

type Props = {
  open: boolean;

  onOpenChange: (open: boolean) => void;

  department: Department | null;

  weekLabel: string;
};


// ==================================================
// COMPONENT
// ==================================================

export default function WeeklyDepartmentDetailbox({
  open,
  onOpenChange,
  department,
  weekLabel,
}: Props) {

  if (!department) {
    return null;
  }


  const Icon = department.icon;


  const isPositiveGrowth =
    department.growth >= 0;


  const isGood =
    department.status === "Good";


  return (

    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >

      <DialogContent
        className="WdetailDialog-content
          w-[95vw]
          max-w-5xl
          max-h-[90vh]
          overflow-y-auto
          rounded-2xl
          border
          bg-gradient-to-b
          from-blue-50
          to-white
          p-5
          shadow-2xl
          sm:pt-4 pl-7 pr-7 pb-7
        "
      >

        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        <DialogHeader>

          <div
            className="
              flex
              flex-col
              items-center
              justify-center
              gap-3
              text-center
            "
          >

            {/* Department Icon */}

            <div
              className={`
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-xl
                ${department.iconBg}
                shadow-sm
              `}
            >

              <Icon
                className={`
                  h-7
                  w-7
                  ${department.iconColor}
                `}
              />

            </div>


            {/* Department Name */}

            <div>

              <DialogTitle
                className="
                  text-xl
                  font-bold
                  tracking-tight
                  sm:text-2xl
                "
              >
                {department.department}
              </DialogTitle>


              <p
                className="
                  mt-1
                  text-sm
                  text-muted-foreground
                "
              >
                Weekly Department Performance Summary
              </p>


              {/* Week */}

              <div
                className="
                  mt-2
                  flex
                  flex-wrap
                  items-center
                  justify-center
                  gap-2
                  text-xs
                  text-muted-foreground
                "
              >

                <CalendarDays
                  className="h-3.5 w-3.5"
                />

                <span>
                  {weekLabel}
                </span>

                <span>•</span>

                <span>
                  Weekly MIS
                </span>

              </div>

            </div>


            {/* Status */}

            <Badge
              variant="outline"
              className={`
                mt-1
                rounded-full
                px-4
                py-1.5
                text-xs
                font-semibold
                ${
                  isGood
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

              <span
                className={`
                  mr-2
                  h-1.5
                  w-1.5
                  rounded-full
                  ${
                    isGood
                      ? "bg-emerald-500"
                      : "bg-orange-500"
                  }
                `}
              />

              {department.status}

            </Badge>

          </div>

        </DialogHeader>


        {/* ================================================= */}
        {/* MAIN CONTENT */}
        {/* ================================================= */}

        <div className="mt-5 space-y-6">


          {/* ================================================= */}
          {/* KEY METRICS */}
          {/* ================================================= */}

          <div>

            <div className="pb-4 text-center">

              <h3
                className="
                  text-sm
                  font-semibold
                  text-foreground
                "
              >
                Performance Overview
              </h3>

              <p
                className="
                  mt-1
                  text-xs
                  text-muted-foreground
                "
              >
                Key performance indicators for {department.department}
              </p>

            </div>


            <div
              className="
                grid
                gap-4
                sm:grid-cols-2
                lg:grid-cols-4
              "
            >

              {/* Revenue */}

              <MetricCard
                title="Weekly Revenue"
                value={formatCurrency(
                  department.revenue
                )}
                icon={IndianRupee}
                iconClass="
                  bg-blue-50
                  text-blue-600
                "
              />


              {/* Patients */}

              <MetricCard
                title="Patients"
                value={department.patients.toLocaleString(
                  "en-IN"
                )}
                icon={Users}
                iconClass="
                  bg-violet-50
                  text-violet-600
                "
              />


              {/* Collection */}

              <MetricCard
                title="Collection"
                value={formatCurrency(
                  department.collection
                )}
                icon={Wallet}
                iconClass="
                  bg-emerald-50
                  text-emerald-600
                "
              />


              {/* LOS */}

              <MetricCard
                title="Avg. LOS"
                value={`${department.avgLOS.toFixed(
                  1
                )} days`}
                icon={BedDouble}
                iconClass="
                  bg-orange-50
                  text-orange-600
                "
              />

            </div>

          </div>


          <Separator className="relative top-2" />


          {/* ================================================= */}
          {/* PERFORMANCE DETAILS */}
          {/* ================================================= */}

          <div>

            <div className="pt-4 pb-4 text-center">

              <h3
                className="
                  text-sm
                  font-semibold
                "
              >
                Performance Details
              </h3>

              <p
                className="
                  mt-1
                  text-xs
                  text-muted-foreground
                "
              >
                Weekly growth and collection efficiency
              </p>

            </div>


            <div
              className="
                grid
                gap-4
                md:grid-cols-2
              "
            >

              {/* Growth Card */}

              <Card
                className="
                  border
                  bg-white/80
                  shadow-sm
                  transition-shadow
                  hover:shadow-md
                "
              >

                <CardContent className="p-5">

                  <div
                    className="
                      flex
                      items-start
                      justify-between
                    "
                  >

                    <div>

                      <p
                        className="
                          text-xs
                          text-muted-foreground
                        "
                      >
                        Revenue Growth
                      </p>


                      <div
                        className="
                          mt-2
                          flex
                          items-center
                          gap-2
                        "
                      >

                        {isPositiveGrowth ? (

                          <ArrowUp
                            className="
                              h-5
                              w-5
                              text-emerald-600
                            "
                          />

                        ) : (

                          <ArrowDown
                            className="
                              h-5
                              w-5
                              text-red-500
                            "
                          />

                        )}


                        <span
                          className={`
                            text-2xl
                            font-bold
                            ${
                              isPositiveGrowth
                                ? "text-emerald-600"
                                : "text-red-500"
                            }
                          `}
                        >
                          {isPositiveGrowth
                            ? "+"
                            : ""}

                          {department.growth.toFixed(
                            1
                          )}
                          %
                        </span>

                      </div>


                      <p
                        className="
                          mt-1
                          text-xs
                          text-muted-foreground
                        "
                      >
                        vs previous week
                      </p>

                    </div>


                    <div
                      className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-lg
                        bg-emerald-50
                        text-emerald-600
                      "
                    >

                      <Activity
                        className="h-5 w-5"
                      />

                    </div>

                  </div>

                </CardContent>

              </Card>


              {/* Collection Efficiency */}

              <Card
                className="
                  border
                  bg-white/80
                  shadow-sm
                  transition-shadow
                  hover:shadow-md
                "
              >

                <CardContent className="p-5">

                  <div
                    className="
                      flex
                      items-start
                      justify-between
                    "
                  >

                    <div className="flex-1">

                      <p
                        className="
                          text-xs
                          text-muted-foreground
                        "
                      >
                        Collection Efficiency
                      </p>


                      <div
                        className="
                          mt-2
                          flex
                          items-center
                          gap-2
                        "
                      >

                        <span
                          className="
                            text-2xl
                            font-bold
                            text-blue-600
                          "
                        >
                          {department.collectionPercentage.toFixed(
                            1
                          )}
                          %
                        </span>

                      </div>


                      {/* Progress */}

                      <div
                        className="
                          mt-3
                          h-2
                          w-full
                          overflow-hidden
                          rounded-full
                          bg-muted
                        "
                      >

                        <div
                          className="
                            h-full
                            rounded-full
                            bg-blue-600
                            transition-all
                          "
                          style={{
                            width: `${Math.min(
                              department.collectionPercentage,
                              100
                            )}%`,
                          }}
                        />

                      </div>

                    </div>


                    <div
                      className="
                        ml-4
                        flex
                        h-10
                        w-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-lg
                        bg-blue-50
                        text-blue-600
                      "
                    >

                      <Percent
                        className="h-5 w-5"
                      />

                    </div>

                  </div>

                </CardContent>

              </Card>

            </div>

          </div>


          <Separator className="relative top-2" />


          {/* ================================================= */}
          {/* FINANCIAL SUMMARY */}
          {/* ================================================= */}

          <div>

            <div className="pt-4 pb-4 text-center">

              <h3
                className="
                  text-sm
                  font-semibold
                "
              >
                Financial Summary
              </h3>

            </div>


            <Card
              className="
                overflow-hidden
                border
                bg-white/80
                shadow-sm
              "
            >

              <CardContent className="p-0">

                <div
                  className="
                    grid
                    grid-cols-1
                    divide-y
                    sm:grid-cols-3
                    sm:divide-x
                    sm:divide-y-0
                  "
                >

                  {/* Revenue */}

                  <SummaryItem
                    label="Weekly Revenue"
                    value={formatCurrency(
                      department.revenue
                    )}
                  />


                  {/* Collection */}

                  <SummaryItem
                    label="Total Collection"
                    value={formatCurrency(
                      department.collection
                    )}
                  />


                  {/* Collection Rate */}

                  <SummaryItem
                    label="Collection Rate"
                    value={`${department.collectionPercentage.toFixed(
                      1
                    )}%`}
                  />

                </div>

              </CardContent>

            </Card>

          </div>


          {/* ================================================= */}
          {/* PERFORMANCE INSIGHT */}
          {/* ================================================= */}

          <div
            className="
              rounded-xl
              border
              border-blue-100
              bg-blue-50/70
              p-4 relative top-4
            "
          >

            <div className="flex gap-3">

              <div
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-lg
                  bg-blue-100
                  text-blue-600
                "
              >

                <Activity
                  className="h-5 w-5"
                />

              </div>


              <div>

                <p
                  className="
                    text-sm
                    font-semibold
                    text-blue-900
                  "
                >
                  Weekly Performance Insight
                </p>


                <p
                  className="
                    mt-1
                    text-xs
                    leading-5
                    text-blue-800/80
                  "
                >

                  {department.department} generated{" "}

                  <strong>
                    {formatCurrency(
                      department.revenue
                    )}
                  </strong>{" "}

                  in revenue during{" "}

                  <strong>
                    {weekLabel}
                  </strong>
                  , with{" "}

                  <strong>
                    {department.collectionPercentage.toFixed(
                      1
                    )}
                    %
                  </strong>{" "}

                  collection efficiency and{" "}

                  <strong>
                    {isPositiveGrowth
                      ? "+"
                      : ""}
                    {department.growth.toFixed(
                      1
                    )}
                    %
                  </strong>{" "}

                  revenue growth compared with the
                  previous week.

                </p>

              </div>

            </div>

          </div>

        </div>

      </DialogContent>

    </Dialog>
  );
}


// ==================================================
// METRIC CARD
// ==================================================

function MetricCard({
  title,
  value,
  icon: Icon,
  iconClass,
}: {
  title: string;
  value: string;
  icon: any;
  iconClass: string;
}) {

  return (

    <Card
      className="
        border
        bg-white/80
        shadow-sm
        transition-all
        duration-200
        hover:-translate-y-0.5
        hover:shadow-md
      "
    >

      <CardContent className="p-4">

        <div
          className="
            flex
            items-center
            justify-between
          "
        >

          <p
            className="
              text-xs
              font-medium
              text-muted-foreground
            "
          >
            {title}
          </p>


          <div
            className={`
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-lg
              ${iconClass}
            `}
          >

            <Icon className="h-4 w-4" />

          </div>

        </div>


        <p
          className="
            mt-3
            truncate
            text-xl
            font-bold
            tracking-tight
            sm:text-2xl
          "
        >
          {value}
        </p>

      </CardContent>

    </Card>
  );
}


// ==================================================
// SUMMARY ITEM
// ==================================================

function SummaryItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {

  return (

    <div className="p-4 sm:p-5">

      <p
        className="
          text-xs
          text-muted-foreground
        "
      >
        {label}
      </p>


      <p
        className="
          mt-1
          text-base
          font-semibold
          sm:text-lg
        "
      >
        {value}
      </p>

    </div>
  );
}