import { useMemo } from "react";

import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";

import {
  ResponsiveContainer,
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { MonthlyRevenueData } from "./MonthlyRevenueData";


export default function MonthlyRevenueTrendChart() {

  /*
   * Your source data is:
   * 68, 84, 78 ... etc.
   *
   * Assuming these values are in Lakhs,
   * convert them to Crores:
   *
   * 68 Lakhs = 0.68 Crores
   */
  const chartData = useMemo(() => {
    return MonthlyRevenueData.map((item) => ({
      ...item,
      revenue: item.revenue / 100,
      collection: item.collection / 100,
    }));
  }, []);


  /* ======================================================
     CUSTOM TOOLTIP
     ====================================================== */

  const CustomTooltip = ({
    active,
    payload,
    label,
  }: any) => {

    if (!active || !payload?.length) {
      return null;
    }

    const revenue =
      payload.find(
        (item: any) => item.dataKey === "revenue"
      )?.value ?? 0;

    const collection =
      payload.find(
        (item: any) => item.dataKey === "collection"
      )?.value ?? 0;

    const percentage =
      revenue > 0
        ? ((collection / revenue) * 100).toFixed(1)
        : "0.0";


    return (
      <div
        className="
          min-w-[190px]
          rounded-xl
          border
          border-slate-200
          bg-white
          p-4
          shadow-xl
        "
      >

        {/* Month */}
        <div className="mb-3 border-b pb-2">
          <p className="text-sm font-semibold text-slate-900">
            {label}
          </p>
        </div>


        {/* Revenue */}
        <div className="mb-2 flex items-center justify-between gap-6">

          <div className="flex items-center gap-2">

            <span className="h-2.5 w-2.5 rounded-full bg-blue-600" />

            <span className="text-sm text-slate-600">
              Revenue
            </span>

          </div>

          <span className="text-sm font-semibold text-slate-900">
            ₹ {revenue.toFixed(2)} Cr
          </span>

        </div>


        {/* Collection */}
        <div className="mb-2 flex items-center justify-between gap-6">

          <div className="flex items-center gap-2">

            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />

            <span className="text-sm text-slate-600">
              Collection
            </span>

          </div>

          <span className="text-sm font-semibold text-slate-900">
            ₹ {collection.toFixed(2)} Cr
          </span>

        </div>


        {/* Collection Percentage */}
        <div className="mt-3 border-t pt-2">

          <div className="flex items-center justify-between">

            <span className="text-xs text-slate-500">
              Collection %
            </span>

            <span className="text-sm font-semibold text-slate-900">
              {percentage}%
            </span>

          </div>

        </div>

      </div>
    );
  };


  return (

    <Card
      className="
        RevenueTrend-card
        w-full
        overflow-hidden
        rounded-sm
        border
        border-slate-200
        bg-white
        shadow-sm
      "
    >

      {/* ==================================================
          HEADER
          ================================================== */}

      <CardHeader className="px-5 pb-0 pt-2 sm:px-6">

        <div className="flex items-center">

          {/* Title */}
          <h2
            className="
              text-base
              text-[22px]
              font-bold
              tracking-tight
              text-[#172554]
              sm:text-[22px]
            "
          >
            Monthly Revenue Trend

            <span
              className="
                pl-1
                font-normal
                text-slate-500
                text-[20px]
              "
            >
              (Last 12 Months)
            </span>

          </h2>

        </div>

      </CardHeader>


      {/* ==================================================
          CONTENT
          ================================================== */}

      <CardContent
        className="
          px-4
          pb-5
          pt-2
          sm:px-5
        "
      >

        {/* =================================================
            CHART TOP INFORMATION
            ================================================= */}

        <div
          className="
            mb-1
            flex
            flex-wrap
            items-center
            justify-between
            gap-3
          "
        >

          {/* Unit */}
          <span
            className="
              text-[10px]
              font-medium
              text-slate-500
              sm:text-xs
            "
          >
            ₹ in Crores
          </span>


          {/* Legend */}
          <div
            className="
              flex
              items-center
              gap-5
              pr-2
              sm:gap-7
            "
          >

            {/* Revenue */}
            <div className="flex items-center gap-2">

              <span
                className="
                  h-2.5
                  w-2.5
                  rounded-sm
                  bg-blue-600
                "
              />

              <span
                className="
                  text-[10px]
                  font-medium
                  text-slate-600
                  sm:text-xs
                "
              >
                Revenue
              </span>

            </div>


            {/* Collection */}
            <div className="flex items-center gap-2">

              <span
                className="
                  h-2.5
                  w-2.5
                  rounded-sm
                  bg-emerald-500
                "
              />

              <span
                className="
                  text-[10px]
                  font-medium
                  text-slate-600
                  sm:text-xs
                "
              >
                Collection
              </span>

            </div>

          </div>

        </div>


        {/* =================================================
            CHART
            ================================================= */}

        <div
          className="
            h-[250px]
            w-full
            sm:h-[280px]
            md:h-[380px]
          "
        >

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <AreaChart
              data={chartData}
              margin={{
                top: 12,
                right: 10,
                left: 0,
                bottom: 4,
              }}
            >

              {/* ===========================================
                  GRADIENTS
                  =========================================== */}

              <defs>

                <linearGradient
                  id="monthlyRevenueGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >

                  <stop
                    offset="0%"
                    stopColor="#2563EB"
                    stopOpacity={0.18}
                  />

                  <stop
                    offset="100%"
                    stopColor="#2563EB"
                    stopOpacity={0.02}
                  />

                </linearGradient>


                <linearGradient
                  id="monthlyCollectionGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >

                  <stop
                    offset="0%"
                    stopColor="#10B981"
                    stopOpacity={0.18}
                  />

                  <stop
                    offset="100%"
                    stopColor="#10B981"
                    stopOpacity={0.02}
                  />

                </linearGradient>

              </defs>


              {/* ===========================================
                  GRID
                  =========================================== */}

              <CartesianGrid
                vertical={false}
                stroke="#E5E7EB"
                strokeDasharray="0"
              />


              {/* ===========================================
                  X AXIS
                  =========================================== */}

              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={12}
                minTickGap={12}
                interval={0}
                tick={{
                  fontSize: 10,
                  fill: "#64748B",
                  fontWeight: 500,
                }}
              />


              {/* ===========================================
                  Y AXIS
                  =========================================== */}

              <YAxis
                tickLine={false}
                axisLine={false}
                width={32}
                domain={[0, "auto"]}
                tickCount={6}
                tick={{
                  fontSize: 10,
                  fill: "#64748B",
                  fontWeight: 500,
                }}
                tickFormatter={(value) =>
                  Number(value).toFixed(1)
                }
              />


              {/* ===========================================
                  TOOLTIP
                  =========================================== */}

              <Tooltip
                content={<CustomTooltip />}
                cursor={{
                  stroke: "#CBD5E1",
                  strokeWidth: 1,
                  strokeDasharray: "4 4",
                }}
              />


              {/* ===========================================
                  REVENUE
                  =========================================== */}

              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#2563EB"
                strokeWidth={2.5}
                fill="url(#monthlyRevenueGradient)"
                connectNulls
                dot={{
                  r: 3.5,
                  fill: "#2563EB",
                  stroke: "#FFFFFF",
                  strokeWidth: 1.5,
                }}
                activeDot={{
                  r: 5.5,
                  fill: "#2563EB",
                  stroke: "#FFFFFF",
                  strokeWidth: 2,
                }}
                animationDuration={1000}
              />


              {/* ===========================================
                  COLLECTION
                  =========================================== */}

              <Area
                type="monotone"
                dataKey="collection"
                stroke="#10B981"
                strokeWidth={2.5}
                fill="url(#monthlyCollectionGradient)"
                connectNulls
                dot={{
                  r: 3.5,
                  fill: "#10B981",
                  stroke: "#FFFFFF",
                  strokeWidth: 1.5,
                }}
                activeDot={{
                  r: 5.5,
                  fill: "#10B981",
                  stroke: "#FFFFFF",
                  strokeWidth: 2,
                }}
                animationDuration={1000}
              />

            </AreaChart>

          </ResponsiveContainer>

        </div>

      </CardContent>

    </Card>
  );
}