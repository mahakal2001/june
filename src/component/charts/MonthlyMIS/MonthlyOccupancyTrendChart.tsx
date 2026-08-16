import { useMemo, useState } from "react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { monthlyOccupancyData } from "./MonthlyOccupancyData";

export default function MonthlyOccupancyTrendChart() {

  const [range, setRange] = useState("8");


  // --------------------------------------------------
  // Filter Data
  // --------------------------------------------------

  const chartData = useMemo(() => {
  const count = Number(range);

  return  monthlyOccupancyData.slice(-count);
  }, [range]);

  const rangeLabels: Record<string, string> = {
  "2": "Current vs Previous Month",
  "4": "Last 4 Months",
  "8": "Last 8 Months",
  "12": "Last 12 Months",
  };


  // --------------------------------------------------
  // Current Occupancy
  // --------------------------------------------------

  const currentOccupancy =
    chartData[chartData.length - 1]?.occupancy ?? 0;


  // --------------------------------------------------
  // Previous Occupancy
  // --------------------------------------------------

  const previousOccupancy =
    chartData[chartData.length - 2]?.occupancy ?? 0;


  // --------------------------------------------------
  // Occupancy Change
  // --------------------------------------------------

  const occupancyChange =
    currentOccupancy - previousOccupancy;

    const getOccupancyStatus = (occupancy: number) => {
  if (occupancy >= 85) {
    return {
      label: "High",
      className: "text-emerald-600",
    };
  }

  if (occupancy >= 70) {
    return {
      label: "Optimal",
      className: "text-blue-600",
    };
  }

  return {
    label: "Low",
    className: "text-amber-600",
  };
  };


  // --------------------------------------------------
  // Custom Tooltip
  // --------------------------------------------------

  const CustomTooltip = ({
  active,
  payload,
}: any) => {
  if (!active || !payload?.length) {
    return null;
  }

  const item = payload[0].payload;
  const status = getOccupancyStatus(item.occupancy);

  return (
    <div className="min-w-52.5 rounded-xl border bg-background p-4 shadow-xl">

      {/* Week */}
      <div className="mb-3 flex items-center gap-2">

        <div
          className="h-3 w-3 rounded-full"
          style={{
            backgroundColor: "#2563EB",
          }}
        />

        <div>
          <p className="font-semibold">
            {item.month}
          </p>

          <p className="text-xs text-muted-foreground">
            {item.dateRange}
          </p>
        </div>

      </div>

      {/* Occupancy */}
      <div className="flex items-center justify-between gap-6">

        <span className="text-sm text-muted-foreground">
          Occupancy
        </span>

        <span className="text-base font-semibold text-blue-600">
          {item.occupancy}%
        </span>

      </div>

      <div className="mt-3 flex items-center justify-between gap-6">

          <span className="text-sm text-muted-foreground">
            Status
          </span>

          <span
           className={`text-sm font-semibold ${status.className}`}>
              {status.label}
         </span>

      </div>

    </div>
  );
 };

  // --------------------------------------------------
  // Component
  // --------------------------------------------------

  return (

    <Card className="OccupancyTrend-card overflow-hidden rounded-sm border bg-card shadow-sm">

      {/* --------------------------------------------- */}
      {/* Header */}
      {/* --------------------------------------------- */}

      <CardHeader className="pb-2">

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          {/* Title */}

          <div className="flex items-center gap-2">

            <CardTitle className="text-lg font-semibold tracking-tight sm:text-xl">

              Occupancy Trend

            </CardTitle>

            <p className="text-sm text-muted-foreground">
              ({rangeLabels[range]})
            </p>

          </div>


          {/* Week Selector */}

          <Select
            value={range}
            onValueChange={(value) => value && setRange(value)}
          >

            <SelectTrigger className="w-full sm:w-41.25">

              <SelectValue placeholder="Select period">
                {rangeLabels[range]}
              </SelectValue>

            </SelectTrigger>

            <SelectContent>

              <SelectItem value="2">
                Current vs Previous Month
              </SelectItem>

              <SelectItem value="4">
                Last 4 Months
              </SelectItem>

              <SelectItem value="8">
                Last 8 Months
              </SelectItem>

              <SelectItem value="12">
                Last 12 Months
              </SelectItem>

            </SelectContent>

          </Select>

        </div>


        {/* --------------------------------------------- */}
        {/* Metric Summary */}
        {/* --------------------------------------------- */}

        <div className="mt-5 flex flex-wrap items-end justify-between gap-6">

          <div>

            <p className="text-xs font-medium text-muted-foreground">
              Occupancy (%)
            </p>

          </div>


          <div className="text-right">

              <div className="flex items-baseline justify-end gap-1">

                   <span className="text-2xl font-bold tracking-tight">
                       {currentOccupancy}
                    </span>

                    <span className="text-sm font-medium text-muted-foreground">
                        %
                    </span>


                </div>

            <p
              className={
                occupancyChange >= 0
                  ? "mt-1 text-xs font-medium text-emerald-600"
                  : "mt-1 text-xs font-medium text-red-500"
              }
            >

              {occupancyChange >= 0 ? "+" : ""}
              {occupancyChange}% vs previous month

            </p>

          </div>

        </div>

      </CardHeader>


      {/* --------------------------------------------- */}
      {/* Chart */}
      {/* --------------------------------------------- */}

      <CardContent>

        <div className="h-65 w-full sm:h-75 md:h-85 lg:h-90">

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <AreaChart
              data={chartData}
              margin={{
                top: 12,
                right: 12,
                left: 0,
                bottom: 4,
              }}
            >

              {/* -------------------------------- */}
              {/* Gradient */}
              {/* -------------------------------- */}

              <defs>

                <linearGradient
                  id="monthlyOccupancyGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >

                  <stop
                    offset="0%"
                    stopColor="#2563EB"
                    stopOpacity={0.22}
                  />

                  <stop
                    offset="100%"
                    stopColor="#2563EB"
                    stopOpacity={0.02}
                  />

                </linearGradient>

              </defs>


              {/* -------------------------------- */}
              {/* Grid */}
              {/* -------------------------------- */}

              <CartesianGrid
                vertical={false}
                stroke="#E5E7EB"
                strokeOpacity={0.7}
              />


              {/* -------------------------------- */}
              {/* X Axis */}
              {/* -------------------------------- */}

              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={12}
                minTickGap={20}
                interval="preserveStartEnd"
                tick={{
                  fontSize: 11,
                  fill: "#64748B",
                }}
              />


              {/* -------------------------------- */}
              {/* Y Axis */}
              {/* -------------------------------- */}

              <YAxis
                domain={[0, 100]}
                ticks={[0, 20, 40, 60, 80, 100]}
                tickLine={false}
                axisLine={false}
                width={38}
                tick={{
                  fontSize: 11,
                  fill: "#64748B",
                }}
                tickFormatter={(value) => `${value}`}
                
              />


              {/* -------------------------------- */}
              {/* Tooltip */}
              {/* -------------------------------- */}

              <Tooltip
                cursor={{
                  stroke: "#CBD5E1",
                  strokeDasharray: "4 4",
                }}
                content={<CustomTooltip />}
              />


              {/* -------------------------------- */}
              {/* Occupancy Area */}
              {/* -------------------------------- */}

              <Area
                type="monotone"
                dataKey="occupancy"
                stroke="#2563EB"
                strokeWidth={2.5}
                fill="url(#monthlyOccupancyGradient)"
                dot={{
                  r: 4,
                  fill: "#2563EB",
                  stroke: "#FFFFFF",
                  strokeWidth: 2,
                }}
                activeDot={{
                  r: 6,
                  fill: "#2563EB",
                  stroke: "#FFFFFF",
                  strokeWidth: 3,
                }}
                animationDuration={900}
                animationEasing="ease-out"
              />

            </AreaChart>

          </ResponsiveContainer>

        </div>

      </CardContent>

    </Card>

  );
}