import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Field,FieldLabel } from "@/components/ui/field";

const BranchSelect = () => {
  return (
    <Field className="mx-auto w-auto">

      <FieldLabel className="text-slate-600 font-semibold">

        Branch

      </FieldLabel>

      <Select defaultValue="All Branches">

        <SelectTrigger className="w-auto px-2.5 font-normal bg-white text-sm font-medium rounded-sm text-slate-700
            shadow-sm focus:ring-2 focus:ring-blue-200">

          <SelectValue />

        </SelectTrigger>

        <SelectContent>

          <SelectItem value="All Branches">

            All Branches

          </SelectItem>

          <SelectItem value="North">

            North Branch

          </SelectItem>

          <SelectItem value="South">

            South Branch

          </SelectItem>

          <SelectItem value="East">

            East Branch

          </SelectItem>

        </SelectContent>

      </Select>

    </Field>
  );
};

export default BranchSelect;