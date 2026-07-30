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
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import "./DailyPaymentModeChart.css";

const todayData = [
  {
    name: "Cash",
    value: 962,
    color: "#2563EB",
  },
  {
    name: "Card",
    value: 328,
    color: "#10B981",
  },
  {
    name: "UPI",
    value: 176,
    color: "#FB923C",
  },
  {
    name: "Insurance",
    value: 108,
    color: "#7C3AED",
  },
];

const yesterdayData = [
  {
    name: "Cash",
    value: 890,
    color: "#2563EB",
  },
  {
    name: "Card",
    value: 310,
    color: "#10B981",
  },
  {
    name: "UPI",
    value: 168,
    color: "#FB923C",
  },
  {
    name: "Insurance",
    value: 95,
    color: "#7C3AED",
  },
];

const weeklyData = [
  {
    name: "Cash",
    value: 6400,
    color: "#2563EB",
  },
  {
    name: "Card",
    value: 2350,
    color: "#10B981",
  },
  {
    name: "UPI",
    value: 1200,
    color: "#FB923C",
  },
  {
    name: "Insurance",
    value: 740,
    color: "#7C3AED",
  },
];

const monthlyData = [
  {
    name: "Cash",
    value: 25500,
    color: "#2563EB",
  },
  {
    name: "Card",
    value: 12800,
    color: "#10B981",
  },
  {
    name: "UPI",
    value: 7600,
    color: "#FB923C",
  },
  {
    name: "Insurance",
    value: 4200,
    color: "#7C3AED",
  },
];

const chartConfig = {
  payment: {
    label: "Payment",
  },
};

export default function DailyPaymentModeChart() {
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

  const handleViewChange = (value: string | null) => {
    if (value) {
      setView(value);
    }
  };

  return (
    <Card className="DailyPaymentCard rounded-sm shadow-sm 
    hover:shadow-xl transition-all relative">

      <CardHeader className="flex flex-row justify-between items-center">

        <CardTitle className="text-lg font-semibold">
          Payment Mode

          <span className="text-muted-foreground font-normal">
            {" "}
            ({view})
          </span>

        </CardTitle>

        <Select
          value={view}
          onValueChange={handleViewChange}
        >
          <SelectTrigger className="w-36 rounded-sm">
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

        <div className="grid lg:grid-cols-2 gap-8 
         paymentpie items-center">

          <ChartContainer
            config={chartConfig}
            className="h-[260px]"
          >

            <ResponsiveContainer>

              <PieChart>

                <Pie
                  data={data}
                  dataKey="value"
                  innerRadius={60}
                  outerRadius={102}
                  startAngle={90}
                  endAngle={-270}
                  paddingAngle={2}
                  cornerRadius={10}
                  stroke="#fff"
                  strokeWidth={3}
                >

                  {data.map((item) => (

                    <Cell
                      key={item.name}
                      fill={item.color}
                    />

                  ))}

                </Pie>

                <ChartTooltip
                  content={
                    <ChartTooltipContent />
                  }
                />

                <text
                  x="50%"
                  y="46%"
                  textAnchor="middle"
                  fill="#64748B"
                  fontSize="14"
                  fontWeight="500"
                >
                  Total
                </text>

                <text
                  x="50%"
                  y="60%"
                  textAnchor="middle"
                  fill="#0F172A"
                  fontSize="30"
                  fontWeight="700"
                >
                  {total.toLocaleString()}
                </text>

              </PieChart>

            </ResponsiveContainer>

          </ChartContainer>

          <div className="space-y-5">

            {data.map((item) => {

              const percent = (
                (item.value / total) *
                100
              ).toFixed(1);

              return (

                <div
                  key={item.name}
                  className="flex justify-between items-center"
                >

                  <div className="flex items-center gap-3">

                    <div
                      className="w-4 h-4 rounded-full"
                      style={{
                        background: item.color,
                      }}
                    />

                    <span className="font-medium">
                      {item.name}
                    </span>

                  </div>

                  <div className="font-semibold">

                    {item.value.toLocaleString()}

                    <span className="text-muted-foreground ml-2">

                      ({percent}%)

                    </span>

                  </div>

                </div>

              );
            })}

          </div>

        </div>

        <p className="mt-6 text-xs text-muted-foreground italic">

          * Multiple payment modes in single bill

        </p>

      </CardContent>

    </Card>
  );
}