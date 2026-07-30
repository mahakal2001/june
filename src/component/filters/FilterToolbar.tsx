import DateRangePicker from "./DateRangePicker";
import CompareSelect from "./CompareSelect";
import BranchSelect from "./BranchSelect";
import DepartmentSelect from "./DepartmentSelect";
import ResetButton from "./ResetButton";
import FilterButton from "./FilterButton";

function FilterToolbar() {
  return (
    <section className="bg-white px-6 py-4">

      <div className="flex flex-wrap items-center gap-4">

        <DateRangePicker />

        <CompareSelect />

        <BranchSelect />

        <DepartmentSelect />

        <div className="ml-auto flex gap-2">

          <FilterButton />

          <ResetButton />

        </div>

      </div>

    </section>
  );
}

export default FilterToolbar;