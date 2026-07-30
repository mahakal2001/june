import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import './SearchBar.css';

export default function SearchBar() {
  return (
    <div className="relative w-78">
      <Search
        size={18}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
      />

      <Input
        placeholder="Search by UHID, Patient, Doctor..."
        className="placeholder pl-10 pr-16 h-11 rounded-xl"
      />

      <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-muted-foreground">
         ⌘K
      </kbd>
    </div>
  );
}