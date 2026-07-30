import { useEffect, useMemo, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Button,
} from "@/components/ui/button";

import {
  Input,
} from "@/components/ui/input";

import {
  Label,
} from "@/components/ui/label";

import {
  Switch,
} from "@/components/ui/switch";

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Badge,
} from "@/components/ui/badge";

import {
  Eye,
} from "lucide-react";

import { formatCurrency } from "@/lib/formatCurrency";

import {
  RefreshCcw,
  ArrowUp,
  ArrowDown,
} from "lucide-react";

import ExportMenu from "../RevenueExceptions/ExportMenu";
import RevenueEmptyState from "../RevenueExceptions/RevenueEmptyState";

import {
  departmentSummary,
} from "@/data/departmentSummary";

import DepartmentDetailsDialog from "./DepartmentDetailsDialog";

import { ExportDepartmentPDF } from "@/lib/DepartmentExport/ExportDepartmentPDF";
import { ExportDepartmentExcel } from "@/lib/DepartmentExport/ExportDepartmentExcel";
import { ExportDepartmentWhatsapp } from "@/lib/DepartmentExport/ExportDepartmentWhatapp";

import "./DepartmentSummaryDialog.css"


type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function DepartmentSummaryDialog({
  open,
  onOpenChange,
}: Props) {
  const [loading] = useState(false);

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("all");

  const [sortAscending, setSortAscending] =
    useState(true);

  const [page, setPage] = useState(1);

  const pageSize = 4;

  const [autoRefresh, setAutoRefresh] =
    useState(true);

  const [lastUpdated, setLastUpdated] =
    useState(new Date());

  const [selectedDepartment, setSelectedDepartment] =
   useState<typeof departmentSummary[number] | null>(null);

  const [detailsOpen, setDetailsOpen] =
    useState(false);

  const statuses = [
    "Positive",
    "Negative",
  ];

  const filteredDepartments = useMemo(() => {
    return departmentSummary
      .filter((department) => {
        const matchesSearch =
          department.department
            .toLowerCase()
            .includes(search.toLowerCase());

        const matchesStatus =
          status === "all" ||
          department.status === status;

        return (
          matchesSearch &&
          matchesStatus
        );
      })
      .sort((a, b) =>
        sortAscending
          ? a.department.localeCompare(b.department)
          : b.department.localeCompare(a.department)
      );
  }, [
    search,
    status,
    sortAscending,
  ]);

  const totalPages = Math.ceil(
    filteredDepartments.length / pageSize
  );

  const paginatedDepartments =
    filteredDepartments.slice(
      (page - 1) * pageSize,
      page * pageSize
    );

  useEffect(() => {
    if (!autoRefresh) return;

    const timer = setInterval(() => {
      setLastUpdated(new Date());
    }, 30000);

    return () => clearInterval(timer);
  }, [autoRefresh]);

  const resetFilters = () => {
    setSearch("");

    setStatus("all");

    setSortAscending(true);

    setPage(1);
  };

  const printReport = () => {
    window.print();
  };

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent
        className="Departmentcontent department-print
        max-w-7xl
        w-[95vw]
        rounded-sm
        overflow-hidden
        "
      >
        {/* Header */}

        <DialogHeader>

          <div className="flex items-center justify-between gap-4">

            <div>

              <DialogTitle className="text-xl">

                Department Summary

              </DialogTitle>

              <p className="text-sm text-muted-foreground mt-1">

                Today's Revenue Overview

              </p>

            </div>

            <div className="flex items-center gap-3 print:hidden">

              <Button
                variant="outline"
                className="rounded-sm w-[auto] pl-4 pr-4"
                size="icon"
                onClick={(e) => {
                    e.stopPropagation();
                    setLastUpdated(new Date());
                }}
              >
                <RefreshCcw
                  className={`mr-2 h-4 w-4 ${
                    loading
                      ? "animate-spin"
                      : ""
                  }`}
                />

                Refresh

              </Button>

              <div className="flex items-center gap-2">

                <Label>

                  Auto Refresh

                </Label>

                <Switch
                  checked={autoRefresh}
                  onCheckedChange={
                    setAutoRefresh
                  }
                />

              </div>

              <ExportMenu
                onPDF={() =>ExportDepartmentPDF(
                     filteredDepartments,
                     status,
                     search
                )}
                onExcel={() => ExportDepartmentExcel(
                    filteredDepartments,
                    status,
                    search
                )}
                onWhatsapp={() => ExportDepartmentWhatsapp(
                    filteredDepartments,
                    status,
                    search
                )}
                onPrint={printReport}
              />

            </div>

          </div>

        </DialogHeader>

        {/* Toolbar */}

        <div
          className="
          flex
          flex-wrap
          gap-3 print:hidden
          "
        >
          <Input
            placeholder="Search Department..."
            value={search}
            onChange={(e) => {
              setSearch(
                e.target.value
              );

              setPage(1);
            }}
            className="w-56 rounded-sm"
          />

          <Select
            value={status}
            onValueChange={(value) => {
              setStatus(value ?? "all");

              setPage(1);
            }}
          >
            <SelectTrigger className="w-44 rounded-sm">

              <SelectValue />

            </SelectTrigger>

            <SelectContent>

              <SelectItem value="all">

                All Status

              </SelectItem>

              {statuses.map((item) => (
                <SelectItem
                  key={item}
                  value={item}
                >
                  {item}
                </SelectItem>
              ))}

            </SelectContent>

          </Select>

          <Button
            variant="outline"
            className="rounded-sm"
            onClick={() => {
              setSortAscending(
                !sortAscending
              );
            }}
          >
            Sort

            {sortAscending ? (
              <ArrowUp className="ml-2 h-4 w-4" />
            ) : (
              <ArrowDown className="ml-2 h-4 w-4" />
            )}

          </Button>

          <Button
            variant="ghost"
            onClick={resetFilters}
          >
            Reset Filters
          </Button>

        </div>

        {/* Placeholder */}

        <div className="mt-6 rounded-xl border overflow-hidden">

          {filteredDepartments.length === 0 ? (

            <RevenueEmptyState  message="No departments found."
             onReset={resetFilters} />

            ) : (

          <Table className="print-tabled">

              <TableHeader className="sticky top-0 bg-white z-20">

              <TableRow className="shadow-md">

               <TableHead className="text-center font-bold">
                  Department
               </TableHead>

               <TableHead className="text-center font-bold">
                  Revenue
              </TableHead>

          <TableHead className="text-center font-bold">
            Collection
          </TableHead>

          <TableHead className="text-center font-bold">
            Patients
          </TableHead>

          <TableHead className="text-center font-bold">
            Yesterday
          </TableHead>

          <TableHead className="text-center font-bold">
            Variance
          </TableHead>

          <TableHead className="text-center font-bold">
            Variance %
          </TableHead>

          <TableHead className="text-center font-bold">
            Status
          </TableHead>

          <TableHead className="text-center font-bold print:hidden">
            Action
          </TableHead>

        </TableRow>

      </TableHeader>

      <TableBody>

        {paginatedDepartments.map((department) => {

          const Icon = department.icon;

          return (

            <TableRow
              key={department.id}
              onClick={() => {
                setSelectedDepartment(department);
                setDetailsOpen(true);
              }}
              className="
              cursor-pointer
              transition-all
              duration-300
              hover:bg-slate-50
              "
            >

              <TableCell>

                <div className="flex items-center gap-3">

                  <div
                    className={`
                    h-10
                    w-10
                    rounded-full
                    flex
                    items-center
                    justify-center text-center
                    ${department.iconBackground}
                    `}
                  >

                    <Icon
                      className={`
                      h-5
                      w-5
                      ${department.iconColor}
                      `}
                    />

                  </div>

                  <div>

                    <p className="font-semibold text-center">

                      {department.department}

                    </p>

                  </div>

                </div>

              </TableCell>

              <TableCell className="text-center">

                {formatCurrency(department.revenue)}

              </TableCell>

              <TableCell className="text-center">

                {formatCurrency(department.collection)}

              </TableCell>

              <TableCell className="text-center">

                {department.patients}

              </TableCell>

              <TableCell className="text-center">

                {formatCurrency(
                  department.yesterdayRevenue
                )}

              </TableCell>

              <TableCell className="text-center">

                <span
                  className={
                    department.variance >= 0
                      ? "text-green-600 font-semibold"
                      : "text-red-600 font-semibold"
                  }
                >

                  {department.variance >= 0 ? "+" : ""}

                  {formatCurrency(
                    department.variance
                  )}

                </span>

              </TableCell>

              <TableCell className="text-center">

                <span
                  className={
                    department.variancePercentage >= 0
                      ? "text-green-600 font-semibold"
                      : "text-red-600 font-semibold"
                  }
                >

                  {department.variancePercentage >= 0
                    ? "+"
                    : ""}

                  {department.variancePercentage}%

                </span>

              </TableCell>

              <TableCell className="text-center">

                <Badge
                  className={`rounded-full px-3 py-1
                    font-semibold shadow-sm
                    ${department.status === "Positive"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"}
                  `}
                >

                  {department.status}

                </Badge>

              </TableCell>

              <TableCell className="text-center print:hidden">

                <Button
                  size="icon"
                  variant="outline"
                  className="rounded-lg"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedDepartment(department);
                    setDetailsOpen(true);
                  }}
                >

                  <Eye className="h-4 w-4" />

                </Button>

              </TableCell>

            </TableRow>

          );

        })}

      </TableBody>

    </Table>

  )}

        </div>

        <div className="grid grid-cols-1 gap-4 mt-6 lg:hidden print:hidden">

  {paginatedDepartments.map((department) => {

    const Icon = department.icon;

    return (

      <div
        key={department.id}
        className="
        rounded-xl
        border
        bg-white
        p-5
        shadow-sm print:hidden
        "
      >

        <div className="flex justify-between">

          <div className="flex gap-3">

            <div
              className={`
              h-10
              w-10
              rounded-full
              flex
              items-center
              justify-center
              ${department.iconBackground}
              `}
            >

              <Icon
                className={`
                h-5
                w-5
                ${department.iconColor}
                `}
              />

            </div>

            <div>

              <h3 className="font-semibold">

                {department.department}

              </h3>

              <p className="text-xs text-muted-foreground">

                Revenue

              </p>

            </div>

          </div>

          <Badge
            className={
              department.status === "Positive"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }
          >

            {department.status}

          </Badge>

        </div>

        <div className="grid grid-cols-2 gap-4 mt-5 text-sm">

          <div>

            <p className="text-muted-foreground">

              Revenue

            </p>

            <p className="font-semibold">

              {formatCurrency(department.revenue)}

            </p>

          </div>

          <div>

            <p className="text-muted-foreground">

              Patients

            </p>

            <p className="font-semibold">

              {department.patients}

            </p>

          </div>

        </div>

      </div>

    );

  })}

        </div>

        {/* Footer */}

        <div
          className="
          flex
          justify-between
          text-sm
          text-muted-foreground
          "
        >
          <div>

            Last Sync

            {" • "}

            {lastUpdated.toLocaleString()}

          </div>

          <div className="deptpagination flex items-center justify-between flex-wrap">

         <p className="deptpaginationt text-sm text-muted-foreground">

        Showing

        {" "}

        {filteredDepartments.length === 0
            ? 0
            : (page - 1) * pageSize + 1}

        -

        {Math.min(
            page * pageSize,
            filteredDepartments.length
        )}

        {" "}of{" "}

        {filteredDepartments.length}

    </p>

    <div className="space-x-2">

        <Button
            variant="outline"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="rounded-sm relative right-6"
        >

            Previous

        </Button>

        <Button
            variant="outline"
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="rounded-sm"
        >

            Next

        </Button>

    </div>

</div>

        </div>

      </DialogContent>

       <DepartmentDetailsDialog 
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        department={selectedDepartment}/>

    </Dialog>
  );
}