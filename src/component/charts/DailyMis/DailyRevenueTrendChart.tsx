"use client";

import * as React from "react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import {
  ChartContainer,
} from "@/components/ui/chart";

import "./DailyRevenueTrendChart.css";

import {
  ResponsiveContainer,
  AreaChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const chartData = {
  Hourly: [
  { time: "8 AM", revenue: 0.9, collection: 0.5 },
  { time: "9 AM", revenue: 2.2, collection: 1.5 },
  { time: "10 AM", revenue: 2.2, collection: 1.6 },
  { time: "11 AM", revenue: 2.7, collection: 1.9 },
  { time: "12 PM", revenue: 2.9, collection: 2.0 },
  { time: "1 PM", revenue: 3.6, collection: 2.7 },
  { time: "2 PM", revenue: 3.9, collection: 3.0 },
  { time: "3 PM", revenue: 4.8, collection: 3.8 },
  { time: "4 PM", revenue: 4.8, collection: 3.8 },
  { time: "5 PM", revenue: 4.7, collection: 3.7 },
  { time: "6 PM", revenue: 3.8, collection: 2.8 },
  { time: "7 PM", revenue: 3.5, collection: 2.6 },
  { time: "8 PM", revenue: 3.3, collection: 2.4 },
  { time: "9 PM", revenue: 2.4, collection: 1.7 },
  { time: "10 PM", revenue: 2.1, collection: 1.6 },
  { time: "11 PM", revenue: 1.8, collection: 1.4 },
  ],

  Daily: [
    { time: "Mon", revenue: 18, collection: 15 },
    { time: "Tue", revenue: 21, collection: 17 },
    { time: "Wed", revenue: 19, collection: 16 },
    { time: "Thu", revenue: 24, collection: 20 },
    { time: "Fri", revenue: 26, collection: 23 },
    { time: "Sat", revenue: 28, collection: 25 },
    { time: "Sun", revenue: 23, collection: 19 },
  ],

  Weekly: [
    { time: "Week 1", revenue: 120, collection: 110 },
    { time: "Week 2", revenue: 135, collection: 122 },
    { time: "Week 3", revenue: 128, collection: 118 },
    { time: "Week 4", revenue: 148, collection: 136 },
  ],

  Monthly: [
    { time: "Jan", revenue: 480, collection: 430 },
    { time: "Feb", revenue: 510, collection: 470 },
    { time: "Mar", revenue: 560, collection: 510 },
    { time: "Apr", revenue: 590, collection: 540 },
    { time: "May", revenue: 620, collection: 575 },
    { time: "Jun", revenue: 670, collection: 620 },
    { time: "Jul", revenue: 720, collection: 675 },
    { time: "Aug", revenue: 690, collection: 640 },
    { time: "Sep", revenue: 710, collection: 660 },
    { time: "Oct", revenue: 735, collection: 690 },
    { time: "Nov", revenue: 760, collection: 720 },
    { time: "Dec", revenue: 810, collection: 770 },
  ],
};

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "#2563eb",
  },
  collection: {
    label: "Collection",
    color: "#10b981",
  },
};

export default function DailyRevenueTrendChart() {
  const [view, setView] = React.useState<keyof typeof chartData>("Hourly");

  return (
    <Card className="Dailychartcard rounded-sm shadow-sm border
    bg-white hover:shadow-xl transition-all relative 
    duration-300">

      <CardHeader className="flex flex-row items-center justify-between border-b
       pb-5">
        

        <CardTitle className="text-lg font-semibold">

          Revenue vs Collection Trend

          <span className="text-muted-foreground font-normal">

            {" "}
            (Today)

          </span>

        </CardTitle>

        <Select
          value={view}
          onValueChange={(val) => setView(val ?? "Hourly")}
        >
          <SelectTrigger className="w-36 rounded-sm border shadow-sm">

            <SelectValue />

          </SelectTrigger>

          <SelectContent>

            <SelectItem value="Hourly">
              Hourly
            </SelectItem>

            <SelectItem value="Daily">
              Daily
            </SelectItem>

            <SelectItem value="Weekly">
              Weekly
            </SelectItem>

            <SelectItem value="Monthly">
              Monthly
            </SelectItem>

          </SelectContent>

        </Select>

      </CardHeader>

      <CardContent>

        <ChartContainer
          config={chartConfig}
          className="DailyChart w-full"
        >
           <p className="Dailycharttext text-sm text-muted-foreground 
           font-semibold mb-2">
            ₹ in Lakhs
           </p>
           <div className="rounded-sm bg-gradient-to-b from-blue-50/40 to-white">
          <ResponsiveContainer width="100%" height="100%">
            

            <AreaChart
              data={chartData[view]}
              margin={{
                top: -14,
                right: 12,
                left: -26,
                bottom: 0,
              }}
            >

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
                    stopOpacity={0.35}
                  />

                  <stop
                    offset="100%"
                    stopColor="#10b981"
                    stopOpacity={0}
                  />

                </linearGradient>

                <linearGradient
                   id="collectionGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >

                  <stop
                    offset="5%"
                    stopColor="#10b981"
                    stopOpacity={0.25}
                  />

                  <stop
                    offset="95%"
                    stopColor="#10b981"
                    stopOpacity={0}
                  />

                </linearGradient>

              </defs>

              <CartesianGrid
                stroke="#E5E7EB"
                strokeDasharray="4 4"
                vertical={false}
                opacity={0.8}
              />

              <XAxis
                dataKey="time"
                tickLine={false}
                axisLine={false}
                tick={{
                    fontSize:12,
                    fill:"#64748B",
                    fontWeight:600,
                }}
              />

              <YAxis
                domain={[0, 5]}
                tickCount={6}
                tick={{
                    fontSize:12,
                    fill:"#64748B",
                    fontWeight:600,
                }}
                tickLine={false}
                axisLine={false}
                className="DailyY"
              />

              <Tooltip
                cursor={{
                    stroke:"#CBD5E1",
                    strokeWidth:1,
                    strokeDasharray:"4 4"
                }}

                contentStyle={{
                    borderRadius:12,
                    border:"1px solid #E5E7EB",
                    background:"#fff",
                    boxShadow:"0 10px 25px rgba(0,0,0,.12)"
                }}
                labelStyle={{
                    fontWeight:700
                }}
                formatter={(value,name)=>[`${value} Lakhs`,
                    name==="revenue"
                    ? "Revenue"
                    : "Collection"
                ]}
              />

              <Legend
                verticalAlign="top"
                align="center"
                iconType="square"
                iconSize={10}
                wrapperStyle={{
                    paddingBottom:20,
                    fontWeight:600
                }}
              />

              <Line
                type="natural"
                dataKey="revenue"
                stroke="#2563eb"
                strokeWidth={3.5}
                dot={{
                  r: 4,
                  fill: "#2563eb",
                  stroke:"#fff",
                  strokeWidth:2
                }}
                activeDot={{
                  r: 7,
                  fill: "#2563eb",
                  stroke:"#fff",
                  strokeWidth:3
                }}
                animationDuration={1800}
              />

              <Line
                type="natural"
                dataKey="collection"
                stroke="#10b981"
                strokeWidth={3}
                dot={{
                  r: 4,
                  fill: "#10b981",
                  stroke:"#fff",
                  strokeWidth:2
                }}
                activeDot={{
                  r: 7,
                  fill: "#10b981",
                  stroke:"#fff",
                  strokeWidth:3
                }}
                animationDuration={1800}
              />

            </AreaChart>

          </ResponsiveContainer>
           </div>

        </ChartContainer>

      </CardContent>

    </Card>
  );
}