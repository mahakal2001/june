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
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { insuranceClaims } from '@/data/insuranceClaims';
import InsuranceClaimDialog from "./InsuranceClaimDialog";


export default function InsuranceClaimTable() {
  const [open, setOpen] = useState(false);
 


  return (
    <>
      <Card className="card mx-auto rounded-sm border shadow-sm relative top-6">

        <CardHeader className="flex flex-row items-center justify-between">

          <CardTitle className="text-xl font-semibold">

            Insurance Claim Status

            <span className="pl-1 text-base font-normal text-muted-foreground">
              (Today)
            </span>

          </CardTitle>

          <Button
            variant="link"
            className="pr-4 text-blue-600"
            onClick={() => setOpen(true)}>
            View All
          </Button>

        </CardHeader>

        <CardContent className="CardContent px-4">

          <Table>
            <TableBody>
             {insuranceClaims.map((claim) => {
               const ClaimIcon = claim.icon;

              return (
              <TableRow key={claim.id}
               className="hover:bg-slate-50 transition-colors">
               <TableCell className="flex items-center gap-4">
                  <div className={`flex h-11 w-11 items-center 
                   justify-center rounded-full ${claim.icon}`}>
                    <ClaimIcon className={`h-5 w-5 ${claim.iconColor}`}/>
                  </div>

                  <p className="text-sm font-medium font-semibold text-slate-700">
                    {claim.title}
                  </p>
                </TableCell>

                <TableCell className="text-center font-bold text-2xl">
                  {claim.value}
                </TableCell>
             </TableRow>
              );
             })}
           </TableBody>
          </Table>

        </CardContent>

      </Card>

      <InsuranceClaimDialog open={open} onOpenChange={setOpen} />

    </>
  );
}