
export interface WeeklyProcedureData {
  id: number | string;

  procedure: string;

  count: number;

  revenue: number;

  growth: number;
}

export const WeeklyTopProcedureData: Record<
  string,
  WeeklyProcedureData[]
> = {

  current: [
    {
      id: 1,
      procedure: "ECG",
      count: 428,
      revenue: 428000,
      growth: 17.8,
    },

    {
      id: 2,
      procedure: "ECHO",
      count: 312,
      revenue: 624000,
      growth: 16.2,
    },

    {
      id: 3,
      procedure: "X-Ray",
      count: 586,
      revenue: 292000,
      growth: 14.1,
    },

    {
      id: 4,
      procedure: "MRI",
      count: 146,
      revenue: 730000,
      growth: 15.6,
    },

    {
      id: 5,
      procedure: "CT Scan",
      count: 198,
      revenue: 693000,
      growth: 18.9,
    },
  ],

  previous: [
    {
      id: 1,
      procedure: "ECG",
      count: 396,
      revenue: 396000,
      growth: 14.2,
    },

    {
      id: 2,
      procedure: "ECHO",
      count: 284,
      revenue: 568000,
      growth: 13.6,
    },

    {
      id: 3,
      procedure: "X-Ray",
      count: 548,
      revenue: 274000,
      growth: 11.8,
    },

    {
      id: 4,
      procedure: "MRI",
      count: 132,
      revenue: 660000,
      growth: 12.4,
    },

    {
      id: 5,
      procedure: "CT Scan",
      count: 184,
      revenue: 644000,
      growth: 16.3,
    },
  ],

  last4weeks: [
    {
      id: 1,
      procedure: "ECG",
      count: 1642,
      revenue: 1642000,
      growth: 16.4,
    },

    {
      id: 2,
      procedure: "ECHO",
      count: 1198,
      revenue: 2396000,
      growth: 15.1,
    },

    {
      id: 3,
      procedure: "X-Ray",
      count: 2248,
      revenue: 1124000,
      growth: 13.7,
    },

    {
      id: 4,
      procedure: "MRI",
      count: 574,
      revenue: 2870000,
      growth: 14.8,
    },

    {
      id: 5,
      procedure: "CT Scan",
      count: 762,
      revenue: 2667000,
      growth: 17.2,
    },
  ],
};

