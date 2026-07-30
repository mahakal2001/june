import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

type RevenueExceptionRow = {
  department: string;
  expected: number;
  actual: number;
  variance: number;
  variancePercent: number;
  status: "Positive" | "Negative";
};

const money = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
  }).format(value);

export function exportPDF(rows: RevenueExceptionRow[]) {
  const doc = new jsPDF({
    orientation: "landscape",
    unit: "pt",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();

  //----------------------------------------------------
  // Header
  //----------------------------------------------------

  doc.setFillColor(15, 23, 42);
  doc.rect(0, 0, pageWidth, 70, "F");

  doc.setTextColor(255);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(24);

  doc.text(
    "Revenue Exceptions Report",
    40,
    42
  );

  doc.setFontSize(10);

  doc.text(
    "Leads Health Care",
    40,
    58
  );

  doc.text(
    `Generated : ${new Date().toLocaleString()}`,
    pageWidth - 220,
    42
  );

  //----------------------------------------------------
  // Summary
  //----------------------------------------------------

  const totalExpected = rows.reduce(
    (a, b) => a + b.expected,
    0
  );

  const totalActual = rows.reduce(
    (a, b) => a + b.actual,
    0
  );

  const totalVariance = totalActual - totalExpected;

  const positive = rows.filter(
    (r) => r.status === "Positive"
  ).length;

  const negative = rows.filter(
    (r) => r.status === "Negative"
  ).length;

  doc.setTextColor(0);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);

  doc.setFont("helvetica", "bold");
doc.setFontSize(18);
doc.text("Executive Summary", 40, 105);

const summary = [
  ["Departments", rows.length],
  ["Expected Revenue", `Rs. ${money(totalExpected)}`],
  ["Actual Revenue", `Rs. ${money(totalActual)}`],
  ["Variance", `Rs. ${money(totalVariance)}`],
  ["Positive", positive],
  ["Negative", negative],
];

let x = 40;
let y = 125;

summary.forEach((item, index) => {

  doc.setFillColor(247,248,250);
  doc.roundedRect(x, y, 145, 55, 5, 5, "F");

  doc.setFontSize(10);
  doc.setTextColor(110);
  doc.text(String(item[0]), x + 10, y + 18);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  doc.setTextColor(0);
  doc.text(String(item[1]), x + 10, y + 40);

  x += 155;

  if ((index + 1) % 3 === 0) {
    x = 40;
    y += 70;
  }

});

  //----------------------------------------------------
  // Table
  //----------------------------------------------------

  autoTable(doc, {
    startY:285,

    head: [[
      "Department",
      "Expected",
      "Actual",
      "Variance",
      "Variance %",
      "Status",
    ]],

    body: rows.map((r) => [
      r.department,
      `Rs. ${money(r.expected)}`,
      `Rs. ${money(r.actual)}`,
      `${r.variance >= 0 ? "+" : "-"} Rs. ${money(
        Math.abs(r.variance)
      )}`,
      `${r.variance >= 0 ? "+" : "-"} ${Math.abs(
        r.variancePercent
      ).toFixed(2)}%`,
      r.status,
    ]),

    theme: "grid",

    styles: {
      font: "helvetica",
      fontSize: 10,
      cellPadding: 8,
      valign: "middle",
      halign: "center",
      lineColor: [230, 230, 230],
      lineWidth: 0.3,
    },

    headStyles:{
    fillColor:[17,24,39],
    textColor:[255,255,255],
    fontSize:12,
    fontStyle:"bold",
    halign:"center",
    valign:"middle",
    minCellHeight:30,
  },

    alternateRowStyles: {
      fillColor: [248, 250, 252],
    },

    didParseCell(data) {
      if (
        data.section === "body" &&
        data.column.index === 3
      ) {
        const value = rows[data.row.index].variance;

        data.cell.styles.textColor =
          value >= 0
            ? [22, 163, 74]
            : [220, 38, 38];
      }

      if (
        data.section === "body" &&
        data.column.index === 4
      ) {
        const value = rows[data.row.index].variance;

        data.cell.styles.textColor =
          value >= 0
            ? [22, 163, 74]
            : [220, 38, 38];
      }

      if (
        data.section === "body" &&
        data.column.index === 5
      ) {
        data.cell.styles.textColor =
          rows[data.row.index].status === "Positive"
            ? [22, 163, 74]
            : [220, 38, 38];

        data.cell.styles.fontStyle = "bold";
      }
    },

    margin: {
      left: 40,
      right: 40,
    },
  });

  //----------------------------------------------------
  // Footer
  //----------------------------------------------------

  const pages = doc.getNumberOfPages();

  for (let i = 1; i <= pages; i++) {
    doc.setPage(i);

    doc.setDrawColor(220);
    doc.line(
      40,
      565,
      pageWidth - 40,
      565
    );

    doc.setFontSize(9);

    doc.setTextColor(120);

    doc.text(
      "Leads Health Care",
      40,
      585
    );

    doc.text(
      `Page ${i} of ${pages}`,
      pageWidth - 90,
      585
    );
  }


  //----------------------------------------------------
  // Save
  //----------------------------------------------------

  doc.save(
    `Revenue_Report_${new Date()
      .toISOString()
      .slice(0, 10)}.pdf`
  );
}