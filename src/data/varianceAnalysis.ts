export type VarianceData = {
  id: number;
  metric: string;
  expected: number;
  actual: number;
  variance: number;
  variancePercentage: number;
  status: "Positive" | "Negative" | "Neutral";
};

export const varianceAnalysis: VarianceData[] = [
  {
    id: 1,
    metric: "Revenue",
    expected: 1750000,
    actual: 1875000,
    variance: 125000,
    variancePercentage: 7.14,
    status: "Positive",
  },
  {
    id: 2,
    metric: "Collection",
    expected: 1500000,
    actual: 1623000,
    variance: 123000,
    variancePercentage: 8.2,
    status: "Positive",
  },
  {
    id: 3,
    metric: "Admissions",
    expected: 170,
    actual: 186,
    variance: 16,
    variancePercentage: 9.41,
    status: "Positive",
  },
  {
    id: 4,
    metric: "Discharges",
    expected: 130,
    actual: 142,
    variance: 12,
    variancePercentage: 9.23,
    status: "Positive",
  },
  {
    id: 5,
    metric: "Avg. Length of Stay",
    expected: 4.2,
    actual: 4.6,
    variance: 0.4,
    variancePercentage: 9.52,
    status: "Positive",
  },
  {
    id: 6,
    metric: "Pharmacy Sales",
    expected: 310000,
    actual: 342000,
    variance: 32000,
    variancePercentage: 10.32,
    status: "Positive",
  },
];