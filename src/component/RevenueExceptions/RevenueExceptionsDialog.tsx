import { useEffect, useMemo, useState } from "react";
import { RefreshCcw } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";


import {
  ArrowUp,
  ArrowDown,
  Eye,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";

import {
  revenueExceptions,
} from "@/data/revenueExceptions";

import {
  formatCurrency,
  formatPercent,
} from "@/lib/formatCurrency";

import ExportMenu from "./ExportMenu";

import RevenueEmptyState from "./RevenueEmptyState";

import RevenueMobileCard from "./RevenueMobileCard";

import RevenueDetailsDialog from "./RevenueDetailsDialog";

import { exportPDF } from "@/lib/RevenueExport/exportPDF";

import { exportExcel } from "@/lib/RevenueExport/exportExcel";

import { exportWhatsapp } from "@/lib/RevenueExport/exportWhatsapp";

import './RevenueExceptionsDialog.css';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

type RevenueExceptionRow = {
  id: number;
  department: string;
  expected: number;
  actual: number;
  date?: string | Date;
  variance: number;
  variancePercent: number;
  status: "Positive" | "Negative";
};

export default function RevenueExceptionsDialog({
  open,
  onOpenChange,
}: Props) {
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("all");
  const [status, setStatus] = useState("all");
  const [sortAscending, setSortAscending] = useState(true);
  const [page, setPage] = useState(1);
  const pageSize = 4;
  const [_lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const [autoRefresh, setAutoRefresh] = useState(true);

  const emptyMessage =
    search ||
    department !== "all" ||
    status !== "all"
      ? "No records match your filters."
      : "No revenue data available.";


  const printReport = () => {
    const originalTitle = document.title;
    document.title = `Revenue Report - ${new Date().toLocaleDateString()}`;
    window.print();
    document.title = originalTitle;
  };

  const departments = [
    ...new Set(
      revenueExceptions.map((item) => item.department)
    ),
  ];

  const rows = useMemo<RevenueExceptionRow[]>(() => {
    return revenueExceptions
      .map((item): RevenueExceptionRow => {
        const variance = item.actual - item.expected;
        const variancePercent = (variance / item.expected) * 100;

        return {
          ...item,
          variance,
          variancePercent,
          status: variance >= 0 ? "Positive" : "Negative",
        };
      })
      .filter((row) => {
        const matchesSearch =
          row.department
            .toLowerCase()
            .includes(search.toLowerCase());

        const matchesDepartment =
          department === "all" ||
          row.department === department;

        const matchesStatus =
          status === "all" ||
          row.status === status;

        return (
          matchesSearch &&
          matchesDepartment &&
          matchesStatus
        );
      })
      .sort((a, b) => {
        return sortAscending
          ? a.department.localeCompare(b.department)
          : b.department.localeCompare(a.department);
      });
  }, [search, department, status, sortAscending]);

  const totalPages = Math.ceil(
  rows.length / pageSize
 );
  const currentRows = rows.slice(
    (page - 1) * pageSize,
     page * pageSize
  );

  // ===============================
// Summary Cards Data
// ===============================


  const resetFilters = () => {
    setSearch("");
    setDepartment("all");
    setStatus("all");
    setPage(1);
  };

  const refreshData = () => {
    // In future:
    // await fetchRevenue();

    setLastUpdated(new Date());
  };

  useEffect(() => {

    if (!autoRefresh) return;

    const interval = setInterval(() => {

        refreshData();

    }, 30000);
     if (page > totalPages && totalPages > 0) {
        setPage(totalPages);
      }

    return () => clearInterval(interval);

  }, [autoRefresh, page, totalPages]);

  const [selectedRow, setSelectedRow] = useState<RevenueExceptionRow | null>(null);

  const handleView = (row: RevenueExceptionRow) => {
    setSelectedRow(row);
    setDetailsOpen(true);
  };

  const [detailsOpen, setDetailsOpen] = useState(false);



  return(
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="Dialog max-w-7xl w-[95vw] max-h-[90vh] overflow-hidden
       rounded-sm">
        <div id="print-report">
           <div className="hidden print:block mb-8">
             <h1 className="text-3xl font-bold">
               Revenue Exceptions Report
             </h1>
             <p className="text-slate-500 mt-2">
               Leads Health Care
             </p>
              <p className="text-slate-500">
                Generated on {new Date().toLocaleString()}
              </p>
           </div>
        <DialogHeader>
          <div className="DialogH flex justify-between items-center w-full">
            <div>
              <DialogTitle className="flex items-center justify-between">
                Revenue Exceptions Report
             </DialogTitle>
            </div>
            <div className="flex items-center gap-3 print:hidden">
              <Button variant="outline" onClick={refreshData} 
               className="rounded-sm print:hidden">
                <RefreshCcw className="mr-2 h-4 w-4" />
                Refresh
              </Button>
              <div className="flex items-center gap-2">
                <Label htmlFor="auto-refresh"> Auto Refresh</Label>
                <Switch id="auto-refresh" checked={autoRefresh}
                onCheckedChange={setAutoRefresh}/>
              </div>
              <ExportMenu onPDF={()=>exportPDF(rows)}
                onExcel={()=>exportExcel(rows)}
                onWhatsapp={()=>exportWhatsapp(rows)}
                onPrint={printReport}
              />
            </div>
          </div>
        </DialogHeader>
        <div className="searchDepartment sticky top-0 z-30 mb-5 bg-background
          flex flex-col gap-3 md:flex-row px-1 md:flex-wrap
          lg:flex-row lg:items-center print:hidden">
          <Input className="px-3 pt-1 pb-1 text-sm md:w-60 rounded-sm" 
           placeholder="Search department..." value={search}
            onChange={(e)=>{
              setSearch(e.target.value);
              setPage(1);
            }}
          />
          <Select value={department} onValueChange={(value) => {
            setDepartment(value || "all");  setPage(1);}}>
            <SelectTrigger className="md:w-28 rounded-sm">
              <SelectValue className="pt-1 pb-1" placeholder="Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">
                All Departments
              </SelectItem>
              {departments.map((dept) => (
                <SelectItem key={dept} value={dept}>
                  {dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={status} onValueChange={(value) => {
            setStatus(value || "all");
            setPage(1);}}>
            <SelectTrigger className="md:w-28 rounded-sm">
              <SelectValue className="pt-1 pb-1" placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="revenue-statusfil">
              <SelectItem value="all">
                All Status
              </SelectItem>
              <SelectItem value="Positive">
                🟢 Positive
              </SelectItem>
              <SelectItem value="Negative">
               🔴 Negative
              </SelectItem>

            </SelectContent>
          </Select>

          <Button
          variant="outline"
          className="rounded-sm"
          onClick={() => {
          setSortAscending(!sortAscending);
          setPage(1);
          }}>
            Sort

            {sortAscending ? (
            <ArrowUp className="ml-2 h-4 w-4" />
            ) : (
             <ArrowDown className="ml-2 h-4 w-4" />
            )}
          </Button>
                                   
          <Button variant="ghost"
          onClick={resetFilters} className="rounded-sm"
          >
            Reset Filters
          </Button>


        </div>
        
        <div className="grid gap-4 md:block rounded-sm border overflow-auto max-h-[600px] print:block
         print:overflow-none print:max-h-none print:border-0">
          {
          rows.length === 0 ? (

           <RevenueEmptyState
            message={emptyMessage}
            onReset={resetFilters}

           />

           ) : (
          <Table className="revenuePrint-table table-fixed border-collapse
            print:text-sm print:text-left print:w-[800px] print:table-auto">
            <TableHeader className="sticky top-0 z-20 bg-background">
              <TableRow className="TableRow">
                <TableHead className="font-bold text-center">
                  <Button variant="ghost" className="print:hidden font-bold" 
                    onClick={()=> setSortAscending(!sortAscending)}>
                    Department{
                      sortAscending
                      ?
                      <ArrowUp className="ml-2 h-4"/>
                      :
                      <ArrowDown className="ml-2 h-4"/>
                    }
                  </Button>
                   <span className="hidden font-bold text-center print:inline">
                      Doctor
                    </span>
                </TableHead>
                <TableHead className="TableHead font-bold text-center">Expected</TableHead>
                <TableHead className="TableHead font-bold text-center">Actual</TableHead>
                <TableHead className="TableHead font-bold text-center">Variance</TableHead>
                <TableHead className="TableHead font-bold text-center">Variance %</TableHead>
                <TableHead className="TableHead font-bold text-center">Status</TableHead>
                <TableHead className="TableHead print:hidden font-bold text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {
                currentRows.map((row)=>(
                  <TableRow key={row.id}>
                    <TableCell className="DialogCell1 text-center">
                      {row.department}
                    </TableCell>
                    <TableCell className="text-center">
                      ₹ {formatCurrency(row.expected)}
                    </TableCell>
                    <TableCell className="text-center">
                      ₹ {formatCurrency(row.actual)}
                    </TableCell>
                    <TableCell className={`text-center ${row.variance>=0? "text-green-600"
                     :"text-red-600"}`}>
                       {
                        row.variance>=0
                        ?"+":"-"   
                       }₹
                       {
                        formatCurrency(Math.abs(row.variance))
                       }
                    </TableCell>
                     <TableCell className={`text-center ${row.variance>=0? "text-green-600"
                       : "text-red-600"}`}>
                        {
                          row.variance>=0
                          ?"+":"-"
                        }
                        {
                          formatPercent(Math.abs(row.variancePercent))
                        }%
                     </TableCell>
                     <TableCell className="text-center">
                        <Badge className={`rounded-full px-3 py-1 font-medium 
                         ${row.status==="Positive"
                            ?"bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                          }`}>
                          {row.status}
                        </Badge>
                     </TableCell>
                     <TableCell className="print:hidden text-center">
                       <Button size="icon" variant="outline" onClick={()=>handleView(row)}>
                         <Eye className="h-4 w-4" />
                       </Button>
                     </TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
           )
           }
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden print:hidden">

          {currentRows.map((row)=>(

            <RevenueMobileCard
                key={row.id}
                row={{
                  department: row.department,
                  status: row.status,
                  expected: row.expected,
                  actual: row.actual,
                  variance: row.variance,
                  variancePercent: row.variancePercent,
                }}
                onView={() => handleView(row)}/>

          ))}

        </div>
        <div className="pagination flex items-center justify-between print:hidden">
          <div className="text-sm text-muted-foreground">
            Showing{" "}
            <span className="font-semibold">
              {rows.length === 0
               ? 0
              : (page - 1) * pageSize + 1}
            </span>
            {" - "}
            <span className="font-semibold">
              {Math.min(page * pageSize, rows.length)}
            </span>
            {" of "}
            <span className="font-semibold">
              {rows.length}
            </span>
            {" records"}
          </div>
          <div className="space-x-2">
            <Button variant="outline" disabled={page === 1} onClick={() => setPage(page - 1)}
            className="PaginationR rounded-sm">
              Previous
            </Button>
            <Button variant="outline" disabled={page === totalPages}
            onClick={() => setPage(page + 1)}className="rounded-sm">
              Next
            </Button>
          </div>
        </div>
        <div className="hidden print:block mt-8 text-center text-xs text-slate-500">
          Leads Health Care • Revenue Exceptions Report
        </div>
        </div>
      </DialogContent>
      <RevenueDetailsDialog open={detailsOpen} onOpenChange={setDetailsOpen}
       row={selectedRow}/>
    </Dialog>
  ) 
} 


