import {
  BadgeIndianRupee,
  CircleDollarSign,
  FileMinus2,
  WalletCards,
} from "lucide-react";


// ======================================================
// TYPE
// ======================================================

export interface FinancialHighlight {
  id: number;

  title: string;

  value: number;

  change: number;

  icon: React.ElementType;

  iconColor: string;

  iconBg: string;

  changeColor: string;
}


// ======================================================
// DATA
// ======================================================

export const MonthlyFinancialHighlightsData: Record<
  string,
  FinancialHighlight[]
> = {


  // ====================================================
  // May, 2026
  // ====================================================

  "May, 2026": [

    {
      id: 1,

      title: "Total Discounts",

      value: 2840000,

      change: 2.3,

      icon: BadgeIndianRupee,

      iconColor:
        "text-blue-600",

      iconBg:
        "bg-blue-50",

      changeColor:
        "text-emerald-600",
    },


    {
      id: 2,

      title: "Total Refunds",

      value: 1260000,

      change: -5.6,

      icon: FileMinus2,

      iconColor:
        "text-red-600",

      iconBg:
        "bg-red-50",

      changeColor:
        "text-red-600",
    },


    {
      id: 3,

      title: "Bad Debt Written Off",

      value: 380000,

      change: 8.1,

      icon: WalletCards,

      iconColor:
        "text-emerald-600",

      iconBg:
        "bg-emerald-50",

      changeColor:
        "text-emerald-600",
    },


    {
      id: 4,

      title: "Outstanding Amount",

      value: 23400000,

      change: 3.6,

      icon: CircleDollarSign,

      iconColor:
        "text-orange-500",

      iconBg:
        "bg-orange-50",

      changeColor:
        "text-emerald-600",
    },

  ],


  // ====================================================
  // April, 2026
  // ====================================================

  "April, 2026": [

    {
      id: 1,

      title: "Total Discounts",

      value: 648000,

      change: 1.8,

      icon: BadgeIndianRupee,

      iconColor:
        "text-blue-600",

      iconBg:
        "bg-blue-50",

      changeColor:
        "text-emerald-600",
    },


    {
      id: 2,

      title: "Total Refunds",

      value: 315000,

      change: -4.2,

      icon: FileMinus2,

      iconColor:
        "text-red-600",

      iconBg:
        "bg-red-50",

      changeColor:
        "text-red-600",
    },


    {
      id: 3,

      title: "Bad Debt Written Off",

      value: 101000,

      change: 6.4,

      icon: WalletCards,

      iconColor:
        "text-emerald-600",

      iconBg:
        "bg-emerald-50",

      changeColor:
        "text-emerald-600",
    },


    {
      id: 4,

      title: "Outstanding Amount",

      value: 5640000,

      change: 2.9,

      icon: CircleDollarSign,

      iconColor:
        "text-orange-500",

      iconBg:
        "bg-orange-50",

      changeColor:
        "text-emerald-600",
    },

  ],


  // ====================================================
  // March, 2026
  // ====================================================

  "March, 2026": [

    {
      id: 1,

      title: "Total Discounts",

      value: 2684000,

      change: 2.1,

      icon: BadgeIndianRupee,

      iconColor:
        "text-blue-600",

      iconBg:
        "bg-blue-50",

      changeColor:
        "text-emerald-600",
    },


    {
      id: 2,

      title: "Total Refunds",

      value: 1216000,

      change: -5.1,

      icon: FileMinus2,

      iconColor:
        "text-red-600",

      iconBg:
        "bg-red-50",

      changeColor:
        "text-red-600",
    },


    {
      id: 3,

      title: "Bad Debt Written Off",

      value: 392000,

      change: 7.8,

      icon: WalletCards,

      iconColor:
        "text-emerald-600",

      iconBg:
        "bg-emerald-50",

      changeColor:
        "text-emerald-600",
    },


    {
      id: 4,

      title: "Outstanding Amount",

      value: 22860000,

      change: 3.4,

      icon: CircleDollarSign,

      iconColor:
        "text-orange-500",

      iconBg:
        "bg-orange-50",

      changeColor:
        "text-emerald-600",
    },

  ],

};