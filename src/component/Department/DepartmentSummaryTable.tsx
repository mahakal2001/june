import { useMemo, useState } from "react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Button,
} from "@/components/ui/button";

import {
  Badge,
} from "@/components/ui/badge";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Eye,
} from "lucide-react";

import {
  departmentSummary,
} from "@/data/departmentSummary";

import { formatIndianCurrency } from "@/lib/formatIndianCurrency";
import DepartmentSummaryDialog from "./DepartmentSummaryDialog";
import DepartmentDetailsDialog from "./DepartmentDetailsDialog";
import type {DepartmentSummaryData,} from "@/data/departmentSummary";


export default function DepartmentSummaryTable() 
{
  const [open, setOpen] = useState(false);
  const rows = useMemo(() => departmentSummary, []);
  const [selectedDepartment, setSelectedDepartment] =
    useState<DepartmentSummaryData | null>(null);
  const [detailsOpen, setDetailsOpen] =useState(false);
  

  return (

    <>

    <Card className="departmentSummerycard rounded-sm border shadow-sm">

      <CardHeader className="flex flex-row items-center justify-between">

        <CardTitle className="text-xl font-semibold">

          Department Summary

          <span className="pl-1 text-muted-foreground font-normal">

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

      <CardContent className="p-0">

        <div className="overflow-x-auto">

          <Table>

            <TableHeader className="sticky top-0 bg-white z-10">

              <TableRow>

                <TableHead className="font-bold">Department</TableHead>

                <TableHead className="text-center font-bold">Revenue (₹)</TableHead>

                <TableHead className="text-center font-bold">Collection (₹)</TableHead>

                <TableHead className="text-center font-bold">
                  Patients
                </TableHead>

                <TableHead className="text-center font-bold">
                  Yesterday Revenue (₹)
                </TableHead>

                <TableHead className="text-center font-bold">
                  Variance (₹)
                </TableHead>

                <TableHead className="text-center font-bold">
                  Variance %
                </TableHead>

                <TableHead className="text-center font-bold">
                    Status
                </TableHead>

                <TableHead className="text-center font-bold">
                  Action
                </TableHead>

              </TableRow>

            </TableHeader>

            <TableBody>

              {rows.map((item) => {

                const Icon = item.icon;

                return (

                  <TableRow
                    key={item.id}
                    className="hover:bg-slate-50 transition-colors"
                  >

                    <TableCell className="text-center font-medium">

                      <div className="flex items-center gap-3">

                        <div
                          className={`
                            flex
                            h-10
                            w-10
                            items-center
                            justify-center
                            rounded-lg

                            ${item.iconBackground}
                          `}
                        >

                          <Icon
                            className={`
                              h-5
                              w-5

                              ${item.iconColor}
                            `}
                          />

                        </div>

                        <span className="font-medium">

                          {item.department}

                        </span>

                      </div>

                    </TableCell>

                    <TableCell className="text-center font-medium">

                      {formatIndianCurrency(item.revenue)}

                    </TableCell>

                    <TableCell className="text-center font-medium">

                      {formatIndianCurrency(item.collection)}

                    </TableCell>

                    <TableCell className="font-medium text-center">

                      {item.patients}

                    </TableCell>

                    <TableCell className="font-medium text-center">

                      {formatIndianCurrency(
                        item.yesterdayRevenue
                      )}

                    </TableCell>

                    <TableCell
                      className={`font-medium text-center

                      ${
                        item.variance >= 0
                          ? "text-emerald-600"
                          : "text-red-600"
                      }
                      `}
                    >

                      {item.variance >= 0 ? "+" : ""}

                      {formatIndianCurrency(item.variance)}

                    </TableCell>

                    <TableCell
                      className={`font-medium text-center

                      ${
                        item.variancePercentage >= 0
                          ? "text-emerald-600"
                          : "text-red-600"
                      }
                      `}
                    >

                      {item.variancePercentage >= 0
                        ? "+"
                        : ""}

                      {item.variancePercentage}%

                    </TableCell>

                    <TableCell className="font-medium text-center">

                      <Badge
                        className={
                          item.status === "Positive"
                            ? "bg-green-100 text-green-700 hover:bg-green-100"
                            : "bg-red-100 text-red-700 hover:bg-red-100"
                        }
                      >

                        {item.status}

                      </Badge>

                    </TableCell>

                    <TableCell className="text-center">

                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-lg"
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedDepartment(item);
                            setDetailsOpen(true);
                        }}
                      >

                        <Eye className="h-4 w-4 text-blue-600" />

                      </Button>

                    </TableCell>

                  </TableRow>

                );

              })}

            </TableBody>

          </Table>

        </div>

      </CardContent>

    </Card>

    <DepartmentSummaryDialog 
      open={open} 
      onOpenChange={setOpen} 
    />

    <DepartmentDetailsDialog
      open={detailsOpen}
      onOpenChange={setDetailsOpen}
      department={selectedDepartment}
    />

    </>

  );

}