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

export interface WeeklyRevenueLeakageItem {
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

export interface WeeklyRevenueLeakageSummary {
  totalLeakage: number;

  growth: number;

  items: WeeklyRevenueLeakageItem[];
}


// ======================================================
// DATA
// ======================================================

export const WeeklyRevenueLeakageSummaryData: Record<
  string,
  WeeklyRevenueLeakageSummary
> = {

  // ====================================================
  // CURRENT WEEK
  // ====================================================

  current: {

    totalLeakage: 1648000,

    growth: 6.8,

    items: [

      {
        id: 1,

        label: "Unbilled Services",

        amount: 684000,

        icon: FileWarning,

        iconColor: "text-red-500",

        iconBg: "bg-red-50",
      },

      {
        id: 2,

        label: "Package Variance",

        amount: 428000,

        icon: Package,

        iconColor: "text-red-500",

        iconBg: "bg-red-50",
      },

      {
        id: 3,

        label: "Discount Variance",

        amount: 286000,

        icon: BadgeIndianRupee,

        iconColor: "text-red-500",

        iconBg: "bg-red-50",
      },

      {
        id: 4,

        label: "Others",

        amount: 250000,

        icon: CircleAlert,

        iconColor: "text-red-500",

        iconBg: "bg-red-50",
      },

    ],
  },


  // ====================================================
  // PREVIOUS WEEK
  // ====================================================

  previous: {

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
  // LAST 4 WEEKS
  // ====================================================

  last4weeks: {

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