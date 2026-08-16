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

import { useMemo, useState } from "react";

import { RevenueTrendData } from "./RevenueTrendData";

import './RevenueTrend.css';

// ======================================================
// TYPES
// ======================================================

type RevenuePeriod = "Monthly" | "Quarterly" | "Yearly";

// ======================================================
// TOOLTIP
// ======================================================

function RevenueTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: any[];
  label?: string;
}) {
  if (!active || !payload?.length) {
    return null;
  }

  const revenue = payload.find(
    (item) => item.dataKey === "revenue"
  )?.value;

  const collection = payload.find(
    (item) => item.dataKey === "collection"
  )?.value;

  return (
    <div className="min-w-45 rounded-xl border bg-background/95 p-3 shadow-xl backdrop-blur-sm">
      <p className="mb-2 text-xs font-medium text-muted-foreground">
        {label}
      </p>

      <div className="space-y-2">
        <div className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-blue-600" />
            <span className="text-xs text-muted-foreground">
              Revenue
            </span>
          </div>

          <span className="text-sm font-semibold">
            ₹{revenue?.toFixed(2)} Cr
          </span>
        </div>

        <div className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
            <span className="text-xs text-muted-foreground">
              Collection
            </span>
          </div>

          <span className="text-sm font-semibold">
            ₹{collection?.toFixed(2)} Cr
          </span>
        </div>
      </div>
    </div>
  );
}


// ======================================================
// COMPONENT
// ======================================================

export default function RevenueTrendChart() {
  const [period, setPeriod] =
    useState<RevenuePeriod>("Monthly");

  const chartData = useMemo(() => {
    return RevenueTrendData[period];
  }, [period]);

  const periodLabels: Record<RevenuePeriod, string> = {
  Monthly: "Last 12 Months",
  Quarterly: "Last 4 Quarters",
  Yearly: "Last 5 Years",
  };


  return (
    <Card className="w-full overflow-hidden border-border/60 bg-card shadow-sm rounded-sm">

      {/* ==================================================
          HEADER
      ================================================== */}

      <CardHeader className="gap-4 px-4 pb-0 pt-2 sm:px-6 sm:pt-2">

        <div className="flex flex-col gap-4 sm:flex-row items-center justify-between">

          {/* TITLE */}

          <div className="flex">
            <CardTitle className="text-base text-[20px] font-bold tracking-tight text-foreground
            ">
              Revenue Trend
              <span className="pl-1 text-[16px] font-medium text-muted-foreground
              relative top-[-0.08em]">
                ({periodLabels[period]})
              </span>
            </CardTitle>

          </div>


          {/* PERIOD SELECT */}

          <Select
            value={period}
            onValueChange={(value) =>
              setPeriod(value as RevenuePeriod)
            }
          >
            <SelectTrigger className="h-9 w-full rounded-sm text-[14px]
            font-medium sm:w-31.25">
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
          CHART
      ================================================== */}

      <CardContent className="px-4 pb-4 pt-1 sm:px-8 sm:pb-5">

        <div className="legends flex flex-wrap pb-4">

              <p className="mt-1 text-[12px] font-medium text-muted-foreground sm:text-xs">
                ₹ in Crores
              </p>

             <div className="legends-list flex items-center gap-5 text-xs text-muted-foreground">

               <div className="flex items-center gap-2">
                 <span className="h-2.5 w-2.5 rounded-xs bg-blue-600" />
                 <span className="text-[12px] font-medium">Revenue</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-xs bg-emerald-500" />
                  <span className="text-[12px] font-medium">Collection</span>
               </div>

              </div>

            </div>

        <div className="h-62.5 w-full sm:h-72.5 lg:h-80">

          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <AreaChart
              data={chartData}
              margin={{
                top: 10,
                right: 10,
                left: -12,
                bottom: 0,
              }}
            >

              {/* GRADIENT */}

              <defs>

                <linearGradient
                  id="collectionGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor="#10b981"
                    stopOpacity={0.20}
                  />

                  <stop
                    offset="100%"
                    stopColor="#10b981"
                    stopOpacity={0.02}
                  />
                </linearGradient>

              </defs>


              {/* GRID */}

              <CartesianGrid
                vertical={false}
                strokeDasharray="3 5"
                className="stroke-muted"
                opacity={0.45}
              />


              {/* X AXIS */}

              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tickMargin={10}
                interval="preserveStartEnd"
                className="text-[10px]"
                tick={{
                  fill: "hsl(var(--muted-foreground))",
                  fontSize: 10,
                }}
              />


              {/* Y AXIS */}

              <YAxis
                axisLine={false}
                tickLine={false}
                domain={[0, 6]}
                ticks={[0, 1, 2, 3, 4, 5, 6]}
                width={30}
                tick={{
                  fill: "hsl(var(--muted-foreground))",
                  fontSize: 10,
                }}
              />


              {/* TOOLTIP */}

              <Tooltip
                content={<RevenueTooltip />}
                cursor={{
                  stroke: "hsl(var(--border))",
                  strokeWidth: 1,
                  strokeDasharray: "4 4",
                }}
              />


              {/* COLLECTION AREA */}

              <Area
                type="monotone"
                dataKey="collection"
                stroke="#10b981"
                strokeWidth={2}
                fill="url(#collectionGradient)"
                fillOpacity={1}
                dot={{
                  r: 3,
                  fill: "#10b981",
                  strokeWidth: 0,
                }}
                activeDot={{
                  r: 5,
                  fill: "#10b981",
                  stroke: "white",
                  strokeWidth: 2,
                }}
                animationDuration={800}
                animationEasing="ease-out"
              />


              {/* REVENUE LINE */}

              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#2563eb"
                strokeWidth={2.2}
                fill="transparent"
                dot={{
                  r: 3,
                  fill: "#2563eb",
                  strokeWidth: 0,
                }}
                activeDot={{
                  r: 5,
                  fill: "#2563eb",
                  stroke: "white",
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