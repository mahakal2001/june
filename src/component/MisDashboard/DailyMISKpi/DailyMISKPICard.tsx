import {
  ArrowUp,
} from "lucide-react";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import { DailyMISSparkline } from "./DailyMISSparkline";

interface Props {
  data: any;
}

export function DailyMISKPICard({
  data,
}: Props) {
  const Icon = data.icon;

  return (
    <Card
      className="
      h-45
      border
      rounded-sm
      shadow-sm
      hover:shadow-xl
      transition-all
      duration-300
      bg-white
      overflow-hidden
      group
      hover:-translate-y-1
      "
    >
      <CardContent className="p-5">

        <div className="flex items-start gap-4">

  {/* Icon */}
  <div
    className="
    h-14
    w-14
    rounded-full
    flex
    items-center
    justify-center
    shadow-sm
    "
    style={{
      backgroundColor: data.bgColor,
    }}
  >
    <Icon
      className="h-7 w-7"
      style={{
        color: data.color,
      }}
    />
  </div>

  {/* Text */}
  <div className="flex-1">

    <div
      className="
      text-xs
      uppercase
      tracking-wide
      font-medium
      mb-2
      text-slate-500
      "
    >
      {data.title}
    </div>

    <h2 className="pt-1 truncate text-2xl font-bold leading-6 tracking-tight
      text-slate-900 sm:text-[22px]">
      {data.value}
    </h2>

    <div className="flex items-center gap-2 pt-1">

      <span
        className="
        flex
        items-center
        text-emerald-600
        text-[12px]
        font-semibold
        "
      >
        <ArrowUp className="w-4 h-4 mr-1" />
        {data.growth}
      </span>

      <span className="text-xs text-muted-foreground">
        vs yesterday
      </span>

    </div>

  </div>

</div>
        <div className="pt-2">
          <DailyMISSparkline
            color={data.color}
            data={data.chart}
          />
        </div>

      </CardContent>
    </Card>
  );
}