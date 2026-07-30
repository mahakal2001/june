import {
  IndianRupee,
  Wallet,
  PiggyBank,
  ReceiptText,
  Users,
  Bed,
  BedDouble,
  Monitor,
  Siren,
  CalendarDays,
  ShieldCheck,
  Star
} from "lucide-react";


import type { KPICardData } from "@/types/MisDashboard";

export const kpiData: KPICardData[] = [
  {
    id: 1,
    title: "Revenue Today",
    value: 18.75,
    format: "currency-lakh",
    percentage: 12.6,
    comparison: "vs yesterday",
    showComparison: true,
    positive: true,
    icon: IndianRupee,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    showChart: true,
    chartColor: "#2563EB",
    chartData: [4, 6, 5, 8, 6, 9, 7, 10, 8, 11],
    theme: "blue"
  },

  {
    id: 2,
    title: "Revenue MTD",
    value: 5.47,
    format: "currency-crore",
    percentage: 14.8,
    comparison: "vs last month",
    showComparison: true,
    positive: true,
    icon: PiggyBank,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    showChart: true,
    chartColor: "#10B981",
    chartData: [3, 5, 4, 6, 5, 7, 6, 8, 7, 9],
    theme: "blue"
  },

  {
    id: 3,
    title: "Collection Today",
    value: 16.23,
    format: "currency-lakh",
    percentage: 10.2,
    comparison: "vs yesterday",
    showComparison: true,
    positive: true,
    icon: Wallet,
    iconBg: "bg-violet-50",
    iconColor: "text-violet-600",
    showChart: true,
    chartColor: "#4F46E5",
    chartData: [2, 3, 2, 5, 4, 6, 5, 8, 6, 9],
    theme: "blue"
  },

  {
    id: 4,
    title: "Outstanding Amount",
    value: 2.34,
    format: "currency-crore",
    percentage: 3.6,
    comparison: "vs yesterday",
    showComparison: true,
    positive: false,
    icon: ReceiptText,
    iconBg: "bg-orange-50",
    iconColor: "text-orange-500",
    showChart: true,
    chartData: [2, 3, 2, 5, 4, 6, 5, 8, 6, 9],
    chartColor: "red",
    theme: "blue"
  },

  {
    id: 5,
    title: "OPD Count",
    value: 1248,
    format: "number",
    percentage: 8.7,
    comparison: "vs yesterday",
    showComparison: true,
    positive: true,
    icon: Users,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-700",
    showChart: false,
    theme: "blue"
  },

  {
    id: 6,
    title: "IPD Count",
    value: 186,
    format: "number",
    percentage: 5.4,
    showComparison: false,
    positive: true,
    icon: Bed,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    showChart: false,
    theme: "emerald"
  },

  {
    id: 7,
    title: "Bed Occupancy",
    value: 78.6,
    format: "percentage",
    percentage: 4.3,
    showComparison: false,
    positive: true,
    icon: BedDouble,
    iconBg: "bg-purple-50",
    iconColor: "text-purple-600",
    showChart: false,
    theme: "violet"
  },

  {
    id: 8,
    title: "ICU Occupancy",
    value: 85.2,
    format: "percentage",
    percentage: 2.1,
    showComparison: false,
    positive: false,
    icon: Monitor,
    iconBg: "bg-rose-50",
    iconColor: "text-rose-600",
    showChart: false,
    theme: "rose"
  },

  {
    id: 9,
    title: "Emergency Cases",
    value: 64,
    format: "number",
    percentage: 8.6,
    showComparison: false,
    positive: true,
    icon: Siren,
    iconBg: "bg-orange-50",
    iconColor: "text-orange-600",
    showChart: false,
    theme: "orange"
  },

  {
    id: 10,
    title: "Avg. Length of Stay",
    value: 4.6,
    format: "days",
    percentage: 0.4,
    showComparison: false,
    positive: true,
    icon: CalendarDays,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    showChart: false,
    theme: "blue"
  },

  {
    id: 11,
    title: "Insurance Claims",
    value: 1.62,
    format: "currency-crore",
    percentage: 11.3,
    showComparison: false,
    positive: true,
    icon: ShieldCheck,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    showChart: false,
    theme: "emerald"
  },

  {
    id: 12,
    title: "Patient Satisfaction",
    value: 4.6,
    format: "rating",
    percentage: 2.3,
    showComparison: false,
    positive: true,
    icon: Star,
    iconBg: "bg-purple-50",
    iconColor: "text-purple-600",
    showChart: false,
    theme: "violet"
  },

];