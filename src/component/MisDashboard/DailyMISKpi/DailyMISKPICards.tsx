import { dailyMISData } from "@/data/dailyMISData";
import { DailyMISKPICard } from "./DailyMISKPICard";
import "./DailyMISKPICards.css";

export default function DailyMISKPICards() {
  return (
    <section
      className="dailykpicards-container
      grid
      gap-5

      grid-cols-1
      sm:grid-cols-2
      md:grid-cols-3
      lg:grid-cols-4
      xl:grid-cols-6
      2xl:grid-cols-8
    "
    >
      {dailyMISData.map((item) => (
        <DailyMISKPICard
          key={item.id}
          data={item}
        />
      ))}
    </section>
  );
}