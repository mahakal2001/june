import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import {
  Badge,
} from "@/components/ui/badge";

import { formatCurrency } from "@/lib/formatCurrency";

import type {
  DepartmentSummaryData,
} from "@/data/departmentSummary";

import "./DepartmentDetailsDialog.css";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  department: DepartmentSummaryData | null;
};

export default function DepartmentDetailsDialog({
  open,
  onOpenChange,
  department,
}: Props) {
  if (!department) return null;

  const Icon = department.icon;

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="detailsdialog max-w-7xl rounded-sm text-center
       pt-6 pb-6 bg-gradient-to-b from-blue-50 to-white">

        <DialogHeader>

          <div className="flex justify-center items-center gap-4 pb-1">

            <div
              className={`
                h-14
                w-14
                rounded-xl
                flex
                items-center
                justify-center text-center
                ${department.iconBackground}
              `}
            >
              <Icon
                className={`
                  h-7
                  w-7
                  ${department.iconColor}
                `}
              />
            </div>

            <div>

              <DialogTitle className="text-2xl font-bold">

                {department.department}

              </DialogTitle>

              <p className="text-muted-foreground mt-1">

                Department Performance Summary

              </p>

            </div>

          </div>

        </DialogHeader>

        <div className="grid gap-5 mt-6 md:grid-cols-2 lg:grid-cols-3">

          <Card className="bg-gradient-to-b from-blue-50 to-white">

            <CardContent className="p-5">

              <p className="text-sm text-muted-foreground pb-1">

                Revenue

              </p>

              <h3 className="text-[22px] font-bold">

                {formatCurrency(department.revenue)}

              </h3>

            </CardContent>

          </Card>

          <Card className="bg-gradient-to-b from-blue-50 to-white">

            <CardContent className="p-5">

              <p className="text-sm text-muted-foreground pb-1">

                Collection

              </p>

              <h3 className="text-[22px] font-bold">

                {formatCurrency(department.collection)}

              </h3>

            </CardContent>

          </Card>

          <Card className="bg-gradient-to-b from-blue-50 to-white">

            <CardContent className="p-5">

              <p className="text-sm text-muted-foreground pb-1">

                Patients

              </p>

              <h3 className="text-[22px] font-bold">

                {department.patients}

              </h3>

            </CardContent>

          </Card>

          <Card className="bg-gradient-to-b from-blue-50 to-white">

            <CardContent className="p-5">

              <p className="text-sm text-muted-foreground pb-1">

                Yesterday Revenue

              </p>

              <h3 className="text-[22px] font-bold">

                {formatCurrency(
                  department.yesterdayRevenue
                )}

              </h3>

            </CardContent>

          </Card>

          <Card className="bg-gradient-to-b from-blue-50 to-white">

            <CardContent className="p-5">

              <p className="text-sm text-muted-foreground pb-1">

                Variance

              </p>

              <h3
                className={`text-[22px] font-bold ${
                  department.variance >= 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {department.variance >= 0 ? "+" : ""}

                {formatCurrency(
                  department.variance
                )}

              </h3>

            </CardContent>

          </Card>

          <Card className="bg-gradient-to-b from-blue-50 to-white">

            <CardContent className="p-5">

              <p className="text-sm text-muted-foreground pb-2">

                Status

              </p>

              <Badge
                className={`text-[13px] font-semibold
                  ${department.status === "Positive"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {department.status}
              </Badge>

            </CardContent>

          </Card>

        </div>

      </DialogContent>

    </Dialog>
  );
}