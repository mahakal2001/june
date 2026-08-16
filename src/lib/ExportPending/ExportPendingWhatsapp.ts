type PendingTask = {
  id: number;
  title: string;
  count: number;
};

type ExportPendingWhatsappProps = {
  data: PendingTask[];
  search: string;
  priority: string;
  task: string;
};

export function ExportPendingWhatsapp({
  data,
  search,
  priority,
  task,
}: ExportPendingWhatsappProps) {

  const getPriority = (count: number) => {
    if (count >= 40) return "Critical";
    if (count >= 25) return "High";
    if (count >= 15) return "Medium";
    return "Low";
  };

  const getIcon = (priority: string) => {
    switch (priority) {
      case "Critical":
        return "🔴";

      case "High":
        return "🟠";

      case "Medium":
        return "🟡";

      default:
        return "🟢";
    }
  };

  let message = "";

  message += "🏥 *LEADS HEALTH CARE*\n";
  message += "━━━━━━━━━━━━━━━━━━━━━━\n";
  message += "📋 *Pending Tasks Report*\n\n";

  message += `📅 Generated : ${new Date().toLocaleString("en-IN")}\n\n`;

  message += "🔎 *Applied Filters*\n";
  message += `• Search : ${search || "All"}\n`;
  message += `• Task : ${
    task === "all" ? "All Tasks" : task
  }\n`;
  message += `• Priority : ${
    priority === "all"
      ? "All Priorities"
      : priority
  }\n`;
  message += `• Total Tasks : ${data.length}\n`;

  message += "\n";
  message += "━━━━━━━━━━━━━━━━━━━━━━\n";
  message += "📌 *TASK DETAILS*\n";
  message += "━━━━━━━━━━━━━━━━━━━━━━\n\n";

  data.forEach((item, index) => {

    const taskPriority = getPriority(item.count);

    message += `${index + 1}. *${item.title}*\n`;
    message += `Pending : ${item.count}\n`;
    message += `${getIcon(taskPriority)} Priority : ${taskPriority}\n`;
    message += "────────────────────\n";
  });

  message += "\n";

  message += "━━━━━━━━━━━━━━━━━━━━━━\n";

  message += `✅ Total Pending Tasks : ${data.length}\n`;

  message += "━━━━━━━━━━━━━━━━━━━━━━\n";

  message +=
    "Generated from Leads Health Care MIS Dashboard";

  const url =
    `https://wa.me/?text=${encodeURIComponent(message)}`;

  window.open(url, "_blank");
}