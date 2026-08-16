// ======================================================
// TYPES
// ======================================================

export type CollectionPeriod =
  | "Monthly"
  | "Quarterly"
  | "Yearly";

export interface CollectionTrendDataItem {
  month: string;
  collection: number;
  outstanding: number;
}


// ======================================================
// DATA
// ======================================================

export const CollectionTrendData: Record<
  CollectionPeriod,
  CollectionTrendDataItem[]
> = {

  // ====================================================
  // MONTHLY
  // ====================================================

  Monthly: [
    {
      month: "Jun '23",
      collection: 2.2,
      outstanding: 1.4,
    },
    {
      month: "Jul '23",
      collection: 3.7,
      outstanding: 2.3,
    },
    {
      month: "Aug '23",
      collection: 3.4,
      outstanding: 1.8,
    },
    {
      month: "Sep '23",
      collection: 4.1,
      outstanding: 2.3,
    },
    {
      month: "Oct '23",
      collection: 4.4,
      outstanding: 2.2,
    },
    {
      month: "Nov '23",
      collection: 3.9,
      outstanding: 1.9,
    },
    {
      month: "Dec '23",
      collection: 5.0,
      outstanding: 2.8,
    },
    {
      month: "Jan '24",
      collection: 4.1,
      outstanding: 2.1,
    },
    {
      month: "Feb '24",
      collection: 4.6,
      outstanding: 2.5,
    },
    {
      month: "Mar '24",
      collection: 4.1,
      outstanding: 2.0,
    },
    {
      month: "Apr '24",
      collection: 4.8,
      outstanding: 1.9,
    },
    {
      month: "May '24",
      collection: 4.3,
      outstanding: 1.4,
    },
  ],


  // ====================================================
  // QUARTERLY
  // ====================================================

  Quarterly: [
    {
      month: "Q1 '23",
      collection: 3.1,
      outstanding: 1.8,
    },
    {
      month: "Q2 '23",
      collection: 3.8,
      outstanding: 2.2,
    },
    {
      month: "Q3 '23",
      collection: 4.2,
      outstanding: 2.4,
    },
    {
      month: "Q4 '23",
      collection: 4.6,
      outstanding: 2.1,
    },
    {
      month: "Q1 '24",
      collection: 4.3,
      outstanding: 2.2,
    },
    {
      month: "Q2 '24",
      collection: 4.8,
      outstanding: 1.8,
    },
  ],


  // ====================================================
  // YEARLY
  // ====================================================

  Yearly: [
    {
      month: "2020",
      collection: 3.0,
      outstanding: 2.4,
    },
    {
      month: "2021",
      collection: 3.5,
      outstanding: 2.2,
    },
    {
      month: "2022",
      collection: 3.9,
      outstanding: 2.1,
    },
    {
      month: "2023",
      collection: 4.4,
      outstanding: 2.3,
    },
    {
      month: "2024",
      collection: 4.8,
      outstanding: 1.9,
    },
  ],
};