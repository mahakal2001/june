import type { KPIFormat } from "@/types/MisDashboard";

export function formatValue(
  value: number,
  format: KPIFormat
) {
  switch (format) {
    case "currency-lakh":
      return `₹ ${value.toFixed(2)} L`;

    case "currency-crore":
      return `₹ ${value.toFixed(2)} Cr`;

    case "number":
      return Math.round(value).toLocaleString("en-IN");

    case "percentage":
      return `${value.toFixed(1)}%`;

    case "days":
      return `${value.toFixed(1)} Days`;

    case "rating":
      return `${value.toFixed(1)} / 5`;

    default:
      return value.toString();
  }
}