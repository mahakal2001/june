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
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import { MonthlyDepartmentRevenueData } from "./MonthlyDepartmentRevenueData";

export default function MonthlyDepartmentRevenueChart() {

 const [range, setRange] = useState<string | null>("Select Month");
 const [_activeIndex, setActiveIndex] = useState(0);

   const data = useMemo(() => {
      // base data from file
      const base = MonthlyDepartmentRevenueData;

      const total = base.reduce((sum, item) => sum + item.revenue, 0);

      // return a new array that includes percentage for each item
      return base.map((item) => ({
        ...item,
        department: item.name,
        percentage: Number(((item.revenue / total) * 100).toFixed(0)),
      }));

    }, [range]); 

    const totalRevenue = data
      .reduce((sum, item) => sum + item.revenue, 0)
      .toFixed(2);

   const CustomTooltip = ({ active, payload }: any) => {
    if (!active || !payload?.length) return null;

   const item = payload[0].payload;



  return (
    <div className="min-w-55 rounded-xl border bg-background p-4 shadow-xl">

      <div className="mb-3 flex items-center gap-2">

        <div
          className="h-3 w-3 rounded-full"
          style={{
            background: item.color,
          }}
        />

        <span className="font-semibold">
          {item.department}
        </span>

      </div>

      <div className="space-y-2 text-sm">

        <div className="flex justify-between">

          <span className="text-muted-foreground">
            Monthly Revenue
          </span>

          <span className="font-semibold">
            ₹ {item.revenue} Cr
          </span>

        </div>

        <div className="flex justify-between">

          <span className="text-muted-foreground">
            Contribution
          </span>

          <span className="font-semibold">
            {item.percentage}%
          </span>

        </div>

      </div>

    </div>
    );
  };

  return (
    <Card className="MonthlyDepartmentRevenue-card overflow-hidden rounded-sm border bg-card 
    shadow-sm transition-shadow hover:shadow-md">
      <CardHeader>
        <div className="flex flex-col gap-4 md:flex-row 
        md:items-center md:justify-between">
          <div className="flex flex-wrap gap-1">
            <CardTitle className="text-lg font-semibold">
              Revenue by Department
            </CardTitle>

            <p className="pt-[0.2em] text-[16px] text-muted-foreground">
              ({range})
            </p>
          </div>

          <Select value={range}
          onValueChange={setRange}>
            <SelectTrigger className="w-45 rounded-sm border 
            bg-background shadow-sm">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="Current Month">
                Current Month
              </SelectItem>

              <SelectItem value="Last Month">
                Last Month
              </SelectItem>

              <SelectItem value="4 Months">
                Last 4 Months
              </SelectItem>

              <SelectItem value="8 Months">
                Last 8 Months
              </SelectItem>

              <SelectItem value="12 Months">
                Last 12 Months
              </SelectItem>
            </SelectContent>
          </Select>

        </div>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center">
          <div className="mx-auto h-80 w-full lg:w-[42%]">

            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
              <Pie
              data={data}
              dataKey="revenue"
              nameKey="department"
              onMouseEnter={(_, index) => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(0)}
              cx="50%"
              cy="50%"
              innerRadius={72}
              outerRadius={108}
              paddingAngle={2}
              cornerRadius={6}
              stroke="#fff"
              strokeWidth={2}
              isAnimationActive
              animationDuration={900}
              animationEasing="ease-out"
              >

                  {data.map((item) => (
                    <Cell key={item.name}
                    fill={item.color}/>
                  ))} 

                  

                          <text x="50%"
                          y="46%"
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fill="currentColor"
                          className="fill-muted-foreground text-xs"
                          style={{
                            fontSize: "12px",
                            fontWeight: 500,
                          }}>
                            Monthly Total
                          </text>

                          <text x="50%"
                          y="56%"
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fill="currentColor"
                          className="fill-foreground"
                          style={{
                            fontSize: "24px",
                            fontWeight: 700,
                          }}>
                           ₹ {totalRevenue} L
                          </text>


                       
                  

                

                  <Tooltip content={<CustomTooltip />} />

                </Pie>

              </PieChart>
            </ResponsiveContainer>

          </div>

          <div className="flex-1 space-y-2">

            {data.map((item, index) => (

              <div
              key={item.department}
              onMouseEnter={() => setActiveIndex(index)}
              className="flex cursor-pointer items-center justify-between 
              rounded-lg px-4 py-3 transition-all duration-300 hover:bg-muted 
              hover:shadow-sm">

                <div className="flex items-center gap-3">

                  <div
                  className="h-3 w-3 rounded-full"
                  style={{
                   background: item.color,
                  }}/>

                  <div>
                    <p className="font-medium">
                      {item.department}
                    </p>
                  </div>

                </div>

                <div className="text-right flex gap-6">

                  <p className="font-semibold">
                    ₹ {item.revenue} L
                  </p>

                  <p className="text-xs text-muted-foreground">
                   ( {item.percentage}%)
                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>
      </CardContent>
    </Card>
  )

}
 