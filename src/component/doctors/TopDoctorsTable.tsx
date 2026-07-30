import { Star } from "lucide-react";
import { useState } from "react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";

import { topDoctors } from "@/data/topDoctors";

import TopDoctorsDialog from "./TopDoctorsDialog";

export default function TopDoctorsTable(){

    const [open, setOpen] = useState(false);

return(
  
    <>
      <Card className="card mx-auto shadow-sm rounded-sm border relative top-6">

    <CardHeader className="flex flex-row items-center justify-between">

    <div>

    <CardTitle className="text-xl font-semibold">

      Top Performing Doctors

      <span className="pl-1 text-base text-muted-foreground">

        (Today)

      </span>

    </CardTitle>

   </div>

   <Button variant="link" className="text-blue-600" onClick={() => setOpen(true)}>

    View All

    </Button>

    </CardHeader>

    <CardContent className="CardContent px-4">
        <Table >
            <TableHeader>
                <TableRow>
                    <TableHead className="font-bold text-center">
                        Doctor
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
                    <TableHead className="font-bold text-center">
                        Rating
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {topDoctors.map((doctor)=>(
                  <TableRow key={doctor.id} className="hover:bg-slate-50 transition-colors">
                    <TableCell className="text-center">
                        <div className="flex items-center gap-3">
                            <img src={doctor.avatar} alt={doctor.name} 
                            className="h-10 w-10 rounded-full object-cover"/>
                            <div>
                                <p className="font-medium">
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
                        ₹ {doctor.revenue.toLocaleString("en-IN")}
                    </TableCell>
                    <TableCell className="text-center">
                        <div className="flex justify-center items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400"/>

                            <span>
                                {doctor.rating}
                            </span>
                        </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
        </Table>
    </CardContent>

    </Card>

    <TopDoctorsDialog open={open} onOpenChange={setOpen}/>
    </>

)}