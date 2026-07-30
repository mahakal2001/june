import type { KPICardData } from "@/types/MisDashboard";
import KPIIcon from "./KPIIcon";

type Props = {
  card: KPICardData;
};

export default function KPIHeader({ card }: Props) {
  return (
    <div className="flex items-start gap-4">
      <KPIIcon
        icon={card.icon}
        bg={card.iconBg}
        color={card.iconColor}
      />

      <div className="flex-1">
        <p className="text-sm font-medium text-slate-500">
          {card.title}
        </p>
      </div>
    </div>
  );
}