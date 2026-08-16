import {
  Activity,
  HeartPulse,
  Hospital,
  Stethoscope,
  Syringe,
  Users,
} from "lucide-react";

// ==================================================
// TYPE
// ==================================================

export interface DepartmentData {
  id: number;

  department: string;

  revenue: number;

  growth: number;

  patients: number;

  collection: number;

  collectionPercentage: number;

  avgLOS: number;

  status: "Good" | "Average";

  icon: React.ElementType;

  iconColor: string;

  iconBg: string;
}


// ==================================================
// MONTHLY DATA
// ==================================================

export const MonthlyDepartmentData: Record<
  string,
  DepartmentData[]
> = {

  // ==================================================
  // MAY 2026
  // ==================================================

  "May 2026": [

    {
      id: 1,
      department: "General Medicine",
      revenue: 12800000,
      growth: 18.6,
      patients: 2156,
      collection: 11600000,
      collectionPercentage: 90.6,
      avgLOS: 4.2,
      status: "Good",

      icon: Stethoscope,
      iconColor: "text-blue-600",
      iconBg: "bg-blue-50",
    },

    {
      id: 2,
      department: "Orthopedics",
      revenue: 10500000,
      growth: 16.2,
      patients: 1248,
      collection: 9350000,
      collectionPercentage: 89.0,
      avgLOS: 4.8,
      status: "Good",

      icon: Activity,
      iconColor: "text-emerald-600",
      iconBg: "bg-emerald-50",
    },

    {
      id: 3,
      department: "Cardiology",
      revenue: 8700000,
      growth: 13.1,
      patients: 865,
      collection: 7680000,
      collectionPercentage: 89.3,
      avgLOS: 3.6,
      status: "Good",

      icon: HeartPulse,
      iconColor: "text-orange-500",
      iconBg: "bg-orange-50",
    },

    {
      id: 4,
      department: "Pediatrics",
      revenue: 6500000,
      growth: 11.4,
      patients: 1152,
      collection: 5780000,
      collectionPercentage: 88.9,
      avgLOS: 3.1,
      status: "Good",

      icon: Syringe,
      iconColor: "text-purple-600",
      iconBg: "bg-purple-50",
    },

    {
      id: 5,
      department: "Gynecology",
      revenue: 4800000,
      growth: 10.6,
      patients: 742,
      collection: 4310000,
      collectionPercentage: 89.8,
      avgLOS: 2.9,
      status: "Good",

      icon: Hospital,
      iconColor: "text-rose-500",
      iconBg: "bg-rose-50",
    },

    {
      id: 6,
      department: "Surgery",
      revenue: 3600000,
      growth: 9.5,
      patients: 428,
      collection: 3160000,
      collectionPercentage: 87.8,
      avgLOS: 5.4,
      status: "Average",

      icon: Activity,
      iconColor: "text-violet-600",
      iconBg: "bg-violet-50",
    },

    {
      id: 7,
      department: "Others",
      revenue: 7900000,
      growth: 12.3,
      patients: 1869,
      collection: 6890000,
      collectionPercentage: 87.2,
      avgLOS: 4.1,
      status: "Average",

      icon: Users,
      iconColor: "text-teal-600",
      iconBg: "bg-teal-50",
    },

  ],


  // ==================================================
  // APRIL 2026
  // ==================================================

  "April 2026": [

    {
      id: 1,
      department: "General Medicine",
      revenue: 11000000,
      growth: 15.2,
      patients: 1985,
      collection: 9700000,
      collectionPercentage: 88.2,
      avgLOS: 4.3,
      status: "Good",

      icon: Stethoscope,
      iconColor: "text-blue-600",
      iconBg: "bg-blue-50",
    },

    {
      id: 2,
      department: "Orthopedics",
      revenue: 9200000,
      growth: 13.8,
      patients: 1128,
      collection: 8100000,
      collectionPercentage: 88.0,
      avgLOS: 4.9,
      status: "Good",

      icon: Activity,
      iconColor: "text-emerald-600",
      iconBg: "bg-emerald-50",
    },

    {
      id: 3,
      department: "Cardiology",
      revenue: 7600000,
      growth: 11.5,
      patients: 812,
      collection: 6720000,
      collectionPercentage: 88.4,
      avgLOS: 3.8,
      status: "Good",

      icon: HeartPulse,
      iconColor: "text-orange-500",
      iconBg: "bg-orange-50",
    },

    {
      id: 4,
      department: "Pediatrics",
      revenue: 5800000,
      growth: 10.1,
      patients: 1054,
      collection: 5100000,
      collectionPercentage: 87.9,
      avgLOS: 3.2,
      status: "Good",

      icon: Syringe,
      iconColor: "text-purple-600",
      iconBg: "bg-purple-50",
    },

    {
      id: 5,
      department: "Gynecology",
      revenue: 4300000,
      growth: 9.4,
      patients: 684,
      collection: 3800000,
      collectionPercentage: 88.4,
      avgLOS: 3.0,
      status: "Good",

      icon: Hospital,
      iconColor: "text-rose-500",
      iconBg: "bg-rose-50",
    },

    {
      id: 6,
      department: "Surgery",
      revenue: 3300000,
      growth: 8.2,
      patients: 395,
      collection: 2860000,
      collectionPercentage: 86.7,
      avgLOS: 5.5,
      status: "Average",

      icon: Activity,
      iconColor: "text-violet-600",
      iconBg: "bg-violet-50",
    },

    {
      id: 7,
      department: "Others",
      revenue: 6800000,
      growth: 10.8,
      patients: 1642,
      collection: 5900000,
      collectionPercentage: 86.8,
      avgLOS: 4.2,
      status: "Average",

      icon: Users,
      iconColor: "text-teal-600",
      iconBg: "bg-teal-50",
    },

  ],


  // ==================================================
  // MARCH 2026
  // ==================================================

  "March 2026": [

    {
      id: 1,
      department: "General Medicine",
      revenue: 10400000,
      growth: 14.5,
      patients: 1902,
      collection: 9050000,
      collectionPercentage: 87.0,
      avgLOS: 4.4,
      status: "Good",

      icon: Stethoscope,
      iconColor: "text-blue-600",
      iconBg: "bg-blue-50",
    },

    {
      id: 2,
      department: "Orthopedics",
      revenue: 8700000,
      growth: 12.9,
      patients: 1085,
      collection: 7600000,
      collectionPercentage: 87.4,
      avgLOS: 5.0,
      status: "Good",

      icon: Activity,
      iconColor: "text-emerald-600",
      iconBg: "bg-emerald-50",
    },

    {
      id: 3,
      department: "Cardiology",
      revenue: 7100000,
      growth: 10.8,
      patients: 775,
      collection: 6200000,
      collectionPercentage: 87.3,
      avgLOS: 3.9,
      status: "Good",

      icon: HeartPulse,
      iconColor: "text-orange-500",
      iconBg: "bg-orange-50",
    },

    {
      id: 4,
      department: "Pediatrics",
      revenue: 5400000,
      growth: 9.7,
      patients: 986,
      collection: 4700000,
      collectionPercentage: 87.0,
      avgLOS: 3.3,
      status: "Good",

      icon: Syringe,
      iconColor: "text-purple-600",
      iconBg: "bg-purple-50",
    },

    {
      id: 5,
      department: "Gynecology",
      revenue: 4000000,
      growth: 8.9,
      patients: 642,
      collection: 3500000,
      collectionPercentage: 87.5,
      avgLOS: 3.1,
      status: "Good",

      icon: Hospital,
      iconColor: "text-rose-500",
      iconBg: "bg-rose-50",
    },

    {
      id: 6,
      department: "Surgery",
      revenue: 3100000,
      growth: 7.8,
      patients: 378,
      collection: 2670000,
      collectionPercentage: 86.1,
      avgLOS: 5.6,
      status: "Average",

      icon: Activity,
      iconColor: "text-violet-600",
      iconBg: "bg-violet-50",
    },

    {
      id: 7,
      department: "Others",
      revenue: 6300000,
      growth: 9.9,
      patients: 1528,
      collection: 5450000,
      collectionPercentage: 86.5,
      avgLOS: 4.3,
      status: "Average",

      icon: Users,
      iconColor: "text-teal-600",
      iconBg: "bg-teal-50",
    },

  ],

};