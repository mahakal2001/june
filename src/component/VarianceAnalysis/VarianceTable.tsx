import { useMemo,useState } from "react";


import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";

import { varianceAnalysis } from "@/data/varianceAnalysis";
import VarianceDialog from "./VarianceDialog";
import "./VarianceTable.css";

export default function VarianceTable() {
  const [open, setOpen] = useState(false);
  const data = useMemo(() => varianceAnalysis, []);

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat("en-IN").format(value);
  };

  return (
    <>
    <Card className="variancetable-card rounded-sm border border-slate-200 shadow-sm 
    hover:shadow-md transition-all duration-300">

      {/* ================= Header ================= */}

      <CardHeader className="flex flex-row items-center justify-between pb-5">

        <CardTitle className="text-xl font-bold tracking-tight text-slate-800">

          Variance Analysis
          <span className="pl-1 text-base text-muted-foreground">
            (Today)
          </span>

        </CardTitle>

        <Button
          variant="link"
          className="text-blue-600"
          onClick={() => setOpen(true)}
        >
          View All
        </Button>

      </CardHeader>

      {/* ================= Table ================= */}

      <CardContent className="p-0">

        <Table>

          <TableHeader>

            <TableRow className="border-b">

              <TableHead className="text-left pl-6 font-bold">
                Metric
              </TableHead>

              <TableHead className="text-center font-bold">
                Expected (₹)
              </TableHead>

              <TableHead className="text-center font-bold">
                Actual (₹)
              </TableHead>

              <TableHead className="text-center font-bold">
                Variance (₹)
              </TableHead>

              <TableHead className="text-center font-bold">
                Variance %
              </TableHead>

              <TableHead className="text-center pr-6 font-bold">
                Status
              </TableHead>

            </TableRow>

          </TableHeader>

          <TableBody>

            {data.map((item) => {

              const positive = item.variance >= 0;

              return (

                <TableRow
                  key={item.id}
                  className="text-center group transition-all 
                  duration-300 hover:bg-slate-50"
                >

                  {/* Metric */}

                  <TableCell className="text-left pt-3 pb-[0.83em] pl-6 font-medium text-slate-700">

                    {item.metric}

                  </TableCell>

                  {/* Expected */}

                  <TableCell className="text-center tabular-nums text-slate-700">

                    {typeof item.expected === "number" &&
                    item.expected > 10
                      ? formatNumber(item.expected)
                      : item.expected}

                  </TableCell>

                  {/* Actual */}

                  <TableCell className="text-center tabular-nums font-medium text-slate-700">

                    {typeof item.actual === "number" &&
                    item.actual > 10
                      ? formatNumber(item.actual)
                      : item.actual}

                  </TableCell>

                  {/* Variance */}

                  <TableCell
                    className={`text-center font-semibold tabular-nums ${
                      positive ? "text-emerald-600" : "text-red-600"
                    }`}
                  >

                    {positive ? "+" : ""}
                    {item.variance > 10
                      ? formatNumber(item.variance)
                      : item.variance}

                  </TableCell>

                  {/* Variance Percentage */}

                  <TableCell
                    className={`text-center font-semibold tabular-nums ${
                      positive ? "text-emerald-600" : "text-red-600"
                    }`}
                  >

                    {positive ? "+" : ""}
                    {item.variancePercentage.toFixed(2)}%

                  </TableCell>

                  {/* Status */}

                  <TableCell className="text-center pr-6">

                    <Badge
                      className={`
                        rounded-full
                        px-3
                        py-1
                        font-medium
                        border-0
                        shadow-none
                        ${
                          item.status === "Positive"
                            ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-50"
                            : item.status === "Negative"
                            ? "bg-red-50 text-red-700 hover:bg-red-50"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-100"
                        }
                      `}
                    >
                      {item.status}
                    </Badge>

                  </TableCell>

                </TableRow>

              );

            })}

          </TableBody>

        </Table>

      </CardContent>

    </Card>
     
     <VarianceDialog 
      open={open}
      onOpenChange={setOpen}/>

    </>
  );
}