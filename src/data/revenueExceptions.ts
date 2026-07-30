export interface RevenueException {
  id: number;
  department: string;
  expected: number;
  actual: number;
  date?: string | Date,
}

export const revenueExceptions: RevenueException[] = [
  {
    id: 1,
    department: "Cardiology",
    expected: 450000,
    actual: 385000,
    date:new Date("2026-07-18")
  },
  {
    id: 2,
    department: "Orthopedics",
    expected: 420000,
    actual: 310000,
    date:new Date("2026-07-19")
  },
  {
    id: 3,
    department: "Pediatrics",
    expected: 280000,
    actual: 205000,
    date:new Date("2026-07-20")
  },
  {
    id: 4,
    department: "Radiology",
    expected: 200000,
    actual: 265000,
    date:new Date("2026-07-21")
  },
  {
    id: 5,
    department: "Laboratory",
    expected: 180000,
    actual: 240000,
    date:new Date("2026-07-22")
  },
];