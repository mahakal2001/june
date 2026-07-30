import {
  Siren,
  FileWarning,
  Pill,
  Bed,
  HeartPulse,
  ShieldAlert,
  type LucideIcon,
} from "lucide-react";

export type AlertPriority =
  | "Critical"
  | "High"
  | "Medium"
  | "Low";

export type AlertStatus =
  | "Active"
  | "Acknowledged"
  | "Resolved";

export type AlertCategory =
  | "Patient Safety"
  | "Insurance"
  | "Pharmacy"
  | "Operations"
  | "Equipment"
  | "Finance";

export interface CriticalAlert {
  id: number;
  title: string;
  description: string;
  priority: AlertPriority;
  status: AlertStatus;
  category: AlertCategory;
  time: string;
  createdAt: string;
  assignedTo: string;
  icon: LucideIcon;
  iconColor: string;
  bgColor: string;
}

export const criticalAlerts: CriticalAlert[] = [
  {
    id: 1,
    title: "ICU Occupancy is more than 85%",
    description:
      "Current ICU occupancy has exceeded the safe operating threshold. Additional bed allocation is recommended.",

    priority: "Critical",
    status: "Active",
    category: "Patient Safety",

    time: "2 mins ago",
    createdAt: "27 Jul 2026, 09:15 AM",

    assignedTo: "Hospital Administration",

    icon: Siren,

    iconColor: "text-orange-600",

    bgColor: "bg-orange-100",
  },

  {
    id: 2,

    title:
      "5 High Value Claims are pending for more than 15 days",

    description:
      "Five insurance claims remain pending beyond the SLA period.",

    priority: "High",

    status: "Active",

    category: "Insurance",

    time: "10 mins ago",

    createdAt: "27 Jul 2026, 09:05 AM",

    assignedTo: "Insurance Department",

    icon: FileWarning,

    iconColor: "text-red-600",

    bgColor: "bg-red-100",
  },

  {
    id: 3,

    title:
      "3 Medicines are near expiry in next 7 days",

    description:
      "Three medicines will expire within the next seven days.",

    priority: "Medium",

    status: "Active",

    category: "Pharmacy",

    time: "15 mins ago",

    createdAt: "27 Jul 2026, 09:00 AM",

    assignedTo: "Pharmacy Department",

    icon: Pill,

    iconColor: "text-pink-600",

    bgColor: "bg-pink-100",
  },

  {
    id: 4,

    title:
      "Emergency Beds Availability below 10",

    description:
      "Emergency department has fewer than ten beds available.",

    priority: "Critical",

    status: "Acknowledged",

    category: "Operations",

    time: "30 mins ago",

    createdAt: "27 Jul 2026, 08:40 AM",

    assignedTo: "Operations Team",

    icon: Bed,

    iconColor: "text-red-700",

    bgColor: "bg-red-100",
  },

  {
    id: 5,

    title:
      "Blood Bank O Negative Stock Running Low",

    description:
      "O Negative blood stock is below the minimum threshold.",

    priority: "High",

    status: "Active",

    category: "Patient Safety",

    time: "45 mins ago",

    createdAt: "27 Jul 2026, 08:25 AM",

    assignedTo: "Blood Bank",

    icon: HeartPulse,

    iconColor: "text-rose-600",

    bgColor: "bg-rose-100",
  },

  {
    id: 6,

    title:
      "Unauthorized Login Attempts Detected",

    description:
      "Multiple failed login attempts detected from an unknown IP.",

    priority: "Medium",

    status: "Resolved",

    category: "Equipment",

    time: "1 hour ago",

    createdAt: "27 Jul 2026, 08:00 AM",

    assignedTo: "IT Security",

    icon: ShieldAlert,

    iconColor: "text-blue-600",

    bgColor: "bg-blue-100",
  },
];