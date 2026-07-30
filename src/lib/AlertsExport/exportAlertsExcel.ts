import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

export async function exportAlertsExcel(
  alerts: any[],
  filters: {
    priority: string;
    category: string;
    status: string;
  }
) {
  const workbook = new ExcelJS.Workbook();

  workbook.creator = "Leads Health Care";
  workbook.company = "Leads Health Care";
  workbook.subject = "Critical Alerts Report";
  workbook.title = "Alerts & Notifications";

  const sheet = workbook.addWorksheet("Alerts");

  sheet.views = [
    {
      state: "frozen",
      ySplit: 7,
    },
  ];

  //---------------------------------------
  // Hospital Title
  //---------------------------------------

  sheet.mergeCells("A1:E1");

  const title = sheet.getCell("A1");

  title.value = "LEADS HEALTH CARE";

  title.font = {
    size: 22,
    bold: true,
    color: {
      argb: "FFFFFFFF",
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
      argb: "2563EB",
    },
  };

  sheet.getRow(1).height = 32;

  //---------------------------------------

  sheet.mergeCells("A2:E2");

  const sub = sheet.getCell("A2");

  sub.value = "Alerts & Notifications Report";

  sub.font = {
    size: 15,
    bold: true,
  };

  sub.alignment = {
    horizontal: "center",
  };

  //---------------------------------------

  sheet.addRow([]);

  sheet.addRow([
    "Generated",
    new Date().toLocaleString(),
  ]);

  sheet.addRow([
    "Priority Filter",
    filters.priority,
  ]);

  sheet.addRow([
    "Category Filter",
    filters.category,
  ]);

  sheet.addRow([
    "Status Filter",
    filters.status,
  ]);

  sheet.addRow([]);

  //---------------------------------------

  const header = sheet.addRow([
    "Alert",
    "Priority",
    "Category",
    "Status",
    "Last Updated",
  ]);

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
        argb: "1E40AF",
      },
    };

    cell.alignment = {
      vertical: "middle",
      horizontal: "center",
    };

    cell.border = {
      top: { style: "thin" },
      bottom: { style: "thin" },
      left: { style: "thin" },
      right: { style: "thin" },
    };
  });

  //---------------------------------------
  // DATA
  //---------------------------------------

  alerts.forEach((alert, index) => {
    const row = sheet.addRow([
      alert.title,
      alert.priority,
      alert.category,
      alert.status,
      new Date().toLocaleString(),
    ]);

    row.height = 24;

    row.eachCell((cell) => {
      cell.border = {
        top: {
          style: "thin",
        },
        bottom: {
          style: "thin",
        },
        left: {
          style: "thin",
        },
        right: {
          style: "thin",
        },
      };

      cell.alignment = {
        vertical: "middle",
      };

      if (index % 2 === 0) {
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: {
            argb: "F8FAFC",
          },
        };
      }
    });

    //---------------------------------------
    // Priority Color
    //---------------------------------------

    const priority = row.getCell(2);

    switch (alert.priority) {
      case "Critical":
        priority.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FEE2E2" },
        };
        priority.font = {
          color: {
            argb: "B91C1C",
          },
          bold: true,
        };
        break;

      case "High":
        priority.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FED7AA" },
        };
        priority.font = {
          color: {
            argb: "C2410C",
          },
          bold: true,
        };
        break;

      case "Medium":
        priority.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FEF3C7" },
        };
        priority.font = {
          color: {
            argb: "B45309",
          },
          bold: true,
        };
        break;

      default:
        priority.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "DCFCE7" },
        };
        priority.font = {
          color: {
            argb: "15803D",
          },
          bold: true,
        };
    }
  });

  //---------------------------------------
  // Auto Width
  //---------------------------------------

  sheet.columns.forEach((column) => {
    let max = 15;

    column.eachCell?.((cell) => {
      const length = cell.value
        ? cell.value.toString().length
        : 10;

      if (length > max)
        max = length;
    });

    column.width = max + 4;
  });

  //---------------------------------------

  const buffer = await workbook.xlsx.writeBuffer();

  saveAs(
    new Blob([buffer]),
    `Alerts_Report_${Date.now()}.xlsx`
  );
}