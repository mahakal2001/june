export interface RevenueDepartmentData {
  id: number;
  department: string;
  revenue: number;
  color: string;
}

export const RevenueDepartmentPieData: RevenueDepartmentData[] = [
  {
    id: 1,
    department: "General Medicine",
    revenue: 1.28,
    color: "#2563EB",
  },
  {
    id: 2,
    department: "Orthopedics",
    revenue: 1.05,
    color: "#0EA5E9",
  },
  {
    id: 3,
    department: "Cardiology",
    revenue: 0.86,
    color: "#10B981",
  },
  {
    id: 4,
    department: "Pediatrics",
    revenue: 0.65,
    color: "#F59E0B",
  },
  {
    id: 5,
    department: "Gynecology",
    revenue: 0.48,
    color: "#F43F5E",
  },
  {
    id: 6,
    department: "Surgery",
    revenue: 0.36,
    color: "#8B5CF6",
  },
  {
    id: 7,
    department: "Others",
    revenue: 0.79,
    color: "#94A3B8",
  },
];