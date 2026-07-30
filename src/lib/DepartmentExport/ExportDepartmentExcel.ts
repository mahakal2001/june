import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

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

export async function ExportDepartmentExcel(
  departments: Department[],
  status: string,
  search: string
) {
  const workbook = new ExcelJS.Workbook();

  workbook.creator = "Hospital MIS Dashboard";
  workbook.company = "Hospital Management System";
  workbook.created = new Date();
  workbook.modified = new Date();

  const worksheet = workbook.addWorksheet(
    "Department Summary",
    {
      views: [
        {
          state: "frozen",
          ySplit: 8,
        },
      ],
    }
  );

  //---------------------------------------
  // Report Title
  //---------------------------------------

  worksheet.mergeCells("A1:H1");

  const title = worksheet.getCell("A1");

  title.value = "Department Summary Report";

  title.font = {
    bold: true,
    size: 20,
    color: {
      argb: "FFFFFF",
    },
  };

  title.alignment = {
    vertical: "middle",
    horizontal: "center",
  };

  title.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: {
      argb: "1E40AF",
    },
  };

  worksheet.getRow(1).height = 30;

  //---------------------------------------
  // Report Information
  //---------------------------------------

  worksheet.getCell("A3").value = "Generated";
  worksheet.getCell("B3").value =
    new Date().toLocaleString();

  worksheet.getCell("A4").value = "Status Filter";
  worksheet.getCell("B4").value =
    status === "all" ? "All Status" : status;

  worksheet.getCell("A5").value = "Search";
  worksheet.getCell("B5").value =
    search || "None";

  //---------------------------------------
  // Summary
  //---------------------------------------

  const totalRevenue = departments.reduce(
    (sum, item) => sum + item.revenue,
    0
  );

  const totalCollection = departments.reduce(
    (sum, item) => sum + item.collection,
    0
  );

  const totalPatients = departments.reduce(
    (sum, item) => sum + item.patients,
    0
  );

  worksheet.getCell("D3").value = "Departments";
  worksheet.getCell("E3").value =
    departments.length;

  worksheet.getCell("D4").value = "Revenue";
  worksheet.getCell("E4").value =
    totalRevenue;

  worksheet.getCell("D5").value = "Collection";
  worksheet.getCell("E5").value =
    totalCollection;

  worksheet.getCell("D6").value = "Patients";
  worksheet.getCell("E6").value =
    totalPatients;

  //---------------------------------------
  // Header
  //---------------------------------------

  const headerRow = worksheet.addRow([
    "Department",
    "Revenue",
    "Collection",
    "Patients",
    "Yesterday",
    "Variance",
    "Variance %",
    "Status",
  ]);

  headerRow.height = 22;

  headerRow.eachCell((cell) => {
    cell.font = {
      bold: true,
      color: {
        argb: "FFFFFF",
      },
    };

    cell.alignment = {
      vertical: "middle",
      horizontal: "center",
    };

    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: {
        argb: "2563EB",
      },
    };

    cell.border = {
      top: { style: "thin" },
      bottom: { style: "thin" },
      left: { style: "thin" },
      right: { style: "thin" },
    };
  });

  //---------------------------------------
  // Data
  //---------------------------------------

  departments.forEach((department) => {
    const row = worksheet.addRow([
      department.department,
      department.revenue,
      department.collection,
      department.patients,
      department.yesterdayRevenue,
      department.variance,
      department.variancePercentage,
      department.status,
    ]);

    row.eachCell((cell) => {
      cell.border = {
        left: { style: "thin" },
        right: { style: "thin" },
        bottom: { style: "thin" },
      };
    });

    row.getCell(2).numFmt = '$#,##0';
    row.getCell(3).numFmt = '$#,##0';
    row.getCell(5).numFmt = '$#,##0';
    row.getCell(6).numFmt = '$#,##0';
    row.getCell(7).numFmt = '0.00"%"';

    if (department.variance >= 0) {
      row.getCell(6).font = {
        color: { argb: "008000" },
        bold: true,
      };

      row.getCell(7).font = {
        color: { argb: "008000" },
        bold: true,
      };
    } else {
      row.getCell(6).font = {
        color: { argb: "C00000" },
        bold: true,
      };

      row.getCell(7).font = {
        color: { argb: "C00000" },
        bold: true,
      };
    }

    row.getCell(8).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: {
        argb:
          department.status === "Positive"
            ? "D1FAE5"
            : "FEE2E2",
      },
    };
  });

  //---------------------------------------
  // Total Row
  //---------------------------------------

  const totalRow = worksheet.addRow([
    "TOTAL",
    totalRevenue,
    totalCollection,
    totalPatients,
    "",
    "",
    "",
    "",
  ]);

  totalRow.font = {
    bold: true,
  };

  totalRow.eachCell((cell) => {
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: {
        argb: "E5E7EB",
      },
    };

    cell.border = {
      top: { style: "medium" },
      bottom: { style: "medium" },
    };
  });

  //---------------------------------------
  // Auto Width
  //---------------------------------------

  worksheet.columns.forEach((column) => {
    let max = 15;

    column.eachCell?.((cell) => {
      const value = cell.value
        ? cell.value.toString().length
        : 10;

      if (value > max) {
        max = value;
      }
    });

    column.width = max + 3;
  });

  //---------------------------------------
  // Auto Filter
  //---------------------------------------

  worksheet.autoFilter = {
    from: "A7",
    to: "H7",
  };

  //---------------------------------------
  // Download
  //---------------------------------------

  const buffer = await workbook.xlsx.writeBuffer();

  saveAs(
    new Blob([buffer]),
    "Department_Summary_Report.xlsx"
  );
}