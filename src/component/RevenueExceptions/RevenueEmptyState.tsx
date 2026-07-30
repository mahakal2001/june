import { SearchX } from "lucide-react";

import { Button } from "@/components/ui/button";

import "./RevenueEmptyState.css";

type Props = {
  message: string;
  onReset: () => void;
};

export default function RevenueEmptyState({
  message,
  onReset,
}: Props) {
  return (
    <div
      className="revenueempty
      flex
      flex-col
      items-center
      justify-center
      py-20
      px-6
      text-center
      "
    >
      <div
        className="emptySearch
        rounded-full
        bg-slate-100
        p-5
        "
      >
        <SearchX
          className="
          h-10
          w-10
          text-slate-400
          "
        />
      </div>

      <h2
        className="emptyText1
        text-2xl
        font-semibold
        "
      >
        No Revenue Exceptions Found
      </h2>

      <p
        className="emptyText1
        mt-3
        max-w-md
        text-sm
        text-slate-500
        "
      >
        {message}
      </p>

      <Button
        className="mt-8 rounded-sm"
        onClick={onReset}
      >
        Reset Filters
      </Button>
    </div>
  );
}