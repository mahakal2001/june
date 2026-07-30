import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

type Doctor = {
  id: number;
  name: string;
  department: string;
  patients: number;
  revenue: number;
  rating: number;
};

export async function exportDoctorsExcel(rows: Doctor[]) {
  const workbook = new ExcelJS.Workbook();

  workbook.creator = "Leads Health Care";
  workbook.company = "Leads Health Care";
  workbook.created = new Date();

  const worksheet = workbook.addWorksheet("Top Doctors Report", {
    pageSetup: {
      paperSize: 9,
      orientation: "landscape",
      fitToPage: true,
      fitToWidth: 1,
      fitToHeight: 0,
      margins: {
        left: 0.3,
        right: 0.3,
        top: 0.5,
        bottom: 0.5,
        header: 0.2,
        footer: 0.2,
      },
    },
    views: [
      {
        state: "frozen",
        ySplit: 10,
      },
    ],
  });

  // =========================================
  // HEADER
  // =========================================

  worksheet.mergeCells("A1:E1");

  worksheet.getCell("A1").value = "LEADS HEALTH CARE";

  worksheet.getCell("A1").font = {
    size: 22,
    bold: true,
    color: { argb: "FFFFFFFF" },
  };

  worksheet.getCell("A1").alignment = {
    horizontal: "center",
    vertical: "middle",
  };

  worksheet.getCell("A1").fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: {
      argb: "0F172A",
    },
  };

  worksheet.getRow(1).height = 34;

  worksheet.mergeCells("A2:E2");

  worksheet.getCell("A2").value =
    "Top Performing Doctors Report";

  worksheet.getCell("A2").font = {
    size: 16,
    bold: true,
  };

  worksheet.getCell("A2").alignment = {
    horizontal: "center",
  };

  worksheet.mergeCells("A3:E3");

  worksheet.getCell("A3").value =
    `Generated : ${new Date().toLocaleString()}`;

  worksheet.getCell("A3").alignment = {
    horizontal: "center",
  };

  // =========================================
  // SUMMARY
  // =========================================

  const totalDoctors = rows.length;

  const totalPatients = rows.reduce(
    (sum, doctor) => sum + doctor.patients,
    0
  );

  const totalRevenue = rows.reduce(
    (sum, doctor) => sum + doctor.revenue,
    0
  );

  const avgRating =
    rows.length === 0
      ? 0
      : rows.reduce(
          (sum, doctor) => sum + doctor.rating,
          0
        ) / rows.length;

  const departments = new Set(
    rows.map((doctor) => doctor.department)
  ).size;

  worksheet.getCell("A5").value =
    "Executive Summary";

  worksheet.getCell("A5").font = {
    size: 14,
    bold: true,
  };

  const summary = [
    ["Total Doctors", totalDoctors],
    ["Departments", departments],
    ["Total Patients", totalPatients],
    ["Total Revenue", totalRevenue],
    ["Average Rating", avgRating.toFixed(2)],
  ];

  let summaryRow = 6;

  summary.forEach(([title, value]) => {
    worksheet.getCell(`A${summaryRow}`).value = title;

    worksheet.getCell(`A${summaryRow}`).font = {
      bold: true,
    };

    worksheet.getCell(`A${summaryRow}`).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: {
        argb: "E2E8F0",
      },
    };

    worksheet.getCell(`B${summaryRow}`).value = value;

    if (title === "Total Revenue") {
      worksheet.getCell(`B${summaryRow}`).numFmt =
        '#,##0';
    }

    summaryRow++;
  });

  // =========================================
  // TABLE HEADER
  // =========================================

  const tableStart = 13;

  const header = worksheet.getRow(tableStart);

  header.values = [
    "Doctor Name",
    "Department",
    "Patients",
    "Revenue",
    "Rating",
  ];

  header.height = 26;

  header.eachCell((cell) => {
    cell.font = {
      bold: true,
      color: {
        argb: "FFFFFFFF",
      },
    };

    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: {
        argb: "0F172A",
      },
    };

    cell.alignment = {
      horizontal: "center",
      vertical: "middle",
    };

    cell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
  });

  // =========================================
  // DATA
  // =========================================

  rows.forEach((doctor, index) => {
    const row = worksheet.addRow([
      doctor.name,
      doctor.department,
      doctor.patients,
      doctor.revenue,
      doctor.rating,
    ]);

    row.height = 22;

    row.getCell(3).numFmt = '#,##0';
    row.getCell(4).numFmt = '#,##0';

    row.alignment = {
      horizontal: "center",
      vertical: "middle",
    };

    row.eachCell((cell) => {
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    });

    if (index % 2 === 0) {
      row.eachCell((cell) => {
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: {
            argb: "F8FAFC",
          },
        };
      });
    }

    if (doctor.rating >= 4.8) {
      row.getCell(5).font = {
        bold: true,
        color: {
          argb: "16A34A",
        },
      };
    } else if (doctor.rating >= 4.5) {
      row.getCell(5).font = {
        bold: true,
        color: {
          argb: "EAB308",
        },
      };
    } else {
      row.getCell(5).font = {
        bold: true,
        color: {
          argb: "DC2626",
        },
      };
    }
  });

  // =========================================
  // COLUMN WIDTHS
  // =========================================

  worksheet.columns = [
    { width: 35 },
    { width: 24 },
    { width: 18 },
    { width: 22 },
    { width: 14 },
  ];

  // =========================================
  // AUTO FILTER
  // =========================================

  worksheet.autoFilter = {
    from: {
      row: tableStart,
      column: 1,
    },
    to: {
      row: tableStart,
      column: 5,
    },
  };

  // =========================================
  // FOOTER
  // =========================================

  worksheet.headerFooter.oddFooter =
    "&LLeads Health Care&CTop Performing Doctors Report&RPage &P of &N";

  // =========================================
  // DOWNLOAD
  // =========================================

  const buffer = await workbook.xlsx.writeBuffer();

  saveAs(
    new Blob([buffer]),
    `Top_Doctors_Report_${new Date()
      .toISOString()
      .slice(0, 10)}.xlsx`
  );
}