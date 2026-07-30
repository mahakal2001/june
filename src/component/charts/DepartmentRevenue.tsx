"use client"

import * as React from "react"
import { useEffect, useState } from "react";

import { MoreVertical } from "lucide-react"
import { Label, Pie, PieChart, ResponsiveContainer } from "recharts"
import { Cell } from "recharts"


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

import "./DepartmentRevenue.css";

export const description = "A donut chart with text"



const chartData = [
  {
    department: "General Medicine",
    revenue: 4.25,
    percentage: 22.7,
    fill: "#2563EB",
  },
  {
    department: "Orthopedics",
    revenue: 3.85,
    percentage: 20.5,
    fill: "#3B82F6",
  },
  {
    department: "Cardiology",
    revenue: 3.10,
    percentage: 16.5,
    fill: "#14B8A6",
  },
  {
    department: "Pediatrics",
    revenue: 2.35,
    percentage: 12.5,
    fill: "#F59E0B",
  },
  {
    department: "Gynecology",
    revenue: 1.95,
    percentage: 10.4,
    fill: "#F43F5E",
  },
  {
    department: "Others",
    revenue: 3.25,
    percentage: 17.4,
    fill: "#94A3B8",
  },
]

const chartConfig = {
  revenue: {
    label: "Revenue",
  },

  general: {
    label: "General Medicine",
    color: "#2563EB",
  },

  orthopedic: {
    label: "Orthopedics",
    color: "#3B82F6",
  },

  cardio: {
    label: "Cardiology",
    color: "#14B8A6",
  },

  pediatric: {
    label: "Pediatrics",
    color: "#F59E0B",
  },

  gyne: {
    label: "Gynecology",
    color: "#F43F5E",
  },

  others: {
    label: "Others",
    color: "#94A3B8",
  },
} satisfies ChartConfig

export function DepartmentRevenue() {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

useEffect(() => {
  const handleResize = () => {
    setScreenWidth(window.innerWidth);
  };

  window.addEventListener("resize", handleResize);

  return () => window.removeEventListener("resize", handleResize);
}, []);
const { innerRadius, outerRadius } = (() => {
  if (screenWidth <= 768) {
    return {
      innerRadius: 40,
      outerRadius: 70,
    };
  }

  if (screenWidth <= 1024) {
    return {
      innerRadius: 48,
      outerRadius: 82,
    };
  }

  if (screenWidth <= 1445) {
    return {
      innerRadius: 60,
      outerRadius: 92,
    };
  }

  return {
    innerRadius: 60,
    outerRadius: 106,
  };
})();

  const totalRevenue = React.useMemo(() => {
     return chartData.reduce(
     (sum, item) => sum + item.revenue,
      0
    )
  }, [])

  return (
    <Card className="rounded-sm border border-slate-200 bg-white shadow-sm">
      <CardHeader className="cardHeader flex flex-row items-center justify-between pb-6 px-6">

       <CardTitle className="text-xl font-bold tracking-tight text-slate-900">
         Department Revenue (Today)
        </CardTitle>

      <button className="rounded-lg p-2 hover:bg-slate-100 transition" aria-label="More options">
         <MoreVertical className="h-5 w-5 text-slate-500"/>
       </button>

      </CardHeader>
     <CardContent className="cardContent px-6 pb-6 pt-2">
        <ChartContainer
          config={chartConfig} className="pieContainer mx-auto aspect-square w-full max-w-[380px] min-w-[220px] h-auto">
            <ResponsiveContainer width="100%" height="100%">
          <PieChart>

          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel
             formatter={(value, name) => [`₹ ${value} L`, name,]}
             className="rounded-xl border shadow-lg"
           />}/>
           

          <Pie data={chartData} dataKey="revenue" nameKey="department" innerRadius={innerRadius}
             outerRadius={outerRadius} paddingAngle={2} cornerRadius={2} stroke="#ffffff"
             strokeWidth={0.6} isAnimationActive animationDuration={800} animationBegin={0}>
                {chartData.map((entry) => (
              <Cell key={entry.department} fill={entry.fill}/> ))}

             <Label className="label" content={({ viewBox }) => {
               if (viewBox && "cx" in viewBox && "cy" in viewBox) {
               return (
                  <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle"
                   dominantBaseline="middle" >
                  <tspan x={viewBox.cx} dy="-12"
                     className="total fill-slate-500 text-sm"> Total
                  </tspan>

                  <tspan x={viewBox.cx} dy="28"
                     className="totalNumber fill-slate-900 text-[28px] font-bold">
                     ₹ {totalRevenue.toFixed(2)} L
                    </tspan>
                  </text>
                )
               }
             }}
              />
          </Pie>

         </PieChart>
         </ResponsiveContainer>
    </ChartContainer>
       <div className="content space-y-4">
    {chartData.map((item) => (
      <div
        key={item.department}
        className="grid grid-cols-[20px_minmax(140px,1fr)_90px_70px] items-center gap-1"
      >
        {/* Colored Dot */}
        <div
          className="h-3 w-3 rounded-full shadow-sm"
          style={{
            backgroundColor: item.fill,
          }}
        />

        {/* Department */}
       <p className="text-sm font-medium text-slate-700">
          {item.department}
        </p>

        {/* Revenue */}
        <p className="text-[16px] font-bold text-slate-900 whitespace-nowrap 
          divide-y divide-slate-100">
           ₹ {item.revenue.toFixed(2)} L
       </p>

        {/* Percentage */}
       <p className="text-sm text-slate-500 font-medium  whitespace-nowrap">
          ({item.percentage}%)
        </p>
      </div>
    ))}
     </div>
     </CardContent>
      
    </Card>
  )
}
