import {
  ArrowDown,
  ArrowUp,
} from "lucide-react";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import {
  MonthlyMISKPIData,
} from "./MonthlyMISKPIData";


// ======================================================
// TYPES
// ======================================================

interface MonthlyKPI {
  id: number;

  title: string;

  value: string;

  change: number;

  comparison: string;

  icon: React.ElementType;

  iconColor: string;

  iconBackground: string;

  chartColor: string;

  sparklineColor: string;

  sparklineData: number[];
}


// ======================================================
// COMPONENT
// ======================================================

export default function MonthlyMISKPI() {

  return (

    <section
      className="
        w-full
      "
    >

      {/* ================================================= */}
      {/* KPI SCROLLER */}
      {/* ================================================= */}

      <div
        className="
          monthly-mis-kpi-scroll
          flex
          flex-wrap
          w-full
          gap-3
          overflow-x-auto
          pb-2
          scrollbar-thin
        "
      >

        {MonthlyMISKPIData.map(
          (kpi) => (

            <MonthlyKPICard
              key={kpi.id}
              data={kpi}
            />

          )
        )}

      </div>

    </section>
  );
}


// ======================================================
// KPI CARD
// ======================================================

function MonthlyKPICard({
  data,
}: {
  data: MonthlyKPI;
}) {

  const Icon = data.icon;


  // ====================================================
  // CHANGE DIRECTION
  // ====================================================

  const isPositive =
    data.change >= 0;


  return (

    <Card
      className="
        monthly-mis-kpi-card

        h-auto
        min-w-46.25
        flex-1
        2xl:min-w-0

        overflow-hidden

        rounded-sm

        border
        border-slate-200

        bg-white

        shadow-[0_1px_3px_rgba(15,23,42,0.04)]

        transition-all
        duration-200

        hover:-translate-y-px
        hover:border-slate-300
        hover:shadow-md
      "
    >

      <CardContent
        className="
          relative
          p-5
          sm:p-4
        "
      >

        {/* ================================================= */}
        {/* TOP CONTENT */}
        {/* ================================================= */}

        <div
          className="
            flex
            items-start
            gap-3
          "
        >

          {/* ----------------------------------------------- */}
          {/* ICON */}
          {/* ----------------------------------------------- */}

          <div
            className={`
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center

              rounded-full

              ${data.iconBackground}

              transition-transform
              duration-200

              group-hover:scale-105
            `}
          >

            <Icon
              className={`
                h-4.5
                w-4.5
                ${data.iconColor}
              `}
              strokeWidth={2}
            />

          </div>


          {/* ----------------------------------------------- */}
          {/* KPI CONTENT */}
          {/* ----------------------------------------------- */}

          <div
            className="
              min-w-0
              flex-1
            "
          >

            {/* ------------------------------------------- */}
            {/* TITLE */}
            {/* ------------------------------------------- */}

            <p
              className="
                mb-2
                truncate

                text-xs
                font-medium
                uppercase

                leading-4

                text-slate-500
              "
            >
              {data.title}
            </p>


            {/* ------------------------------------------- */}
            {/* VALUE */}
            {/* ------------------------------------------- */}

            <p
              className="
                truncate

                pt-1

                text-2xl
                font-bold
                leading-6

                tracking-tight

                text-slate-900

                sm:text-[22px]
              "
            >
              {data.value}
            </p>


            {/* ------------------------------------------- */}
            {/* CHANGE */}
            {/* ------------------------------------------- */}

            <div
              className="
                flex
                items-center

                gap-2

                whitespace-nowrap

                pt-1
              "
            >

              {/* CHANGE VALUE */}

              <span
                className={`
                  flex
                  items-center
                  gap-0.5

                  text-[12px]
                  font-semibold

                  ${
                    isPositive
                      ? "text-emerald-600"
                      : "text-red-500"
                  }
                `}
              >

                {isPositive ? (

                  <ArrowUp
                    className="
                      h-3
                      w-3
                    "
                    strokeWidth={2.5}
                  />

                ) : (

                  <ArrowDown
                    className="
                      h-3
                      w-3
                    "
                    strokeWidth={2.5}
                  />

                )}

                {Math.abs(
                  data.change
                ).toFixed(1)}

                {/* Avg. Length of Stay is measured in days */}

                {data.id !== 6 && "%"}

              </span>


              {/* COMPARISON */}

              <span
                className="
                  truncate

                  text-[9px]

                  text-slate-400
                "
              >
                {data.comparison}
              </span>

            </div>

          </div>

        </div>


        {/* ================================================= */}
        {/* SPARKLINE */}
        {/* ================================================= */}

        <div
          className="
            -mx-1

            h-8.5
            w-full

            pt-2
          "
        >

          <MiniSparkline
            data={data.sparklineData}
            color={data.sparklineColor}
          />

        </div>

      </CardContent>

    </Card>
  );
}


// ======================================================
// MINI SPARKLINE
// ======================================================

interface MiniSparklineProps {
  data: number[];
  color: string;
}


function MiniSparkline({
  data,
  color,
}: MiniSparklineProps) {

  const width = 160;

  const height = 28;

  const paddingX = 1;

  const paddingY = 3;


  // ====================================================
  // EMPTY DATA SAFETY
  // ====================================================

  if (!data || data.length === 0) {
    return null;
  }


  // ====================================================
  // MIN / MAX
  // ====================================================

  const values =
    data.map(
      (item) => item
    );


  const min =
    Math.min(...values);

  const max =
    Math.max(...values);

  const range =
    max - min || 1;


  // ====================================================
  // POINT CALCULATION
  // ====================================================

  const getPoint = (
    value: number,
    index: number
  ) => {

    const x =
      data.length === 1
        ? width / 2
        : paddingX +
          (index / (data.length - 1)) *
            (width - paddingX * 2);


    const y =
      height -
      paddingY -
      ((value - min) / range) *
        (height - paddingY * 2);


    return {
      x,
      y,
    };
  };


  // ====================================================
  // POLYLINE POINTS
  // ====================================================

  const points = data
    .map((item, index) => {

      const point =
        getPoint(
          item,
          index
        );

      return `${point.x},${point.y}`;

    })
    .join(" ");


  return (

    <svg
      viewBox={`0 0 ${width} ${height}`}

      preserveAspectRatio="none"

      className="
        h-full
        w-full
        overflow-visible
      "

      aria-hidden="true"
    >

      {/* ================================================= */}
      {/* BASELINE */}
      {/* ================================================= */}

      <line
        x1="0"
        y1={height - 1}

        x2={width}
        y2={height - 1}


        strokeWidth="0.7"
      />


      {/* ================================================= */}
      {/* SPARKLINE */}
      {/* ================================================= */}

      <polyline
        points={points}

        fill="none"

        stroke={color}

        strokeWidth="1.5"

        strokeLinecap="round"

        strokeLinejoin="round"

        vectorEffect="non-scaling-stroke"
      />


      {/* ================================================= */}
      {/* DATA POINTS */}
      {/* ================================================= */}

      {data.map(
        (item, index) => {

          const point =
            getPoint(
              item,
              index
            );


          return (

            <circle
              key={index}

              cx={point.x}
              cy={point.y}

              r="1.35"

              fill={color}
            />

          );

        }
      )}

    </svg>
  );
}