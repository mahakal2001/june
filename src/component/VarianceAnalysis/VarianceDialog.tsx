import { useEffect, useMemo, useState } from "react";

import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Label } from "@/components/ui/label";

import { Switch } from "@/components/ui/switch";

import {
  ArrowDown,
  ArrowUp,
  RefreshCcw,
} from "lucide-react";

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

varianceAnalysis,

} from "@/data/varianceAnalysis";

import "./VarianceDialog.css";

// Replace this with your actual ExportMenu component later
import ExportMenu from "../RevenueExceptions/ExportMenu";
import RevenueEmptyState from "../RevenueExceptions/RevenueEmptyState";
import { ExportVariancePDF } from "@/lib/VarianceExport/ExportVariancePDF";
import { ExportVarianceExcel } from "@/lib/VarianceExport/ExportVarianceExcel";
import { ExportVarianceWhatsapp } from "@/lib/VarianceExport/ExportVarianceWhatsapp";
import { ExportVariancePrint } from "@/lib/VarianceExport/ExportVariancePrint";

type Props = {

open: boolean;

onOpenChange: (open: boolean) => void;

};

export default function VarianceDialog({

open,

onOpenChange,

}: Props) {
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("all");
    const [metric, setMetric] = useState("all");
    const [sortAscending, setSortAscending] = useState(true);
    const [autoRefresh, setAutoRefresh] = useState(true);
    const [_lastUpdated, setLastUpdated] = useState(new Date());
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const pageSize = 4;
    const refreshData = () => {
        setLoading(true);
        setLastUpdated(new Date());
        setTimeout(() => setLoading(false), 300);
    };

    const formatNumber = (value: number) => {

    return new Intl.NumberFormat("en-IN").format(value);

    };

    useEffect(() => {
      if (!autoRefresh) return;
      const interval = setInterval(() => {
        refreshData();
      }, 30000);
       return () => clearInterval(interval);
    }, [autoRefresh]);

    const metrics = [
        ...new Set(
            varianceAnalysis.map((item) => item.metric)
        ),
    ];

    const statuses = [
        ...new Set(
          varianceAnalysis.map((item) => item.status)
       ),
    ];

    const data = useMemo(() => {

  return varianceAnalysis

    .filter((item) => {

      const matchesSearch =
        item.metric
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        status === "all" ||
        item.status === status;

      const matchesMetric =
        metric === "all" ||
        item.metric === metric;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesMetric
      );

    })

    .sort((a, b) =>
      sortAscending
        ? a.metric.localeCompare(b.metric)
        : b.metric.localeCompare(a.metric)
    );

    }, [
      search,
      status,
      metric,
      sortAscending,
    ]);

    const totalRecords = data.length;
    const totalPages = Math.ceil(totalRecords / pageSize);
    const paginatedData = data.slice(
      (page - 1) * pageSize,
      page * pageSize
    );

    useEffect(() => {
      setPage(1);
    }, [search, status, metric, sortAscending]);

    useEffect(() => {
      if (page > totalPages && totalPages > 0) {
         setPage(totalPages);
      }
    }, [page, totalPages]);

    const resetFilters = () => {
        setSearch("");
        setStatus("all");
        setMetric("all");
        setSortAscending(true);
    }



    function printReport() {
     ExportVariancePrint(
       data,
       status,
       metric,
       search
      );
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
           <DialogContent className="max-w-7xl w-[95vw] rounded-xl p-0
           overflow-hidden Variancedialogcontent">
              {/* Header */}
              <DialogHeader className="bg-white px-8 pt-6">
                <div className="flex items-center justify-between">
                    <DialogTitle className="flex">
                       <h2 className="text-2xl font-bold"> Variance Analysis Report</h2>
                        <span className="text-2xl text-muted-foreground mt-1">
                           (Today)
                        </span>
                    </DialogTitle>
                    <div className="flex items-center gap-3 print:hidden">
                
                              <Button
                                variant="outline"
                                className="rounded-sm w-auto pl-4 pr-4"
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
                                onPDF={() =>
                                  ExportVariancePDF(
                                    data,
                                    status,
                                    metric,
                                    search,
                                    { metric, status },
                                    new Date()
                                  )
                                }
                                onExcel={() => ExportVarianceExcel(
                                  data,
                                  status,
                                  metric,
                                  search
                                )}
                                onWhatsapp={() => ExportVarianceWhatsapp(
                                  data,
                                  status,
                                  metric,
                                  search
                                )}
                                onPrint={printReport}
                              />
                
                    </div>
                </div>
              </DialogHeader>

              {/* Toolbar */}
              <div className="px-8 py-2 print:hidden">
                <div className="flex flex-wrap gap-3 items-center">
                    <Input 
                     placeholder="Search metric..."
                     value={search}
                     onChange={(e) => setSearch(e.target.value)}
                     className="w-56 rounded-sm"
                    />
                    <Select
                    value={metric}
                    onValueChange={(value) => value !== null && setMetric(value)}
                    >
                        <SelectTrigger className="w-52 rounded-sm">
                            <SelectValue placeholder="Metric" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">
                                All Metrics
                            </SelectItem>
                            {metrics.map((item) => (
                                <SelectItem
                                key={item}
                                value={item}>
                                   {item}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Select
                      value={status}
                      onValueChange={(value) =>
                        value !== null && setStatus(value)
                      }
                    >
                       <SelectTrigger className="w-44 rounded-sm">
                          <SelectValue placeholder="Status" />
                       </SelectTrigger> 
                       <SelectContent>
                         <SelectItem value="all">
                            All Status
                         </SelectItem>
                         {statuses.map((item) => (
                            <SelectItem  key={item}
                            value={item}>
                                {item}
                            </SelectItem>
                          ))}
                       </SelectContent>
                    </Select>
                    <Button  variant="outline"
                    className="rounded-sm"
                     onClick={() =>
                      setSortAscending(!sortAscending)
                    }>
                        Sort
                        {sortAscending ? (
                            <ArrowUp className="ml-2 h-4 w-4"/>
                        ) : (
                            <ArrowDown className="ml-2 h-4 w-4"/>
                        )}
                    </Button>
                    <Button variant="ghost"
                    className="rounded-sm"
                    onClick={resetFilters}>
                        Reset
                    </Button>
                </div>
              </div>

               {/* Table */}
                <div className="mt-6 rounded-sm border overflow-hidden">
                    {data.length === 0 ? (
                    <RevenueEmptyState  message="No metrics found."
                     onReset={resetFilters} />
                    ) : (
                    <Table>
                        <TableHeader className="sticky top-0 bg-white z-20">
                            <TableRow>
                                <TableHead className="text-center font-bold">
                                    Metric
                                </TableHead>
                                <TableHead className="text-center font-bold">
                                    Expected
                                </TableHead>
                                <TableHead className="text-center font-bold">
                                    Actual
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
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {paginatedData.map((item) => {
                                const positive = item.variance >= 0;
                                return (
                                    <TableRow key={item.id}
                                    className="hover:bg-slate-50">
                                        <TableCell 
                                        className="font-medium text-center">
                                            {item.metric}
                                        </TableCell>
                                        <TableCell 
                                        className="font-medium text-center">
                                            {item.expected > 10
                                            ? formatNumber(item.expected)
                                            : item.expected}
                                        </TableCell>
                                        <TableCell 
                                        className="font-medium text-center">
                                            {item.actual > 10
                                            ? formatNumber(item.actual)
                                            : item.actual}
                                        </TableCell>
                                        <TableCell 
                                        className={`text-center font-semibold
                                        ${positive 
                                            ?"text-emerald-600"
                                            :"text-red-600"
                                        }`}>
                                            {positive ? "+" : ""}
                                            {item.variance > 10
                                            ? formatNumber(item.variance)
                                            : item.variance}
                                        </TableCell>
                                         <TableCell 
                                        className={`text-center font-semibold
                                        ${positive 
                                            ?"text-emerald-600"
                                            :"text-red-600"
                                        }`}>
                                            {positive ? "+" : ""}
                                            {item.variancePercentage.toFixed(2)}%
                                        </TableCell>
                                        <TableCell 
                                        className="text-center font-semibold">
                                           <Badge className={
                                            item.status === "Positive"
                                            ?
                                            "bg-green-100 text-green-700 hover:bg-green-100"
                                            :
                                            item.status === "Negative"
                                            ?
                                            "bg-red-100 text-red-700 hover:bg-red-100"
                                            :
                                            "bg-slate-100 text-slate-700 hover:bg-slate-100"
                                           }>
                                            {item.status}
                                           </Badge>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>

                    )}
                </div>

            <div className="grid gap-4 lg:hidden p-5">

  {paginatedData.map((item) => {

    const positive = item.variance >= 0;

    return (

      <div
        key={item.id}
        className="rounded-xl border bg-white p-5 shadow-sm"
      >

        <div className="flex justify-between items-center">

          <h3 className="font-semibold">

            {item.metric}

          </h3>

          <Badge
            className={
              item.status === "Positive"
                ? "bg-green-100 text-green-700"
                : item.status === "Negative"
                ? "bg-red-100 text-red-700"
                : "bg-slate-100 text-slate-700"
            }
          >
            {item.status}
          </Badge>

        </div>

        <div className="grid grid-cols-2 gap-4 mt-5 text-sm">

          <div>

            <p className="text-muted-foreground">

              Expected

            </p>

            <p className="font-medium">

              {item.expected > 10
                ? formatNumber(item.expected)
                : item.expected}

            </p>

          </div>

          <div>

            <p className="text-muted-foreground">

              Actual

            </p>

            <p className="font-medium">

              {item.actual > 10
                ? formatNumber(item.actual)
                : item.actual}

            </p>

          </div>

          <div>

            <p className="text-muted-foreground">

              Variance

            </p>

            <p
              className={
                positive
                  ? "font-semibold text-green-600"
                  : "font-semibold text-red-600"
              }
            >
              {positive ? "+" : ""}
              {item.variance}
            </p>

          </div>

          <div>

            <p className="text-muted-foreground">

              Variance %

            </p>

            <p
              className={
                positive
                  ? "font-semibold text-green-600"
                  : "font-semibold text-red-600"
              }
            >
              {positive ? "+" : ""}
              {item.variancePercentage.toFixed(2)}%
            </p>

          </div>

        </div>

      </div>

    );

  })}

            </div>

            {/* Footer */}
            <div className="px-8 py-4
            flex justify-between items-center">
                <p className="text-sm text-muted-foreground">
                    Page {page} of {totalPages}
                </p>

                <p className="text-xs text-slate-500 mt-1">
                    {totalRecords === 0
                      ? "Showing 0 Metrics"
                      : `Showing ${
                       (page - 1) * pageSize + 1
                       } - ${Math.min(
                        page * pageSize,
                         totalRecords
                    )} of ${totalRecords}`}
  
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


           </DialogContent>
        </Dialog>
    )
}
