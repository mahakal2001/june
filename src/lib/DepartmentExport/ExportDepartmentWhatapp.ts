type Department = {
  department: string;
 revenue: number;
  collection: number;
  patients: number;
  yesterdayRevenue: number;
  variance: number;
  variancePercentage: number;
  status: string;
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(value);

export function ExportDepartmentWhatsapp(
  departments: Department[],
  status: string,
  search: string
) {
  const totalRevenue = departments.reduce(
    (sum, item) => sum + item.revenue,
    0
  );

  const totalCollection = departments.reduce(
    (sum, item) => sum + item.collection,
    0
  );

  const totalPatients = departments.reduce(
    (sum, item) => sum + item.patients,
    0
  );

  let message = "";

  message += "🏥 *DEPARTMENT SUMMARY REPORT*\n";
  message += "━━━━━━━━━━━━━━━━━━━━━━\n\n";

  message += `📅 *Generated:* ${new Date().toLocaleString()}\n`;
  message += `🔍 *Search:* ${search || "None"}\n`;
  message += `📌 *Status:* ${
    status === "all" ? "All Status" : status
  }\n\n`;

  message += "📊 *SUMMARY*\n";
  message += "━━━━━━━━━━━━━━━━━━━━━━\n";

  message += `🏢 Departments : ${departments.length}\n`;
  message += `💰 Revenue : ${formatCurrency(totalRevenue)}\n`;
  message += `💵 Collection : ${formatCurrency(totalCollection)}\n`;
  message += `👥 Patients : ${totalPatients}\n\n`;

  message += "📋 *DEPARTMENT DETAILS*\n";
  message += "━━━━━━━━━━━━━━━━━━━━━━\n\n";

  departments.forEach((department, index) => {
    const variance =
      `${department.variance >= 0 ? "+" : ""}${formatCurrency(
        department.variance
      )}`;

    const variancePercent =
      `${department.variancePercentage >= 0 ? "+" : ""}${
        department.variancePercentage
      }%`;

    const statusIcon =
      department.status === "Positive"
        ? "🟢"
        : "🔴";

    message += `${index + 1}. *${department.department}*\n`;

    message += `   💰 Revenue : ${formatCurrency(
      department.revenue
    )}\n`;

    message += `   💵 Collection : ${formatCurrency(
      department.collection
    )}\n`;

    message += `   👥 Patients : ${department.patients}\n`;

    message += `   📅 Yesterday : ${formatCurrency(
      department.yesterdayRevenue
    )}\n`;

    message += `   📈 Variance : ${variance}\n`;

    message += `   📊 Variance % : ${variancePercent}\n`;

    message += `   ${statusIcon} Status : ${department.status}\n\n`;
  });

  message += "━━━━━━━━━━━━━━━━━━━━━━\n";
  message += "Generated from Hospital MIS Dashboard";

  window.open(
    `https://wa.me/?text=${encodeURIComponent(message)}`,
    "_blank"
  );
}