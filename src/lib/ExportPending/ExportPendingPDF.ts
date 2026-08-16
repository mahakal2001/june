import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

type PendingTask = {
  id: number;
  title: string;
  count: number;
};

export function ExportPendingPDF(
  tasks: PendingTask[],
  priority: string,
  taskFilter: string,
  search: string
) {
  const doc = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // ==================================================
  // Header
  // ==================================================

  doc.setFillColor(30, 64, 175);
  doc.rect(0, 0, pageWidth, 24, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);

  doc.text("Pending Tasks Report", 14, 14);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);

  doc.text(
    `Generated : ${new Date().toLocaleString("en-IN")}`,
    pageWidth - 14,
    10,
    {
      align: "right",
    }
  );

  doc.text(
    "Leads Health Care",
    pageWidth - 14,
    17,
    {
      align: "right",
    }
  );

  // ==================================================
  // Filters
  // ==================================================

  doc.setTextColor(40);
  doc.setFontSize(10);

  doc.text(
    `Priority : ${
      priority === "all" ? "All" : priority
    }`,
    14,
    34
  );

  doc.text(
    `Task : ${
      taskFilter === "all"
        ? "All"
        : taskFilter
    }`,
    72,
    34
  );

  doc.text(
    `Search : ${
      search || "-"
    }`,
    132,
    34
  );

  doc.text(
    `Total Tasks : ${tasks.length}`,
    pageWidth - 14,
    34,
    {
      align: "right",
    }
  );

  // ==================================================
  // Summary Cards
  // ==================================================

  const critical = tasks.filter(
    (t) => t.count >= 40
  ).length;

  const high = tasks.filter(
    (t) => t.count >= 25 && t.count < 40
  ).length;

  const medium = tasks.filter(
    (t) => t.count >= 15 && t.count < 25
  ).length;

  const low = tasks.filter(
    (t) => t.count < 15
  ).length;

  const totalPending = tasks.reduce(
    (sum, t) => sum + t.count,
    0
  );

  const cards = [
    {
      title: "Total Pending",
      value: totalPending.toLocaleString(),
      color: [37, 99, 235],
    },
    {
      title: "Critical",
      value: String(critical),
      color: [220, 38, 38],
    },
    {
      title: "High",
      value: String(high),
      color: [249, 115, 22],
    },
    {
      title: "Medium",
      value: String(medium),
      color: [234, 179, 8],
    },
    {
      title: "Low",
      value: String(low),
      color: [22, 163, 74],
    },
  ];

  let x = 14;

  cards.forEach((card) => {
    doc.setFillColor(
      card.color[0],
      card.color[1],
      card.color[2]
    );

    doc.roundedRect(
      x,
      42,
      48,
      20,
      2,
      2,
      "F"
    );

    doc.setTextColor(255);

    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");

    doc.text(card.title, x + 24, 49, {
      align: "center",
    });

    doc.setFontSize(16);

    doc.setFont("helvetica", "bold");

    doc.text(card.value, x + 24, 58, {
      align: "center",
    });

     x += 56;
    });

  // ==================================================
  // Table
  // ==================================================

  autoTable(doc, {
    startY: 70,

    head: [
      [
        "#",
        "Task",
        "Pending Count",
        "Priority",
      ],
    ],

    body: tasks.map((task, index) => {
      let priorityText = "Low";

      if (task.count >= 40)
        priorityText = "Critical";
      else if (task.count >= 25)
        priorityText = "High";
      else if (task.count >= 15)
        priorityText = "Medium";

      return [
        index + 1,
        task.title,
        task.count.toLocaleString(),
        priorityText,
      ];
    }),

    headStyles: {
      fillColor: [30, 64, 175],
      textColor: 255,
      halign: "center",
      valign: "middle",
      fontStyle: "bold",
      fontSize: 10,
    },

    bodyStyles: {
      fontSize: 9,
      halign: "center",
      valign: "middle",
      cellPadding: 3,
    },

    alternateRowStyles: {
      fillColor: [248, 250, 252],
    },

    columnStyles: {
      0: {
        cellWidth: 18,
        halign: "center",
      },
      1: {
        halign: "center",
      },
      2: {
        cellWidth: 45,
        halign: "center",
      },
      3: {
        cellWidth: 40,
        halign: "center",
      },
    },

    margin: {
      left: 14,
      right: 14,
    },
  });

  // ==================================================
  // Footer
  // ==================================================

  const pages = doc.getNumberOfPages();

  for (let i = 1; i <= pages; i++) {
    doc.setPage(i);

    doc.setDrawColor(220);

    doc.line(
      14,
      pageHeight - 10,
      pageWidth - 14,
      pageHeight - 10
    );

    doc.setFontSize(8);

    doc.setTextColor(120);

    doc.text(
      "Leads Health Care • Pending Tasks Report",
      14,
      pageHeight - 5
    );

    doc.text(
      `Page ${i} of ${pages}`,
      pageWidth - 14,
      pageHeight - 5,
      {
        align: "right",
      }
    );
  }

  // ==================================================
  // Save
  // ==================================================

  doc.save(
    `Pending_Tasks_Report_${
      new Date().toISOString().split("T")[0]
    }.pdf`
  );
}
