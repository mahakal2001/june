import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

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

export function ExportMonthlyMISDepartmentPDF(
  departments: DepartmentData[],
  monthLabel: string,
  status: string,
  search: string
) {
  // =====================================================
  // DOCUMENT
  // =====================================================

  const doc = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  const margin = 14;

  // =====================================================
  // HELPERS
  // =====================================================

  const formatCurrency = (value: number) => {
    return `Rs.${value.toLocaleString("en-IN")}`;
  };

  const formatNumber = (value: number) => {
    return value.toLocaleString("en-IN");
  };

  const formatDate = () => {
    return new Date().toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // =====================================================
  // SUMMARY CALCULATIONS
  // =====================================================

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

  // =====================================================
  // HEADER
  // =====================================================

  // Header background
  doc.setFillColor(30, 64, 175);

  doc.rect(
    0,
    0,
    pageWidth,
    31,
    "F"
  );

  // Hospital name
  doc.setTextColor(
    255,
    255,
    255
  );

  doc.setFont(
    "helvetica",
    "bold"
  );

  doc.setFontSize(9);

  doc.text(
    "LEADS HEALTH CARE",
    margin,
    8
  );

  // Main title
  doc.setFontSize(17);

  doc.text(
    "Department-wise Monthly MIS",
    margin,
    17
  );

  // Subtitle
  doc.setFont(
    "helvetica",
    "normal"
  );

  doc.setFontSize(8.5);

  doc.text(
    `Monthly Department Performance Overview • ${monthLabel}`,
    margin,
    24
  );

  // Right-side metadata

  doc.setFontSize(7.5);

  doc.text(
    "GENERATED",
    pageWidth - margin,
    8,
    {
      align: "right",
    }
  );

  doc.setFont(
    "helvetica",
    "bold"
  );

  doc.setFontSize(8);

  doc.text(
    formatDate(),
    pageWidth - margin,
    14,
    {
      align: "right",
    }
  );

  doc.setFont(
    "helvetica",
    "normal"
  );

  doc.setFontSize(7.5);

  doc.text(
    `${departments.length} Departments`,
    pageWidth - margin,
    21,
    {
      align: "right",
    }
  );

  // =====================================================
  // FILTER INFORMATION
  // =====================================================

  let currentY = 39;

  doc.setTextColor(
    51,
    65,
    85
  );

  doc.setFont(
    "helvetica",
    "bold"
  );

  doc.setFontSize(8.5);

  doc.text(
    "REPORT FILTERS",
    margin,
    currentY
  );

  currentY += 6;

  doc.setFont(
    "helvetica",
    "normal"
  );

  doc.setFontSize(8);

  // Month
  doc.text(
    `Month: ${monthLabel}`,
    margin,
    currentY
  );

  // Status
  doc.text(
    `Status: ${
      status === "all"
        ? "All"
        : status
    }`,
    85,
    currentY
  );

  // Search
  doc.text(
    `Search: ${
      search || "All Departments"
    }`,
    145,
    currentY
  );

  // Records
  doc.setFont(
    "helvetica",
    "bold"
  );

  doc.text(
    `Records: ${departments.length}`,
    pageWidth - margin,
    currentY,
    {
      align: "right",
    }
  );

  currentY += 9;

  // =====================================================
  // KPI CARDS
  // =====================================================

  const cardGap = 4;

  const cardWidth =
    (pageWidth -
      margin * 2 -
      cardGap * 4) /
    5;

  const cardHeight = 27;

  const cards = [
    {
      title: "Total Revenue",
      value: formatCurrency(
        totalRevenue
      ),
      accent: [30, 64, 175],
      align: "left" as const,
      currency: true,
    },

    {
      title: "Total Collection",
      value: formatCurrency(
        totalCollection
      ),
      accent: [5, 150, 105],
      align: "left" as const,
      currency: true,
    },

    {
      title: "Total Patients",
      value: formatNumber(
        totalPatients
      ),
      accent: [124, 58, 237],
      align: "center" as const,
      currency: false,
    },

    {
      title: "Avg. Growth",
      value: `+${averageGrowth.toFixed(
        1
      )}%`,
      accent: [234, 88, 12],
      align: "center" as const,
      currency: false,
    },

    {
      title: "Collection %",
      value: `${averageCollectionPercentage.toFixed(
        1
      )}%`,
      accent: [8, 145, 178],
      align: "center" as const,
      currency: false,
    },
  ];

  let cardX = margin;

  cards.forEach((card) => {
    // Card background
    doc.setFillColor(
      248,
      250,
      252
    );

    doc.setDrawColor(
      226,
      232,
      240
    );

    doc.setLineWidth(0.25);

    doc.roundedRect(
      cardX,
      currentY,
      cardWidth,
      cardHeight,
      2,
      2,
      "FD"
    );

    // Accent strip
    doc.setFillColor(
      card.accent[0],
      card.accent[1],
      card.accent[2]
    );

    doc.roundedRect(
      cardX,
      currentY,
      2.5,
      cardHeight,
      1,
      1,
      "F"
    );

    // =================================================
    // KPI TITLE
    // =================================================

    doc.setTextColor(
      100,
      116,
      139
    );

    doc.setFont(
      "helvetica",
      "bold"
    );

    doc.setFontSize(6.8);

    const contentX =
      card.align === "left"
        ? cardX + 8
        : cardX +
          cardWidth / 2;

    doc.text(
      card.title.toUpperCase(),
      contentX,
      currentY + 8,
      {
        align:
          card.align === "center"
            ? "center"
            : "left",
      }
    );

    // =================================================
    // KPI VALUE
    // =================================================

    doc.setTextColor(
      15,
      23,
      42
    );

    doc.setFont(
      "helvetica",
      "bold"
    );

    doc.setFontSize(
      card.title ===
        "Total Revenue" ||
      card.title ===
        "Total Collection"
        ? 11
        : 12
    );

    doc.text(
      card.value,
      contentX,
      currentY + 19,
      {
        align:
          card.align === "center"
            ? "center"
            : "left",
      }
    );

    cardX +=
      cardWidth + cardGap;
  });

  currentY +=
    cardHeight + 9;

  // =====================================================
  // SECTION TITLE
  // =====================================================

  doc.setTextColor(
    30,
    41,
    59
  );

  doc.setFont(
    "helvetica",
    "bold"
  );

  doc.setFontSize(10);

  doc.text(
    "Department Performance",
    margin,
    currentY
  );

  // Status summary

  doc.setFont(
    "helvetica",
    "normal"
  );

  doc.setFontSize(7.5);

  doc.setTextColor(
    100,
    116,
    139
  );

  doc.text(
    `Good: ${goodDepartments}   •   Average: ${averageDepartments}`,
    pageWidth - margin,
    currentY,
    {
      align: "right",
    }
  );

  currentY += 4;

  // =====================================================
  // TABLE
  // =====================================================

  autoTable(doc, {
    startY: currentY,

    margin: {
      left: margin,
      right: margin,
      bottom: 18,
    },

    head: [
      [
        "Department",
        "Revenue",
        "Growth",
        "Patients",
        "Collection",
        "Collection %",
        "Avg. LOS",
        "Status",
      ],
    ],

    body: departments.map(
      (department) => [
        department.department,

        formatCurrency(
          department.revenue
        ),

        // No icon
        `${department.growth >= 0 ? "+" : ""}${department.growth.toFixed(
          1
        )}%`,

        formatNumber(
          department.patients
        ),

        formatCurrency(
          department.collection
        ),

        `${department.collectionPercentage.toFixed(
          1
        )}%`,

        department.avgLOS.toFixed(
          1
        ),

        department.status,
      ]
    ),

    // ===================================================
    // TABLE HEADER
    // ===================================================

    headStyles: {
      fillColor: [
        30,
        64,
        175,
      ],

      textColor: 255,

      fontStyle: "bold",

      fontSize: 7.8,

      halign: "center",

      valign: "middle",

      cellPadding: {
        top: 3.5,
        right: 3,
        bottom: 3.5,
        left: 3,
      },

      lineColor: [
        30,
        64,
        175,
      ],

      lineWidth: 0.2,
    },

    // ===================================================
    // TABLE BODY
    // ===================================================

    bodyStyles: {
      fontSize: 7.8,

      textColor: [
        51,
        65,
        85,
      ],

      valign: "middle",

      halign: "center",

      cellPadding: {
        top: 3.5,
        right: 3,
        bottom: 3.5,
        left: 3,
      },

      lineWidth: 0.15,

      lineColor: [
        226,
        232,
        240,
      ],
    },

    alternateRowStyles: {
      fillColor: [
        248,
        250,
        252,
      ],
    },

    // ===================================================
    // COLUMN WIDTHS
    // ===================================================

    columnStyles: {
      // Department
      0: {
        cellWidth: 52,
        halign: "center",
        fontStyle: "bold",
      },

      // Revenue
      1: {
        cellWidth: 34,
        halign: "center",
      },

      // Growth
      2: {
        cellWidth: 24,
        halign: "center",
      },

      // Patients
      3: {
        cellWidth: 28,
        halign: "center",
      },

      // Collection
      4: {
        cellWidth: 34,
        halign: "center",
      },

      // Collection %
      5: {
        cellWidth: 30,
        halign: "center",
      },

      // Avg LOS
      6: {
        cellWidth: 24,
        halign: "center",
      },

      // Status
      7: {
        cellWidth: 28,
        halign: "center",
      },
    },

    // ===================================================
    // CUSTOM CELL FORMATTING
    // ===================================================

    didParseCell: (data) => {
      if (
        data.section === "body"
      ) {
        // Growth
        if (
          data.column.index === 2
        ) {
          const value =
            Number(
              String(
                data.cell.raw
              ).replace("%", "")
            );

          data.cell.styles.fontStyle =
            "bold";

          if (value >= 0) {
            data.cell.styles.textColor =
              [5, 150, 105];
          } else {
            data.cell.styles.textColor =
              [220, 38, 38];
          }
        }

        // Status
        if (
          data.column.index === 7
        ) {
          data.cell.styles.fontStyle =
            "bold";

          if (
            data.cell.raw ===
            "Good"
          ) {
            data.cell.styles.textColor =
              [5, 150, 105];
          }

          if (
            data.cell.raw ===
            "Average"
          ) {
            data.cell.styles.textColor =
              [234, 88, 12];
          }
        }

        // Revenue / Collection
        if (
          data.column.index ===
            1 ||
          data.column.index ===
            4
        ) {
          data.cell.styles.fontStyle =
            "bold";

          data.cell.styles.textColor =
            [30, 41, 59];
        }

        // Department
        if (
          data.column.index === 0
        ) {
          data.cell.styles.fontStyle =
            "bold";

          data.cell.styles.textColor =
            [15, 23, 42];
        }
      }
    },

    // ===================================================
    // TABLE HEADER REPEAT
    // ===================================================

    showHead: "everyPage",

    pageBreak: "auto",

    rowPageBreak: "avoid",

    theme: "grid",
  });

  // =====================================================
  // FOOTER
  // =====================================================

  const totalPages =
    doc.getNumberOfPages();

  for (
    let page = 1;
    page <= totalPages;
    page++
  ) {
    doc.setPage(page);

    // Footer separator
    doc.setDrawColor(
      226,
      232,
      240
    );

    doc.setLineWidth(0.3);

    doc.line(
      margin,
      pageHeight - 12,
      pageWidth - margin,
      pageHeight - 12
    );

    // Left footer
    doc.setFont(
      "helvetica",
      "normal"
    );

    doc.setFontSize(7);

    doc.setTextColor(
      100,
      116,
      139
    );

    doc.text(
      "Leads Health Care • Department-wise Monthly MIS",
      margin,
      pageHeight - 6
    );

    // Center footer
    doc.text(
      "Confidential Management Report",
      pageWidth / 2,
      pageHeight - 6,
      {
        align: "center",
      }
    );

    // Right footer
    doc.text(
      `Page ${page} of ${totalPages}`,
      pageWidth - margin,
      pageHeight - 6,
      {
        align: "right",
      }
    );
  }

  // =====================================================
  // SAVE PDF
  // =====================================================

  const safeMonthLabel =
    monthLabel.replace(
      /[^a-zA-Z0-9]/g,
      "_"
    );

  doc.save(
    `Monthly_Department_MIS_${safeMonthLabel}.pdf`
  );
}