import { formatCurrency } from "@/lib/formatCurrency";

interface DepartmentData {
  id: number;
  department: string;
  revenue: number;
  growth: number;
  patients: number;
  collection: number;
  collectionPercentage: number;
  avgLOS: number;
  status: "Good" | "Average";
  icon: React.ElementType;
  iconColor: string;
  iconBg: string;
}

interface WhatsappReportProps {
  departments: DepartmentData[];
  weekLabel: string;
  search?: string;
  status?: string;
}

export function ExportWeeklyMISWhatsappReport({
  departments,
  weekLabel,
  search = "",
  status = "all",
}: WhatsappReportProps) {

  // --------------------------------------------------
  // FORMAT NUMBER
  // --------------------------------------------------

  const formatNumber = (value: number) => {
    return value.toLocaleString("en-IN");
  };


  // --------------------------------------------------
  // TOTALS
  // --------------------------------------------------

  const totalRevenue = departments.reduce(
    (sum, department) =>
      sum + department.revenue,
    0
  );

  const totalCollection = departments.reduce(
    (sum, department) =>
      sum + department.collection,
    0
  );

  const totalPatients = departments.reduce(
    (sum, department) =>
      sum + department.patients,
    0
  );


  const averageGrowth =
    departments.length > 0
      ? departments.reduce(
          (sum, department) =>
            sum + department.growth,
          0
        ) / departments.length
      : 0;


  const averageCollectionPercentage =
    departments.length > 0
      ? departments.reduce(
          (sum, department) =>
            sum +
            department.collectionPercentage,
          0
        ) / departments.length
      : 0;


  const averageLOS =
    departments.length > 0
      ? departments.reduce(
          (sum, department) =>
            sum + department.avgLOS,
          0
        ) / departments.length
      : 0;


  // --------------------------------------------------
  // STATUS COUNTS
  // --------------------------------------------------

  const goodDepartments =
    departments.filter(
      (department) =>
        department.status === "Good"
    ).length;

  const averageDepartments =
    departments.filter(
      (department) =>
        department.status === "Average"
    ).length;


  // --------------------------------------------------
  // DATE
  // --------------------------------------------------

  const reportDate =
    new Date().toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );


  // --------------------------------------------------
  // HEADER
  // --------------------------------------------------

  let message = "";

  message +=
    `*🏥 DEPARTMENT-WISE WEEKLY MIS REPORT*\n`;

  message +=
    `━━━━━━━━━━━━━━━━━━━━\n`;

  message +=
    `📅 *Week:* ${weekLabel}\n`;

  message +=
    `📆 *Report Date:* ${reportDate}\n`;

  if (search.trim()) {
    message +=
      `🔎 *Search:* ${search.trim()}\n`;
  }

  if (status !== "all") {
    message +=
      `📊 *Status:* ${status}\n`;
  }

  message +=
    `━━━━━━━━━━━━━━━━━━━━\n\n`;


  // --------------------------------------------------
  // EXECUTIVE SUMMARY
  // --------------------------------------------------

  message +=
    `*📌 EXECUTIVE SUMMARY*\n\n`;

  message +=
    `💰 *Total Revenue:* ${formatCurrency(
      totalRevenue
    )}\n`;

  message +=
    `💵 *Total Collection:* ${formatCurrency(
      totalCollection
    )}\n`;

  message +=
    `👥 *Total Patients:* ${formatNumber(
      totalPatients
    )}\n`;

  message +=
    `📈 *Avg. Growth:* ${averageGrowth.toFixed(
      1
    )}%\n`;

  message +=
    `🎯 *Collection Rate:* ${averageCollectionPercentage.toFixed(
      1
    )}%\n`;

  message +=
    `🛏️ *Avg. LOS:* ${averageLOS.toFixed(
      1
    )}\n\n`;


  // --------------------------------------------------
  // STATUS SUMMARY
  // --------------------------------------------------

  message +=
    `*📊 PERFORMANCE STATUS*\n\n`;

  message +=
    `🟢 Good: *${goodDepartments}*\n`;

  message +=
    `🟠 Average: *${averageDepartments}*\n\n`;


  // --------------------------------------------------
  // DEPARTMENT DETAILS
  // --------------------------------------------------

  message +=
    `*🏢 DEPARTMENT PERFORMANCE*\n`;

  message +=
    `━━━━━━━━━━━━━━━━━━━━\n\n`;


  departments.forEach(
    (department, index) => {

      const statusIcon =
        department.status === "Good"
          ? "🟢"
          : "🟠";


      message +=
        `*${index + 1}. ${department.department}*\n`;

      message +=
        `${statusIcon} Status: *${department.status}*\n`;

      message +=
        `💰 Revenue: *${formatCurrency(
          department.revenue
        )}*\n`;

      message +=
        `📈 Growth: *${department.growth.toFixed(
          1
        )}%*\n`;

      message +=
        `👥 Patients: *${formatNumber(
          department.patients
        )}*\n`;

      message +=
        `💵 Collection: *${formatCurrency(
          department.collection
        )}*\n`;

      message +=
        `🎯 Collection %: *${department.collectionPercentage.toFixed(
          1
        )}%*\n`;

      message +=
        `🛏️ Avg. LOS: *${department.avgLOS.toFixed(
          1
        )}*\n`;

      message +=
        `\n━━━━━━━━━━━━━━━━━━━━\n\n`;
    }
  );


  // --------------------------------------------------
  // FINAL SUMMARY
  // --------------------------------------------------

  message +=
    `*📋 REPORT SUMMARY*\n\n`;

  message +=
    `🏢 Departments: *${departments.length}*\n`;

  message +=
    `💰 Revenue: *${formatCurrency(
      totalRevenue
    )}*\n`;

  message +=
    `💵 Collection: *${formatCurrency(
      totalCollection
    )}*\n`;

  message +=
    `👥 Patients: *${formatNumber(
      totalPatients
    )}*\n\n`;

  message +=
    `Generated from *Weekly MIS Dashboard*\n`;

  message +=
    `_Automated MIS Report • ${reportDate}_`;


  // --------------------------------------------------
  // OPEN WHATSAPP
  // --------------------------------------------------

  const whatsappUrl =
    `https://wa.me/?text=${encodeURIComponent(
      message
    )}`;


  window.open(
    whatsappUrl,
    "_blank",
    "noopener,noreferrer"
  );
}