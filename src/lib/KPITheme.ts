export const kpiTheme = {
  blue: {
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    chartColor: "#2563EB",
    border: "hover:border-blue-200",
    trendColor: "text-blue-600",
  },

  emerald: {
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    chartColor: "#10B981",
    border: "hover:border-emerald-200",
    trendColor: "text-emerald-600",
  },

  violet: {
    iconBg: "bg-violet-50",
    iconColor: "text-violet-600",
    chartColor: "#7C3AED",
    border: "hover:border-violet-200",
    trendColor: "text-violet-600",
  },

  orange: {
    iconBg: "bg-orange-50",
    iconColor: "text-orange-600",
    border: "hover:border-orange-200",
    trendColor: "text-orange-600",
  },

  rose: {
    iconBg: "bg-rose-50",
    iconColor: "text-rose-600",
    chartColor: "#F43F5E",
    border: "hover:border-rose-200",
    trendColor: "text-rose-600",
  },
} as const;

export type KPITheme = keyof typeof kpiTheme;