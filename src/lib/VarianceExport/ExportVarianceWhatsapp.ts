type Variance = {
  id: number;
  metric: string;
  expected: number;
  actual: number;
  variance: number;
  variancePercentage: number;
  status: string;
};

export function ExportVarianceWhatsapp(
  data: Variance[],
  status: string,
  metric: string,
  search: string
) {
  const formatNumber = (value: number) =>
    new Intl.NumberFormat("en-IN").format(value);

  let message = "";

  message += "🏥 *LEADS HEALTH CARE*\n";
  message += "━━━━━━━━━━━━━━━━━━━━━━\n";
  message += "📊 *Variance Analysis Report*\n\n";

  message += `📅 Generated : ${new Date().toLocaleString("en-IN")}\n`;
  message += `📌 Status : ${status === "all" ? "All" : status}\n`;
  message += `📌 Metric : ${metric === "all" ? "All" : metric}\n`;
  message += `🔍 Search : ${search || "-"}\n`;
  message += `📈 Total Records : ${data.length}\n`;

  message += "\n━━━━━━━━━━━━━━━━━━━━━━\n\n";

  data.forEach((item, index) => {
    const icon =
      item.status === "Positive"
        ? "🟢"
        : item.status === "Negative"
        ? "🔴"
        : "⚪";

    message += `*${index + 1}. ${item.metric}*\n`;

    message += `Expected : ${formatNumber(item.expected)}\n`;
    message += `Actual : ${formatNumber(item.actual)}\n`;

    message += `Variance : ${
      item.variance >= 0 ? "+" : ""
    }${formatNumber(item.variance)}\n`;

    message += `Variance % : ${
      item.variancePercentage >= 0 ? "+" : ""
    }${item.variancePercentage.toFixed(2)}%\n`;

    message += `${icon} Status : ${item.status}\n`;

    message += "──────────────────────\n";
  });

  message += "\n";
  message += "Generated from Leads Health Care MIS Dashboard";

  const url =
    "https://wa.me/?text=" + encodeURIComponent(message);

  window.open(url, "_blank");
}