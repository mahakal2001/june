import { useMemo, useState } from "react";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { RevenueDepartmentPieData } from "./RevenueDepartmentPieData";


// ======================================================
// COMPONENT
// ======================================================

export default function RevenueDepartmentPie() {

  const [_activeIndex, setActiveIndex] = useState(0);


  // ====================================================
  // DATA
  // ====================================================

  const data = useMemo(() => {

    const base = RevenueDepartmentPieData;

    const total = base.reduce(
      (sum, item) => sum + item.revenue,
      0
    );

    return base.map((item) => ({
      ...item,
      percentage: Number(
        ((item.revenue / total) * 100).toFixed(1)
      ),
    }));

  }, []);


  // ====================================================
  // TOTAL REVENUE
  // ====================================================

  const totalRevenue = data
    .reduce(
      (sum, item) => sum + item.revenue,
      0
    )
    .toFixed(2);


  // ====================================================
  // CUSTOM TOOLTIP
  // ====================================================

  const CustomTooltip = ({
    active,
    payload,
  }: any) => {

    if (!active || !payload?.length) {
      return null;
    }

    const item = payload[0]?.payload;

    if (!item) {
      return null;
    }


    return (
      <div className="min-w-55 rounded-xl border bg-background p-4 shadow-xl">

        {/* ==================================================
            DEPARTMENT
        ================================================== */}

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


        {/* ==================================================
            DETAILS
        ================================================== */}

        <div className="space-y-2 text-sm">

          {/* REVENUE */}

          <div className="flex justify-between gap-6">

            <span className="text-muted-foreground">
              Revenue
            </span>

            <span className="font-semibold">
              ₹ {item.revenue.toFixed(2)} Cr
            </span>

          </div>


          {/* CONTRIBUTION */}

          <div className="flex justify-between gap-6">

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


  // ====================================================
  // RETURN
  // ====================================================

  return (

    <Card
      className="
        RevenueDepartmentPie-card min-w-55
        overflow-hidden
        rounded-sm
        border
        bg-card
        shadow-sm
        transition-shadow
        hover:shadow-md
      "
    >

      {/* ==================================================
          HEADER
      ================================================== */}

      <CardHeader>

        <div className="gap-4 px-4 pb-0 pt-2 sm:px-6 sm:pt-2">

          <div className="flex flex-wrap gap-1">

            <CardTitle className="font-bold text-[20px]">

              Revenue by Department

            </CardTitle>


            <p className="pt-[0.16em] font-medium text-muted-foreground text-[16px]">

              (MTD)

            </p>

          </div>

        </div>

      </CardHeader>


      {/* ==================================================
          CONTENT
      ================================================== */}

      <CardContent>

        <div
          className="
            flex
            flex-col
            gap-8
            lg:flex-row
            lg:items-center
          "
        >


          {/* ==================================================
              DONUT CHART
          ================================================== */}

          <div
            className="
              mx-auto
              h-80
              w-full
              lg:w-[42%]
            "
          >

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <PieChart>

                <Pie
                  data={data}
                  dataKey="revenue"
                  nameKey="department"

                  onMouseEnter={(_, index) =>
                    setActiveIndex(index)
                  }

                  onMouseLeave={() =>
                    setActiveIndex(0)
                  }

                  cx="50%"
                  cy="50%"

                  innerRadius={72}
                  outerRadius={108}

                  paddingAngle={2}
                  cornerRadius={6}

                  stroke="hsl(var(--background))"
                  strokeWidth={2}

                  isAnimationActive

                  animationDuration={900}
                  animationEasing="ease-out"
                >

                  {/* ==================================================
                      PIE COLORS
                  ================================================== */}

                  {data.map((item) => (

                    <Cell
                      key={item.id}
                      fill={item.color}
                    />

                  ))}


                  {/* ==================================================
                      CENTER LABEL
                  ================================================== */}

                  <text
                    x="50%"
                    y="46%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="fill-muted-foreground"
                    style={{
                      fontSize: "12px",
                      fontWeight: 500,
                    }}
                  >
                    Total
                  </text>


                  {/* ==================================================
                      CENTER TOTAL
                  ================================================== */}

                  <text
                    x="50%"
                    y="56%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="fill-foreground"
                    style={{
                      fontSize: "24px",
                      fontWeight: 700,
                    }}
                  >
                    ₹ {totalRevenue} Cr
                  </text>


                  {/* ==================================================
                      TOOLTIP
                  ================================================== */}

                  <Tooltip
                    content={<CustomTooltip />}
                  />

                </Pie>

              </PieChart>

            </ResponsiveContainer>

          </div>


          {/* ==================================================
              DEPARTMENT LIST
          ================================================== */}

          <div className="flex-1 space-y-2">

            {data.map((item, index) => (

              <div
                key={item.department}

                onMouseEnter={() =>
                  setActiveIndex(index)
                }

                className="
                  flex
                  cursor-pointer
                  items-center
                  justify-between
                  rounded-lg
                  px-4
                  py-3
                  transition-all
                  duration-300
                  hover:bg-muted
                  hover:shadow-sm
                "
              >

                {/* ==================================================
                    LEFT SIDE
                ================================================== */}

                <div className="flex items-center gap-3">

                  {/* COLOR DOT */}

                  <div
                    className="
                      h-3
                      w-3
                      shrink-0
                      rounded-full
                    "
                    style={{
                      background: item.color,
                    }}
                  />


                  {/* DEPARTMENT NAME */}

                  <div>

                    <p className="font-medium">
                      {item.department}
                    </p>

                  </div>

                </div>


                {/* ==================================================
                    RIGHT SIDE
                ================================================== */}

                <div
                  className="
                    flex
                    shrink-0
                    items-center
                    gap-4
                    text-right
                    sm:gap-6
                  "
                >

                  {/* REVENUE */}

                  <p className="text-[14px] font-semibold sm:text-base">
                    ₹ {item.revenue.toFixed(2)} Cr
                  </p>


                  {/* PERCENTAGE */}

                  <p className="w-12 text-xs text-muted-foreground sm:text-[13px]">
                    ({item.percentage}%)
                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

      </CardContent>

    </Card>
  );
}