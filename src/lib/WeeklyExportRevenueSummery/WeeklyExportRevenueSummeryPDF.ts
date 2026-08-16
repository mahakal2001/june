import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// ======================================================
// TYPE
// ======================================================

export interface WeeklyRevenueLeakageData {
  id: number | string;

  label: string;

  amount: number;

  icon?: unknown;
}


// ======================================================
// EXPORT FUNCTION
// ======================================================

export function WeeklyExportRevenueSummeryPDF(
  items: WeeklyRevenueLeakageData[],
  totalLeakage: number,
  growth: number,
  weekLabel: string,
  filters: {
    leakageFilter: string;
    sortBy: string;
    sortAscending: boolean;
    search: string;
  }
) {
  // ====================================================
  // EMPTY DATA
  // ====================================================

  if (!items || items.length === 0) {
    alert(
      "No revenue leakage data available to export."
    );

    return;
  }

  // ====================================================
  // DOCUMENT
  // ====================================================

  const doc = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a4",
  });

  const pageWidth =
    doc.internal.pageSize.getWidth();

  const pageHeight =
    doc.internal.pageSize.getHeight();

  const margin = 14;

  // ====================================================
  // COLORS
  // ====================================================

  const primary = [
    30,
    64,
    175,
  ];

  const primaryDark = [
    23,
    48,
    135,
  ];

  const primaryLight = [
    239,
    246,
    255,
  ];

  const emerald = [
    16,
    185,
    129,
  ];

  const red = [
    220,
    38,
    38,
  ];

  const purple = [
    124,
    58,
    237,
  ];

  const yellow = [
    202,
    138,
    4,
  ];

  const orange = [
    234,
    88,
    12,
  ];

  const slate900 = [
    15,
    23,
    42,
  ];

  const slate700 = [
    51,
    65,
    85,
  ];

  const slate500 = [
    100,
    116,
    139,
  ];

  const slate300 = [
    203,
    213,
    225,
  ];

  const slate200 = [
    226,
    232,
    240,
  ];

  const slate100 = [
    241,
    245,
    249,
  ];

  const slate50 = [
    248,
    250,
    252,
  ];

  const white = [
    255,
    255,
    255,
  ];

  // ====================================================
  // HELPERS
  // ====================================================

  const formatCurrency = (
    value: number
  ) => {
    return `Rs. ${new Intl.NumberFormat(
      "en-IN"
    ).format(
      Number(value || 0)
    )}`;
  };

  const formatNumber = (
    value: number
  ) => {
    return new Intl.NumberFormat(
      "en-IN"
    ).format(
      Number(value || 0)
    );
  };

  const formatDate = () => {
    return new Date().toLocaleString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  };

  const getFilterLabel = (
    value: string,
    defaultValue: string
  ) => {
    return value === "all" ||
      !value
      ? defaultValue
      : value;
  };

  // ====================================================
  // SUMMARY CALCULATIONS
  // ====================================================

  const totalLeakageTypes =
    items.length;

  const calculatedTotalLeakage =
    items.reduce(
      (sum, item) =>
        sum +
        Number(item.amount || 0),
      0
    );

  const reportTotalLeakage =
    Number(totalLeakage || 0) ||
    calculatedTotalLeakage;

  const averageLeakage =
    totalLeakageTypes > 0
      ? reportTotalLeakage /
        totalLeakageTypes
      : 0;

  const highestLeakage =
    items.length > 0
      ? [...items].sort(
          (a, b) =>
            Number(b.amount || 0) -
            Number(a.amount || 0)
        )[0]
      : null;

  const lowestLeakage =
    items.length > 0
      ? [...items].sort(
          (a, b) =>
            Number(a.amount || 0) -
            Number(b.amount || 0)
        )[0]
      : null;

  const sortedItems = [...items].sort(
    (a, b) =>
      Number(b.amount || 0) -
      Number(a.amount || 0)
  );

  // ====================================================
  // PERCENTAGE
  // ====================================================

  const getPercentage = (
    amount: number
  ) => {
    if (!reportTotalLeakage) {
      return 0;
    }

    return (
      (Number(amount || 0) /
        reportTotalLeakage) *
      100
    );
  };


  // ====================================================
  // HEADER
  // ====================================================

  doc.setFillColor(
    primary[0],
    primary[1],
    primary[2]
  );

  doc.rect(
    0,
    0,
    pageWidth,
    31,
    "F"
  );

  // ----------------------------------------------------
  // Hospital Name
  // ----------------------------------------------------

  doc.setTextColor(
    white[0],
    white[1],
    white[2]
  );

  doc.setFont(
    "helvetica",
    "bold"
  );

  doc.setFontSize(9);

  doc.text(
    "HOSPITAL MANAGEMENT SYSTEM",
    margin,
    8
  );

  // ----------------------------------------------------
  // Main Title
  // ----------------------------------------------------

  doc.setFontSize(18);

  doc.text(
    "Revenue Leakage Weekly MIS",
    margin,
    17
  );

  // ----------------------------------------------------
  // Subtitle
  // ----------------------------------------------------

  doc.setFont(
    "helvetica",
    "normal"
  );

  doc.setFontSize(8.5);

  doc.text(
    `Weekly Revenue Leakage Analysis • ${weekLabel}`,
    margin,
    24
  );

  // ----------------------------------------------------
  // Right Information
  // ----------------------------------------------------

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
    13,
    {
      align: "right",
    }
  );

  doc.setFont(
    "helvetica",
    "normal"
  );

  doc.setFontSize(8);

  doc.text(
    `${formatNumber(
      totalLeakageTypes
    )} Leakage Categories`,
    pageWidth - margin,
    20,
    {
      align: "right",
    }
  );

  doc.text(
    `${formatCurrency(
      reportTotalLeakage
    )} Total Leakage`,
    pageWidth - margin,
    25,
    {
      align: "right",
    }
  );

  // ====================================================
  // FILTER SECTION
  // ====================================================

  let currentY = 39;

  doc.setTextColor(
    slate700[0],
    slate700[1],
    slate700[2]
  );

  doc.setFont(
    "helvetica",
    "bold"
  );

  doc.setFontSize(9);

  doc.text(
    "REPORT FILTERS",
    margin,
    currentY
  );

  currentY += 6;

  // ----------------------------------------------------
  // Filter Container
  // ----------------------------------------------------

  doc.setFillColor(
    slate50[0],
    slate50[1],
    slate50[2]
  );

  doc.roundedRect(
    margin,
    currentY - 4,
    pageWidth - margin * 2,
    12,
    2,
    2,
    "F"
  );

  doc.setDrawColor(
    slate200[0],
    slate200[1],
    slate200[2]
  );

  doc.roundedRect(
    margin,
    currentY - 4,
    pageWidth - margin * 2,
    12,
    2,
    2,
    "S"
  );

  doc.setFont(
    "helvetica",
    "normal"
  );

  doc.setFontSize(8);

  doc.setTextColor(
    slate700[0],
    slate700[1],
    slate700[2]
  );

  doc.text(
    `Week: ${weekLabel}`,
    margin + 6,
    currentY + 3
  );

  doc.text(
    `Leakage: ${getFilterLabel(
      filters.leakageFilter,
      "All Leakage Types"
    )}`,
    82,
    currentY + 3
  );

  const sortLabel =
    filters.sortBy === "label"
      ? "Category"
      : "Amount";

  const directionLabel =
    filters.sortAscending
      ? "Ascending"
      : "Descending";

  doc.text(
    `Sort: ${sortLabel} • ${directionLabel}`,
    155,
    currentY + 3
  );

  doc.text(
    `Search: ${
      filters.search ||
      "All Categories"
    }`,
    pageWidth - margin - 6,
    currentY + 3,
    {
      align: "right",
    }
  );

  currentY += 17;

  // ====================================================
  // KPI CARDS
  // ====================================================

  const cardGap = 4;

  const cardWidth =
    (
      pageWidth -
      margin * 2 -
      cardGap * 4
    ) / 5;

  const cardHeight = 26;

  const cards = [
    {
      title: "Leakage Categories",

      value:
        formatNumber(
          totalLeakageTypes
        ),

      accent: primary,
    },

    {
      title: "Total Leakage",

      value:
        formatCurrency(
          reportTotalLeakage
        ),

      accent: red,
    },

    {
      title: "Average Leakage",

      value:
        formatCurrency(
          averageLeakage
        ),

      accent: orange,
    },

    {
      title: "Leakage Growth",

      value: `${
        growth >= 0
          ? "+"
          : ""
      }${Number(
        growth || 0
      ).toFixed(1)}%`,

      accent:
        growth >= 0
          ? red
          : emerald,
    },

    {
      title: "Top Leakage Share",

      value:
        highestLeakage
          ? `${getPercentage(
              highestLeakage.amount
            ).toFixed(1)}%`
          : "0.0%",

      accent: purple,
    },
  ];

  let cardX = margin;

  cards.forEach(
    (card) => {
      // ------------------------------------------------
      // Card Background
      // ------------------------------------------------

      doc.setFillColor(
        white[0],
        white[1],
        white[2]
      );

      doc.roundedRect(
        cardX,
        currentY,
        cardWidth,
        cardHeight,
        2,
        2,
        "F"
      );

      // ------------------------------------------------
      // Border
      // ------------------------------------------------

      doc.setDrawColor(
        slate200[0],
        slate200[1],
        slate200[2]
      );

      doc.roundedRect(
        cardX,
        currentY,
        cardWidth,
        cardHeight,
        2,
        2,
        "S"
      );

      // ------------------------------------------------
      // Accent
      // ------------------------------------------------

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

      // ------------------------------------------------
      // Title
      // ------------------------------------------------

      doc.setTextColor(
        slate500[0],
        slate500[1],
        slate500[2]
      );

      doc.setFont(
        "helvetica",
        "normal"
      );

      doc.setFontSize(7);

      doc.text(
        card.title,
        cardX + 7,
        currentY + 8
      );

      // ------------------------------------------------
      // Value
      // ------------------------------------------------

      doc.setTextColor(
        slate900[0],
        slate900[1],
        slate900[2]
      );

      doc.setFont(
        "helvetica",
        "bold"
      );

      doc.setFontSize(
        card.title ===
          "Total Leakage" ||
        card.title ===
          "Average Leakage"
          ? 10
          : 12
      );

      doc.text(
        card.value,
        cardX + 7,
        currentY + 19
      );

      cardX +=
        cardWidth +
        cardGap;
    }
  );

  currentY +=
    cardHeight + 9;

  // ====================================================
  // PERFORMANCE HIGHLIGHTS
  // ====================================================

  if (
    highestLeakage ||
    lowestLeakage
  ) {
    doc.setFillColor(
      primaryLight[0],
      primaryLight[1],
      primaryLight[2]
    );

    doc.roundedRect(
      margin,
      currentY,
      pageWidth - margin * 2,
      20,
      2,
      2,
      "F"
    );

    doc.setDrawColor(
      191,
      219,
      254
    );

    doc.roundedRect(
      margin,
      currentY,
      pageWidth - margin * 2,
      20,
      2,
      2,
      "S"
    );

    // --------------------------------------------------
    // Title
    // --------------------------------------------------

    doc.setFont(
      "helvetica",
      "bold"
    );

    doc.setFontSize(7);

    doc.setTextColor(
      primary[0],
      primary[1],
      primary[2]
    );

    doc.text(
      "LEAKAGE HIGHLIGHTS",
      margin + 6,
      currentY + 6
    );

    // --------------------------------------------------
    // Highest Leakage
    // --------------------------------------------------

    doc.setFont(
      "helvetica",
      "normal"
    );

    doc.setFontSize(7.8);

    doc.setTextColor(
      slate700[0],
      slate700[1],
      slate700[2]
    );

    if (highestLeakage) {
      doc.text(
        `Highest Leakage: ${highestLeakage.label} (${formatCurrency(
          highestLeakage.amount
        )})`,
        margin + 6,
        currentY + 13
      );
    }

    // --------------------------------------------------
    // Lowest Leakage
    // --------------------------------------------------

    if (lowestLeakage) {
      doc.text(
        `Lowest Leakage: ${lowestLeakage.label} (${formatCurrency(
          lowestLeakage.amount
        )})`,
        pageWidth / 2,
        currentY + 13
      );
    }

    // --------------------------------------------------
    // Growth
    // --------------------------------------------------

    doc.text(
      `Overall Growth: ${
        growth >= 0
          ? "+"
          : ""
      }${Number(
        growth || 0
      ).toFixed(1)}%`,
      pageWidth - margin - 6,
      currentY + 13,
      {
        align: "right",
      }
    );

    currentY += 27;
  }

  // ====================================================
  // SECTION TITLE
  // ====================================================

  doc.setFont(
    "helvetica",
    "bold"
  );

  doc.setFontSize(10);

  doc.setTextColor(
    slate900[0],
    slate900[1],
    slate900[2]
  );

  doc.text(
    "Revenue Leakage Details",
    margin,
    currentY
  );

  doc.setFont(
    "helvetica",
    "normal"
  );

  doc.setFontSize(7.5);

  doc.setTextColor(
    slate500[0],
    slate500[1],
    slate500[2]
  );

  doc.text(
    `${formatNumber(
      totalLeakageTypes
    )} leakage categories`,
    pageWidth - margin,
    currentY,
    {
      align: "right",
    }
  );

  currentY += 5;

  // ====================================================
  // TABLE
  // ====================================================

  autoTable(doc, {
    startY: currentY,

    margin: {
      left: margin,
      right: margin,
      bottom: 18,
    },

    // --------------------------------------------------
    // HEADER
    // --------------------------------------------------

    head: [
      [
        "#",
        "Leakage Category",
        "Amount",
        "% of Total",
        "Impact",
      ],
    ],

    // --------------------------------------------------
    // BODY
    // --------------------------------------------------

    body: sortedItems.map(
      (item, index) => [
        index + 1,

        item.label,

        formatCurrency(
          item.amount
        ),

        `${getPercentage(
          item.amount
        ).toFixed(1)}%`,

        "Leakage",
      ]
    ),

    // ==================================================
    // HEADER STYLE
    // ==================================================

    headStyles: {
      fillColor: [
        primary[0],
        primary[1],
        primary[2],
      ],

      textColor: 255,

      fontStyle: "bold",

      fontSize: 8,

      halign: "center",

      valign: "middle",

      cellPadding: 4,

      lineWidth: 0,

      minCellHeight: 10,
    },

    // ==================================================
    // BODY STYLE
    // ==================================================

    bodyStyles: {
      fontSize: 8.5,

      textColor: [
        slate700[0],
        slate700[1],
        slate700[2],
      ],

      halign: "center",

      valign: "middle",

      cellPadding: 4.2,

      lineWidth: 0.1,

      lineColor: [
        slate200[0],
        slate200[1],
        slate200[2],
      ],

      minCellHeight: 11,
    },

    // ==================================================
    // ALTERNATING ROWS
    // ==================================================

    alternateRowStyles: {
      fillColor: [
        slate50[0],
        slate50[1],
        slate50[2],
      ],
    },

    // ==================================================
    // COLUMN WIDTHS
    // ==================================================

    columnStyles: {
      0: {
        cellWidth: 14,

        halign: "center",

        valign: "middle",
      },

      1: {
        cellWidth: 105,

        halign: "center",

        valign: "middle",

        fontStyle: "bold",
      },

      2: {
        cellWidth: 52,

        halign: "center",

        valign: "middle",
      },

      3: {
        cellWidth: 45,

        halign: "center",

        valign: "middle",
      },

      4: {
        cellWidth: 45,

        halign: "center",

        valign: "middle",
      },
    },

    // ==================================================
    // CUSTOM CELLS
    // ==================================================

    didParseCell: (data) => {
      // ----------------------------------------------
      // Force center alignment
      // ----------------------------------------------

      data.cell.styles.halign =
        "center";

      data.cell.styles.valign =
        "middle";

      // ----------------------------------------------
      // Leakage Category
      // ----------------------------------------------

      if (
        data.section ===
          "body" &&
        data.column.index === 1
      ) {
        data.cell.styles.fontStyle =
          "bold";

        data.cell.styles.textColor =
          [
            primary[0],
            primary[1],
            primary[2],
          ];
      }

      // ----------------------------------------------
      // Amount
      // ----------------------------------------------

      if (
        data.section ===
          "body" &&
        data.column.index === 2
      ) {
        data.cell.styles.fontStyle =
          "bold";

        data.cell.styles.textColor =
          [
            slate900[0],
            slate900[1],
            slate900[2],
          ];
      }

      // ----------------------------------------------
      // Percentage
      // ----------------------------------------------

      if (
        data.section ===
          "body" &&
        data.column.index === 3
      ) {
        data.cell.styles.fontStyle =
          "bold";

        data.cell.styles.textColor =
          [
            red[0],
            red[1],
            red[2],
          ];
      }

      // ----------------------------------------------
      // Impact
      // ----------------------------------------------

      if (
        data.section ===
          "body" &&
        data.column.index === 4
      ) {
        data.cell.styles.fontStyle =
          "bold";

        data.cell.styles.textColor =
          [
            red[0],
            red[1],
            red[2],
          ];
      }
    },

    // ==================================================
    // TABLE SETTINGS
    // ==================================================

    showHead: "everyPage",

    pageBreak: "auto",

    rowPageBreak: "avoid",

    theme: "grid",
  });

  // ====================================================
  // FOOTER
  // ====================================================

  const totalPages =
    doc.getNumberOfPages();

  for (
    let page = 1;
    page <= totalPages;
    page++
  ) {
    doc.setPage(page);

    // --------------------------------------------------
    // Footer Line
    // --------------------------------------------------

    doc.setDrawColor(
      slate200[0],
      slate200[1],
      slate200[2]
    );

    doc.line(
      margin,
      pageHeight - 12,
      pageWidth - margin,
      pageHeight - 12
    );

    // --------------------------------------------------
    // Footer Font
    // --------------------------------------------------

    doc.setFont(
      "helvetica",
      "normal"
    );

    doc.setFontSize(7);

    doc.setTextColor(
      slate500[0],
      slate500[1],
      slate500[2]
    );

    // --------------------------------------------------
    // Left
    // --------------------------------------------------

    doc.text(
      "Hospital Management System • Revenue Leakage Weekly MIS",
      margin,
      pageHeight - 6
    );

    // --------------------------------------------------
    // Center
    // --------------------------------------------------

    doc.text(
      "Confidential Management Report",
      pageWidth / 2,
      pageHeight - 6,
      {
        align: "center",
      }
    );

    // --------------------------------------------------
    // Right
    // --------------------------------------------------

    doc.text(
      `Page ${page} of ${totalPages}`,
      pageWidth - margin,
      pageHeight - 6,
      {
        align: "right",
      }
    );
  }

  // ====================================================
  // SAVE
  // ====================================================

  const safeWeekLabel =
    weekLabel
      .replace(
        /[^a-zA-Z0-9]+/g,
        "_"
      )
      .replace(
        /^_+|_+$/g,
        ""
      );

  doc.save(
    `Weekly_Revenue_Leakage_Summary_${
      safeWeekLabel || "MIS"
    }.pdf`
  );
}