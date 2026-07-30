import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

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

export function ExportDepartmentPDF(
  departments: Department[],
  status: string,
  search: string
) {
  const doc = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();

  //=========================
  // Header
  //=========================

  doc.setFillColor(20, 82, 160);
  doc.rect(0, 0, pageWidth, 22, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text("Department Summary Report", 14, 13);

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text(
    `Generated : ${new Date().toLocaleString()}`,
    pageWidth - 80,
    13
  );

  //=========================
  // Filters
  //=========================

  doc.setTextColor(0);

  doc.setFontSize(10);

  doc.setFont("helvetica", "bold");
  doc.text("Applied Filters", pageWidth / 2, 32, {
    align: "center",
  });

  doc.setFont("helvetica", "normal");
  doc.text(
    `Status : ${
      status === "all" ? "All Statuses" : status
    }`,
    14,
    38
  );

  doc.text(
    `Search : ${
      search === "" ? "None" : search
    }`,
    80,
    38
  );

  //=========================
  // Summary
  //=========================

  const totalRevenue = departments.reduce(
    (sum, d) => sum + d.revenue,
    0
  );

  const totalCollection = departments.reduce(
    (sum, d) => sum + d.collection,
    0
  );

  const totalPatients = departments.reduce(
    (sum, d) => sum + d.patients,
    0
  );

  const summaryY = 48;

  const cards = [
    [
      "Departments",
      departments.length.toString(),
    ],
    [
      "Revenue",
      formatCurrency(totalRevenue),
    ],
    [
      "Collection",
      formatCurrency(totalCollection),
    ],
    [
      "Patients",
      totalPatients.toLocaleString(),
    ],
  ];

  cards.forEach((card, index) => {
    const x = 14 + index * 67;

    doc.setDrawColor(210);

    doc.roundedRect(
      x,
      summaryY,
      60,
      18,
      2,
      2
    );

    doc.setFontSize(8);

    doc.setTextColor(100);

    doc.text(card[0], x + 30, summaryY + 6, {
      align: "center",
    });

    doc.setFontSize(11);

    doc.setTextColor(0);

    doc.setFont("helvetica", "bold");

    doc.text(card[1], x + 30, summaryY + 13, {
      align: "center",
    });
  });

  //=========================
  // Table
  //=========================

  autoTable(doc, {
    startY: 74,

    head: [
      [
        "Department",
        "Revenue",
        "Collection",
        "Patients",
        "Yesterday",
        "Variance",
        "Variance %",
        "Status",
      ],
    ],

    body: departments.map((dept) => [
      dept.department,
      formatCurrency(dept.revenue),
      formatCurrency(dept.collection),
      dept.patients.toLocaleString(),
      formatCurrency(dept.yesterdayRevenue),
      `${dept.variance >= 0 ? "+" : ""}${formatCurrency(
        dept.variance
      )}`,
      `${dept.variancePercentage}%`,
      dept.status,
    ]),

    theme: "grid",

    styles: {
      fontSize: 8,
      cellPadding: 3,
      valign: "middle",
      halign: "center",
    },

    headStyles: {
      fillColor: [20, 82, 160],
      textColor: 255,
      halign: "center",
      fontStyle: "bold",
    },

    columnStyles: {
      1: { halign: "center" },
      2: { halign: "center" },
      3: { halign: "center" },
      4: { halign: "center" },
      5: { halign: "center" },
      6: { halign: "center" },
      7: { halign: "center" },
    },

    didParseCell(data) {
      if (
        data.section === "body" &&
        data.column.index === 5
      ) {
        const value =
          departments[data.row.index].variance;

        if (value >= 0) {
          data.cell.styles.textColor = [0, 140, 0];
        } else {
          data.cell.styles.textColor = [220, 0, 0];
        }
      }

      if (
        data.section === "body" &&
        data.column.index === 6
      ) {
        const value =
          departments[data.row.index]
            .variancePercentage;

        if (value >= 0) {
          data.cell.styles.textColor = [0, 140, 0];
        } else {
          data.cell.styles.textColor = [220, 0, 0];
        }
      }

      if (
        data.section === "body" &&
        data.column.index === 7
      ) {
        if (
          departments[data.row.index].status ===
          "Positive"
        ) {
          data.cell.styles.textColor = [0, 120, 0];
        } else {
          data.cell.styles.textColor = [200, 0, 0];
        }
      }
    },

    didDrawPage(_data) {
      const pageHeight =
        doc.internal.pageSize.getHeight();

      doc.setFontSize(8);

      doc.setTextColor(120);

      doc.text(
        "Confidential • Department Revenue Summary",
        14,
        pageHeight - 6
      );

      doc.text(
        `Page ${doc.getCurrentPageInfo().pageNumber}`,
        pageWidth - 28,
        pageHeight - 6
      );
    },
  });

  doc.save("Department_Summary_Report.pdf");
}