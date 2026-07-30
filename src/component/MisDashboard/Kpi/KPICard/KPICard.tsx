import {
Card,
CardContent,
} from "@/components/ui/card";

import { motion } from "framer-motion";
import './KPICard.css';

import type { KPICardData } from "@/types/MisDashboard";
import KPIIcon from "../KPIIcon";
import KPIValue from "../KPIValue/KPIValue";
import KPITrend from "../KPITrend";
import KPISparkline from "../KPISparkline";

type Props={
card:KPICardData;
};

export default function KPICard({
  card,
}: Props) {
  return (
    <motion.div
      whileHover={{
        y: -4,
        scale: 1.02,
      }}
      transition={{
        duration: 0.2,
      }}
    >

  <Card
   className="cards
    group
    overflow-hidden
    border-slate-200
    bg-white
    shadow-sm
    transition-all
    duration-300
    hover:-translate-y-1
    hover:border-blue-200
    hover:shadow-xl
  ">

 <CardContent className="space-y-4 p-6">
   <div className="flex gap-8">
      <KPIIcon icon={card.icon} bg={card.iconBg} color={card.iconColor}/>

     <div className="flex-1">
       <p className="card-title text-sm font-medium text-slate-500">
          {card.title}
       </p>
        <KPIValue value={String(card.value)} format={card.format} />

        <KPITrend positive={card.positive} percentage={card.percentage}
        comparison={card.comparison ?? ""}/>
      </div> 
   </div>
     

    
    <div className="mt-4">
     {card.showChart && (<KPISparkline data={card.chartData!} color={card.chartColor!}/>)}
    </div>

 </CardContent>

</Card>

</motion.div>

);

}
