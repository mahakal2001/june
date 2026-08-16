import {
  BedDouble,
  BellRing,
  CircleDollarSign,
  FileText,
  IndianRupee,
  Percent,
  Users,
} from "lucide-react";

// ======================================================
// TYPE
// ======================================================

interface MonthlyMISKPI {
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

export const MonthlyMISKPIData: MonthlyMISKPI[] = [

  // ====================================================
  // 1. TOTAL REVENUE
  // ====================================================

  {
    id: 1,

    title: "Total Revenue",

    value: "₹ 5.47 Cr",

    change: 14.8,

    comparison: "vs Apr 2024",

    icon: IndianRupee,

    iconColor: "text-blue-600",

    iconBackground: "bg-blue-50",

    chartColor: "#2563eb",

    sparklineColor: "#2563eb",

    sparklineData: [
      32,
      38,
      36,
      48,
      51,
      45,
      42,
      49,
      53,
      47,
      58,
      49,
      62,
      53,
      60,
      54,
    ],
  },


  // ====================================================
  // 2. TOTAL COLLECTION
  // ====================================================

  {
    id: 2,

    title: "Total Collection",

    value: "₹ 4.85 Cr",

    change: 13.2,

    comparison: "vs Apr 2024",

    icon: CircleDollarSign,

    iconColor: "text-emerald-600",

    iconBackground: "bg-emerald-50",

    chartColor: "#10b981",

    sparklineColor: "#10b981",

    sparklineData: [
      28,
      32,
      30,
      38,
      44,
      36,
      42,
      35,
      40,
      38,
      47,
      43,
      52,
      46,
      42,
      49,
    ],
  },


  // ====================================================
  // 3. TOTAL OPD
  // ====================================================

  {
    id: 3,

    title: "Total OPD",

    value: "8,452",

    change: 12.4,

    comparison: "vs Apr 2024",

    icon: Users,

    iconColor: "text-violet-600",

    iconBackground: "bg-violet-50",

    chartColor: "#8b5cf6",

    sparklineColor: "#8b5cf6",

    sparklineData: [
      30,
      31,
      40,
      35,
      44,
      36,
      42,
      40,
      48,
      44,
      52,
      46,
      42,
      48,
      39,
      36,
    ],
  },


  // ====================================================
  // 4. TOTAL IPD
  // ====================================================

  {
    id: 4,

    title: "Total IPD",

    value: "1,248",

    change: 9.6,

    comparison: "vs Apr 2024",

    icon: BedDouble,

    iconColor: "text-orange-600",

    iconBackground: "bg-orange-50",

    chartColor: "#f59e0b",

    sparklineColor: "#f59e0b",

    sparklineData: [
      34,
      45,
      40,
      52,
      46,
      42,
      48,
      44,
      40,
      48,
      55,
      49,
      54,
      46,
      51,
      43,
    ],
  },


  // ====================================================
  // 5. AVG. BED OCCUPANCY
  // ====================================================

  {
    id: 5,

    title: "Avg. Bed Occupancy",

    value: "78.6%",

    change: 4.3,

    comparison: "vs Apr 2024",

    icon: BedDouble,

    iconColor: "text-blue-600",

    iconBackground: "bg-blue-50",

    chartColor: "#2563eb",

    sparklineColor: "#2563eb",

    sparklineData: [
      48,
      50,
      47,
      54,
      50,
      56,
      52,
      49,
      54,
      51,
      55,
      52,
      58,
      54,
      57,
      55,
    ],
  },


  // ====================================================
  // 6. AVG. LENGTH OF STAY
  // ====================================================

  {
    id: 6,

    title: "Avg. Length of Stay",

    value: "4.6 Days",

    change: -0.3,

    comparison: "vs Apr 2024",

    icon: BellRing,

    iconColor: "text-rose-600",

    iconBackground: "bg-rose-50",

    chartColor: "#f43f5e",

    sparklineColor: "#f43f5e",

    sparklineData: [
      58,
      62,
      54,
      57,
      50,
      53,
      48,
      51,
      46,
      53,
      48,
      55,
      50,
      57,
      51,
      55,
    ],
  },


  // ====================================================
  // 7. CLAIM AMOUNT
  // ====================================================

  {
    id: 7,

    title: "Claim Amount",

    value: "₹ 3.92 Cr",

    change: 11.7,

    comparison: "vs Apr 2024",

    icon: FileText,

    iconColor: "text-emerald-600",

    iconBackground: "bg-emerald-50",

    chartColor: "#10b981",

    sparklineColor: "#10b981",

    sparklineData: [
      35,
      40,
      36,
      44,
      48,
      42,
      47,
      40,
      45,
      51,
      47,
      54,
      48,
      52,
      43,
      39,
    ],
  },


  // ====================================================
  // 8. NET COLLECTION %
  // ====================================================

  {
    id: 8,

    title: "Net Collection %",

    value: "88.7%",

    change: 2.1,

    comparison: "vs Apr 2024",

    icon: Percent,

    iconColor: "text-purple-600",

    iconBackground: "bg-purple-50",

    chartColor: "#9333ea",

    sparklineColor: "#9333ea",

    sparklineData: [
      42,
      44,
      43,
      47,
      45,
      50,
      48,
      53,
      49,
      55,
      51,
      58,
      54,
      51,
      58,
      55,
    ],
  },

];