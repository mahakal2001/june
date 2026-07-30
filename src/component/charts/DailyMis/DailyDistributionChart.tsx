"use client";

import * as React from "react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
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
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

import "./DailyDistributionChart.css";

const todayData = [
  {
    name: "New Visit",
    value: 568,
    color: "#2563eb",
  },
  {
    name: "Follow-up",
    value: 512,
    color: "#10b981",
  },
  {
    name: "Procedure",
    value: 168,
    color: "#fb923c",
  },
 
];

const yesterdayData = [
  {
    name: "New Visit",
    value: 540,
    color: "#2563eb",
  },
  {
    name: "Follow-up",
    value: 485,
    color: "#10b981",
  },
  {
    name: "Procedure",
    value: 150,
    color: "#fb923c",
  },
];

const weeklyData = [
  {
    name: "New Visit",
    value: 3450,
    color: "#2563eb",
  },
  {
    name: "Follow-up",
    value: 2950,
    color: "#10b981",
  },
  {
    name: "Procedure",
    value: 1040,
    color: "#fb923c",
  },
];

const monthlyData = [
  {
    name: "New Visit",
    value: 14250,
    color: "#2563eb",
  },
  {
    name: "Follow-up",
    value: 12800,
    color: "#10b981",
  },
  {
    name: "Procedure",
    value: 4250,
    color: "#fb923c",
  },
];

const chartConfig = {
  visits: {
    label: "Visits",
  },
};


export default function DailyDistributionChart() {
  const [view, setView] = React.useState("Today");

  const data = React.useMemo(() => {
    switch (view) {
      case "Yesterday":
        return yesterdayData;

      case "Weekly":
        return weeklyData;

      case "Monthly":
        return monthlyData;

      default:
        return todayData;
    }
  }, [view]);

  const total = data.reduce((sum, item) => sum + item.value, 0);

  const CenterLabel = () => (
  <>
    <text
      x="50%"
      y="44%"
      textAnchor="middle"
      dominantBaseline="middle"
      className="fill-slate-500 text-sm font-medium"
    >
      Total
    </text>

    <text
      x="50%"
      y="58%"
      textAnchor="middle"
      dominantBaseline="middle"
      className="fill-slate-900 text-[34px] font-bold"
    >
      {total.toLocaleString()}
    </text>
   </>
  );

  return (
    <Card
      className="DailyDistributionCard
      rounded-sm
      shadow-sm
      border
      hover:shadow-xl
      transition-all
      duration-300 relative
      "
    >
      <CardHeader className="flex justify-between items-center">

        <CardTitle className="text-lg font-semibold">

          Visit Type Distribution

          <span className="text-muted-foreground font-normal">

            {" "}
            (Today)

          </span>

        </CardTitle>


        <Select
          value={view}
          onValueChange={(value) => {
            if (value !== null) {
              setView(value);
            }
          }}
        >

          <SelectTrigger className="w-36 rounded-lg">

            <SelectValue />

          </SelectTrigger>

          <SelectContent>

            <SelectItem value="Today">
              Today
            </SelectItem>

            <SelectItem value="Yesterday">
              Yesterday
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

        <div className="grid lg:grid-cols-2 gap-6 justify-center
         distributionpie items-center">

          <ChartContainer
            config={chartConfig}
            className="VisitChart h-[260px]"
          >

            <ResponsiveContainer width="100%" height="100%">

              <PieChart>

                <defs>

                  <filter id="shadow">

                    <feDropShadow
                      dx="0"
                      dy="3"
                      stdDeviation="6"
                      floodOpacity=".18"
                    />

                  </filter>

                </defs>

                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={72}
                  outerRadius={108}
                  paddingAngle={2}
                  cornerRadius={10}
                  stroke="#fff"
                  strokeWidth={4}
                  animationBegin={0}
                  animationDuration={1500}
                  animationEasing="ease-out"
                  filter="url(#shadow)"
                  startAngle={90}
                  endAngle={-270}
                >
                  {data.map((entry) => (
                    <Cell
                      key={entry.name}
                      fill={entry.color}
                    />
                  ))}
                </Pie>

                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      indicator="dot"
                      formatter={(value) => [
                        value,
                        "Patients",
                        ""
                      ]}
                    />
                  }
                />

                <CenterLabel />
              </PieChart>

            </ResponsiveContainer>

          </ChartContainer>

          <div className="flex flex-col justify-center space-y-6">

              {data.map((item) => {

              const percent =
                ((item.value / total) * 100).toFixed(1);

              return (

                <div
                  key={item.name}
                  className="
                  flex
                  items-center
                  justify-between gap-2 DistributionChartdata
                  "
                >

                  <div className="flex items-center justify-between
                  rounded-sm px-0 py-1 hover:bg-slate-50 transition-colors gap-4">

                    <div
                      className="w-3 h-3 rounded-[4px] shadow-sm"
                      style={{
                        background: item.color,
                      }}
                    />

                    <span className="font-medium">

                      {item.name}

                    </span>

                  </div>

                  <span className="font-semibold text-slate-800">

                    {item.value.toLocaleString()}

                    {" "}

                    <span className="ml-2 text-slate-500">

                      ({percent}%)

                    </span>

                  </span>

                </div>

              );

            })}

          </div>

        </div>

      </CardContent>

    </Card>
  );
}