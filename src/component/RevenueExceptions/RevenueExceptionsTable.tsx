import { Eye } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import RevenueExceptionsDialog from "./RevenueExceptionsDialog";
import RevenueMobileCard from "./RevenueMobileCard";
import RevenueDetailsDialog from "./RevenueDetailsDialog";

import { revenueExceptions } from "@/data/revenueExceptions";

import {
  formatCurrency,
  formatPercent,
} from "@/lib/formatCurrency";


import './RevenueExceptionsTable.css';
import { useState } from "react";

type RevenueExceptionRow = {
  id?: number;
  department: string;
  expected: number;
  actual: number;
  date?: string | Date;
  variance: number;
  variancePercent: number;
  status: "Positive" | "Negative";
};

export default function RevenueExceptionsTable() {
    const [open,setOpen]=useState(false);
    const rows = revenueExceptions.map((item) => {

    const variance =
        item.actual - item.expected;

    const variancePercent =
        (variance / item.expected) * 100;

    const status: "Positive" | "Negative" =
        variance >= 0 ? "Positive" : "Negative";

    return {

        ...item,

        variance,

        variancePercent,

        status,

    };

  });
  const [selectedRow, setSelectedRow] = useState<RevenueExceptionRow | null>(null);
  
   const handleView = (row: RevenueExceptionRow) => {
    setSelectedRow(row);
    setDetailsOpen(true);
  };
  
  const [detailsOpen, setDetailsOpen] = useState(false);


  return (
    <>
    <Card className="card mx-auto shadow-sm rounded-sm border">
     <CardHeader className="flex flex-row items-center justify-between pb-3">

       <CardTitle className="text-xl font-semibold">

          Revenue Exceptions

       </CardTitle>

       <Button variant="link" onClick={()=>setOpen(true)}
         className="text-blue-600">
         View All
       </Button>

     </CardHeader>
       <CardContent className="CardContent px-4">


<>
    {/* ================= Desktop Table ================= */}

    <div
        className="
            hidden
            md:block
            rounded-sm
            border
            overflow-auto
            max-h-[600px]
        "
    >

        <Table className="text-sm table-fixed w-full">

            <TableHeader>

             <TableRow>

               <TableHead className="w-[90px] text-center">Department</TableHead>

               <TableHead className="w-[88px] text-center">Expected (₹)</TableHead>

               <TableHead className="w-[90px] text-center">Actual (₹)</TableHead>

               <TableHead className="w-[90px] text-center">Variance (₹)</TableHead>

               <TableHead className="w-[90px] text-center">Variance (%)</TableHead>

               <TableHead className="w-[80px] text-center">Status</TableHead>

               <TableHead className="w-[80px] text-center">Action</TableHead>

             </TableRow>

            </TableHeader>

            <TableBody> 
                {rows.map((row)=>(
              <TableRow className="TableRow" key={row.id}>
                  <TableCell className="font-medium text-center">{row.department}</TableCell>
                  <TableCell className="TableCell text-center">
                     {formatCurrency(row.expected)}
                   </TableCell>
                   <TableCell className="text-center">
                     {formatCurrency(row.actual)}
                   </TableCell>
                   <TableCell className={`text-center font-medium 
                   ${row.variance>=0 ?"text-emerald-600" :"text-red-500"}`}>
                      {row.variance>=0?"+":"-"}
                      {formatCurrency(Math.abs(row.variance))}
                   </TableCell>
                   <TableCell className={`text-center font-medium
                     ${row.variance>=0? "text-emerald-600":"text-red-500"}`}>
                      {row.variance>=0?"+":"-"}
                      {formatPercent(Math.abs(row.variancePercent))}%
                   </TableCell>
                   <TableCell className="text-center">
                      <Badge variant="secondary" className={`rounded-md text-center px-3 py-1
                         font-medium ${row.status==="Positive"
                         ?"bg-green-50 text-green-700":"bg-red-50 text-red-600"}`}>
                         {row.status}
                      </Badge>
                   </TableCell>
                   <TableCell className="text-center">
                     <Button variant="outline" size="icon" onClick={()=>handleView(row)}
                      className="h-9 w-9">
                        <Eye className="h-4 w-4"/>
                     </Button>
                   </TableCell>
               </TableRow>
                ))}


            </TableBody> 

          </Table>
          </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden" >
 
              {rows.map((row)=>(

                <RevenueMobileCard
                key={row.id}
                row={row}
                onView={handleView} />

              ))}

            </div>
       </>

              


      </CardContent>


    </Card>
    <RevenueExceptionsDialog
      open={open}
      onOpenChange={setOpen}
    />

    <RevenueDetailsDialog
      open={detailsOpen}
      onOpenChange={setDetailsOpen}
      row={selectedRow}
    />
  </>  
)}



