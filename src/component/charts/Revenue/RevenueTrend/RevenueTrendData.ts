// ======================================================
// TYPES
// ======================================================

export type RevenuePeriod =
  | "Monthly"
  | "Quarterly"
  | "Yearly";

export interface RevenueData {
  month: string;
  revenue: number;
  collection: number;
}


// ======================================================
// DATA
// ======================================================

export const RevenueTrendData: Record<
  RevenuePeriod,
  RevenueData[]
> = {

  // ====================================================
  // MONTHLY DATA
  // ====================================================

  Monthly: [
    {
      month: "Jun '23",
      revenue: 2.4,
      collection: 1.4,
    },
    {
      month: "Jul '23",
      revenue: 4.0,
      collection: 2.8,
    },
    {
      month: "Aug '23",
      revenue: 3.5,
      collection: 2.5,
    },
    {
      month: "Sep '23",
      revenue: 4.1,
      collection: 3.1,
    },
    {
      month: "Oct '23",
      revenue: 4.4,
      collection: 3.2,
    },
    {
      month: "Nov '23",
      revenue: 3.9,
      collection: 2.9,
    },
    {
      month: "Dec '23",
      revenue: 4.8,
      collection: 3.6,
    },
    {
      month: "Jan '24",
      revenue: 4.1,
      collection: 3.0,
    },
    {
      month: "Feb '24",
      revenue: 4.6,
      collection: 3.6,
    },
    {
      month: "Mar '24",
      revenue: 4.1,
      collection: 3.2,
    },
    {
      month: "Apr '24",
      revenue: 4.9,
      collection: 3.4,
    },
    {
      month: "May '24",
      revenue: 4.3,
      collection: 2.7,
    },
  ],


  // ====================================================
  // QUARTERLY DATA
  // ====================================================

  Quarterly: [
    {
      month: "Q1 '23",
      revenue: 3.4,
      collection: 2.2,
    },
    {
      month: "Q2 '23",
      revenue: 4.1,
      collection: 2.8,
    },
    {
      month: "Q3 '23",
      revenue: 4.5,
      collection: 3.1,
    },
    {
      month: "Q4 '23",
      revenue: 4.2,
      collection: 3.0,
    },
    {
      month: "Q1 '24",
      revenue: 4.6,
      collection: 3.4,
    },
    {
      month: "Q2 '24",
      revenue: 4.8,
      collection: 3.5,
    },
  ],


  // ====================================================
  // YEARLY DATA
  // ====================================================

  Yearly: [
    {
      month: "2020",
      revenue: 3.1,
      collection: 2.0,
    },
    {
      month: "2021",
      revenue: 3.7,
      collection: 2.5,
    },
    {
      month: "2022",
      revenue: 4.0,
      collection: 2.8,
    },
    {
      month: "2023",
      revenue: 4.4,
      collection: 3.1,
    },
    {
      month: "2024",
      revenue: 4.8,
      collection: 3.5,
    },
  ],
};