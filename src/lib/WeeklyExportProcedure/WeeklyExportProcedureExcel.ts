import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

// ======================================================
// TYPE
// ======================================================

export interface WeeklyProcedureExcelData {
  id: number | string;

  procedure: string;

  count: number;

  revenue: number;

  growth: number;
}

// ======================================================
// OPTIONS
// ======================================================

interface ExportOptions {
  procedure?: string;

  growth?: string;

  search?: string;

  hospitalName?: string;

  hospitalSubtitle?: string;
}

// ======================================================
// MAIN EXPORT FUNCTION
// ======================================================

export async function ExportWeeklyProcedureExcel(
  data: WeeklyProcedureExcelData[],
  weekLabel: string,
  options: ExportOptions = {}
) {
  try {
    console.log("Weekly Procedure Excel export started");
    console.log("Procedure Excel data:", data);

    // ====================================================
    // WORKBOOK
    // ====================================================

    const workbook = new ExcelJS.Workbook();

    workbook.creator =
      options.hospitalName ||
      "Hospital Management System";

    workbook.company =
      options.hospitalName ||
      "Hospital Management System";

    workbook.created = new Date();

    workbook.modified = new Date();

    // ====================================================
    // COLORS
    // ====================================================

    const COLORS = {
      darkBlue: "1E3A8A",
      blue: "1E40AF",
      mediumBlue: "2563EB",

      slate: "334155",
      slateDark: "0F172A",

      lightBlue: "EFF6FF",
      lighterBlue: "F8FAFC",

      lightGray: "F1F5F9",
      border: "CBD5E1",

      white: "FFFFFF",
      black: "111827",
      text: "334155",
      muted: "64748B",

      green: "047857",
      greenLight: "ECFDF5",

      red: "B91C1C",
      redLight: "FEF2F2",

      yellow: "CA8A04",
      yellowLight: "FEFCE8",
    };

    // ====================================================
    // WORKSHEET
    // ====================================================

    // IMPORTANT:
    // No views / ySplit.
    // Therefore the Excel sheet remains completely unfrozen.

    const worksheet = workbook.addWorksheet(
      "Weekly Procedure MIS",
      {
        properties: {
          defaultRowHeight: 22,

          tabColor: {
            argb: COLORS.darkBlue,
          },
        },

        pageSetup: {
          paperSize: 9,

          orientation: "landscape",

          fitToPage: true,

          fitToWidth: 1,

          fitToHeight: 0,

          margins: {
            left: 0.25,
            right: 0.25,
            top: 0.5,
            bottom: 0.5,
            header: 0.2,
            footer: 0.2,
          },
        },
      }
    );

    // ====================================================
    // FILTER DISPLAY
    // ====================================================

    const procedureFilter =
      options.procedure &&
      options.procedure !== "all"
        ? options.procedure
        : "All Procedures";

    const growthFilter =
      options.growth &&
      options.growth !== "all"
        ? options.growth === "positive"
          ? "Positive Growth"
          : options.growth === "high"
          ? "15% & Above"
          : options.growth === "low"
          ? "Below 15%"
          : "All Growth"
        : "All Growth";

    const searchFilter =
      options.search?.trim()
        ? options.search.trim()
        : "All Procedures";

    // ====================================================
    // DATE / TIME
    // ====================================================

    const generatedAt = new Date();

    const generatedDate =
      generatedAt.toLocaleDateString(
        "en-IN",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }
      );

    const generatedTime =
      generatedAt.toLocaleTimeString(
        "en-IN",
        {
          hour: "2-digit",
          minute: "2-digit",
        }
      );

    // ====================================================
    // COLUMN WIDTHS
    // ====================================================

    worksheet.columns = [
      {
        key: "serial",
        width: 7,
      },

      {
        key: "procedure",
        width: 38,
      },

      {
        key: "count",
        width: 16,
      },

      {
        key: "revenue",
        width: 22,
      },

      {
        key: "growth",
        width: 16,
      },

      {
        key: "performance",
        width: 18,
      },
    ];

    // ====================================================
    // HEADER
    // ====================================================

    worksheet.mergeCells("A1:F1");

    const hospitalCell =
      worksheet.getCell("A1");

    hospitalCell.value =
      options.hospitalName ||
      "HOSPITAL MANAGEMENT SYSTEM";

    hospitalCell.font = {
      size: 22,

      bold: true,

      color: {
        argb: COLORS.white,
      },
    };

    hospitalCell.alignment = {
      horizontal: "center",

      vertical: "middle",
    };

    hospitalCell.fill = {
      type: "pattern",

      pattern: "solid",

      fgColor: {
        argb: COLORS.darkBlue,
      },
    };

    worksheet.getRow(1).height = 36;

    // ====================================================
    // SUBTITLE
    // ====================================================

    worksheet.mergeCells("A2:F2");

    const subtitleCell =
      worksheet.getCell("A2");

    subtitleCell.value =
      options.hospitalSubtitle ||
      "Management Information System";

    subtitleCell.font = {
      size: 11,

      bold: true,

      color: {
        argb: COLORS.muted,
      },
    };

    subtitleCell.alignment = {
      horizontal: "center",

      vertical: "middle",
    };

    worksheet.getRow(2).height = 22;

    // ====================================================
    // REPORT TITLE
    // ====================================================

    worksheet.mergeCells("A3:F3");

    const titleCell =
      worksheet.getCell("A3");

    titleCell.value =
      "WEEKLY TOP PROCEDURES MIS";

    titleCell.font = {
      size: 17,

      bold: true,

      color: {
        argb: COLORS.darkBlue,
      },
    };

    titleCell.alignment = {
      horizontal: "center",

      vertical: "middle",
    };

    worksheet.getRow(3).height = 30;

    // ====================================================
    // REPORTING PERIOD
    // ====================================================

    worksheet.mergeCells("A4:F4");

    const periodCell =
      worksheet.getCell("A4");

    periodCell.value =
      `Reporting Period : ${weekLabel}`;

    periodCell.font = {
      size: 10,

      italic: true,

      color: {
        argb: COLORS.muted,
      },
    };

    periodCell.alignment = {
      horizontal: "center",

      vertical: "middle",
    };

    worksheet.getRow(4).height = 22;

    // ====================================================
    // APPLIED FILTERS
    // ====================================================

    worksheet.mergeCells("A6:F6");

    const filterTitle =
      worksheet.getCell("A6");

    filterTitle.value =
      "APPLIED FILTERS";

    filterTitle.font = {
      size: 12,

      bold: true,

      color: {
        argb: COLORS.white,
      },
    };

    filterTitle.fill = {
      type: "pattern",

      pattern: "solid",

      fgColor: {
        argb: COLORS.slate,
      },
    };

    filterTitle.alignment = {
      horizontal: "left",

      vertical: "middle",
    };

    worksheet.getRow(6).height = 25;

    // ====================================================
    // FILTER ROW
    // ====================================================

    const filterRow =
      worksheet.getRow(7);

    filterRow.values = [
      "Procedure",
      procedureFilter,

      "Growth",
      growthFilter,

      "Search",
      searchFilter,
    ];

    filterRow.height = 30;

    // ----------------------------------------------------
    // Filter labels
    // ----------------------------------------------------
    
    const columnWidths: Record<number, number> = {
     1: 10,
     3: 12,
     5: 12,
    };

    [1, 3, 5].forEach(
      (column) => {
        const cell =
          filterRow.getCell(column);

         // Column width
         filterRow.worksheet.getColumn(column).width =
         columnWidths[column] ?? 20;


        cell.font = {
          bold: true,

          size: 10,

          color: {
            argb: COLORS.text,
          },
        };

        cell.fill = {
          type: "pattern",

          pattern: "solid",

          fgColor: {
            argb: COLORS.lightGray,
          },
        };

        cell.alignment = {
          horizontal: "center",

          vertical: "middle",

          wrapText: true,
        };

        cell.border = {
          top: {
            style: "thin",

            color: {
              argb: COLORS.border,
            },
          },

          bottom: {
            style: "thin",

            color: {
              argb: COLORS.border,
            },
          },

          left: {
            style: "thin",

            color: {
              argb: COLORS.border,
            },
          },

          right: {
            style: "thin",

            color: {
              argb: COLORS.border,
            },
          },
        };
      }
    );

    // ----------------------------------------------------
    // Filter values
    // ----------------------------------------------------

    [2, 4, 6].forEach(
      (column) => {
        const cell =
          filterRow.getCell(column);

        cell.font = {
          bold: true,

          size: 10,

          color: {
            argb: COLORS.darkBlue,
          },
        };

        cell.fill = {
          type: "pattern",

          pattern: "solid",

          fgColor: {
            argb: COLORS.lightBlue,
          },
        };

        cell.alignment = {
          horizontal: "center",

          vertical: "middle",

          wrapText: true,
        };

        cell.border = {
          top: {
            style: "thin",

            color: {
              argb: COLORS.border,
            },
          },

          bottom: {
            style: "thin",

            color: {
              argb: COLORS.border,
            },
          },

          left: {
            style: "thin",

            color: {
              argb: COLORS.border,
            },
          },

          right: {
            style: "thin",

            color: {
              argb: COLORS.border,
            },
          },
        };
      }
    );

    // ====================================================
    // TABLE
    // ====================================================

    const tableStart = 9;

    const header =
      worksheet.getRow(tableStart);

    header.values = [
      "#",
      "Procedure",
      "Count",
      "Revenue (₹)",
      "Growth %",
      "Performance",
    ];

    header.height = 30;

    header.eachCell(
      (cell) => {
        cell.font = {
          bold: true,

          size: 10,

          color: {
            argb: COLORS.white,
          },
        };

        cell.fill = {
          type: "pattern",

          pattern: "solid",

          fgColor: {
            argb: COLORS.darkBlue,
          },
        };

        cell.alignment = {
          horizontal: "center",

          vertical: "middle",

          wrapText: true,
        };

        cell.border = {
          top: {
            style: "thin",

            color: {
              argb: COLORS.blue,
            },
          },

          bottom: {
            style: "thin",

            color: {
              argb: COLORS.blue,
            },
          },

          left: {
            style: "thin",

            color: {
              argb: COLORS.blue,
            },
          },

          right: {
            style: "thin",

            color: {
              argb: COLORS.blue,
            },
          },
        };
      }
    );

    // ====================================================
    // DATA ROWS
    // ====================================================

    data.forEach(
      (procedure, index) => {

        const growth =
          Number(
            procedure.growth || 0
          );

        const row =
          worksheet.addRow([
            index + 1,

            procedure.procedure,

            Number(
              procedure.count || 0
            ),

            Number(
              procedure.revenue || 0
            ),

            growth / 100,

            growth >= 0
              ? "Positive"
              : "Negative",
          ]);

        row.height = 25;

        row.alignment = {
          horizontal: "center",

          vertical: "middle",
        };

        // ------------------------------------------------
        // Borders + Base Font
        // ------------------------------------------------

        row.eachCell(
          (cell) => {

            cell.border = {
              top: {
                style: "thin",

                color: {
                  argb: COLORS.border,
                },
              },

              bottom: {
                style: "thin",

                color: {
                  argb: COLORS.border,
                },
              },

              left: {
                style: "thin",

                color: {
                  argb: COLORS.border,
                },
              },

              right: {
                style: "thin",

                color: {
                  argb: COLORS.border,
                },
              },
            };

            cell.font = {
              size: 10,

              color: {
                argb: COLORS.text,
              },
            };
          }
        );

        // ------------------------------------------------
        // Alternating Rows
        // ------------------------------------------------

        if (index % 2 === 0) {

          row.eachCell(
            (cell) => {

              cell.fill = {
                type: "pattern",

                pattern: "solid",

                fgColor: {
                  argb:
                    COLORS.lighterBlue,
                },
              };

            }
          );

        }

        // ------------------------------------------------
        // Serial Number
        // ------------------------------------------------

        row.getCell(1).font = {
          bold: true,

          size: 10,

          color: {
            argb: COLORS.muted,
          },
        };

        row.getCell(1).alignment = {
          horizontal: "center",

          vertical: "middle",
        };

        // ------------------------------------------------
        // Procedure
        // ------------------------------------------------

        row.getCell(2).font = {
          bold: true,

          size: 10,

          color: {
            argb: COLORS.darkBlue,
          },
        };

        row.getCell(2).alignment = {
          horizontal: "center",

          vertical: "middle",

          wrapText: true,
        };

        // ------------------------------------------------
        // Count
        // ------------------------------------------------

        row.getCell(3).numFmt =
          "#,##0";

        row.getCell(3).alignment = {
          horizontal: "center",

          vertical: "middle",
        };

        row.getCell(3).font = {
          bold: true,

          size: 10,

          color: {
            argb: COLORS.darkBlue,
          },
        };

        // ------------------------------------------------
        // Revenue
        // ------------------------------------------------

        row.getCell(4).numFmt =
          '₹ #,##0';

        row.getCell(4).alignment = {
          horizontal: "center",

          vertical: "middle",
        };

        row.getCell(4).font = {
          bold: true,

          size: 10,

          color: {
            argb: COLORS.darkBlue,
          },
        };

        // ------------------------------------------------
        // Growth
        // ------------------------------------------------

        row.getCell(5).numFmt =
          "0.0%";

        row.getCell(5).alignment = {
          horizontal: "center",

          vertical: "middle",
        };

        if (growth >= 0) {

          row.getCell(5).font = {
            bold: true,

            size: 10,

            color: {
              argb: COLORS.green,
            },
          };

          row.getCell(5).fill = {
            type: "pattern",

            pattern: "solid",

            fgColor: {
              argb: COLORS.greenLight,
            },
          };

        } else {

          row.getCell(5).font = {
            bold: true,

            size: 10,

            color: {
              argb: COLORS.red,
            },
          };

          row.getCell(5).fill = {
            type: "pattern",

            pattern: "solid",

            fgColor: {
              argb: COLORS.redLight,
            },
          };

        }

        // ------------------------------------------------
        // Performance
        // ------------------------------------------------

        const performanceCell =
          row.getCell(6);

        performanceCell.alignment = {
          horizontal: "center",

          vertical: "middle",
        };

        if (growth >= 0) {

          performanceCell.value =
            "Positive";

          performanceCell.font = {
            bold: true,

            size: 10,

            color: {
              argb: COLORS.green,
            },
          };

          performanceCell.fill = {
            type: "pattern",

            pattern: "solid",

            fgColor: {
              argb: COLORS.greenLight,
            },
          };

        } else {

          performanceCell.value =
            "Negative";

          performanceCell.font = {
            bold: true,

            size: 10,

            color: {
              argb: COLORS.red,
            },
          };

          performanceCell.fill = {
            type: "pattern",

            pattern: "solid",

            fgColor: {
              argb: COLORS.redLight,
            },
          };

        }
      }
    );

    // ====================================================
    // EMPTY STATE
    // ====================================================

    if (data.length === 0) {

      const emptyRow =
        worksheet.addRow([
          "",

          "No procedure performance data available",

          "",

          "",

          "",

          "",
        ]);

      emptyRow.height = 30;

      worksheet.mergeCells(
        `B${emptyRow.number}:F${emptyRow.number}`
      );

      emptyRow.getCell(2).font = {
        italic: true,

        size: 10,

        color: {
          argb: COLORS.muted,
        },
      };

      emptyRow.getCell(2).alignment = {
        horizontal: "center",

        vertical: "middle",
      };
    }

    // ====================================================
    // TABLE RANGE
    // ====================================================

    const lastDataRow =
      data.length > 0
        ? tableStart + data.length
        : tableStart + 1;

    // ====================================================
    // AUTO FILTER
    // ====================================================

    worksheet.autoFilter = {
      from: {
        row: tableStart,

        column: 1,
      },

      to: {
        row: lastDataRow,

        column: 6,
      },
    };

    // ====================================================
    // NO FREEZE
    // ====================================================

    // No worksheet.views / ySplit is used.
    // The Excel worksheet is completely unfrozen.

    // ====================================================
    // PRINT TITLES
    // ====================================================

    // Repeats the table header when printing.
    // This does NOT freeze the Excel worksheet.

    worksheet.pageSetup.printTitlesRow =
      `${tableStart}:${tableStart}`;

    // ====================================================
    // PRINT AREA
    // ====================================================

    const reportFooterRow =
      lastDataRow + 3;

    const confidentialityRow =
      reportFooterRow + 1;

    worksheet.pageSetup.printArea =
      `A1:F${confidentialityRow}`;

    // ====================================================
    // EXCEL FOOTER
    // ====================================================

    worksheet.headerFooter.oddFooter =
      `&L${
        options.hospitalName ||
        "Hospital Management System"
      }&CWeekly Top Procedures MIS&RPage &P of &N`;

    // ====================================================
    // REPORT GENERATED FOOTER
    // ====================================================

    worksheet.mergeCells(
      `A${reportFooterRow}:F${reportFooterRow}`
    );

    const generatedCell =
      worksheet.getCell(
        `A${reportFooterRow}`
      );

    generatedCell.value =
      `Report Generated : ${generatedDate} ${generatedTime}`;

    generatedCell.font = {
      italic: true,

      size: 9,

      color: {
        argb: COLORS.muted,
      },
    };

    generatedCell.alignment = {
      horizontal: "left",

      vertical: "middle",
    };

    worksheet.getRow(
      reportFooterRow
    ).height = 20;

    // ====================================================
    // CONFIDENTIALITY
    // ====================================================

    worksheet.mergeCells(
      `A${confidentialityRow}:F${confidentialityRow}`
    );

    const confidentialityCell =
      worksheet.getCell(
        `A${confidentialityRow}`
      );

    confidentialityCell.value =
      "Confidential - For Internal Management Use Only";

    confidentialityCell.font = {
      italic: true,

      size: 9,

      color: {
        argb: "94A3B8",
      },
    };

    confidentialityCell.alignment = {
      horizontal: "left",

      vertical: "middle",
    };

    worksheet.getRow(
      confidentialityRow
    ).height = 20;

    // ====================================================
    // PAGE SETUP
    // ====================================================

    worksheet.pageSetup.orientation =
      "landscape";

    worksheet.pageSetup.paperSize = 9;

    worksheet.pageSetup.fitToPage =
      true;

    worksheet.pageSetup.fitToWidth = 1;

    worksheet.pageSetup.fitToHeight = 0;

    // ====================================================
    // DOWNLOAD
    // ====================================================

    const safeWeekLabel =
      weekLabel
        .replace(
          /[^a-zA-Z0-9]+/g,
          "-"
        )
        .replace(
          /^-|-$/g,
          ""
        );

    const fileName =
      `Weekly-Top-Procedures-${
        safeWeekLabel || "MIS"
      }.xlsx`;

    // ====================================================
    // WRITE EXCEL BUFFER
    // ====================================================

    const buffer =
      await workbook.xlsx.writeBuffer();

    // ====================================================
    // DOWNLOAD
    // ====================================================

    saveAs(
      new Blob(
        [buffer],
        {
          type:
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        }
      ),
      fileName
    );

    console.log(
      "Weekly Procedure Excel export completed:",
      fileName
    );

  } catch (error) {

    console.error(
      "Weekly Procedure Excel export failed:",
      error
    );

    alert(
      "Excel export failed. Please check the browser console."
    );
  }
}