import { Eye } from "lucide-react";

import { Card } from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { Badge } from "@/components/ui/badge";

import {
    formatCurrency,
    formatPercent,
} from "@/lib/formatCurrency";

type RevenueRow = {
    department: string;
    status: "Positive" | "Negative";
    expected: number;
    actual: number;
    variance: number;
    variancePercent: number;
};

type Props = {
    row: RevenueRow;
    onView: (row: RevenueRow) => void;
};


export default function RevenueMobileCard({

    row,

    onView,

}:Props){

return(

<Card
className="
rounded-xl
border
shadow-sm
p-5
space-y-4
">

<div
className="
flex
items-center
justify-between
"
>

<div>

<h3
className="
font-semibold
text-lg
"
>

{row.department}

</h3>

</div>

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

<div className="space-y-2">

<div className="flex justify-between">

<span>Expected</span>

<strong>

₹{formatCurrency(row.expected)}

</strong>

</div>

<div className="flex justify-between">

<span>Actual</span>

<strong>

₹{formatCurrency(row.actual)}

</strong>

</div>

<div className="flex justify-between">

<span>Variance</span>

<strong
className={
row.variance>=0

?

"text-green-600"

:

"text-red-600"
}
>

{row.variance>=0?"+":"-"}

₹

{formatCurrency(Math.abs(row.variance))}

</strong>

</div>

<div className="flex justify-between">

<span>Variance %</span>

<strong
className={
row.variance>=0

?

"text-green-600"

:

"text-red-600"

}
>

{row.variance>=0?"+":"-"}

{formatPercent(Math.abs(row.variancePercent))}%

</strong>

</div>

</div>

<Button

className="w-full"

variant="outline"

 onClick={() => onView(row)}

>

<Eye className="mr-2 h-4 w-4"/>

View Details

</Button>

</Card>
);
}
