import { useEffect, useMemo, useState } from "react";

import {
  RefreshCcw,
  ArrowUp,
  ArrowDown,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

import RevenueEmptyState from "../RevenueExceptions/RevenueEmptyState";
import ExportMenu from "../RevenueExceptions/ExportMenu";

import { insuranceClaims } from "@/data/insuranceClaims";
import InsuranceClaimMobileCard from "./InsuranceMobileCard";

import { exportInsurancePDF } from "@/lib/InsuranceExport/exportInsurancePDF";
import { exportInsuranceExcel } from "@/lib/InsuranceExport/exportInsuranceExcel";
import { exportInsuranceWhatsapp } from "@/lib/InsuranceExport/exportInsuranceWhatsapp";

import './InsuranceClaimDialog.css';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function InsuranceClaimDialog({
  open,
  onOpenChange,
}: Props) {
    const [search, setSearch] = useState("");

    const [statusFilter, setStatusFilter] = useState("all");

    const [sortAscending, setSortAscending] = useState(true);
    

    const [page, setPage] = useState(1);
    const pageSize = 4;

    const [autoRefresh, setAutoRefresh] = useState(true);

    const [lastUpdated, setLastUpdated] =
     useState(new Date());

    const statuses = [
     ...new Set(
       insuranceClaims.map((claim) => claim.title)
     ),
    ];
    const resetFilters = () => {
      setSearch("");
      setStatusFilter("all");
      setPage(1);
    };

    const filteredClaims = useMemo(() => {
     return insuranceClaims
    .filter((claim) => {
      const matchesSearch = claim.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "all" ||
        claim.title === statusFilter;

      return (
        matchesSearch &&
        matchesStatus
      );
    })
    .sort((a, b) =>
      sortAscending
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title)
    );
    }, [
     search,
     statusFilter,
     sortAscending,
    ]);

    const totalRecords = filteredClaims.length;

    const totalPages = Math.ceil(
       totalRecords / pageSize
    );

    const paginatedClaims =
      filteredClaims.slice(
      (page - 1) * pageSize,
      page * pageSize
    ); 

    const refreshData = () => {
        setLastUpdated(new Date());
    }

    useEffect(() => {
       if (!autoRefresh) return;
       const interval = setInterval(() => {
          refreshData();
       }, 30000)
       if (page > totalPages && totalPages > 0) {
        setPage(totalPages);
        }
       return () => clearInterval(interval);
    }, [autoRefresh, page, totalPages])

    const printReport = () => {
        const title = document.title;

        document.title =
        "Insurance Claim Report";

        window.print();

        document.title = title;
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="Dialogi max-w-7xl w-[95vw] max-h-[90vh] border
            overflow-hidden rounded-sm print:w-full print:max-w-none
            print:max-h-none print:border-0 print:shadow-none">
                <div id="print-report">
                    <div className="hidden print:block mb-8">
                        <h1 className="text-3xl font-bold">
                            Insurance Claim Status Report
                        </h1>
                        <p className="text-slate-500">
                            Leads Health Care
                        </p>
                        <p className="text-slate-500">
                            Generated on
                            {" "}
                            {new Date().toLocaleString()}
                        </p>
                    </div>
                    <DialogHeader>
                        <div className="DialogiH flex justify-between items-center w-full gap-8">
                            <div className="flex items-center justify-between">
                                <DialogTitle>
                                    Insurance Claim Status Report
                                </DialogTitle>
                            </div>
                            <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between print:hidden">
                                <Button variant="outline" onClick={refreshData} className="rounded-sm">
                                    <RefreshCcw className="mr-2 h-4 w-4"/>
                                    Refresh
                                </Button>
                                <div className="flex items-center gap-2">
                                    <Label htmlFor="auto">
                                        Auto Refresh
                                    </Label>
                                    <Switch id="auto" checked={autoRefresh} onCheckedChange={setAutoRefresh} />
                                </div>
                                <ExportMenu 
                                onPDF={() => exportInsurancePDF(filteredClaims)}
                                onExcel={() => exportInsuranceExcel(filteredClaims)}
                                onWhatsapp={() => exportInsuranceWhatsapp(filteredClaims)}
                                onPrint={printReport}/>
                            </div>
                        </div>
                    </DialogHeader>
                    <div  className="searchDepartmenti sticky top-0 z-30 mb-5 bg-background 
                     flex flex-col gap-3 md:flex-row md:flex-wrap px-1
                     lg:items-center print:hidden">
                        <Input placeholder="Search claim..." value={search} 
                        onChange={(e) => {setSearch(e.target.value); setPage(1);}}
                        className="md:w-52 rounded-sm" />
                        <Select value={statusFilter} onValueChange={(value) => {
                            setStatusFilter(value ?? "all"); setPage(1);
                        }}>
                            <SelectTrigger className="md:w-34 rounded-sm">
                                <SelectValue placeholder="Claim Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">
                                    All Status
                                </SelectItem>
                                {statuses.map((status) => (
                                    <SelectItem key={status} value={status}>
                                        {status}
                                    </SelectItem>
                                 ))}
                            </SelectContent>
                        </Select>
                        <Button
                        variant="outline"
                        className="rounded-sm"
                        onClick={() => {
                            setSortAscending(!sortAscending);
                            setPage(1);
                        }}
                        >
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
                    <div className="rounded-sm border overflow-auto max-h-150">
                        {filteredClaims.length === 0 ? (
                            <RevenueEmptyState message="No claims found."
                            onReset={resetFilters} />
                            ) : (
                                <Table className="print-tablei print:text-sm">
                                    <TableHeader className="sticky top-0 z-20
                                    bg-background">
                                        <TableRow>
                                            <TableHead className="text-center">
                                                <Button variant="ghost" 
                                                className="font-bold print:hidden"
                                                onClick={() => {setSortAscending(!sortAscending);
                                                setPage(1);}}>
                                                    Status
                                                    {sortAscending ? (
                                                        <ArrowUp className="ml-2 h-4 w-4"/>
                                                    ): (

                                                    <ArrowDown className="ml-2 h-4 w-4"/>
                                                    )}
                                                </Button>
                                                <span className="hidden print:inline font-bold">
                                                    Status
                                                </span>
                                            </TableHead>
                                            <TableHead className="text-center">
                                                Claims
                                            </TableHead>
                                            <TableHead className="text-center">
                                                Percentage
                                            </TableHead>
                                            <TableHead className="text-center">
                                                Last Updated
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {paginatedClaims.map((claim) => {
                                            const ClaimIcon = claim.icon;
                                            const percentage = (
                                                (claim.value /
                                                 insuranceClaims[0].value) *
                                                  100
                                                ).toFixed(1);
                                                return (
                                                    <TableRow key={claim.id}
                                                    className="hover:bg-slate-50">
                                                        <TableCell>
                                                            <div className="flex items-center gap-3">
                                                                <div className={`flex h-11 w-11
                                                                items-center justify-center rounded-full
                                                                ${claim.icon}`}>
                                                                  <ClaimIcon className={`h-5 w-5
                                                                    ${claim.iconColor}`} />
                                                                </div>
                                                                <p className="font-medium">
                                                                    {claim.title}
                                                                </p>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell className="text-center font-semibold">
                                                            {claim.value}
                                                        </TableCell>
                                                        <TableCell className="text-center">
                                                            {percentage}%
                                                        </TableCell>
                                                        <TableCell className="text-center">
                                                            {lastUpdated.toLocaleTimeString()}
                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            })}    
                                    </TableBody>
                                </Table>
                            )
                        }
                    </div>
                    <div className="paginationi flex items-center justify-between mt-4 print:hidden flex-wrap gap-4">
                        <p className="text-sm text-slate-500">
                            Page {page} of {totalPages}
                        </p>
                        <p className="text-sm text-slate-500">
                            {totalRecords === 0
                            ? "Showing 0 of 0 Records"
                            : `Showing ${
                            (page - 1) * pageSize + 1
                            } - ${Math.min(
                                page * pageSize,
                                totalRecords
                            )} of ${totalRecords} Records`}
                        </p>
                        <div className="space-x-2">
                            <Button variant="outline" disabled={page === 1}
                              onClick={() => setPage(page - 1)} className="peginationButtoni rounded-sm">
                                Previous
                            </Button>
                            <Button variant="outline" disabled={page === totalPages} 
                             onClick={() => setPage(page + 1)}  className="rounded-sm">
                                Next
                            </Button>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden mt-4 print:hidden">
                        {paginatedClaims.map((claim) => (
                            <InsuranceClaimMobileCard
                                key={claim.id}
                                claim={{
                                    ...claim,
                                    iconBg: claim.bgColor,
                                }}
                            />
                        ))}
                    </div>
                    <div className="hidden print:block mt-8 text-center text-xs text-slate-500">
                       Leads Health Care • Insurance Claim Status Report
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}