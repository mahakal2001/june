import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// ======================================================
// TYPE
// ======================================================

export interface MonthlyProcedureData {
  id: number | string;

  procedure: string;

  count: number;

  revenue: number;

  growth: number;
}


// ======================================================
// EXPORT FUNCTION
// ======================================================

export function MonthlyExportProcedurePDF(
  procedures: MonthlyProcedureData[],
  monthLabel: string,
  filters: {
    procedure: string;
    growth: string;
    search: string;
  }
) {

  // ====================================================
  // EMPTY DATA
  // ====================================================

  if (
    !procedures ||
    procedures.length === 0
  ) {

    alert(
      "No procedure performance data available to export."
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
    58,
    138,
  ];

  const primaryDark = [
    23,
    37,
    84,
  ];

  const primaryLight = [
    239,
    246,
    255,
  ];

  const emerald = [
    5,
    150,
    105,
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

  const totalProcedures =
    procedures.length;


  const totalCount =
    procedures.reduce(
      (sum, procedure) =>
        sum +
        Number(
          procedure.count || 0
        ),
      0
    );


  const totalRevenue =
    procedures.reduce(
      (sum, procedure) =>
        sum +
        Number(
          procedure.revenue || 0
        ),
      0
    );


  const averageGrowth =
    totalProcedures > 0
      ? procedures.reduce(
          (sum, procedure) =>
            sum +
            Number(
              procedure.growth || 0
            ),
          0
        ) / totalProcedures
      : 0;


  const positiveGrowthProcedures =
    procedures.filter(
      (procedure) =>
        Number(
          procedure.growth || 0
        ) >= 0
    ).length;


  const highestRevenueProcedure =
    procedures.length > 0
      ? [...procedures].sort(
          (a, b) =>
            Number(b.revenue || 0) -
            Number(a.revenue || 0)
        )[0]
      : null;


  const highestVolumeProcedure =
    procedures.length > 0
      ? [...procedures].sort(
          (a, b) =>
            Number(b.count || 0) -
            Number(a.count || 0)
        )[0]
      : null;


  const highestGrowthProcedure =
    procedures.length > 0
      ? [...procedures].sort(
          (a, b) =>
            Number(b.growth || 0) -
            Number(a.growth || 0)
        )[0]
      : null;


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
    "Top Procedures Monthly MIS",
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
    `Monthly Procedure Performance Overview • ${monthLabel}`,
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
      totalProcedures
    )} Procedures`,
    pageWidth - margin,
    20,
    {
      align: "right",
    }
  );


  doc.text(
    `${formatNumber(
      totalCount
    )} Total Procedures`,
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
    `Month: ${monthLabel}`,
    margin + 6,
    currentY + 3
  );


  doc.text(
    `Procedure: ${getFilterLabel(
      filters.procedure,
      "All Procedures"
    )}`,
    78,
    currentY + 3
  );


  const growthLabel =
    getFilterLabel(
      filters.growth,
      "All Growth"
    );


  doc.text(
    `Growth: ${growthLabel}`,
    155,
    currentY + 3
  );


  doc.text(
    `Search: ${
      filters.search ||
      "All Procedures"
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
      title: "Total Procedures",

      value:
        formatNumber(
          totalProcedures
        ),

      accent: primary,
    },

    {
      title: "Total Count",

      value:
        formatNumber(
          totalCount
        ),

      accent: purple,
    },

    {
      title: "Total Revenue",

      value:
        formatCurrency(
          totalRevenue
        ),

      accent: emerald,
    },

    {
      title: "Average Growth",

      value:
        `${
          averageGrowth >= 0
            ? "+"
            : ""
        }${averageGrowth.toFixed(
          1
        )}%`,

      accent:
        averageGrowth >= 0
          ? emerald
          : red,
    },

    {
      title: "Positive Growth",

      value:
        `${positiveGrowthProcedures} / ${totalProcedures}`,

      accent: yellow,
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
      // KPI Title
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
      // KPI Value
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
          "Total Revenue"
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
    cardHeight +
    9;


  // ====================================================
  // PERFORMANCE HIGHLIGHTS
  // ====================================================

  if (
    highestRevenueProcedure ||
    highestVolumeProcedure ||
    highestGrowthProcedure
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
      "PERFORMANCE HIGHLIGHTS",
      margin + 6,
      currentY + 6
    );


    // --------------------------------------------------
    // Highlight 1
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


    if (
      highestRevenueProcedure
    ) {

      doc.text(
        `Highest Revenue: ${highestRevenueProcedure.procedure} (${formatCurrency(
          highestRevenueProcedure.revenue
        )})`,
        margin + 6,
        currentY + 13
      );

    }


    // --------------------------------------------------
    // Highlight 2
    // --------------------------------------------------

    if (
      highestVolumeProcedure
    ) {

      doc.text(
        `Highest Volume: ${highestVolumeProcedure.procedure} (${formatNumber(
          highestVolumeProcedure.count
        )})`,
        pageWidth / 2,
        currentY + 13
      );

    }


    // --------------------------------------------------
    // Highlight 3
    // --------------------------------------------------

    if (
      highestGrowthProcedure
    ) {

      doc.text(
        `Highest Growth: ${highestGrowthProcedure.procedure} (${
          highestGrowthProcedure.growth >= 0
            ? "+"
            : ""
        }${highestGrowthProcedure.growth.toFixed(
          1
        )}%)`,
        pageWidth - margin - 6,
        currentY + 13,
        {
          align: "right",
        }
      );

    }


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
    "Procedure Performance Details",
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
      totalProcedures
    )} procedures`,
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

  // ==================================================
  // HEADER
  // ==================================================

  head: [
    [
      "#",
      "Procedure",
      "Count",
      "Revenue",
      "Growth",
    ],
  ],

  // ==================================================
  // BODY
  // ==================================================

  body: procedures.map((procedure, index) => [
    index + 1,

    procedure.procedure,

    formatNumber(procedure.count),

    formatCurrency(procedure.revenue),

    `${procedure.growth >= 0 ? "+" : ""}${Number(
      procedure.growth || 0
    ).toFixed(1)}%`,
  ]),

  // ==================================================
  // TABLE HEADER STYLE
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

    // IMPORTANT
    halign: "center",
    valign: "middle",

    cellPadding: {
      top: 4,
      bottom: 4,
      left: 3,
      right: 3,
    },

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

    // IMPORTANT
    halign: "center",
    valign: "middle",

    cellPadding: {
      top: 4.5,
      bottom: 4.5,
      left: 3,
      right: 3,
    },

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
  // COLUMN WIDTHS + ALIGNMENT
  // ==================================================

  columnStyles: {
    // -----------------------------------------------
    // #
    // -----------------------------------------------

    0: {
      cellWidth: 12,

      halign: "center",
      valign: "middle",

      fontStyle: "bold",
    },

    // -----------------------------------------------
    // Procedure
    // -----------------------------------------------

    1: {
      cellWidth: 105,

      // CENTER PROCEDURE NAME
      halign: "center",
      valign: "middle",

      fontStyle: "bold",

      cellPadding: {
        top: 4.5,
        bottom: 4.5,
        left: 5,
        right: 5,
      },
    },

    // -----------------------------------------------
    // Count
    // -----------------------------------------------

    2: {
      cellWidth: 35,

      halign: "center",
      valign: "middle",

      fontStyle: "bold",
    },

    // -----------------------------------------------
    // Revenue
    // -----------------------------------------------

    3: {
      cellWidth: 55,

      halign: "center",
      valign: "middle",

      fontStyle: "bold",
    },

    // -----------------------------------------------
    // Growth
    // -----------------------------------------------

    4: {
      cellWidth: 45,

      halign: "center",
      valign: "middle",

      fontStyle: "bold",
    },
  },

  // ==================================================
  // CUSTOM CELL STYLING
  // ==================================================

  didParseCell: (data) => {
    // ------------------------------------------------
    // Force ALL cells to center
    // ------------------------------------------------

    data.cell.styles.halign = "center";
    data.cell.styles.valign = "middle";

    // ------------------------------------------------
    // HEADER
    // ------------------------------------------------

    if (data.section === "head") {
      data.cell.styles.fontStyle = "bold";
      data.cell.styles.halign = "center";
      data.cell.styles.valign = "middle";
    }

    // ------------------------------------------------
    // Procedure
    // ------------------------------------------------

    if (
      data.section === "body" &&
      data.column.index === 1
    ) {
      data.cell.styles.fontStyle = "bold";

      data.cell.styles.textColor = [
        primary[0],
        primary[1],
        primary[2],
      ];

      data.cell.styles.halign = "center";
      data.cell.styles.valign = "middle";
    }

    // ------------------------------------------------
    // Count
    // ------------------------------------------------

    if (
      data.section === "body" &&
      data.column.index === 2
    ) {
      data.cell.styles.fontStyle = "bold";

      data.cell.styles.textColor = [
        primary[0],
        primary[1],
        primary[2],
      ];

      data.cell.styles.halign = "center";
      data.cell.styles.valign = "middle";
    }

    // ------------------------------------------------
    // Revenue
    // ------------------------------------------------

    if (
      data.section === "body" &&
      data.column.index === 3
    ) {
      data.cell.styles.fontStyle = "bold";

      data.cell.styles.textColor = [
        slate900[0],
        slate900[1],
        slate900[2],
      ];

      data.cell.styles.halign = "center";
      data.cell.styles.valign = "middle";
    }

    // ------------------------------------------------
    // Growth
    // ------------------------------------------------

    if (
      data.section === "body" &&
      data.column.index === 4
    ) {
      const raw = Number(
        String(data.cell.raw).replace("%", "")
      );

      data.cell.styles.fontStyle = "bold";

      data.cell.styles.halign = "center";
      data.cell.styles.valign = "middle";

      if (raw >= 0) {
        data.cell.styles.textColor = [
          emerald[0],
          emerald[1],
          emerald[2],
        ];
      } else {
        data.cell.styles.textColor = [
          red[0],
          red[1],
          red[2],
        ];
      }
    }
  },

  // ==================================================
  // TABLE SETTINGS
  // ==================================================

  showHead: "everyPage",

  pageBreak: "auto",

  rowPageBreak: "avoid",

  theme: "grid",

  // ==================================================
  // TABLE WIDTH
  // ==================================================

  tableWidth: "auto",
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

    doc.setPage(
      page
    );


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
      "Hospital Management System • Procedure Performance Monthly MIS",
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

  const safeMonthLabel =
    monthLabel
      .replace(
        /[^a-zA-Z0-9]+/g,
        "_"
      )
      .replace(
        /^_+|_+$/g,
        ""
      );


  doc.save(
    `Monthly_Procedure_Performance_${
      safeMonthLabel || "MIS"
    }.pdf`
  );

}