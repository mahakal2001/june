import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

type RevenueExceptionRow = {
  department: string;
  expected: number;
  actual: number;
  variance: number;
  variancePercent: number;
  status: "Positive" | "Negative";
};

export async function exportExcel(rows: RevenueExceptionRow[]) {
  const workbook = new ExcelJS.Workbook();

  workbook.creator = "Leads Health Care";
  workbook.created = new Date();

  const sheet = workbook.addWorksheet("Revenue Report", {
    views: [
      {
        state: "frozen",
        ySplit: 9,
      },
    ],
  });

  // =====================================
  // Title
  // =====================================

  sheet.mergeCells("A1:F1");
  sheet.getCell("A1").value = "LEADS HEALTH CARE";

  sheet.getCell("A1").font = {
    size: 20,
    bold: true,
    color: { argb: "FFFFFFFF" },
  };

  sheet.getCell("A1").alignment = {
    horizontal: "center",
    vertical: "middle",
  };

  sheet.getCell("A1").fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "0F172A" },
  };

  sheet.getRow(1).height = 35;

  sheet.mergeCells("A2:F2");
  sheet.getCell("A2").value = "Revenue Exceptions Report";

  sheet.getCell("A2").font = {
    size: 16,
    bold: true,
  };

  sheet.getCell("A2").alignment = {
    horizontal: "center",
  };

  sheet.mergeCells("A3:F3");

  sheet.getCell("A3").value =
    `Generated : ${new Date().toLocaleString()}`;

  sheet.getCell("A3").alignment = {
    horizontal: "center",
  };

  // =====================================
  // Executive Summary
  // =====================================

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
    r => r.status === "Positive"
  ).length;

  const negative = rows.filter(
    r => r.status === "Negative"
  ).length;

  sheet.getCell("A5").value = "Executive Summary";

  sheet.getCell("A5").font = {
    size: 14,
    bold: true,
  };

  const summary = [
    ["Departments", rows.length],
    ["Expected Revenue", totalExpected],
    ["Actual Revenue", totalActual],
    ["Variance", totalVariance],
    ["Positive", positive],
    ["Negative", negative],
  ];

  let row = 6;

  summary.forEach(([label, value]) => {
    sheet.getCell(`A${row}`).value = label;

    sheet.getCell(`A${row}`).font = {
      bold: true,
    };

    sheet.getCell(`B${row}`).value = value;

    row++;
  });

  sheet.getColumn("A").width = 25;
  sheet.getColumn("B").width = 20;

  // =====================================
  // Table
  // =====================================

  const start = 14;

  const header = sheet.getRow(start);

  header.values = [
    "Department",
    "Expected",
    "Actual",
    "Variance",
    "Variance %",
    "Status",
  ];

  header.height = 25;

  header.eachCell((cell) => {
    cell.font = {
      bold: true,
      color: {
        argb: "FFFFFFFF",
      },
    };

    cell.alignment = {
      horizontal: "center",
      vertical: "middle",
    };

    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: {
        argb: "0F172A",
      },
    };

    cell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      right: { style: "thin" },
      bottom: { style: "thin" },
    };
  });

  rows.forEach((r) => {
    const excelRow = sheet.addRow([
      r.department,
      r.expected,
      r.actual,
      r.variance,
      r.variancePercent / 100,
      r.status,
    ]);

    excelRow.getCell(2).numFmt = '#,##0';
    excelRow.getCell(3).numFmt = '#,##0';
    excelRow.getCell(4).numFmt = '#,##0';
    excelRow.getCell(5).numFmt = '0.00%';

    excelRow.alignment = {
      horizontal: "center",
      vertical: "middle",
    };

    excelRow.eachCell((cell) => {
      cell.border = {
        top: { style: "thin" },
        bottom: { style: "thin" },
        left: { style: "thin" },
        right: { style: "thin" },
      };
    });

    if (r.status === "Positive") {
      excelRow.getCell(6).font = {
        color: {
          argb: "15803D",
        },
        bold: true,
      };
    } else {
      excelRow.getCell(6).font = {
        color: {
          argb: "DC2626",
        },
        bold: true,
      };
    }
  });

  // =====================================
  // Auto Width
  // =====================================

  sheet.columns = [
    { width: 28 },
    { width: 18 },
    { width: 18 },
    { width: 18 },
    { width: 18 },
    { width: 18 },
  ];

  // =====================================
  // Filter
  // =====================================

  sheet.autoFilter = {
    from: {
      row: start,
      column: 1,
    },
    to: {
      row: start,
      column: 6,
    },
  };

  // =====================================
  // Footer
  // =====================================

  sheet.headerFooter.oddFooter =
    "&LLeads Health Care&RP &P of &N";

  // =====================================
  // Download
  // =====================================

  const buffer = await workbook.xlsx.writeBuffer();

  saveAs(
    new Blob([buffer]),
    `Revenue_Report_${new Date()
      .toISOString()
      .slice(0, 10)}.xlsx`
  );
}