import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Badge } from "@/components/ui/badge";

import {
    formatCurrency,
    formatPercent,
} from "@/lib/formatCurrency";

type RevenueExceptionRow = {
    department: string;
    expected: number;
    actual: number;
    variance: number;
    variancePercent: number;
    status: "Positive" | "Negative" | string;
};

type Props = {

    open: boolean;
    onOpenChange: (open: boolean) => void;
    row: RevenueExceptionRow | null;

};

export default function RevenueDetailsDialog({

    open,

    onOpenChange,

    row,

}:Props){

if(!row) return null;

return(

 <Dialog
  open={open}
  onOpenChange={onOpenChange}>

  <DialogContent className="sm:w-[380px] text-center pt-8 pb-8 
   bg-gradient-to-b from-blue-50 to-white">

   <DialogHeader>

     <DialogTitle>Revenue Details</DialogTitle>

   </DialogHeader>
   <div className="grid gap-4">

  <div>

    <p className="text-sm text-muted-foreground">Department</p>

    <p className="font-semibold">{row.department}</p>

  </div>
  <div className="grid grid-cols-2 gap-4">
  <div>

     <p className="text-sm text-muted-foreground">Expected</p>
     <p className="font-medium">
       {formatCurrency(row.expected)}
     </p>
  </div>
  <div>
    <p className="text-sm text-muted-foreground">
        Actual
    </p>
    <p className="font-medium text-center">
        ₹{formatCurrency(row.actual)}
    </p>
  </div>
  </div>

  <div className="grid grid-cols-2 gap-4">

<div>

<p className="text-sm text-muted-foreground">

Variance

</p>

<p
className={
row.variance>=0

?

"text-green-600 font-semibold"

:

"text-red-600 font-semibold"
}
>

{row.variance>=0?"+":"-"}

₹

{formatCurrency(Math.abs(row.variance))}

</p>

</div>

<div>

<p className="text-sm text-muted-foreground">

Variance %

</p>

<p
className={
row.variance>=0

?

"text-green-600 font-semibold"

:

"text-red-600 font-semibold"
}
>

{row.variance>=0?"+":"-"}

{formatPercent(Math.abs(row.variancePercent))}%

</p>

</div>

</div>

<div>

<p className="text-sm text-muted-foreground mb-2">

Status

</p>

<Badge

className={
row.status==="Positive"

?

"bg-green-100 text-green-700"

:

"bg-red-100 text-red-700"

}

>

{row.status}

</Badge>

</div>

</div>

</DialogContent>

</Dialog>

);

}