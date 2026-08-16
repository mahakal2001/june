import { useMemo, useState } from "react";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

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
  CollectionTrendData,
  type CollectionPeriod,
} from "./CollectionTrendData";

import './CollectionTrend.css';


// ======================================================
// PERIOD LABELS
// ======================================================

const periodLabels: Record<
  CollectionPeriod,
  string
> = {
  Monthly: "Last 12 Months",
  Quarterly: "Last 4 Quarters",
  Yearly: "Last 5 Years",
};


// ======================================================
// CUSTOM TOOLTIP
// ======================================================

interface CollectionTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

function CollectionTooltip({
  active,
  payload,
  label,
}: CollectionTooltipProps) {

  if (!active || !payload?.length) {
    return null;
  }

  const collection = payload.find(
    (item) => item.dataKey === "collection"
  )?.value;

  const outstanding = payload.find(
    (item) => item.dataKey === "outstanding"
  )?.value;


  return (
    <div className="min-w-50 rounded-xl border bg-background/95 p-4 shadow-xl backdrop-blur-md">

      {/* ==================================================
          LABEL
      ================================================== */}

      <p className="mb-3 text-xs font-medium text-muted-foreground">
        {label}
      </p>


      {/* ==================================================
          COLLECTION
      ================================================== */}

      <div className="flex items-center justify-between gap-6">

        <div className="flex items-center gap-2">

          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />

          <span className="text-xs text-muted-foreground">
            Collection
          </span>

        </div>

        <span className="text-sm font-semibold text-foreground">
          ₹ {Number(collection).toFixed(2)} Cr
        </span>

      </div>


      {/* ==================================================
          OUTSTANDING
      ================================================== */}

      <div className="mt-2 flex items-center justify-between gap-6">

        <div className="flex items-center gap-2">

          <span className="h-2.5 w-2.5 rounded-full bg-rose-500" />

          <span className="text-xs text-muted-foreground">
            Outstanding
          </span>

        </div>

        <span className="text-sm font-semibold text-foreground">
          ₹ {Number(outstanding).toFixed(2)} Cr
        </span>

      </div>

    </div>
  );
}


// ======================================================
// COMPONENT
// ======================================================

export default function CollectionTrend() {

  // ====================================================
  // PERIOD
  // ====================================================

  const [period, setPeriod] =
    useState<CollectionPeriod>("Monthly");


  // ====================================================
  // CHART DATA
  // ====================================================

  const chartData = useMemo(() => {

    return CollectionTrendData[period];

  }, [period]);


  return (

    <Card
      className="
        w-full overflow-hidden border-border/60 bg-card shadow-sm rounded-sm
      "
    >

      {/* ==================================================
          HEADER
      ================================================== */}

      <CardHeader
        className="
          gap-4 px-4 pb-0 pt-2 sm:px-6 sm:pt-2
        "
      >

        <div
          className="
            flex
            flex-col
            gap-4
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >

          {/* ==================================================
              TITLE
          ================================================== */}

          <div className="flex items-center">

            <CardTitle
              className="
                text-[20px]
                font-bold
                tracking-tight
                text-foreground
              "
            >

              Collection vs Outstanding

              <span
                className="
                  pl-1 font-medium pt-[0.2em]
                  text-[16px]
                  text-muted-foreground
                "
              >
                ({periodLabels[period]})
              </span>

            </CardTitle>

          </div>


          {/* ==================================================
              PERIOD SELECT
          ================================================== */}

          <Select
            value={period}
            onValueChange={(value) =>
              setPeriod(
                value as CollectionPeriod
              )
            }
          >

            <SelectTrigger
              className="h-9 w-full rounded-sm text-[14px]
             font-medium sm:w-31.25"
            >
              <SelectValue />
            </SelectTrigger>


            <SelectContent>

              <SelectItem value="Monthly">
                Monthly
              </SelectItem>

              <SelectItem value="Quarterly">
                Quarterly
              </SelectItem>

              <SelectItem value="Yearly">
                Yearly
              </SelectItem>

            </SelectContent>

          </Select>

        </div>

      </CardHeader>


      {/* ==================================================
          CHART CONTENT
      ================================================== */}

      <CardContent
        className="
         px-4 pb-4 pt-1 sm:px-8 sm:pb-5
        "
      >
        <div className="collection-legends flex flex-wrap pb-4">
         {/* ==================================================
          UNIT
          ================================================== */}

          <p className="mt-1 text-[12px] font-medium text-muted-foreground sm:text-xs">
            ₹ in Crores
         </p>


        {/* ==================================================
            LEGEND
        ================================================== */}

        <div className="Collectionlegends-list flex items-center gap-6 text-xs">

          {/* COLLECTION */}

          <div className="flex items-center gap-2">

            <span className="h-2.5 w-2.5 rounded-xs bg-emerald-500" />

            <span className="font-medium text-muted-foreground">
              Collection
            </span>

          </div>


          {/* OUTSTANDING */}

          <div className="flex items-center gap-2">

            <span className="h-2.5 w-2.5 rounded-xs bg-rose-500" />

            <span className="font-medium text-muted-foreground">
              Outstanding
            </span>

          </div>

          </div>
        </div>

        <div
          className="
            h-61.25
            w-full
            sm:h-71.25
            lg:h-80
          "
        >

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <AreaChart
              data={chartData}
              margin={{
                top: 8,
                right: 10,
                left: -12,
                bottom: 0,
              }}
            >

              {/* ==================================================
                  GRADIENT
              ================================================== */}

              <defs>

                <linearGradient
                  id="collectionAreaGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >

                  <stop
                    offset="0%"
                    stopColor="#10b981"
                    stopOpacity={0.18}
                  />

                  <stop
                    offset="55%"
                    stopColor="#10b981"
                    stopOpacity={0.08}
                  />

                  <stop
                    offset="100%"
                    stopColor="#10b981"
                    stopOpacity={0.01}
                  />

                </linearGradient>

              </defs>


              {/* ==================================================
                  GRID
              ================================================== */}

              <CartesianGrid
                vertical={false}
                strokeDasharray="3 5"
                stroke="hsl(var(--border))"
                opacity={0.45}
              />


              {/* ==================================================
                  X AXIS
              ================================================== */}

              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tickMargin={10}
                interval="preserveStartEnd"
                tick={{
                  fill: "hsl(var(--muted-foreground))",
                  fontSize: 10,
                }}
              />


              {/* ==================================================
                  Y AXIS
              ================================================== */}

              <YAxis
                axisLine={false}
                tickLine={false}
                width={30}
                domain={[0, 6]}
                ticks={[0, 1, 2, 3, 4, 5, 6]}
                tick={{
                  fill: "hsl(var(--muted-foreground))",
                  fontSize: 10,
                }}
              />


              {/* ==================================================
                  TOOLTIP
              ================================================== */}

              <Tooltip
                content={
                  <CollectionTooltip />
                }
                cursor={{
                  stroke: "hsl(var(--border))",
                  strokeWidth: 1,
                  strokeDasharray: "4 4",
                }}
              />


              {/* ==================================================
                  COLLECTION
              ================================================== */}

              <Area
                type="monotone"
                dataKey="collection"
                stroke="#10b981"
                strokeWidth={2.2}
                fill="url(#collectionAreaGradient)"
                fillOpacity={1}
                dot={{
                  r: 3.5,
                  fill: "#10b981",
                  strokeWidth: 0,
                }}
                activeDot={{
                  r: 5,
                  fill: "#10b981",
                  stroke: "hsl(var(--background))",
                  strokeWidth: 2,
                }}
                animationDuration={800}
                animationEasing="ease-out"
              />


              {/* ==================================================
                  OUTSTANDING
              ================================================== */}

              <Area
                type="monotone"
                dataKey="outstanding"
                stroke="#f43f5e"
                strokeWidth={2}
                fill="transparent"
                dot={{
                  r: 3.5,
                  fill: "#f43f5e",
                  strokeWidth: 0,
                }}
                activeDot={{
                  r: 5,
                  fill: "#f43f5e",
                  stroke: "hsl(var(--background))",
                  strokeWidth: 2,
                }}
                animationDuration={800}
                animationEasing="ease-out"
              />

            </AreaChart>

          </ResponsiveContainer>

        </div>

      </CardContent>

    </Card>
  );
}