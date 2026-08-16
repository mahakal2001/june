import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// ======================================================
// TYPE
// ======================================================

export interface MonthlyDoctorData {
  name: string | undefined;
  avatar: string | undefined;

  id: number | string;

  doctor: string;

  department: string;

  patients: number;

  revenue: number;

  growth: number;

  rating: number;

  photo?: string;
}

// ======================================================
// EXPORT FUNCTION
// ======================================================

export function ExportMonthlyDoctorPerformancePDF(
  doctors: MonthlyDoctorData[],
  monthLabel: string,
  filters: {
    department: string;
    rating: string;
    search: string;
  }
) {
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

  const primary = [30, 64, 175];

  const primaryDark = [23, 48, 135];

  const emerald = [16, 185, 129];

  const red = [220, 38, 38];

  const slate900 = [15, 23, 42];

  const slate700 = [51, 65, 85];

  const slate500 = [100, 116, 139];

  const slate300 = [203, 213, 225];

  const slate200 = [226, 232, 240];

  const slate100 = [241, 245, 249];

  const slate50 = [248, 250, 252];

  const white = [255, 255, 255];

  const yellow = [202, 138, 4];

  // ====================================================
  // HELPERS
  // ====================================================

  const formatCurrency = (
    value: number
  ) => {
    return `Rs. ${new Intl.NumberFormat(
      "en-IN"
    ).format(value)}`;
  };

  const formatNumber = (
    value: number
  ) => {
    return new Intl.NumberFormat(
      "en-IN"
    ).format(value);
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

  const totalDoctors =
    doctors.length;

  const totalPatients =
    doctors.reduce(
      (sum, doctor) =>
        sum + doctor.patients,
      0
    );

  const totalRevenue =
    doctors.reduce(
      (sum, doctor) =>
        sum + doctor.revenue,
      0
    );

  const averageGrowth =
    totalDoctors > 0
      ? doctors.reduce(
          (sum, doctor) =>
            sum + doctor.growth,
          0
        ) / totalDoctors
      : 0;

  const averageRating =
    totalDoctors > 0
      ? doctors.reduce(
          (sum, doctor) =>
            sum + doctor.rating,
          0
        ) / totalDoctors
      : 0;

  const highestRevenueDoctor =
    doctors.length > 0
      ? [...doctors].sort(
          (a, b) =>
            b.revenue - a.revenue
        )[0]
      : null;

  const highestRatedDoctor =
    doctors.length > 0
      ? [...doctors].sort(
          (a, b) =>
            b.rating - a.rating
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
    "LEADS HEALTH CARE",
    margin,
    8
  );

  // ----------------------------------------------------
  // Main Title
  // ----------------------------------------------------

  doc.setFontSize(18);

  doc.text(
    "Doctor Performance Monthly MIS",
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
    `Monthly Doctor Performance Overview • ${monthLabel}`,
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
    `${totalDoctors} Doctors`,
    pageWidth - margin,
    20,
    {
      align: "right",
    }
  );

  doc.text(
    `${formatNumber(totalPatients)} Patients`,
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

  // Filter container

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
    `Department: ${getFilterLabel(
      filters.department,
      "All Departments"
    )}`,
    78,
    currentY + 3
  );

  const ratingLabel =
    filters.rating === "all"
      ? "All Ratings"
      : `${filters.rating} & Above`;

  doc.text(
    `Rating: ${ratingLabel}`,
    155,
    currentY + 3
  );

  doc.text(
    `Search: ${
      filters.search || "All Doctors"
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
    (pageWidth -
      margin * 2 -
      cardGap * 4) /
    5;

  const cardHeight = 26;

  const cards = [
    {
      title: "Total Doctors",
      value: formatNumber(
        totalDoctors
      ),
      accent: primary,
    },
    {
      title: "Total Patients",
      value: formatNumber(
        totalPatients
      ),
      accent: [124, 58, 237],
    },
    {
      title: "Total Revenue",
      value: formatCurrency(
        totalRevenue
      ),
      accent: emerald,
    },
    {
      title: "Average Growth",
      value: `${
        averageGrowth >= 0
          ? "+"
          : ""
      }${averageGrowth.toFixed(1)}%`,
      accent:
        averageGrowth >= 0
          ? emerald
          : red,
    },
    {
      title: "Average Rating",
      value: `${averageRating.toFixed(
        1
      )} / 5`,
      accent: [202, 138, 4],
    },
  ];

  let cardX = margin;

  cards.forEach(
    (card) => {
      // Card background

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

      // Border

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

      // Left accent

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

      // KPI title

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

      // KPI value

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
        cardWidth + cardGap;
    }
  );

  currentY +=
    cardHeight + 9;

  // ====================================================
  // PERFORMANCE HIGHLIGHT
  // ====================================================

  if (
    highestRevenueDoctor ||
    highestRatedDoctor
  ) {
    doc.setFillColor(
      239,
      246,
      255
    );

    doc.roundedRect(
      margin,
      currentY,
      pageWidth - margin * 2,
      17,
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
      17,
      2,
      2,
      "S"
    );

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

    if (highestRevenueDoctor) {
      doc.text(
        `Highest Revenue: ${highestRevenueDoctor.doctor} (${formatCurrency(
          highestRevenueDoctor.revenue
        )})`,
        margin + 6,
        currentY + 12
      );
    }

    if (highestRatedDoctor) {
      doc.text(
        `Top Rated: ${highestRatedDoctor.doctor} (${highestRatedDoctor.rating.toFixed(
          1
        )}/5)`,
        pageWidth / 2,
        currentY + 12
      );
    }

    currentY += 24;
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
    "Doctor Performance Details",
    margin,
    currentY
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

    head: [
      [
        "Doctor",
        "Department",
        "Patients",
        "Revenue",
        "Growth",
        "Rating",
      ],
    ],

    body: doctors.map(
      (doctor) => [
        doctor.doctor,

        doctor.department,

        formatNumber(
          doctor.patients
        ),

        formatCurrency(
          doctor.revenue
        ),

        `${
          doctor.growth >= 0
            ? "+"
            : ""
        }${doctor.growth.toFixed(1)}%`,

        `${doctor.rating.toFixed(
          1
        )} / 5`,
      ]
    ),

    // ==================================================
    // TABLE HEADER
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
    },

    // ==================================================
    // BODY
    // ==================================================

    bodyStyles: {
      fontSize: 8,

      textColor: [
        slate700[0],
        slate700[1],
        slate700[2],
      ],

      halign: "center",

      valign: "middle",

      cellPadding: 4,

      lineWidth: 0.1,

      lineColor: [
        slate200[0],
        slate200[1],
        slate200[2],
      ],
    },

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
        cellWidth: 63,
        halign: "center",
        fontStyle: "bold",
      },

      1: {
        cellWidth: 52,
        halign: "center",
      },

      2: {
        cellWidth: 29,
        halign: "center",
      },

      3: {
        cellWidth: 43,
        halign: "center",
      },

      4: {
        cellWidth: 31,
        halign: "center",
      },

      5: {
        cellWidth: 30,
        halign: "center",
      },
    },

    // ==================================================
    // CUSTOM CELLS
    // ==================================================

    didParseCell: (data) => {
      if (
        data.section ===
          "body" &&
        data.column.index === 3
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

      // Growth

      if (
        data.section ===
          "body" &&
        data.column.index === 4
      ) {
        const raw =
          Number(
            String(
              data.cell.raw
            ).replace(
              "%",
              ""
            )
          );

        data.cell.styles.fontStyle =
          "bold";

        if (raw >= 0) {
          data.cell.styles.textColor =
            [
              emerald[0],
              emerald[1],
              emerald[2],
            ];
        } else {
          data.cell.styles.textColor =
            [
              red[0],
              red[1],
              red[2],
            ];
        }
      }

      // Rating

      if (
        data.section ===
          "body" &&
        data.column.index === 5
      ) {
        data.cell.styles.fontStyle =
          "bold";

        data.cell.styles.textColor =
          [
            yellow[0],
            yellow[1],
            yellow[2],
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

    // Footer line

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

    // Left

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

    doc.text(
      "Leads Health Care • Doctor Performance Monthly MIS",
      margin,
      pageHeight - 6
    );

    // Center

    doc.text(
      "Confidential Management Report",
      pageWidth / 2,
      pageHeight - 6,
      {
        align: "center",
      }
    );

    // Right

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
    monthLabel
      .replace(
        /[^a-zA-Z0-9]/g,
        "_"
      );

  doc.save(
    `Monthly_Doctor_Performance_${safeWeekLabel}.pdf`
  );
}