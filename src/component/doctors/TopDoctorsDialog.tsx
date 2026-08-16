import { useEffect, useMemo, useState } from "react";

import {
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";

import { Switch } from "@/components/ui/switch";

import { Label } from "@/components/ui/label";
import RevenueEmptyState from "../RevenueExceptions/RevenueEmptyState";
import ExportMenu from "../RevenueExceptions/ExportMenu";

import { exportDoctorsPDF } from "@/lib/DoctorsExport/exportDoctorsPDF";

import { exportDoctorsExcel } from "@/lib/DoctorsExport/exportDoctorsExcel";

import { exportDoctorsWhatsapp } from "@/lib/DoctorsExport/exportDoctorsWhatsapp";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { topDoctors } from "@/data/topDoctors";
import { Star } from "lucide-react";
import DoctorMobileCard from "./DoctorMobileCard";

import "./TopDoctorsDialog.css";


type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function TopDoctorsDialog({
  open,
  onOpenChange,
}: Props) {
    const [_selectedDoctor, setSelectedDoctor] =
     useState<(typeof topDoctors)[0] | null>(null);
    const [search, setSearch] = useState("");
    const [department, setDepartment] = useState("all");
    const [rating, setRating] = useState("all");
    const [sortAscending, setSortAscending] = useState(true);
    const [page, setPage] = useState(1);
    const pageSize = 4;
    const [_lastUpdated, setLastUpdated] = useState<Date>(new Date());
    const [autoRefresh, setAutoRefresh] = useState(true);

    const departments = [
     ...new Set(topDoctors.map((doctor) => doctor.department)),
    ];

    const resetFilters = () => {
        setSearch("");
        setDepartment("all");
        setRating("all");
        setPage(1);
    };

    const filteredDoctors = useMemo(() => {
    return topDoctors
      .filter((doctor) => {
        const matchesSearch = doctor.name
          .toLowerCase()
          .includes(search.toLowerCase());

        const matchesDepartment =
          department === "all" ||
          doctor.department === department;

        const matchesRating =
          rating === "all" ||
          doctor.rating >= Number(rating);

        return (
          matchesSearch &&
          matchesDepartment &&
          matchesRating
        );
      })
      .sort((a, b) =>
        sortAscending
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name)
      );
    }, [
     search,
     department,
     rating,
     sortAscending,
   ]);

    const totalRecords = filteredDoctors.length;

    const totalPages = Math.ceil(
     totalRecords / pageSize
    );

   const paginatedDoctors = filteredDoctors.slice(
     (page - 1) * pageSize,
      page * pageSize
   );

    const handleView = (doctor: (typeof topDoctors)[0]) => {
     setSelectedDoctor(doctor);
    };

    const printReport = () => {
      const title = document.title;

      document.title = "Top Doctors Report";

      window.print();

      document.title = title;
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


  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent
        className="Dialogs
        max-w-7xl
        w-[95vw]
        max-h-[90vh]
        overflow-hidden
        rounded-sm print:w-full print:max-w-none print:max-h-none print:overflow-visible print:border-0
        print:shadow-none print:p-0
        "
      >
        <div id="print-report">
            <div className="hidden print:block mb-8">
             <h1 className="text-3xl font-bold">
                Top Performing Doctors Report
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

            Top Performing Doctors Report

          </DialogTitle>
          </div>

          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between print:hidden">
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

          <ExportMenu 
              onPDF={() => exportDoctorsPDF(filteredDoctors)}
              onExcel={() => exportDoctorsExcel(filteredDoctors)}
              onWhatsapp={()=>exportDoctorsWhatsapp(filteredDoctors)}
              onPrint={printReport}
            />

            </div>

            </div>

        </DialogHeader>

        <div className="searchDepartment sticky top-0 z-30 mb-5 bg-background
          flex flex-col gap-3 md:flex-row px-1 md:flex-wrap
          lg:flex-row lg:items-center print:hidden">

           <Input placeholder="Search doctor..." value={search} 
           onChange={(e) => {setSearch(e.target.value); setPage(1);}}
           className="px-3 pt-1 pb-1 text-sm md:w-48 rounded-sm" />

           <Select value={department} onValueChange={(value) => 
             {setDepartment(value ?? "all"); setPage(1);}}>
               <SelectTrigger className="md:w-24 rounded-sm">
                   <SelectValue placeholder="Department" />
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

           <Select value={rating} onValueChange={(value) => {setRating(value ?? "all"); setPage(1);}}> 
               <SelectTrigger className="md:w-24 rounded-sm">
                   <SelectValue placeholder="Rating" />
               </SelectTrigger>

               <SelectContent className="doctor-ratingfil">
                   <SelectItem value="all">
                       All Ratings
                   </SelectItem>
                   <SelectItem value="4">
                       ⭐ 4+
                   </SelectItem>
                   <SelectItem value="4.5">
                       ⭐ 4.5+
                   </SelectItem>
                   <SelectItem value="4.8">
                       ⭐ 4.8+
                   </SelectItem>
                   <SelectItem value="5">
                       ⭐ 5+
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


        <div className="grid gap-4 md:block rounded-sm border overflow-auto max-h-[600px]">


        {filteredDoctors.length === 0 ? (
            <RevenueEmptyState message="No doctors match your filters." onReset={resetFilters} />
            ) : (
        <Table className="print-table print:text-sm print:text-left w-[320px]">
            <TableHeader className="sticky top-0 z-20 bg-background">
                <TableRow>
                    <TableHead className="font-bold text-center">
                        <Button variant="ghost" className="print:hidden font-bold"
                         onClick={() => { setSortAscending(!sortAscending);
                          setPage(1);}}>
                            Doctor
                           {sortAscending ? ( <ArrowUp className="ml-2 h-4 w-4" />)
                           : (<ArrowDown className="ml-2 h-4 w-4" />)}
                        </Button>
                        <span className="hidden font-bold text-center print:inline">
                          Doctor
                        </span>
                    </TableHead>
                    <TableHead className="font-bold text-center">
                        Department
                    </TableHead>
                    <TableHead className="font-bold text-center">
                        Patients
                    </TableHead>
                    <TableHead className="font-bold text-center">
                        Revenue (₹)
                    </TableHead>
                    <TableHead className="font-bold text-center print:hidden">
                        Rating
                    </TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
               {paginatedDoctors.map((doctor)=>(
                    <TableRow key={doctor.id} className="hover:bg-slate-50">
                        <TableCell className="text-center">
                            <div className="doctor-cell">
                                <img src={doctor.avatar} alt={doctor.name}
                                className="doctor-avatar" />

                                <div>
                                    <p className="doctor-name text-center font-medium">
                                        {doctor.name}
                                    </p>
                                </div>
                            </div>
                        </TableCell>
                        <TableCell className="text-center">
                            {doctor.department}
                        </TableCell>
                        <TableCell className="text-center">
                            {doctor.patients}
                        </TableCell>
                        <TableCell className="text-center">
                            ₹{doctor.revenue.toLocaleString("en-IN")}
                        </TableCell>
                        <TableCell className="text-center print:hidden">
                            <div className="flex justify-center items-center gap-1">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                {doctor.rating}
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
        )}
        </div>

        <div className="pagination flex items-center justify-between print:hidden">
          <p className="text-sm text-slate-500">
            Page {page} of {totalPages}
          </p>
          <p className="text-sm text-slate-500">
            {totalRecords === 0
            ? "Showing 0 of 0 Doctors"
            : `Showing ${(page - 1) * pageSize + 1} - ${Math.min(
             page * pageSize,
             totalRecords
            )} of ${totalRecords} Doctors`}
          </p>
          <div className="space-x-2">
            <Button variant="outline" disabled={page===1}
             onClick={()=> setPage(page-1)} className="peginationButton rounded-sm
              border border-gray-400 px-4 py-4 pt-1 pb-1">
              Previous
            </Button>
            <Button variant="outline" disabled={page===totalPages}
             onClick={()=> setPage(page+1)} className="rounded-sm border
              border-gray-400 px-4 py-4 pt-1 pb-1">
              Next
            </Button>
          </div>
        </div>

       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden print:hidden">
         {paginatedDoctors.map((doctor)=>(
            <DoctorMobileCard key={doctor.id} doctor={doctor} onView={handleView} />
         ))}
       </div>
        
        <div className="hidden print:block mt-8 text-center text-xs text-slate-500">
          Leads Health Care • Revenue Exceptions Report
        </div>

       </div>
         
      </DialogContent>
    </Dialog>
  );
}