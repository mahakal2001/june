import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

type Variance = {
  metric: string;
  expected: number;
  actual: number;
  variance: number;
  variancePercentage: number;
  status: string;
};

type Filters = {
  metric: string;
  status: string;
};

export function ExportVariancePDF(
rows: Variance[], _status: string, _metric: string, _search: string, filters: Filters, generatedOn: Date) {
  const doc = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();

  // ===========================
  // HEADER
  // ===========================

  doc.setFillColor(30, 64, 175);
  doc.rect(0, 0, pageWidth, 22, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text("Leads Health Care", 14, 10);

  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text(
    "Variance Analysis Report",
    14,
    17
  );

  doc.setTextColor(60);

  let y = 32;

  // ===========================
  // REPORT INFO
  // ===========================

  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");

  doc.text(
    `Generated : ${generatedOn.toLocaleString()}`,
    14,
    y
  );

  doc.text(
    `Metric : ${
      filters.metric === "all"
        ? "All"
        : filters.metric
    }`,
    120,
    y
  );

  doc.text(
    `Status : ${
      filters.status === "all"
        ? "All"
        : filters.status
    }`,
    220,
    y
  );

  y += 12;

  // ===========================
  // SUMMARY
  // ===========================

  const positive = rows.filter(
    (x) => x.status === "Positive"
  ).length;

  const negative = rows.filter(
    (x) => x.status === "Negative"
  ).length;

  doc.setFillColor(248, 250, 252);
  doc.roundedRect(14, y, 265, 18, 2, 2, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);

  doc.text(
    `Total Metrics : ${rows.length}`,
    20,
    y + 11
  );

  doc.setTextColor(22, 163, 74);

  doc.text(
    `Positive : ${positive}`,
    110,
    y + 11
  );

  doc.setTextColor(220, 38, 38);

  doc.text(
    `Negative : ${negative}`,
    180,
    y + 11
  );

  doc.setTextColor(40);

  y += 28;

  // ===========================
  // TABLE
  // ===========================

  autoTable(doc, {
    startY: y,

    head: [[
      "#",
      "Metric",
      "Expected",
      "Actual",
      "Variance",
      "Variance %",
      "Status",
    ]],

    body: rows.map((item, index) => [
      index + 1,
      item.metric,
      item.expected.toLocaleString(),
      item.actual.toLocaleString(),
      item.variance > 0
        ? "+" + item.variance.toLocaleString()
        : item.variance.toLocaleString(),
      `${item.variancePercentage.toFixed(2)}%`,
      item.status,
    ]),

    styles: {
      fontSize: 9,
      cellPadding: 4,
      valign: "middle",
      lineColor: [225, 225, 225],
      lineWidth: 0.2,
    },

    headStyles: {
      fillColor: [30, 64, 175],
      textColor: 255,
      halign: "center",
      fontStyle: "bold",
    },

    bodyStyles: {
      halign: "center",
    },

    alternateRowStyles: {
      fillColor: [248, 250, 252],
    },

    columnStyles: {
      1: {
        halign: "left",
      },
    },

    didParseCell(data) {
      if (
        data.section === "body" &&
        data.column.index === 4
      ) {
        const value =
          rows[data.row.index].variance;

        if (value >= 0) {
          data.cell.styles.textColor = [
            22,
            163,
            74,
          ];
          data.cell.styles.fontStyle = "bold";
        } else {
          data.cell.styles.textColor = [
            220,
            38,
            38,
          ];
          data.cell.styles.fontStyle = "bold";
        }
      }

      if (
        data.section === "body" &&
        data.column.index === 5
      ) {
        const value =
          rows[data.row.index]
            .variancePercentage;

        if (value >= 0) {
          data.cell.styles.textColor = [
            22,
            163,
            74,
          ];
          data.cell.styles.fontStyle = "bold";
        } else {
          data.cell.styles.textColor = [
            220,
            38,
            38,
          ];
          data.cell.styles.fontStyle = "bold";
        }
      }

      if (
        data.section === "body" &&
        data.column.index === 6
      ) {
        const status =
          rows[data.row.index].status;

        if (status === "Positive") {
          data.cell.styles.textColor = [
            22,
            163,
            74,
          ];
        } else {
          data.cell.styles.textColor = [
            220,
            38,
            38,
          ];
        }

        data.cell.styles.fontStyle = "bold";
      }
    },

    didDrawPage(_data) {
      const pageHeight =
        doc.internal.pageSize.getHeight();

      doc.setDrawColor(230);

      doc.line(
        14,
        pageHeight - 12,
        pageWidth - 14,
        pageHeight - 12
      );

      doc.setFontSize(9);

      doc.setTextColor(120);

      doc.text(
        "Leads Health Care • Variance Analysis Report",
        14,
        pageHeight - 6
      );

      doc.text(
        `Page ${doc.getCurrentPageInfo().pageNumber}`,
        pageWidth - 30,
        pageHeight - 6
      );
    },
  });

  doc.save("Variance_Analysis_Report.pdf");
}