import {
  FileWarning,
  Package,
  BadgeIndianRupee,
  CircleAlert,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

// ======================================================
// TYPE
// ======================================================

export interface MonthlyRevenueLeakageItem {
  id: number;

  label: string;

  amount: number;

  icon: LucideIcon;

  iconColor: string;

  iconBg: string;
}


// ======================================================
// SUMMARY TYPE
// ======================================================

export interface MonthlyRevenueLeakageSummary {
  totalLeakage: number;

  growth: number;

  items: MonthlyRevenueLeakageItem[];
}


// ======================================================
// DATA
// ======================================================

export const MonthlyRevenueLeakageSummaryData: Record<
  string,
  MonthlyRevenueLeakageSummary
> = {

  // ====================================================
  // May, 2026
  // ====================================================

  "May, 2026": {

    totalLeakage: 6240000,

    growth: 6.8,

    items: [

      {
        id: 1,

        label: "Unbilled Services",

        amount: 2810000,

        icon: FileWarning,

        iconColor: "text-red-500",

        iconBg: "bg-red-50",
      },

      {
        id: 2,

        label: "Package Variance",

        amount: 1620000,

        icon: Package,

        iconColor: "text-red-500",

        iconBg: "bg-red-50",
      },

      {
        id: 3,

        label: "Discount Variance",

        amount: 970000,

        icon: BadgeIndianRupee,

        iconColor: "text-red-500",

        iconBg: "bg-red-50",
      },

      {
        id: 4,

        label: "Others",

        amount: 840000,

        icon: CircleAlert,

        iconColor: "text-red-500",

        iconBg: "bg-red-50",
      },

    ],
  },


  // ====================================================
  // April, 2026
  // ====================================================

  "April, 2026": {

    totalLeakage: 1543000,

    growth: 5.6,

    items: [

      {
        id: 1,

        label: "Unbilled Services",

        amount: 628000,

        icon: FileWarning,

        iconColor: "text-red-500",

        iconBg: "bg-red-50",
      },

      {
        id: 2,

        label: "Package Variance",

        amount: 402000,

        icon: Package,

        iconColor: "text-red-500",

        iconBg: "bg-red-50",
      },

      {
        id: 3,

        label: "Discount Variance",

        amount: 278000,

        icon: BadgeIndianRupee,

        iconColor: "text-red-500",

        iconBg: "bg-red-50",
      },

      {
        id: 4,

        label: "Others",

        amount: 235000,

        icon: CircleAlert,

        iconColor: "text-red-500",

        iconBg: "bg-red-50",
      },

    ],
  },


  // ====================================================
  // March, 2026
  // ====================================================

  "March, 2026": {

    totalLeakage: 6218000,

    growth: 8.4,

    items: [

      {
        id: 1,

        label: "Unbilled Services",

        amount: 2548000,

        icon: FileWarning,

        iconColor: "text-red-500",

        iconBg: "bg-red-50",
      },

      {
        id: 2,

        label: "Package Variance",

        amount: 1642000,

        icon: Package,

        iconColor: "text-red-500",

        iconBg: "bg-red-50",
      },

      {
        id: 3,

        label: "Discount Variance",

        amount: 1096000,

        icon: BadgeIndianRupee,

        iconColor: "text-red-500",

        iconBg: "bg-red-50",
      },

      {
        id: 4,

        label: "Others",

        amount: 932000,

        icon: CircleAlert,

        iconColor: "text-red-500",

        iconBg: "bg-red-50",
      },

    ],
  },

};