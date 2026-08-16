import { useMemo, } from "react";

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
  ResponsiveContainer,
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import React from "react";

import { weeklyRevenueData } from "./WeeklyRevenueData";


export default function WeeklyRevenueTrendChart() {

const [weeks, setWeeks] = React.useState("Select Week");

  const chartData = useMemo(() => {
    const count = Number(weeks);
    return weeklyRevenueData.slice(-count);
  }, [weeks]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;
    const revenue = payload[0].value;
    const collection = payload[1].value;
    const percentage = ((collection / revenue) * 100).toFixed(1);

   return (

    <div className="rounded-xl border bg-white p-4 shadow-xl">

        <div className="mb-3 font-semibold">
            {label}
        </div>

        <div className="space-y-2">

            <div className="flex justify-between gap-10">
                <span className="text-blue-600">
                    Revenue
                </span>

                <span className="font-semibold">
                    ₹ {revenue} L
                </span>
                
            </div>

            <div className="flex justify-between gap-10">
                <span className="text-emerald-600">
                    Collection
                </span>

                <span className="font-semibold">
                    ₹ {collection} L
                </span>
            </div>

            <div className="border-t pt-2 text-sm text-muted-foreground">
                Collection %

                <span className="float-right font-semibold text-black">
                    {percentage}%
                </span>
            </div>

        </div>

    </div>

    );

    };

    return (
        <Card className="RevenueTrend-card rounded-sm border shadow-sm h-135">

            <CardHeader>

                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                   <div>

                    <CardTitle className="text-xl font-semibold">
                       Weekly Revenue Trend
                    </CardTitle>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Last {weeks} Weeks
                    </p>

                   </div>

                   <Select
                     value={weeks}
                     onValueChange={(value) => {
                       if (value) {
                         setWeeks(value);
                       }
                     }}
                   >

                      <SelectTrigger className="w-42.5">
                        
                        <SelectValue />

                      </SelectTrigger>

                      <SelectContent>

                        <SelectItem value="1 Week">
                            This Week
                        </SelectItem>

                        <SelectItem value="4 Week">
                            Last 4 Weeks
                        </SelectItem>

                        <SelectItem value="8 Week">
                           Last 8 Weeks
                        </SelectItem>

                        <SelectItem value="12 Week">
                           Last 12 Weeks
                        </SelectItem>

                      </SelectContent>

                   </Select>

                </div>

            </CardHeader>

            <CardContent className="pr-6 h-65 sm:h-80 lg:h-90">

                <div className="mt-6 flex flex-wrap justify-center gap-6">

                    <div className="flex items-center gap-2">

                        <div className="h-3 w-3 rounded bg-blue-600"/>
                        Revenue

                    </div>

                    <div className="flex items-center gap-2">

                        <div className="h-3 w-3 rounded bg-emerald-500"/>
                        Collection
                        
                    </div>

                </div>

                <ResponsiveContainer width="100%" height="100%">
                    
                    <p className="mt-1 pb-4 text-sm text-muted-foreground w-45
                    font-semibold">
                        In Crores
                    </p>
                   <AreaChart data={chartData}
                      margin={{
                       top: 0,
                       right: 16,
                       left: 6,
                       bottom: 0,
                      }}>

                      <defs>

                        <linearGradient id="blue">

                            <stop offset="5%"
                            stopColor="#2563EB"
                            stopOpacity={0.25}/>

                            <stop offset="95%"
                            stopColor="#2563EB"
                            stopOpacity={0}/>

                        </linearGradient>

                        <linearGradient id="green">

                            <stop offset="5%"
                            stopColor="#10B981"
                            stopOpacity={0.20}/>

                            <stop offset="95%"
                            stopColor="#10B981"
                            stopOpacity={0}/>

                        </linearGradient>

                      </defs>

                      <CartesianGrid strokeDasharray="4 4"
                      vertical={false}
                      stroke="#E5E7EB"/>

                      <XAxis dataKey="week"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={12}
                      minTickGap={20}
                      interval="preserveStartEnd"
                       tick={{
                       fontSize: 11,
                       fill: "#64748B",
                        }}/>

                      <YAxis 
                      
                      tickLine={false}
                      axisLine={false}
                      width={35}
                       tick={{
                         fontSize: 11,
                          fill: "#64748B",
                       }} tickFormatter={(value) => `${value}`}/>

                      <Tooltip content={<CustomTooltip />} />
                      

                      <Area 
                      type="monotone"
                      dataKey="revenue"
                      stroke="#2563EB"
                      strokeWidth={3}
                      fill="url(#blue)"
                      
                      dot={{
                        r:4,
                        fill:"#2563EB",
                        stroke:"#fff",
                        strokeWidth:2,
                      }}
                      
                      activeDot={{
                        r:7,
                        fill:"#2563EB",
                        stroke:"#fff",
                        strokeWidth:3,
                      }}
                      animationDuration={1200}
                      />

                       <Area 
                      type="monotone"
                      dataKey="collection"
                      stroke="#10B981"
                      strokeWidth={3}
                      fill="url(#green)"
                      
                      dot={{
                        r:4,
                        fill:"#10B981",
                        stroke:"#fff",
                        strokeWidth:2,
                      }}
                      
                      activeDot={{
                        r:7,
                        fill:"#10B981",
                        stroke:"#fff",
                        strokeWidth:3,
                      }}
                      animationDuration={1200}
                      />
                      

                   </AreaChart>

                </ResponsiveContainer>

            </CardContent>

        </Card>
    )
}