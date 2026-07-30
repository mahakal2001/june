import {
  CalendarDays,
  Building2,
  Stethoscope,
  ShieldCheck,
  Boxes,
  Users,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

export type UserRole =
  | "Admin"
  | "Doctor"
  | "Nurse"
  | "Reception"
  | "Finance"
  | "Insurance"
  | "HR";

export interface QuickLinkItem {
  id: number;

  title: string;

  description: string;

  icon: LucideIcon;

  path: string;

  color: string;

  permissions: UserRole[];

  badge?: number;

  favorite?: boolean;

  tooltip: string;

  keyboardShortcut?: string;
}

export const quickLinks: QuickLinkItem[] = [
  {
    id: 1,

    title: "Daily MIS",

    description: "Daily hospital reports and KPIs",

    icon: CalendarDays,

    path: "/dailyMIS",

    color: "bg-blue-50 text-blue-600",

    permissions: [
      "Admin",
      "Finance",
      "Reception",
    ],

    badge: 2,

    favorite: true,

    tooltip: "View Daily MIS Report",

    keyboardShortcut: "Alt + 1",
  },

  {
    id: 2,

    title: "Department Performance",

    description: "Department KPI and efficiency",

    icon: Building2,

    path: "/department-performance",

    color: "bg-indigo-50 text-indigo-600",

    permissions: [
      "Admin",
      "Doctor",
    ],

    badge: 0,

    favorite: false,

    tooltip: "Department Performance",

    keyboardShortcut: "Alt + 2",
  },

  {
    id: 3,

    title: "Doctor Performance",

    description: "Doctor productivity and revenue",

    icon: Stethoscope,

    path: "/doctor-performance",

    color: "bg-sky-50 text-sky-600",

    permissions: [
      "Admin",
      "Doctor",
    ],

    badge: 4,

    favorite: true,

    tooltip: "Doctor Performance",

    keyboardShortcut: "Alt + 3",
  },

  {
    id: 4,

    title: "Insurance Analytics",

    description: "Pending claims and settlements",

    icon: ShieldCheck,

    path: "/insurance-analytics",

    color: "bg-emerald-50 text-emerald-600",

    permissions: [
      "Admin",
      "Insurance",
      "Finance",
    ],

    badge: 8,

    favorite: false,

    tooltip: "Insurance Dashboard",

    keyboardShortcut: "Alt + 4",
  },

  {
    id: 5,

    title: "Inventory Analytics",

    description: "Stock availability and usage",

    icon: Boxes,

    path: "/inventory-analytics",

    color: "bg-violet-50 text-violet-600",

    permissions: [
      "Admin",
      "Reception",
    ],

    badge: 12,

    favorite: false,

    tooltip: "Inventory Dashboard",

    keyboardShortcut: "Alt + 5",
  },

  {
    id: 6,

    title: "Workforce Analytics",

    description: "HR and employee management",

    icon: Users,

    path: "/workforce-analytics",

    color: "bg-cyan-50 text-cyan-600",

    permissions: [
      "Admin",
      "HR",
    ],

    badge: 1,

    favorite: true,

    tooltip: "Workforce Dashboard",

    keyboardShortcut: "Alt + 6",
  },
];