import {
  ArrowUp,
  ArrowDown,
} from "lucide-react";

type Props = {
  positive: boolean;
  percentage: number;
  comparison: string;
};

export default function KPITrend({
  positive,
  percentage,
  comparison,
}: Props) {
  return (
    <div className="mt-3 flex items-center gap-1 text-xs">
      {positive ? (
        <ArrowUp className="h-3.5 w-3.5 text-emerald-600" />
      ) : (
        <ArrowDown className="h-3.5 w-3.5 text-red-500" />
      )}

      <span
        className={
          positive
            ? "font-semibold text-emerald-600"
            : "font-semibold text-red-500"
        }
      >
        {percentage}%
      </span>

      <span className="px-2 font-semibold text-slate-400">
        {comparison}
      </span>
    </div>
  );
}