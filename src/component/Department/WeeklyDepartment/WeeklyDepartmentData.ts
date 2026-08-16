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

interface DepartmentData {
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
// WEEKLY DATA
// ==================================================

export const WeeklyDepartmentData: Record<string, DepartmentData[]> = {

  current: [
    {
      id: 1,
      department: "General Medicine",
      revenue: 3200000,
      growth: 18.6,
      patients: 548,
      collection: 2880000,
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
      revenue: 2650000,
      growth: 16.2,
      patients: 316,
      collection: 2350000,
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
      revenue: 2180000,
      growth: 13.1,
      patients: 224,
      collection: 1945000,
      collectionPercentage: 89.2,
      avgLOS: 3.6,
      status: "Good",
      icon: HeartPulse,
      iconColor: "text-orange-500",
      iconBg: "bg-orange-50",
    },

    {
      id: 4,
      department: "Pediatrics",
      revenue: 1640000,
      growth: 11.4,
      patients: 292,
      collection: 1460000,
      collectionPercentage: 89.0,
      avgLOS: 3.1,
      status: "Good",
      icon: Syringe,
      iconColor: "text-purple-600",
      iconBg: "bg-purple-50",
    },

    {
      id: 5,
      department: "Gynecology",
      revenue: 1220000,
      growth: 10.6,
      patients: 186,
      collection: 1090000,
      collectionPercentage: 89.3,
      avgLOS: 2.9,
      status: "Good",
      icon: Hospital,
      iconColor: "text-rose-500",
      iconBg: "bg-rose-50",
    },

    {
      id: 6,
      department: "Surgery",
      revenue: 980000,
      growth: 9.5,
      patients: 108,
      collection: 860000,
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
      revenue: 1840000,
      growth: 12.3,
      patients: 462,
      collection: 1600000,
      collectionPercentage: 87.0,
      avgLOS: 4.1,
      status: "Average",
      icon: Users,
      iconColor: "text-teal-600",
      iconBg: "bg-teal-50",
    },
  ],


  previous: [
    {
      id: 1,
      department: "General Medicine",
      revenue: 2950000,
      growth: 15.2,
      patients: 512,
      collection: 2600000,
      collectionPercentage: 88.1,
      avgLOS: 4.3,
      status: "Good",
      icon: Stethoscope,
      iconColor: "text-blue-600",
      iconBg: "bg-blue-50",
    },

    {
      id: 2,
      department: "Orthopedics",
      revenue: 2420000,
      growth: 13.8,
      patients: 298,
      collection: 2140000,
      collectionPercentage: 88.4,
      avgLOS: 4.9,
      status: "Good",
      icon: Activity,
      iconColor: "text-emerald-600",
      iconBg: "bg-emerald-50",
    },

    {
      id: 3,
      department: "Cardiology",
      revenue: 1990000,
      growth: 11.5,
      patients: 207,
      collection: 1755000,
      collectionPercentage: 88.2,
      avgLOS: 3.8,
      status: "Good",
      icon: HeartPulse,
      iconColor: "text-orange-500",
      iconBg: "bg-orange-50",
    },

    {
      id: 4,
      department: "Pediatrics",
      revenue: 1480000,
      growth: 10.1,
      patients: 274,
      collection: 1300000,
      collectionPercentage: 87.8,
      avgLOS: 3.2,
      status: "Good",
      icon: Syringe,
      iconColor: "text-purple-600",
      iconBg: "bg-purple-50",
    },

    {
      id: 5,
      department: "Gynecology",
      revenue: 1100000,
      growth: 9.4,
      patients: 172,
      collection: 970000,
      collectionPercentage: 88.2,
      avgLOS: 3.0,
      status: "Good",
      icon: Hospital,
      iconColor: "text-rose-500",
      iconBg: "bg-rose-50",
    },

    {
      id: 6,
      department: "Surgery",
      revenue: 890000,
      growth: 8.2,
      patients: 96,
      collection: 770000,
      collectionPercentage: 86.5,
      avgLOS: 5.5,
      status: "Average",
      icon: Activity,
      iconColor: "text-violet-600",
      iconBg: "bg-violet-50",
    },

    {
      id: 7,
      department: "Others",
      revenue: 1680000,
      growth: 10.8,
      patients: 428,
      collection: 1460000,
      collectionPercentage: 86.9,
      avgLOS: 4.2,
      status: "Average",
      icon: Users,
      iconColor: "text-teal-600",
      iconBg: "bg-teal-50",
    },
  ],


  last4weeks: [
    {
      id: 1,
      department: "General Medicine",
      revenue: 10950000,
      growth: 17.2,
      patients: 1985,
      collection: 9620000,
      collectionPercentage: 87.9,
      avgLOS: 4.3,
      status: "Good",
      icon: Stethoscope,
      iconColor: "text-blue-600",
      iconBg: "bg-blue-50",
    },

    {
      id: 2,
      department: "Orthopedics",
      revenue: 10120000,
      growth: 15.8,
      patients: 1142,
      collection: 8840000,
      collectionPercentage: 87.3,
      avgLOS: 4.9,
      status: "Good",
      icon: Activity,
      iconColor: "text-emerald-600",
      iconBg: "bg-emerald-50",
    },

    {
      id: 3,
      department: "Cardiology",
      revenue: 8120000,
      growth: 13.6,
      patients: 816,
      collection: 7030000,
      collectionPercentage: 86.6,
      avgLOS: 3.7,
      status: "Good",
      icon: HeartPulse,
      iconColor: "text-orange-500",
      iconBg: "bg-orange-50",
    },

    {
      id: 4,
      department: "Pediatrics",
      revenue: 6210000,
      growth: 12.1,
      patients: 1052,
      collection: 5360000,
      collectionPercentage: 86.3,
      avgLOS: 3.2,
      status: "Good",
      icon: Syringe,
      iconColor: "text-purple-600",
      iconBg: "bg-purple-50",
    },

    {
      id: 5,
      department: "Gynecology",
      revenue: 4720000,
      growth: 11.2,
      patients: 688,
      collection: 4050000,
      collectionPercentage: 85.8,
      avgLOS: 3.0,
      status: "Good",
      icon: Hospital,
      iconColor: "text-rose-500",
      iconBg: "bg-rose-50",
    },

    {
      id: 6,
      department: "Surgery",
      revenue: 3580000,
      growth: 9.5,
      patients: 411,
      collection: 3050000,
      collectionPercentage: 85.2,
      avgLOS: 5.5,
      status: "Average",
      icon: Activity,
      iconColor: "text-violet-600",
      iconBg: "bg-violet-50",
    },

    {
      id: 7,
      department: "Others",
      revenue: 6740000,
      growth: 12.8,
      patients: 1589,
      collection: 5810000,
      collectionPercentage: 86.2,
      avgLOS: 4.2,
      status: "Average",
      icon: Users,
      iconColor: "text-teal-600",
      iconBg: "bg-teal-50",
    },
  ],

};
