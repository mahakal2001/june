import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function exportWhatsappReport(
  alerts: any[],
  filters: {
    priority: string;
    category: string;
    status: string;
  }
) {
  const pdf = new jsPDF("p", "mm", "a4");

  //-----------------------------------
  // Header
  //-----------------------------------

  pdf.setFillColor(30, 64, 175);
  pdf.rect(0, 0, 210, 28, "F");

  pdf.setTextColor(255);

  pdf.setFontSize(22);

  pdf.text("LEADS HEALTH CARE", 105, 12, {
    align: "center",
  });

  pdf.setFontSize(11);

  pdf.text(
    "Alerts & Notifications Report",
    105,
    20,
    {
      align: "center",
    }
  );

  pdf.setTextColor(0);

  //-----------------------------------
  // Summary
  //-----------------------------------

  const critical = alerts.filter(
    (a) => a.priority === "Critical"
  ).length;

  const high = alerts.filter(
    (a) => a.priority === "High"
  ).length;

  const medium = alerts.filter(
    (a) => a.priority === "Medium"
  ).length;

  const low = alerts.filter(
    (a) => a.priority === "Low"
  ).length;

  pdf.setFontSize(11);

  pdf.text(
    `Generated : ${new Date().toLocaleString()}`,
    14,
    38
  );

  pdf.text(`Total Alerts : ${alerts.length}`, 14, 46);

  pdf.text(`Critical : ${critical}`, 14, 54);

  pdf.text(`High : ${high}`, 60, 54);

  pdf.text(`Medium : ${medium}`, 105, 54);

  pdf.text(`Low : ${low}`, 155, 54);

  //-----------------------------------
  // Filters
  //-----------------------------------

  pdf.text(
    `Priority : ${filters.priority}`,
    14,
    66
  );

  pdf.text(
    `Category : ${filters.category}`,
    80,
    66
  );

  pdf.text(
    `Status : ${filters.status}`,
    150,
    66
  );

  //-----------------------------------
  // Table
  //-----------------------------------

  autoTable(pdf, {
    startY: 75,

    head: [
      [
        "Alert",
        "Priority",
        "Category",
        "Status",
        "Last Updated",
      ],
    ],

    body: alerts.map((a) => [
      a.title,
      a.priority,
      a.category,
      a.status,
      new Date().toLocaleTimeString(),
    ]),

    styles: {
      fontSize: 9,
      cellPadding: 3,
    },

    headStyles: {
      fillColor: [30, 64, 175],
      textColor: 255,
    },

    alternateRowStyles: {
      fillColor: [245, 247, 250],
    },
  });

  //-----------------------------------
  // Footer
  //-----------------------------------

  pdf.setFontSize(9);

  pdf.setTextColor(120);

  pdf.text(
    "Generated from Leads Health Care MIS Dashboard",
    105,
    290,
    {
      align: "center",
    }
  );

  //-----------------------------------
  // Save
  //-----------------------------------

  const blob = pdf.output("blob");

  const file = new File(
    [blob],
    "Alerts_Report.pdf",
    {
      type: "application/pdf",
    }
  );

  const url = URL.createObjectURL(file);

  //-----------------------------------
  // WhatsApp Message
  //-----------------------------------

  const message =
`🏥 *Leads Health Care*

📊 Alerts & Notifications Report

📅 ${new Date().toLocaleString()}

🚨 Total Alerts : ${alerts.length}

🔴 Critical : ${critical}
🟠 High : ${high}
🟡 Medium : ${medium}
🟢 Low : ${low}

Priority : ${filters.priority}
Category : ${filters.category}
Status : ${filters.status}

Please find the attached report.

Generated from Leads Health Care MIS Dashboard`;

  window.open(
    `https://wa.me/?text=${encodeURIComponent(
      message
    )}`,
    "_blank"
  );

  return url;
}