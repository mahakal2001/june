import type { LucideIcon } from "lucide-react";
import type { KPITheme } from "@/lib/KPITheme";
export type KPIFormat =
  | "currency-lakh"
  | "currency-crore"
  | "number"
  | "percentage"
  | "days"
  | "rating";


export interface KPICardData {
  id: number;

  title: string;

  value: number;

  format: KPIFormat;

  percentage: number;

  comparison?: string;

  showComparison: boolean;

  positive: boolean;

  icon: LucideIcon;

  iconBg: string;

  iconColor: string;

  chartColor?: string;

  chartData?: number[];

  theme: KPITheme;

  showChart: boolean;
}