import {
  Stethoscope,
  Bone,
  HeartPulse,
  Baby,
  Venus,
  Ambulance,
  Building2,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

export interface DepartmentSummaryData {
  id: number;

  department: string;

  revenue: number;

  collection: number;

  patients: number;

  yesterdayRevenue: number;

  variance: number;

  variancePercentage: number;

  status: "Positive" | "Negative";

  icon: LucideIcon;

  iconColor: string;

  iconBackground: string;
}

export const departmentSummary: DepartmentSummaryData[] = [
  {
    id: 1,

    department: "General Medicine",

    revenue: 425000,

    collection: 385000,

    patients: 245,

    yesterdayRevenue: 380000,

    variance: 45000,

    variancePercentage: 11.84,

    status: "Positive",

    icon: Stethoscope,

    iconColor: "text-blue-600",

    iconBackground: "bg-blue-100",
  },

  {
    id: 2,

    department: "Orthopedics",

    revenue: 310000,

    collection: 278000,

    patients: 168,

    yesterdayRevenue: 270000,

    variance: 40000,

    variancePercentage: 14.81,

    status: "Positive",

    icon: Bone,

    iconColor: "text-green-600",

    iconBackground: "bg-green-100",
  },

  {
    id: 3,

    department: "Cardiology",

    revenue: 285000,

    collection: 255000,

    patients: 132,

    yesterdayRevenue: 265000,

    variance: 20000,

    variancePercentage: 7.55,

    status: "Positive",

    icon: HeartPulse,

    iconColor: "text-orange-600",

    iconBackground: "bg-orange-100",
  },

  {
    id: 4,

    department: "Pediatrics",

    revenue: 195000,

    collection: 172000,

    patients: 98,

    yesterdayRevenue: 180000,

    variance: 15000,

    variancePercentage: 8.33,

    status: "Positive",

    icon: Baby,

    iconColor: "text-violet-600",

    iconBackground: "bg-violet-100",
  },

  {
    id: 5,

    department: "Gynecology",

    revenue: 175000,

    collection: 155000,

    patients: 84,

    yesterdayRevenue: 160000,

    variance: 15000,

    variancePercentage: 9.38,

    status: "Positive",

    icon: Venus,

    iconColor: "text-pink-600",

    iconBackground: "bg-pink-100",
  },

  {
    id: 6,

    department: "Emergency",

    revenue: 135000,

    collection: 110000,

    patients: 210,

    yesterdayRevenue: 150000,

    variance: -15000,

    variancePercentage: -10,

    status: "Negative",

    icon: Ambulance,

    iconColor: "text-red-600",

    iconBackground: "bg-red-100",
  },

  {
    id: 7,

    department: "Others",

    revenue: 75000,

    collection: 68000,

    patients: 72,

    yesterdayRevenue: 70000,

    variance: 5000,

    variancePercentage: 7.14,

    status: "Positive",

    icon: Building2,

    iconColor: "text-teal-600",

    iconBackground: "bg-teal-100",
  },
];