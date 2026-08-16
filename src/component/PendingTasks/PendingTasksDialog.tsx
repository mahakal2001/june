import { useEffect, useMemo, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import {
  Label,
} from "@/components/ui/label";

import {
  Switch,
} from "@/components/ui/switch";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  ArrowDown,
  ArrowUp,
  RefreshCcw,
} from "lucide-react";

import ExportMenu from "../RevenueExceptions/ExportMenu";

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
  pendingTasks,
} from "@/data/pendingTasks";

import { ExportPendingPDF } from "@/lib/ExportPending/ExportPendingPDF";
import { ExportPendingExcel } from "@/lib/ExportPending/ExportPendingExcel";
import { ExportPendingWhatsapp } from "@/lib/ExportPending/ExportPendingWhatsapp";
import { ExportPendingPrint } from "@/lib/ExportPending/ExportPendingPrint";

import "./PendingTasksDialog.css";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function PendingTasksDialog({
  open,
  onOpenChange,
}: Props) {

   const [search, setSearch] = useState("");
   const [priority, setPriority] = useState("all");
   const [taskFilter, setTaskFilter] = useState("all");
   const [sortAscending, setSortAscending] = useState(true);
   const [autoRefresh, setAutoRefresh] = useState(true);
   const [_lastUpdated, setLastUpdated] = useState(new Date());
   const [loading, _setLoading] = useState(false);
   const [page, setPage] = useState(1);
   const pageSize = 4;

  const getPriority = (count: number) => {
    if (count >= 40) return "Critical";
    if (count >= 25) return "High";
    if (count >= 15) return "Medium";
    return "Low";
  };

  const tasks = useMemo(() => {

  return pendingTasks

    .filter(task => {

      const taskPriority = getPriority(task.count);

      const matchesSearch =

        task.title

        .toLowerCase()

        .includes(search.toLowerCase());

      const matchesPriority =

        priority === "all" ||

        taskPriority === priority;

      const matchesTask =

        taskFilter === "all" ||

        task.title === taskFilter;

      return (

        matchesSearch &&

        matchesPriority &&

        matchesTask

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
     taskFilter,
     sortAscending,
   ]);

    const totalRecords = tasks.length;
    const totalPages = Math.ceil(totalRecords / pageSize);
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    const paginatedTasks = tasks.slice(startIndex, endIndex);
    useEffect(() => {
     setPage(1);
    }, [
      search,
      priority,
      taskFilter,
      sortAscending,
   ]);

   useEffect(() => {
     if (page > totalPages && totalPages > 0) {
      setPage(totalPages);
    }
   }, [page, totalPages]);
   

    const resetFilters = () => {
     setSearch("");
     setPriority("all");
     setTaskFilter("all");
     setSortAscending(true);
   };
   const refreshData = () => {
      setLastUpdated(new Date());
   };

   useEffect(() => {
      if (!autoRefresh) return;
         const interval = setInterval(() => {
            refreshData();
        }, 30000);
      return () => clearInterval(interval);
   }, [autoRefresh]);
   
   const taskList = [
      ...new Set(
      pendingTasks.map(task => task.title)
    ),]

   const priorityList = ["Critical", "High", "Medium", "Low"];

  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case "Critical":
        return "bg-red-100 text-red-700";

      case "High":
        return "bg-orange-100 text-orange-700";

      case "Medium":
        return "bg-yellow-100 text-yellow-700";

      default:
        return "bg-green-100 text-green-700";
    }
  };

    const printReport = () => {
      ExportPendingPrint({
       data: tasks,
       priority,
       task: taskFilter,
       search,
      });
    };

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent
        className="pendingDialogContent
          px-8 py-6
          rounded-sm
          overflow-hidden
        "
      >

        {/* Header */}

        <DialogHeader className="bg-white py-2">

          <div className="flex items-center justify-between">

            <div>

              <DialogTitle className="text-2xl font-bold">

                Pending Tasks Report

              </DialogTitle>

              <p className="text-sm text-muted-foreground mt-1">

                Leads Health Care • Pending Operational Tasks

              </p>

            </div>

            <div className="flex items-center gap-3 print:hidden">
                            
                <Button
                variant="outline"
                className="rounded-sm w-auto pl-4 pr-4"
                size="icon"
                onClick={(e) => {
                   e.stopPropagation();
                   setLastUpdated(new Date());
                }}>
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
                 onPDF={()=> ExportPendingPDF(
                  tasks,
                  priority,
                  taskFilter,
                  search
                 )}
                 onExcel={()=> ExportPendingExcel({
                  data: tasks,
                  search,
                  priority,
                  task: taskFilter,
                 })}
                 onWhatsapp={()=> ExportPendingWhatsapp({
                  data: tasks,
                  search,
                  priority,
                  task: taskFilter,
                 })}
                 onPrint={printReport}
                 />
                            
            </div>

          </div>

        </DialogHeader>
        <div className="print:hidden">
            <div className="flex flex-wrap items-center gap-3">
                <Input placeholder="Search task..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-50 rounded-sm" />
                
                <Select value={taskFilter} onValueChange={(value) => setTaskFilter(value || "all")}>
                    <SelectTrigger className="w-36 rounded-sm">
                        <SelectValue placeholder="Task"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">
                            All Tasks
                        </SelectItem>
                        {taskList.map((item)=>(
                            <SelectItem key={item} value={item}>
                                {item}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Select value={priority} onValueChange={(value) => setPriority(value || "all")}>
                    <SelectTrigger className="w-36 rounded-sm">
                        <SelectValue placeholder="Priority"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">
                            All Priorities
                        </SelectItem>
                        {priorityList.map((item: string)=>(
                            <SelectItem key={item} value={item}>
                                {item}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Button
                    variant="outline"
                    onClick={() => setSortAscending(!sortAscending)}
                    className="rounded-sm">
                     Sort 
                     {sortAscending ?
                      <ArrowUp className="ml-2 h-4 w-4"/> : 
                      <ArrowDown className="ml-2 h-4 w-4"/>
                    }
                </Button>
                <Button
                    variant="outline"
                    onClick={resetFilters}
                    className="rounded-sm"
                >
                    Reset
                </Button>
            </div>
        </div>

        {/* Table */}

        <div className="hidden lg:block max-h-[70vh] overflow-auto border rounded-sm">

          <Table>

            <TableHeader className="sticky top-0 bg-white z-20">

              <TableRow>

                <TableHead className="pl-6">

                  #

                </TableHead>

                <TableHead>

                  Task

                </TableHead>

                <TableHead className="text-center">

                  Pending Count

                </TableHead>

                <TableHead className="text-center">

                  Priority

                </TableHead>

              </TableRow>

            </TableHeader>

            <TableBody>

              {paginatedTasks.map((task, index) => {

                const Icon = task.icon;

                const priority = getPriority(task.count);

                return (

                  <TableRow
                    key={task.id}
                    className="
                      hover:bg-slate-50
                      transition-all
                    "
                  >

                    <TableCell className="pl-6 font-medium">

                      {(page - 1) * pageSize + index + 1}

                    </TableCell>

                    <TableCell>

                      <div className="flex items-center gap-3">

                        <div
                          className={`
                            h-10
                            w-10
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

                        <span className="font-medium">

                          {task.title}

                        </span>

                      </div>

                    </TableCell>

                    <TableCell className="text-center">

                      <Badge
                        className={`
                          rounded-full
                          px-4
                          py-1
                          text-sm
                          font-semibold
                          ${task.badgeColor}
                        `}
                      >

                        {task.count}

                      </Badge>

                    </TableCell>

                    <TableCell className="text-center">

                      <Badge
                        className={`
                          rounded-full
                          px-4
                          py-1
                          ${getPriorityClass(priority)}
                        `}
                      >

                        {priority}

                      </Badge>

                    </TableCell>

                  </TableRow>

                );

              })}

            </TableBody>

          </Table>

        </div>

        <div className="grid gap-4 p-5 lg:hidden">

          {paginatedTasks.map((task) => {

          const Icon = task.icon;
          const priority = getPriority(task.count);

          return (

            <div
            key={task.id}
            className="
            rounded-xl
            border
            bg-white
            p-5
            shadow-sm
            transition-all
            duration-300
            hover:shadow-md
            "
            >

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-3">

                <div
                className={`
                h-10
                w-10
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

             <div>

                <h3 className="font-semibold">

                  {task.title}

                </h3>

                <p className="text-xs text-slate-500">

                  {priority} Priority

                </p>

              </div>

            </div>

            <Badge className={task.badgeColor}>

              {task.count}

            </Badge>

          </div>

        </div>

       );

       })}

        </div>

        {/* Footer */}

        <div className="border-t py-2">

         <div className="flex flex-wrap items-center justify-between gap-4">


              <p className="text-sm text-muted-foreground">

                Page {page} of {totalPages}

              </p>

              <p className="text-xs text-slate-500 mt-1">

             Showing {
              totalRecords === 0
               ? 0
               : startIndex + 1
              } -
              {
               Math.min(endIndex, totalRecords)
              }
              of
              {
               totalRecords
              }

              </p>

           <div className="flex items-center gap-2">

              <Button
              variant="outline"
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              >
                Previous
             </Button>

              <Button
              variant="outline"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              >
                Next
             </Button>


            </div>

          </div>

        </div>

      </DialogContent>

    </Dialog>
  );
}