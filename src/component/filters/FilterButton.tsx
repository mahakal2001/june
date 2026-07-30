import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Filter } from "lucide-react";

export default function FilterButton() {
  return (
    <Sheet>

      <SheetTrigger>

        <Button variant="outline">

          <Filter className="mr-2 h-4 w-4"/>

          More Filters

        </Button>

      </SheetTrigger>

      <SheetContent className="w-[400px]">

        <SheetHeader>

          <SheetTitle>

            Advanced Filters

          </SheetTitle>

        </SheetHeader>

        <div className="mt-8 space-y-6">

          <Select>

            <SelectTrigger>

              <SelectValue placeholder="Department"/>

            </SelectTrigger>

            <SelectContent>

              <SelectItem value="cardiology">

                Cardiology

              </SelectItem>

              <SelectItem value="icu">

                ICU

              </SelectItem>

              <SelectItem value="emergency">

                Emergency

              </SelectItem>

            </SelectContent>

          </Select>

          <Select>

            <SelectTrigger>

              <SelectValue placeholder="Doctor"/>

            </SelectTrigger>

            <SelectContent>

              <SelectItem value="amit">

                Dr Amit

              </SelectItem>

              <SelectItem value="neha">

                Dr Neha

              </SelectItem>

            </SelectContent>

          </Select>

          <Button className="w-full">

            Apply Filters

          </Button>

        </div>

      </SheetContent>

    </Sheet>
  );
}