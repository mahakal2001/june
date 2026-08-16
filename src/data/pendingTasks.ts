import {
  FileCheck2,
  FlaskConical,
  Pill,
  ShieldCheck,
  CreditCard,
} from "lucide-react";

export type PendingTask = {
  id: number;
  title: string;
  count: number;
  icon: any;
  iconColor: string;
  iconBg: string;
  badgeColor: string;
};

export const pendingTasks: PendingTask[] = [
  {
    id: 1,
    title: "Pending Discharges",
    count: 18,
    icon: FileCheck2,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-50",
    badgeColor: "bg-blue-100 text-blue-700",
  },
  {
    id: 2,
    title: "Pending Lab Reports",
    count: 32,
    icon: FlaskConical,
    iconColor: "text-green-600",
    iconBg: "bg-green-50",
    badgeColor: "bg-green-100 text-green-700",
  },
  {
    id: 3,
    title: "Pending Pharmacy Orders",
    count: 26,
    icon: Pill,
    iconColor: "text-orange-600",
    iconBg: "bg-orange-50",
    badgeColor: "bg-orange-100 text-orange-700",
  },
  {
    id: 4,
    title: "Pending Insurance Verifications",
    count: 14,
    icon: ShieldCheck,
    iconColor: "text-purple-600",
    iconBg: "bg-purple-50",
    badgeColor: "bg-purple-100 text-purple-700",
  },
  {
    id: 5,
    title: "Pending Payments",
    count: 48,
    icon: CreditCard,
    iconColor: "text-red-600",
    iconBg: "bg-red-50",
    badgeColor: "bg-red-100 text-red-700",
  },
];