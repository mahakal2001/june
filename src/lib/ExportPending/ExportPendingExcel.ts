import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

type PendingTask = {
  id: number;
  title: string;
  count: number;
};

type ExportPendingExcelProps = {
  data: PendingTask[];
  search: string;
  priority: string;
  task: string;
};

export async function ExportPendingExcel({
  data,
  search,
  priority,
  task,
}: ExportPendingExcelProps) {
  const workbook = new ExcelJS.Workbook();

  workbook.creator = "Leads Health Care";
  workbook.company = "Leads Health Care";
  workbook.subject = "Pending Tasks Report";
  workbook.title = "Pending Tasks Report";

  const sheet = workbook.addWorksheet("Pending Tasks", {
    properties: {
      defaultRowHeight: 22,
    },
    views: [
      {
        state: "frozen",
        ySplit: 7,
      },
    ],
  });

  // Hospital Name
  sheet.mergeCells("A1:D1");

  const hospital = sheet.getCell("A1");

  hospital.value = "LEADS HEALTH CARE";

  hospital.font = {
    size: 18,
    bold: true,
    color: {
      argb: "FFFFFFFF",
    },
  };

  hospital.alignment = {
    horizontal: "center",
    vertical: "middle",
  };

  hospital.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: {
      argb: "1E40AF",
    },
  };

  // Report Title

  sheet.mergeCells("A2:D2");

  const title = sheet.getCell("A2");

  title.value = "Pending Tasks Report";

  title.font = {
    bold: true,
    size: 15,
  };

  title.alignment = {
    horizontal: "center",
  };

  // Generated

  sheet.mergeCells("A3:D3");

  sheet.getCell("A3").value =
    `Generated : ${new Date().toLocaleString("en-IN")}`;

  // Filters

  sheet.getCell("A5").value = "Search";
  sheet.getCell("B5").value = search || "All";

  sheet.getCell("C5").value = "Task";
  sheet.getCell("D5").value =
    task === "all" ? "All Tasks" : task;

  sheet.getCell("A6").value = "Priority";
  sheet.getCell("B6").value =
    priority === "all"
      ? "All Priorities"
      : priority;

  sheet.getCell("C6").value = "Total Records";
  sheet.getCell("D6").value = data.length;

  // Header

  const header = sheet.addRow([
    "Sl No",
    "Task",
    "Pending Count",
    "Priority",
  ]);

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
        argb: "2563EB",
      },
    };

    cell.border = {
      top: {
        style: "thin",
      },
      left: {
        style: "thin",
      },
      bottom: {
        style: "thin",
      },
      right: {
        style: "thin",
      },
    };
  });

  // Data

  data.forEach((item, index) => {
    let priorityText = "Low";

    if (item.count >= 40)
      priorityText = "Critical";
    else if (item.count >= 25)
      priorityText = "High";
    else if (item.count >= 15)
      priorityText = "Medium";

    const row = sheet.addRow([
      index + 1,
      item.title,
      item.count,
      priorityText,
    ]);

    row.eachCell((cell) => {
      cell.border = {
        top: {
          style: "thin",
        },
        left: {
          style: "thin",
        },
        bottom: {
          style: "thin",
        },
        right: {
          style: "thin",
        },
      };

      cell.alignment = {
        vertical: "middle",
        horizontal: "center",
      };
    });

    // Alternate row

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

    // Priority Color

    const priorityCell = row.getCell(4);

    switch (priorityText) {
      case "Critical":
        priorityCell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: {
            argb: "FECACA",
          },
        };
        priorityCell.font = {
          bold: true,
          color: {
            argb: "991B1B",
          },
        };
        break;

      case "High":
        priorityCell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: {
            argb: "FED7AA",
          },
        };
        priorityCell.font = {
          bold: true,
          color: {
            argb: "9A3412",
          },
        };
        break;

      case "Medium":
        priorityCell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: {
            argb: "FEF3C7",
          },
        };
        priorityCell.font = {
          bold: true,
          color: {
            argb: "854D0E",
          },
        };
        break;

      default:
        priorityCell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: {
            argb: "DCFCE7",
          },
        };
        priorityCell.font = {
          bold: true,
          color: {
            argb: "166534",
          },
        };
    }
  });

  // Auto Width

  sheet.columns.forEach((column) => {
    let maxLength = 15;

    column.eachCell?.({
      includeEmpty: true,
    }, (cell) => {
      const value = cell.value
        ? cell.value.toString()
        : "";

      maxLength = Math.max(
        maxLength,
        value.length + 4
      );
    });

    column.width = maxLength;
  });

  // Footer

  const footerRow = sheet.addRow([]);

  footerRow.commit();

  const summary = sheet.addRow([
    `Total Pending Tasks : ${data.length}`,
  ]);

  sheet.mergeCells(
    `A${summary.number}:D${summary.number}`
  );

  summary.font = {
    bold: true,
  };

  summary.alignment = {
    horizontal: "right",
  };

  const buffer = await workbook.xlsx.writeBuffer();

  saveAs(
    new Blob([buffer]),
    `Pending_Tasks_Report_${
      new Date().toISOString().split("T")[0]
    }.xlsx`
  );
}