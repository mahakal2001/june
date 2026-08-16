import {
  BellRing,
  CircleDollarSign,
  IndianRupee,
  ReceiptIndianRupee,
  RefreshCcw,
  Sparkles,
  Tag,
  Users,
} from "lucide-react";



interface RevenueAnalyticsKPI {
  id: number;

  title: string;

  value: string;

  change: number;

  comparison: string;

  icon: React.ElementType;

  iconColor: string;

  iconBackground: string;

  chartColor: string;

  sparklineColor: string;

  sparklineData: number[];
}


// ======================================================
// DATA
// ======================================================

export const RevenueAnalyticsKPIData: RevenueAnalyticsKPI[] = [

  // ====================================================
  // 1. REVENUE TODAY
  // ====================================================

  {
    id: 1,

    title: "Revenue Today",

    value: "₹ 18.75 L",

    change: 12.6,

    comparison: "vs yesterday",

    icon: IndianRupee,

    iconColor: "text-blue-600",

    iconBackground: "bg-blue-50",

    chartColor: "#3b82f6",

    sparklineColor: "#3b82f6",

    sparklineData: [
      28, 35, 31, 45, 39, 50,
      44, 56, 47, 54, 49, 58,
      52, 61, 55
    ],
  },


  // ====================================================
  // 2. REVENUE MTD
  // ====================================================

  {
    id: 2,

    title: "Revenue MTD",

    value: "₹ 5.47 Cr",

    change: 14.8,

    comparison: "vs Apr 2024",

    icon: CircleDollarSign,

    iconColor: "text-emerald-600",

    iconBackground: "bg-emerald-50",

    chartColor: "#10b981",

    sparklineColor: "#10b981",

    sparklineData: [
      32, 36, 42, 37, 48, 43,
      52, 45, 49, 44, 58, 51,
      61, 54, 66
    ],
  },


  // ====================================================
  // 3. COLLECTION TODAY
  // ====================================================

  {
    id: 3,

    title: "Collection Today",

    value: "₹ 16.23 L",

    change: 10.2,

    comparison: "vs yesterday",

    icon: Users,

    iconColor: "text-violet-600",

    iconBackground: "bg-violet-50",

    chartColor: "#8b5cf6",

    sparklineColor: "#8b5cf6",

    sparklineData: [
      35, 40, 36, 48, 43, 51,
      46, 53, 48, 57, 52, 61,
      55, 63, 58
    ],
  },


  // ====================================================
  // 4. COLLECTION MTD
  // ====================================================

  {
    id: 4,

    title: "Collection MTD",

    value: "₹ 4.85 Cr",

    change: 13.2,

    comparison: "vs Apr 2024",

    icon: ReceiptIndianRupee,

    iconColor: "text-orange-600",

    iconBackground: "bg-orange-50",

    chartColor: "#f59e0b",

    sparklineColor: "#f59e0b",

    sparklineData: [
      30, 42, 37, 49, 40, 55,
      44, 51, 46, 58, 50, 62,
      53, 59, 56
    ],
  },


  // ====================================================
  // 5. OUTSTANDING AMOUNT
  // ====================================================

  {
    id: 5,

    title: "Outstanding Amount",

    value: "₹ 2.34 Cr",

    change: 3.6,

    comparison: "vs Apr 2024",

    icon: BellRing,

    iconColor: "text-red-500",

    iconBackground: "bg-red-50",

    chartColor: "#ef4444",

    sparklineColor: "#ef4444",

    sparklineData: [
      56, 49, 54, 45, 51, 47,
      58, 52, 60, 54, 62, 55,
      63, 57, 61
    ],
  },


  // ====================================================
  // 6. DISCOUNTS MTD
  // ====================================================

  {
    id: 6,

    title: "Discounts MTD",

    value: "₹ 85.42 L",

    change: 2.3,

    comparison: "vs Apr 2024",

    icon: Tag,

    iconColor: "text-blue-600",

    iconBackground: "bg-blue-50",

    chartColor: "#2563eb",

    sparklineColor: "#2563eb",

    sparklineData: [
      35, 39, 34, 46, 41, 48,
      43, 52, 46, 54, 49, 58,
      52, 61, 55
    ],
  },


  // ====================================================
  // 7. REFUNDS MTD
  // ====================================================

  {
    id: 7,

    title: "Refunds MTD",

    value: "₹ 45.23 L",

    change: 2.1,

    comparison: "vs Apr 2024",

    icon: RefreshCcw,

    iconColor: "text-emerald-600",

    iconBackground: "bg-emerald-50",

    chartColor: "#10b981",

    sparklineColor: "#10b981",

    sparklineData: [
      55, 48, 53, 43, 50, 45,
      57, 49, 54, 47, 61, 53,
      58, 49, 55
    ],
  },


  // ====================================================
  // 8. REVENUE LEAKAGE
  // ====================================================

  {
    id: 8,

    title: "Revenue Leakage",

    value: "₹ 1.26 L",

    change: 6.8,

    comparison: "vs Apr 2024",

    icon: Sparkles,

    iconColor: "text-purple-600",

    iconBackground: "bg-purple-50",

    chartColor: "#a855f7",

    sparklineColor: "#a855f7",

    sparklineData: [
      31, 37, 34, 44, 40, 48,
      43, 55, 48, 52, 47, 60,
      53, 58, 50
    ],

  },

];