import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

import {
  Download,
  FileText,
  FileSpreadsheet,
  MessageCircle,
  Printer,
} from "lucide-react";

import "./ExportMenu.css"
import { useState } from "react";

type Props = {

    onPDF:()=>void;

    onExcel:()=>void;

    onWhatsapp:()=>void;

    onPrint:()=>void;

};

export default function ExportMenu({
    onPDF, onExcel, onWhatsapp, onPrint,
}:Props){
    const [open, setOpen] = useState(false);
    return(
        <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger>

                <Button className="rounded-sm">
                    <Download className="mr-2 h-4 w-4"/>
                    Export
                </Button>

            </DropdownMenuTrigger>
            <DropdownMenuContent className="DropContent rounded-sm print:hidden" align="center">
                <DropdownMenuItem className="DropMenu" onClick={onPDF}>
                    <FileText className="mr-2 h-4"/>
                    Export PDF
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onExcel}>
                    <FileSpreadsheet className="mr-2 h-4"/>
                    Export Excel
                </DropdownMenuItem>
                <DropdownMenuItem className="DropMenu"  onClick={onWhatsapp}>
                    <MessageCircle className="mr-2 h-4"/>
                    WhatsApp Report
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => { setOpen(false);
                 setTimeout(() => {onPrint();}, 300);}}>
                    <Printer className="mr-2 h-4"/>
                    Print
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}