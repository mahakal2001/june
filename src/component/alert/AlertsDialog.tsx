import { useEffect, useMemo, useState } from "react";

import {
  RefreshCcw,
  ArrowUp,
  ArrowDown,

  AlertTriangle,
  ShieldAlert,
  CheckCircle2,
  Info,

} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";


import {
  Input,
} from "@/components/ui/input";

import {
  Button,
} from "@/components/ui/button";

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
  SelectValue,
  SelectItem,
} from "@/components/ui/select";

import ExportMenu from "../RevenueExceptions/ExportMenu";

import RevenueEmptyState from "../RevenueExceptions/RevenueEmptyState";

import {
  criticalAlerts,
} from "@/data/criticalAlerts";

import { exportAlertPDF } from "@/lib/AlertsExport/exportAlertPDF";
import { exportAlertsExcel } from "@/lib/AlertsExport/exportAlertsExcel";
import { exportWhatsappReport } from "@/lib/AlertsExport/exportWhatsappReport";

import './AlertsDialog.css';


type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function AlertsDialog({
  open,
  onOpenChange,
}: Props) {
    
    const [loading, _setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [priority, setPriority] = useState("all");
    const [category, setCategory] = useState("all");
    const [status, setStatus] = useState("all");
    const [sortAscending, setSortAscending] =
    useState(true);
    const [page, setPage] = useState(1);
    const pageSize = 4;
    const [_selectedAlert, setSelectedAlert] =
    useState<typeof criticalAlerts[number] | null>(null);

    const [_detailsOpen, setDetailsOpen] =
   useState(false);

   const [autoRefresh, setAutoRefresh] =
   useState(true);
    const [lastUpdated, setLastUpdated] =
    useState(new Date());

    const priorities = [
      ...new Set(
        criticalAlerts.map(alert => alert.priority)
      ),
    ];

    const categories = [
     ...new Set(
       criticalAlerts.map(alert => alert.category)
      ),
    ];

    const statuses = [
      ...new Set(
       criticalAlerts.map(alert => alert.status)
      ),
    ];

    const filteredAlerts = useMemo(() => {
        return criticalAlerts
        .filter(alert => {
            const matchesSearch =
            alert.title
            .toLowerCase()
            .includes(search.toLowerCase());

            const matchesPriority =
            priority === "all" ||
            alert.priority === priority;

            const matchesCategory =
            category === "all" ||
            alert.category === category;

            const matchesStatus =
            status === "all" ||
            alert.status === status;

            return (
            matchesSearch &&
            matchesPriority &&
            matchesCategory &&
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
     priority,
     category,
     status,
     sortAscending,
    ]);

    const getAlertIcon = (priority: string) => {
    switch (priority) {
        case "Critical":
            return ShieldAlert;

        case "High":
            return AlertTriangle;

        case "Medium":
            return Info;

        default:
            return CheckCircle2;
    }
};

  const getPriorityColor = (
    priority: string
) => {

    switch (priority) {

        case "Critical":

            return "bg-red-100 text-red-600";

        case "High":

            return "bg-orange-100 text-orange-600";

        case "Medium":

            return "bg-yellow-100 text-yellow-600";

        default:

            return "bg-green-100 text-green-600";

    }

};

  
    
    const totalRecords =
    filteredAlerts.length;

    const totalPages =
    Math.ceil(totalRecords / pageSize);

    const paginatedAlerts =
    filteredAlerts.slice(
      (page - 1) * pageSize,
       page * pageSize
    );

    const refreshData = () => {
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

    const resetFilters = () => {
  setSearch("");
  setPriority("all");
  setCategory("all");
  setStatus("all");
  setSortAscending(true);
  setPage(1);
};

    const printReport = () => {
        const originalTitle =
        document.title;

        document.title =
        "Critical Alerts Report";

        window.print();

        document.title =
        originalTitle;
    };


    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="Alertd max-w-7xl w-[95vw]
            overflow-hidden print:w-full print:max-w-none print:overflow-hidden
            print:max-h-none print:border-0 print:shadow-none print:p-0 rounded-sm">
              <div id="screen-report" className="screen-only">
               <DialogHeader className="screen-only print:hidden">
                 <div className="AlertsH flex justify-between items-center gap-6 w-full">
                    <div>
                      <DialogTitle className="text-xl font-semibold">
                        Alerts & Notifications
                      </DialogTitle>

                      <div className="flex items-center gap-3 mt-1">
                        <p className="text-sm text-muted-foreground mt-1">
                          Monitor all critical hospital alerts in one place.
                        </p>
                        <div className="flex items-center gap-2 rounded-full bg-green-50 px-3 py-1">
                          <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"/>
                          <span className="text-xs font-medium text-green-700">
                            Live
                          </span>
                        </div>
                      </div>

                    </div>
                    <div className="flex flex-col gap-3 md:flex-row md:items-center
                     print:hidden">
                      <Button variant="outline" onClick={refreshData}
                       className="rounded-sm">
                        <RefreshCcw className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} />
                        Refresh
                      </Button>
                      <div className="flex items-center gap-2">
                        <Label htmlFor="auto-refresh">
                          Auto Refresh
                        </Label>
                        <Switch id="auto-refresh" checked={autoRefresh}
                        onCheckedChange={setAutoRefresh}/>
                      </div>
                      <ExportMenu 
                      onPDF={() => exportAlertPDF(filteredAlerts, lastUpdated)}
                      onExcel={() => exportAlertsExcel(filteredAlerts, {priority,
                      category, status, })}
                      onWhatsapp={() => exportWhatsappReport(filteredAlerts, {priority, category,
                        status,})} 
                      onPrint={printReport} />
                    </div>
                  </div>
                </DialogHeader>
                
  <div className="searchDepartmenta sticky top-0 z-30 bg-background
                 flex flex-col gap-3 lg:flex-row lg:flex-wrap lg:items-center
                  print:hidden">
  <Input
    placeholder="Search alerts..."
    value={search}
    onChange={(e) => {
      setSearch(e.target.value);
      setPage(1);
    }}
    className="w-full lg:w-48 rounded-sm"
  />

  <Select
    value={priority}
    onValueChange={(value) => {
      if (value !== null) {
        setPriority(value);
        setPage(1);
      }
    }}
  >
    <SelectTrigger className="w-full lg:w-34 rounded-sm">
      <SelectValue placeholder="Priority" />
    </SelectTrigger>

    <SelectContent>
      <SelectItem value="all">
        All Priorities
      </SelectItem>

      {priorities.map((item) => (
        <SelectItem key={item} value={item}>
          {item}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>

  <Select
    value={category}
    onValueChange={(value) => {
      if (value !== null) {
        setCategory(value);
        setPage(1);
      }
    }}
  >
    <SelectTrigger className="w-full lg:w-34 rounded-sm">
      <SelectValue placeholder="Category" />
    </SelectTrigger>

    <SelectContent>
      <SelectItem value="all">
        All Categories
      </SelectItem>

      {categories.map((item) => (
        <SelectItem key={item} value={item}>
          {item}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>

  <Select
    value={status}
    onValueChange={(value) => {
      if (value !== null) {
        setStatus(value);
        setPage(1);
      }
    }}
  >
    <SelectTrigger className="w-full lg:w-32 rounded-sm">
      <SelectValue placeholder="Status" />
    </SelectTrigger>

    <SelectContent>
      <SelectItem value="all">
        All Statuses
      </SelectItem>

      {statuses.map((item) => (
        <SelectItem key={item} value={item}>
          {item}
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

  <Button
    variant="ghost"
    onClick={resetFilters} className="rounded-sm"
  >
    Reset Filters
  </Button>
  </div>

  {/* ===========================
   Alert Priority Legend
=========================== */}
<div className="alertP flex flex-wrap gap-3 text-xs print:hidden">

  <div className="flex items-center gap-2">
    <div className="w-3 h-3 rounded-full bg-red-500"></div>
    Critical
  </div>

  <div className="flex items-center gap-2">
    <div className="w-3 h-3 rounded-full bg-orange-500"></div>
    High
  </div>

  <div className="flex items-center gap-2">
    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
    Medium
  </div>

  <div className="flex items-center gap-2">
    <div className="w-3 h-3 rounded-full bg-green-500"></div>
    Low
  </div>

</div>


{/* ===========================
   Alerts Table
=========================== */}

<div className="screen-only rounded-xl border overflow-hidden">
  {filteredAlerts.length === 0 ? (
    <RevenueEmptyState
      message="No alerts found."
      onReset={resetFilters}
    />
  ) : (
    <table className="print-tablea w-full text-sm">
      <thead className="sticky top-0 z-30 bg-white/90 backdrop-blur-md shadow-sm">
        <tr className="border-b">
          <th className="text-left p-3 font-semibold">
            Alert
          </th>

          <th className="text-center p-3 font-semibold">
            Priority
          </th>

          <th className="text-center p-3 font-semibold">
            Category
          </th>

          <th className="text-center p-3 font-semibold">
            Status
          </th>

          <th className="text-center p-3 font-semibold">
            Last Updated
          </th>
        </tr>
      </thead>

      <tbody className="animate-in fade-in slide-in-from-bottom-2 duration-500">
        {paginatedAlerts.map((alert, index) => {
          const Icon = getAlertIcon(alert.priority);

          return (
            <tr
              key={alert.id}
              onClick={() => {
                setSelectedAlert(alert);
                setDetailsOpen(true);
              }}
              className={`
                group
                cursor-pointer
                transition-all
                duration-300

                ${index % 2 === 0 ? "bg-white" : "bg-slate-50/40"}

                hover:bg-slate-50
                hover:shadow-lg hover:scale-[1.002]

                ${
                  alert.priority === "Critical"
                    ? "border-l-4 border-red-600"
                    : alert.priority === "High"
                    ? "border-l-4 border-orange-500"
                    : alert.priority === "Medium"
                    ? "border-l-4 border-yellow-500"
                    : "border-l-4 border-green-500"
                }
              `}
            >
              <td className="p-4">

<div className="flex items-start gap-3">

<div
className={`
h-10
w-10
rounded-full
flex
items-center
justify-center
${getPriorityColor(alert.priority)}
`}
>

<Icon className="h-5 w-5"/>

</div>

<div>

<p className="font-semibold">

{alert.title}

</p>

<p className="text-xs text-muted-foreground truncate max-w-[350px]" title={alert.description}>

{alert.description}

</p>

</div>

</div>

</td>

            <td className="text-center">
              <span
                className={`screen-only inline-flex items-center px-3 py-1 rounded-full 
                  text-xs font-semibold shadow-sm
                ${
                  alert.priority === "Critical"
                    ? "bg-red-100 text-red-700"
                    : alert.priority === "High"
                    ? "bg-orange-100 text-orange-700"
                    : alert.priority === "Medium"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {alert.priority}
              </span>
              {/* Print */}
              <span className="print-only">
                {alert.priority}
              </span>
            </td>

            <td className="text-center">
              {alert.category}
            </td>

            <td className="text-center">
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full
                   text-xs font-semibold shadow-sm
                ${
                  alert.status === "Active"
                    ? "bg-red-100 text-red-700"
                    : alert.status === "Resolved"
                    ? "bg-green-100 text-green-700"
                    : "bg-blue-100 text-blue-700"
                }`}
              >
                {alert.status}
              </span>
            </td>

            <td className="text-center">
              {lastUpdated.toLocaleTimeString()}
            </td>
          </tr>
          )
        })}
      </tbody>
    </table>
  )}
</div>


{/* ===========================
   Pagination
=========================== */}

<div className="paginationa flex items-center justify-between mt-5 flex-wrap gap-4 print:hidden">

  <p className="text-sm text-muted-foreground">
    Page {page} of {totalPages}
  </p>

  <p className="text-sm text-muted-foreground">
    {totalRecords === 0
      ? "Showing 0 Records"
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
      onClick={() => setPage(page - 1)} className="peginationButtona rounded-sm"
    >
      Previous
    </Button>

    <Button
      variant="outline"
      disabled={page === totalPages}
      onClick={() => setPage(page + 1)} className="rounded-sm"
    >
      Next
    </Button>
  </div>
</div>

{/* ===========================
   Mobile Cards
=========================== */}

<div className="grid grid-cols-1 gap-4 mt-6 lg:hidden">

  {paginatedAlerts.map((alert, _index) => (
    <div
      key={alert.id}
      className="rounded-xl border bg-white p-5 shadow-sm hover:shadow-lg
      transition-all duration-300 hover:-translate-y-1"
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold">
            {alert.title}
          </h3>

          <p className="text-xs text-muted-foreground mt-1">
            {alert.description}
          </p>
        </div>

        <span
          className={`px-2 py-1 rounded-full text-xs
          ${
            alert.priority === "Critical"
              ? "bg-red-100 text-red-700"
              : alert.priority === "High"
              ? "bg-orange-100 text-orange-700"
              : alert.priority === "Medium"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {alert.priority}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-4 text-sm">

        <div>
          <p className="text-muted-foreground">
            Category
          </p>

          <p className="font-medium">
            {alert.category}
          </p>
        </div>

        <div>
          <p className="text-muted-foreground">
            Status
          </p>

          <p className="font-medium">
            {alert.status}
          </p>
        </div>

      </div>
    </div>
  ))}

</div>

<div className="hidden print:block mt-8 text-center text-xs text-slate-500">
  Leads Health Care • Alerts & Notifications Report
</div>
              </div>  

              
              {/* PRINT REPORT */}
<div className="print-only">

  <div className="print-title">
    <h1 className="font-bold">Leads Health Care</h1>

    <h2 className="font-semibold">Alerts & Notifications Report</h2>

    <p className="text-slate-400">
      Generated on {new Date().toLocaleString()}
    </p>
  </div>

  <table className="report-table">

    <thead>

      <tr>
        <th>#</th>
        <th>Alert</th>
        <th>Priority</th>
        <th>Category</th>
        <th>Status</th>
        <th>Last Updated</th>
      </tr>

    </thead>

    <tbody>

      {filteredAlerts.map((alert, index) => (

        <tr key={alert.id}>

          <td>{index + 1}</td>

          <td>
            <strong>{alert.title}</strong>
            <br />
            {alert.description}
          </td>

          <td>{alert.priority}</td>

          <td>{alert.category}</td>

          <td>{alert.status}</td>

          <td>{lastUpdated.toLocaleString()}</td>

        </tr>

      ))}

    </tbody>

  </table>

</div>

            </DialogContent>
            
        </Dialog>
    )

}