import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Field,FieldLabel } from "@/components/ui/field";

function DepartmentSelect() {
  return (
    <Field className="mx-auto w-auto">

      <FieldLabel className="text-slate-600 font-semibold">

        Department

      </FieldLabel>
     <Select>

      <SelectTrigger className="w-auto px-2.5 font-normal bg-white text-sm font-medium rounded-sm text-slate-700
        shadow-sm focus:ring-2 focus:ring-blue-200">

        <SelectValue placeholder="All Departments"/>

      </SelectTrigger>

      <SelectContent>

        <SelectItem value="All Departments">

          All Departments

        </SelectItem>

        <SelectItem value="cardiology">

          Cardiology

        </SelectItem>

        <SelectItem value="neurology">

          Neurology

        </SelectItem>

        <SelectItem value="orthopedics">

          Orthopedics

        </SelectItem>

      </SelectContent>

    </Select>
  </Field>  
  );
}

export default DepartmentSelect;