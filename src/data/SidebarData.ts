import {
  LayoutDashboard,
  BadgeDollarSign,
  Stethoscope,
  Activity,
  Users,
  Package,
  ShieldCheck,
  BadgeCheck,
  BarChart3,
  TrendingUp,
  CalendarClock,
  FileText,
  Download,
} from "lucide-react";

export const sidebarSections = [
  {

    items: [
      {
        title: "MIS Dashboard",
        icon: LayoutDashboard,
        href: "/",

        children: [
          {
            title: "Daily MIS Center",
            href: "/DailyMIS",
          },
          {
            title: "Weekly MIS Center",
            href: "/WeeklyMIS",
          },
          {
            title: "Monthly MIS Center",
            href: "/MonthlyMIS",
          },
        ],
      },
    ],
  },

  {
    title: "Analytics",

    items: [
      {
        title: "Revenue Analytics",
        icon: BadgeDollarSign,
        href: "/RevenueAnalytics",
      },
      {
        title: "OPD Analytics",
        icon: Stethoscope,
        href: "/opd",
      },
      {
        title: "IPD Analytics",
        icon: Activity,
        href: "/ipd",
      },
      {
        title: "Bed Occupancy Analytics",
        icon: Users,
        href: "/bed",
      },
      {
        title: "Department Performance",
        icon: Users,
        href: "/department",
      },
      {
        title: "Doctor Performance",
        icon: Users,
        href: "/doctor",
      },
      {
        title: "Insurance Analytics",
        icon: ShieldCheck,
        href: "/insurance",
      },
      {
        title: "Inventory Analytics",
        icon: Package,
        href: "/inventory",
      },
      {
        title: "Workforce Analytics",
        icon: Activity,
        href: "/workforce",
      },
      {
        title: "Quality Analytics",
        icon: BadgeCheck,
        href: "/quality",
      },
    ],
  },

  {
    title: "Business Intelligence",

    items: [
      {
        title: "Benchmarking",
        icon: BarChart3,
        href: "/benchmarking",
      },
      {
        title: "Forecasting",
        icon: TrendingUp,
        href: "/forecasting",
      },
    ],
  },

  {
    title: "Reports",

    items: [
      {
        title: "Scheduled Reports",
        icon: CalendarClock,
        href: "/scheduled-reports",
      },
      {
        title: "Report Builder",
        icon: FileText,
        href: "/report-builder",
      },
      {
        title: "Export & Distribution",
        icon: Download,
        href: "/export-center",
      },
    ],
  },
];