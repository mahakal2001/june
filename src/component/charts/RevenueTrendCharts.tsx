"use client"

import { useMemo, useState } from "react"

import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import "./RevenueTrendCharts.css";

export const description = "An area chart with axes"

const datasets = {
  "7": [
    { date: "14 May", current: 30, previous: 20 },
    { date: "15 May", current: 28, previous: 17 },
    { date: "16 May", current: 40, previous: 29 },
    { date: "17 May", current: 38, previous: 24 },
    { date: "18 May", current: 47, previous: 34 },
    { date: "19 May", current: 35, previous: 22 },
    { date: "20 May", current: 41, previous: 30 },
  ],

  "30": [
    { date: "Week 1", current: 180, previous: 120 },
    { date: "Week 2", current: 240, previous: 180 },
    { date: "Week 3", current: 280, previous: 210 },
    { date: "Week 4", current: 320, previous: 260 },
  ],

  "90": [
    { date: "Jan", current: 700, previous: 500 },
    { date: "Feb", current: 850, previous: 620 },
    { date: "Mar", current: 910, previous: 740 },
  ],
}

const chartConfig = {
  current: {
    label: "This Period",
    color: "#3b82f6", // Blue
  },
  previous: {
    label: "Previous Period",
    color: "#22c55e", // Green
  },
} satisfies ChartConfig

export function RevenueTrendCharts() {
  const [range, setRange] = useState<"7 Days" | "30 Days" | "90 Days">("7 Days");
  const chartData = useMemo(() => datasets[range.split(" ")[0] as "7" | "30" | "90"], [range])

  return (
    <Card className="rounded-sm border border-slate-200 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-1">
          <CardTitle className="text-xl font-semibold tracking-tight">
           Revenue Trend
           </CardTitle>

        </div>

       <Select value={range}
         onValueChange={(value) =>
         setRange(value as "7 Days" | "30 Days" | "90 Days")}
        >
          <SelectTrigger className="w-[100px] rounded-sm border bg-background shadow-sm">
             <SelectValue />
           </SelectTrigger>

         <SelectContent className="selector">
            <SelectItem value="7 Days">7 Days</SelectItem>
            <SelectItem value="30 Days">30 Days</SelectItem>
            <SelectItem value="90 Days">90 Days</SelectItem>
         </SelectContent>
       </Select>
    </CardHeader>
      <CardContent>
        <p className="mb-3 text-sm font-medium text-muted-foreground">₹ in Lakhs</p>
        <ChartContainer config={chartConfig} className="chartContainer h-[380px] w-[100%] [&_.recharts-cartesian-grid-horizontal_line]:stroke-slate-200">
        <AreaChart accessibilityLayer data={chartData} margin={{ top: 20, left: -16, right: 16, bottom: 10,}}>
     {/* ==========================
         Gradients
     =========================== */}

     <defs>
        <linearGradient id="currentGradient" x1="0" y1="0" x2="0" y2="1">
         <stop offset="0%" stopColor="var(--color-current)" stopOpacity={0.35} />
         <stop offset="100%" stopColor="var(--color-current)" stopOpacity={0} />
        </linearGradient>

       <linearGradient id="previousGradient" x1="0" y1="0" x2="0" y2="4">
         <stop offset="0%" stopColor="var(--color-previous)" stopOpacity={0.30}/>
         <stop offset="100%" stopColor="var(--color-previous)" stopOpacity={0} />
      </linearGradient>
    </defs>

    {/* ==========================
          Grid
    =========================== */}

    <CartesianGrid vertical={false} strokeDasharray="0" stroke="#E2E8F0"/>

    {/* ==========================
          X Axis
    =========================== */}

    <XAxis
      dataKey="date"
      tickLine={false}
      axisLine={false}
      tickMargin={16}
      fontSize={12}
      tick={{
        fill: "#64748b",
      }}
    />

    {/* ==========================
          Y Axis
    =========================== */}

    <YAxis
      tickLine={false}
      axisLine={false}
      tickMargin={14}
      fontSize={12}
      tick={{
        fill: "#64748b",
      }}
      domain={[0, 50]}
      ticks={[0, 10, 20, 30, 40, 50]}
    />

    {/* ==========================
          Tooltip
    =========================== */}

    <ChartTooltip
      labelClassName="rounded-xl border bg-background shadow-lg"
      cursor={{
        stroke: "#94a3b8",
        strokeDasharray: "4 4",
      }}
      content={<ChartTooltipContent indicator="dot" />}
    />

    {/* ==========================
       Previous Period
    =========================== */}

    <Area
      dataKey="previous"
      type="monotone"
      stroke="var(--color-previous)"
      fill="url(#previousGradient)"
      strokeWidth={2.5}
      isAnimationActive animationDuration={900}
      dot={{
        r: 5,
        fill: "var(--color-previous)",
        strokeWidth: 2,
      }}
      activeDot={{
         r:7,
         strokeWidth: 3,
      }}
    />

    {/* ==========================
        Current Period
    =========================== */}

    <Area
      dataKey="current"
      type="monotone"
      stroke="var(--color-current)"
      fill="url(#currentGradient)"
      strokeWidth={2}
      dot={{
        r: 5,
        fill: "var(--color-current)",
        strokeWidth: 2,
      }}
      activeDot={{
        r: 7,
        strokeWidth: 3,
      }}
    />
  </AreaChart>
</ChartContainer>
<div className="foot-note flex items-center justify-center">

   <div className="flex items-center gap-2">
     <svg
      width="22"
      height="12"
      viewBox="0 0 22 12"
      className="shrink-0">
      <line
        x1="1"
        y1="6"
        x2="21"
        y2="6"
        stroke="#3b82f6"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle
        cx="11"
        cy="6"
        r="3.5"
        fill="#3b82f6"
        stroke="#3b82f6"
        strokeWidth="2"
      />
     </svg>

    <span className="text-sm font-medium text-slate-600">
      This Period
    </span>
  </div>

  <div className="flex items-center gap-2">
     <svg
      width="22"
      height="12"
      viewBox="0 0 22 12"
      className="shrink-0">
      <line
        x1="1"
        y1="6"
        x2="21"
        y2="6"
        stroke="#22c55e"
        strokeWidth="2"
        strokeLinecap="round" />
        <circle
        cx="11"
        cy="6"
        r="3.5"
        fill="#22c55e"
        stroke="#22c55e"
        strokeWidth="2"
      />
      </svg>

    <span className="text-sm font-medium text-slate-600">
      Previous Period
    </span>
  </div>

</div>
      </CardContent>
    </Card>
  )
}
