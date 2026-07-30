export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatPercent(value: number) {
  return value.toFixed(2);
}