import { useMemo, useState } from "react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { ChevronRight } from "lucide-react";

import {
  pendingTasks,
} from "@/data/pendingTasks";

import PendingTasksDialog from "./PendingTasksDialog";
import "./PendingTasksTable.css";

export default function PendingTasksTable() {

  const [open, setOpen] = useState(false);

  const tasks = useMemo(() => pendingTasks, []);

  return (

    <>

      <Card
        className="pendingtable-card
          rounded-sm
          border
          border-slate-200
          shadow-sm
          hover:shadow-md
          transition-all
          duration-300
        "
      >

        {/* Header */}

        <CardHeader
          className="
            flex
            flex-row
            items-center
            justify-between
            pb-3
          "
        >

          <CardTitle
            className="
              text-xl
              font-bold
              tracking-tight
              text-slate-800
            "
          >

            Pending Tasks

            <span
              className="
                ml-2
                text-base
                font-medium
                text-slate-500
              "
            >
              (Today)
            </span>

          </CardTitle>

          <Button
            variant="link"
            onClick={() => setOpen(true)}
            className="
              text-blue-600"
          >
            View All
          </Button>

        </CardHeader>

        {/* Body */}

        <CardContent className="pt-0">

          <div className="space-y-2">

            {tasks.map((task) => {

              const Icon = task.icon;

              return (

                <button
                  key={task.id}
                  type="button"
                  className="
                    group
                    w-full
                    flex
                    items-center
                    justify-between
                    rounded-xl
                    px-3
                    py-2.5
                    transition-all
                    duration-300
                    hover:bg-slate-50
                    hover:shadow-sm
                  "
                >

                  {/* Left */}

                  <div className="flex items-center gap-3">

                    <div
                      className={`
                        h-9
                        w-9
                        rounded-lg
                        flex
                        items-center
                        justify-center
                        ${task.iconBg}
                      `}
                    >

                      <Icon
                        className={`
                          h-5
                          w-5
                          ${task.iconColor}
                        `}
                      />

                    </div>

                    <span
                      className="
                        text-sm
                        font-medium
                        text-slate-700
                        text-left
                      "
                    >
                      {task.title}
                    </span>

                  </div>

                  {/* Right */}

                  <div className="flex items-center gap-3">

                    <div
                      className={`
                        min-w-10.5
                        rounded-full
                        px-3
                        py-1
                        text-sm
                        font-semibold
                        text-center
                        ${task.badgeColor}
                      `}
                    >
                      {task.count}
                    </div>

                    <ChevronRight
                      className="
                        h-4
                        w-4
                        text-slate-400
                        opacity-0
                        transition-all
                        group-hover:opacity-100
                        group-hover:translate-x-1
                      "
                    />

                  </div>

                </button>

              );

            })}

          </div>

        </CardContent>

      </Card>

      <PendingTasksDialog
        open={open}
        onOpenChange={setOpen}
      />

    </>

  );

}