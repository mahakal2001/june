import { kpiData } from "@/data/KpiData";

import KPICard from "./KPICard/KPICard";

function KPIGrid(){

return(

<div
  className="
   grid gap-5 grid-cols-1 md:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6">
  {kpiData.map((card) => (
    <KPICard
      key={card.id}
      card={card}
    />
  ))}
</div>

);

}

export default KPIGrid;