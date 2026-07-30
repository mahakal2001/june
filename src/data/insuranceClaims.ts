import {
  Send,
  CheckCircle2,
  Clock3,
  XCircle,
} from "lucide-react";

export const insuranceClaims = [
  {
    id: 1,
    title: "Claims Submitted",
    value: 42,
    icon: Send,
    bgColor: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    id: 2,
    title: "Claims Approved",
    value: 28,
    icon: CheckCircle2,
    bgColor: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    id: 3,
    title: "Claims Pending",
    value: 12,
    icon: Clock3,
    bgColor: "bg-orange-100",
    iconColor: "text-orange-600",
  },
  {
    id: 4,
    title: "Claims Rejected",
    value: 2,
    icon: XCircle,
    bgColor: "bg-red-100",
    iconColor: "text-red-600",
  },
];