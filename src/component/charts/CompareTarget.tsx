"use client"

import { useEffect, useState } from "react";

import {
  Pie,
  PieChart,
  Cell,
  ResponsiveContainer,
  Label,
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

import "./CompareTarget.css"
import { MoreVertical } from "lucide-react"

export const description = "A radial chart showing collection vs target"

const collected = 5.47
const target = 6.96

const percentage = Number(
  ((collected / target) * 100).toFixed(1)
)

// Data structure for the radial chart
const chartData = [
  {
    name: "Collection",
    value: percentage,
    fill: "#33C46A",
  },
  {
    name: "Warning",
    value: 7,
    fill: "#F59E0B",
  },
  {
    name: "Remaining",
    value: 100 - percentage - 7,
    fill: "#D7DEE9",
  },
]

const chartConfig = {
  Collection: {
    label: "Collection",
    color: "#22c55e",
  },

  Warning: {
    label: "Warning",
    color: "#f59e0b",
  },

  Remaining: {
    label: "Remaining",
    color: "#d9dee8",
  },
} satisfies ChartConfig

export function CompareTarget() {
  // Calculate the target and collection values
  const percentage = 78.6;
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
        innerRadius: 128,
        outerRadius: 162,
      };
    }
  
    return {
      innerRadius: 150,
      outerRadius: 182,
    };
  })();
  

  return (
    <Card className="w-full rounded-xl border bg-white shadow-sm">
      <CardHeader className="cardHeader flex flex-row items-center justify-between pb-6 px-6">
         <CardTitle className="text-[20px] font-semibold text-slate-900">
            Collection vs Target (MTD)
          </CardTitle>
          <button className="rounded-lg p-2 hover:bg-slate-100 transition" aria-label="More options">
            <MoreVertical className="h-5 w-5 text-slate-500"/>
          </button>
       </CardHeader>
      
      <CardContent className="pb-6">
        <div className="flex flex-col items-center justify-center">

          {/* Radial Chart */}
         <ChartContainer config={chartConfig} className="mx-auto h-[280px] w-[380px]">
            <ResponsiveContainer className={`w-auto`}  height="100%">

            
            <PieChart data={chartData} className="mx-auto aspect-square w-full max-w-[380px] min-w-[380px] h-auto">
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />}/>
              <Pie data={chartData} dataKey="value" startAngle={180} endAngle={0}
                 cx="50%" cy="80%" innerRadius={innerRadius} outerRadius={outerRadius} paddingAngle={1}
                 stroke="none">
                    {chartData.map((entry, index) => ( <Cell key={index} fill={entry.fill}
                    stroke="white" strokeWidth={2}/> ))}
                    <Label content={({ viewBox }) => { if (!viewBox || 
                       !("cx" in viewBox) || !("cy" in viewBox)) {
                        return null}

                      const { cx, cy } = viewBox

                        return (
                          <g>
                          {/* Percentage */}
                          <text x={cx} y={cy - 0} textAnchor="middle" dominantBaseline="middle">
                             <tspan className="fill-slate-900 text-[34px] font-bold"> 
                                {percentage}%
                              </tspan>
                          </text>

                          {/* Collected */}
                           <text x={cx} y={cy + 44} textAnchor="middle" dominantBaseline="middle">
                              <tspan className="fill-slate-900 text-[24px] font-semibold">
                                 ₹ {collected.toFixed(2)} Cr
                              </tspan>
                           </text>

                          {/* Target Amount */}
                          <text x={cx} y={cy + 74} textAnchor="middle" dominantBaseline="middle">
                              <tspan className="font-semibold fill-slate-500 text-[15px]">
                                 of ₹ {target.toFixed(2)} Cr
                              </tspan>
                           </text>

                          {/* Label */}
                          <text x={cx} y={cy + 96} textAnchor="middle" dominantBaseline="middle">
                              <tspan className="font-semibold fill-slate-500 text-[15px]">
                                 Target
                              </tspan>
                          </text>
                         </g>
                        )
                    }}/>
                </Pie>
            </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
          {/* Progress Labels */}
          <div className="level mx-auto -mt-2 flex w-[72.8%] justify-between text-sm font-semibold text-slate-600">
               <span>0%</span>
               <span>100%</span>
           </div>
        </div>
      </CardContent>
    </Card>
  )
}