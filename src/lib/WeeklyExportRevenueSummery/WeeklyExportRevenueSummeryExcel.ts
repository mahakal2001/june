import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

// ======================================================
// TYPE
// ======================================================

export interface WeeklyRevenueLeakageExcelData {
  id: number | string;

  label: string;

  amount: number;

  icon?: React.ElementType;

  percentage?: number;
}

// ======================================================
// OPTIONS
// ======================================================

interface ExportOptions {
  leakageFilter?: string;

  sortBy?: string;

  sortAscending?: boolean;

  search?: string;

  hospitalName?: string;

  hospitalSubtitle?: string;
}

// ======================================================
// MAIN EXPORT FUNCTION
// ======================================================

export async function ExportWeeklyRevenueLeakageExcel(
  data: WeeklyRevenueLeakageExcelData[],
  totalLeakage: number,
  growth: number,
  weekLabel: string,
  options: ExportOptions = {}
) {
  try {
    console.log(
      "Weekly Revenue Leakage Excel export started"
    );

    console.log(
      "Excel data:",
      data
    );

    // ====================================================
    // WORKBOOK
    // ====================================================

    const workbook =
      new ExcelJS.Workbook();

    workbook.creator =
      options.hospitalName ||
      "Hospital Management System";

    workbook.company =
      options.hospitalName ||
      "Hospital Management System";

    workbook.created =
      new Date();

    workbook.modified =
      new Date();

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

      red: "B91C1C",
      redDark: "991B1B",
      redLight: "FEF2F2",

      green: "047857",
      greenLight: "ECFDF5",

      yellow: "CA8A04",
      yellowLight: "FEFCE8",

      purple: "7C3AED",
      purpleLight: "F5F3FF",
    };

    // ====================================================
    // WORKSHEET
    // ====================================================

    const worksheet =
      workbook.addWorksheet(
        "Weekly Revenue Leakage MIS",
        {
          properties: {
            defaultRowHeight: 22,

            tabColor: {
              argb:
                COLORS.red,
            },
          },

          pageSetup: {
            paperSize: 9,

            orientation:
              "landscape",

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

    const leakageTypeFilter =
      options.leakageFilter &&
      options.leakageFilter !== "all"
        ? options.leakageFilter
        : "All Leakage Types";

    const sortFilter =
      options.sortBy === "label"
        ? "Category"
        : "Amount";

    const sortDirection =
      options.sortAscending
        ? "Ascending"
        : "Descending";

    const searchFilter =
      options.search?.trim()
        ? options.search.trim()
        : "All Leakage Categories";

    // ====================================================
    // DATE / TIME
    // ====================================================

    const generatedAt =
      new Date();

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
    // SUMMARY CALCULATIONS
    // ====================================================

    const totalCategories =
      data.length;

    const calculatedTotal =
      data.reduce(
        (sum, item) =>
          sum +
          Number(
            item.amount || 0
          ),
        0
      );

    const reportTotalLeakage =
      Number(totalLeakage || 0) ||
      calculatedTotal;

    const averageLeakage =
      totalCategories > 0
        ? reportTotalLeakage /
          totalCategories
        : 0;

    const highestLeakage =
      data.length > 0
        ? [...data].sort(
            (a, b) =>
              Number(b.amount || 0) -
              Number(a.amount || 0)
          )[0]
        : null;

    const highestPercentage =
      highestLeakage &&
      reportTotalLeakage > 0
        ? (Number(
            highestLeakage.amount || 0
          ) /
            reportTotalLeakage) *
          100
        : 0;

    // ====================================================
    // COLUMN WIDTHS
    // ====================================================

    worksheet.columns = [
      {
        key: "serial",
        width: 8,
      },

      {
        key: "category",
        width: 38,
      },

      {
        key: "amount",
        width: 22,
      },

      {
        key: "percentage",
        width: 18,
      },

      {
        key: "impact",
        width: 20,
      },
    ];

    // ====================================================
    // HEADER
    // ====================================================

    worksheet.mergeCells(
      "A1:E1"
    );

    const hospitalCell =
      worksheet.getCell("A1");

    hospitalCell.value =
      options.hospitalName ||
      "HOSPITAL MANAGEMENT SYSTEM";

    hospitalCell.font = {
      size: 22,

      bold: true,

      color: {
        argb:
          COLORS.white,
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
        argb:
          COLORS.darkBlue,
      },
    };

    worksheet.getRow(1).height =
      36;

    // ====================================================
    // SUBTITLE
    // ====================================================

    worksheet.mergeCells(
      "A2:E2"
    );

    const subtitleCell =
      worksheet.getCell("A2");

    subtitleCell.value =
      options.hospitalSubtitle ||
      "Management Information System";

    subtitleCell.font = {
      size: 11,

      bold: true,

      color: {
        argb:
          COLORS.muted,
      },
    };

    subtitleCell.alignment = {
      horizontal: "center",

      vertical: "middle",
    };

    worksheet.getRow(2).height =
      22;

    // ====================================================
    // REPORT TITLE
    // ====================================================

    worksheet.mergeCells(
      "A3:E3"
    );

    const titleCell =
      worksheet.getCell("A3");

    titleCell.value =
      "WEEKLY REVENUE LEAKAGE SUMMARY MIS";

    titleCell.font = {
      size: 17,

      bold: true,

      color: {
        argb:
          COLORS.darkBlue,
      },
    };

    titleCell.alignment = {
      horizontal: "center",

      vertical: "middle",
    };

    worksheet.getRow(3).height =
      30;

    // ====================================================
    // REPORTING PERIOD
    // ====================================================

    worksheet.mergeCells(
      "A4:E4"
    );

    const periodCell =
      worksheet.getCell("A4");

    periodCell.value =
      `Reporting Period : ${weekLabel}`;

    periodCell.font = {
      size: 10,

      italic: true,

      color: {
        argb:
          COLORS.muted,
      },
    };

    periodCell.alignment = {
      horizontal: "center",

      vertical: "middle",
    };

    worksheet.getRow(4).height =
      22;

    // ====================================================
    // EXECUTIVE SUMMARY TITLE
    // ====================================================

    worksheet.mergeCells(
      "A6:E6"
    );

    const summaryTitle =
      worksheet.getCell("A6");

    summaryTitle.value =
      "EXECUTIVE SUMMARY";

    summaryTitle.font = {
      size: 12,

      bold: true,

      color: {
        argb:
          COLORS.white,
      },
    };

    summaryTitle.fill = {
      type: "pattern",

      pattern: "solid",

      fgColor: {
        argb:
          COLORS.slate,
      },
    };

    summaryTitle.alignment = {
      horizontal: "left",

      vertical: "middle",
    };

    worksheet.getRow(6).height =
      25;

    // ====================================================
    // KPI SUMMARY
    // ====================================================

    const summaryRow =
      worksheet.getRow(7);

    summaryRow.values = [
      "Leakage Categories",
      totalCategories,

      "Total Leakage",
      reportTotalLeakage,
      
    ];

    // We intentionally use only
    // A:E for the report.
    // Therefore create the second
    // summary row for the remaining KPI.

    worksheet.mergeCells(
      "A7:B7"
    );

    worksheet.mergeCells(
      "C7:D7"
    );

    summaryRow.height =
      30;

    // ====================================================
    // KPI LABELS
    // ====================================================

    worksheet.getCell(
      "A7"
    ).value =
      `Leakage Categories : ${totalCategories}`;

    worksheet.getCell(
      "C7"
    ).value =
      `Total Leakage : ₹ ${new Intl.NumberFormat(
        "en-IN"
      ).format(reportTotalLeakage)}`;

    [
      "A7",
      "C7",
    ].forEach(
      (address) => {
        const cell =
          worksheet.getCell(
            address
          );

        cell.font = {
          bold: true,

          size: 10,

          color: {
            argb:
              COLORS.darkBlue,
          },
        };

        cell.fill = {
          type: "pattern",

          pattern: "solid",

          fgColor: {
            argb:
              COLORS.lightBlue,
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
              argb:
                COLORS.border,
            },
          },

          bottom: {
            style: "thin",

            color: {
              argb:
                COLORS.border,
            },
          },

          left: {
            style: "thin",

            color: {
              argb:
                COLORS.border,
            },
          },

          right: {
            style: "thin",

            color: {
              argb:
                COLORS.border,
            },
          },
        };
      }
    );


    // ====================================================
    // SECOND KPI ROW
    // ====================================================

    const secondKpiRow =
      worksheet.getRow(8);

    secondKpiRow.values = [
      "Average Leakage",
      averageLeakage,

      "Highest Leakage",
      highestLeakage
        ? highestLeakage.amount
        : 0,
    ];

    worksheet.mergeCells(
      "A8:B8"
    );

    worksheet.mergeCells(
      "C8:D8"
    );

    worksheet.mergeCells(
      "E8:E8"
    );

    secondKpiRow.height =
      30;

    const secondKpiValues = [
      {
        cell: "A8",
        value: `Average Leakage : ₹ ${new Intl.NumberFormat(
          "en-IN"
        ).format(averageLeakage)}`,
      },

      {
        cell: "C8",
        value: `Highest Leakage : ₹ ${new Intl.NumberFormat(
          "en-IN"
        ).format(
          highestLeakage?.amount || 0
        )}`,
      },
    ];

    secondKpiValues.forEach(
      ({
        cell,
        value,
      }) => {
        const target =
          worksheet.getCell(
            cell
          );

        target.value =
          value;

        target.font = {
          bold: true,

          size: 10,

          color: {
            argb:
              COLORS.text,
          },
        };

        target.fill = {
          type: "pattern",

          pattern: "solid",

          fgColor: {
            argb:
              COLORS.lighterBlue,
          },
        };

        target.alignment = {
          horizontal: "center",

          vertical: "middle",

          wrapText: true,
        };

        target.border = {
          top: {
            style: "thin",

            color: {
              argb:
                COLORS.border,
            },
          },

          bottom: {
            style: "thin",

            color: {
              argb:
                COLORS.border,
            },
          },

          left: {
            style: "thin",

            color: {
              argb:
                COLORS.border,
            },
          },

          right: {
            style: "thin",

            color: {
              argb:
                COLORS.border,
            },
          },
        };
      }
    );

    // ====================================================
    // APPLIED FILTERS
    // ====================================================

    worksheet.mergeCells(
      "A10:E10"
    );

    const filterTitle =
      worksheet.getCell("A10");

    filterTitle.value =
      "APPLIED FILTERS";

    filterTitle.font = {
      size: 12,

      bold: true,

      color: {
        argb:
          COLORS.white,
      },
    };

    filterTitle.fill = {
      type: "pattern",

      pattern: "solid",

      fgColor: {
        argb:
          COLORS.slate,
      },
    };

    filterTitle.alignment = {
      horizontal: "left",

      vertical: "middle",
    };

    worksheet.getRow(10).height =
      25;

    // ====================================================
    // FILTER ROW
    // ====================================================

    const filterRow =
      worksheet.getRow(11);

    filterRow.values = [
      "Leakage Type",
      leakageTypeFilter,

      "Sort",
      `${sortFilter} - ${sortDirection}`,

      searchFilter,
    ];

    const columnWidths: Record<number, number> = {
     1: 12,
    };

    filterRow.height =
      30;

    [
      1,
      3,
      5,
    ].forEach(
      (column) => {
        const cell =
          filterRow.getCell(
            column
          );

         // Column width
         filterRow.worksheet.getColumn(column).width =
         columnWidths[column] ?? 20;


        cell.font = {
          bold: true,

          size: 10,

          color: {
            argb:
              COLORS.text,
          },
        };

        cell.fill = {
          type: "pattern",

          pattern: "solid",

          fgColor: {
            argb:
              COLORS.lightGray,
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
              argb:
                COLORS.border,
            },
          },

          bottom: {
            style: "thin",

            color: {
              argb:
                COLORS.border,
            },
          },

          left: {
            style: "thin",

            color: {
              argb:
                COLORS.border,
            },
          },

          right: {
            style: "thin",

            color: {
              argb:
                COLORS.border,
            },
          },
        };
      }
    );

    [
      2,
      4,
    ].forEach(
      (column) => {
        const cell =
          filterRow.getCell(
            column
          );

        cell.font = {
          bold: true,

          size: 10,

          color: {
            argb:
              COLORS.darkBlue,
          },
        };

        cell.fill = {
          type: "pattern",

          pattern: "solid",

          fgColor: {
            argb:
              COLORS.lightBlue,
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
              argb:
                COLORS.border,
            },
          },

          bottom: {
            style: "thin",

            color: {
              argb:
                COLORS.border,
            },
          },

          left: {
            style: "thin",

            color: {
              argb:
                COLORS.border,
            },
          },

          right: {
            style: "thin",

            color: {
              argb:
                COLORS.border,
            },
          },
        };
      }
    );

    // Search cell

    filterRow.getCell(
      5
    ).font = {
      bold: true,

      size: 10,

      color: {
        argb:
          COLORS.darkBlue,
      },
    };

    filterRow.getCell(
      5
    ).fill = {
      type: "pattern",

      pattern: "solid",

      fgColor: {
        argb:
          COLORS.lightBlue,
      },
    };

    filterRow.getCell(
      5
    ).alignment = {
      horizontal: "center",

      vertical: "middle",

      wrapText: true,
    };

    // ====================================================
    // TABLE
    // ====================================================

    const tableStart =
      13;

    const header =
      worksheet.getRow(
        tableStart
      );

    header.values = [
      "#",
      "Leakage Category",
      "Amount (₹)",
      "% of Total",
      "Impact",
    ];

    header.height =
      32;

    header.eachCell(
      (cell) => {
        cell.font = {
          bold: true,

          size: 10,

          color: {
            argb:
              COLORS.white,
          },
        };

        cell.fill = {
          type: "pattern",

          pattern: "solid",

          fgColor: {
            argb:
              COLORS.darkBlue,
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
              argb:
                COLORS.blue,
            },
          },

          bottom: {
            style: "thin",

            color: {
              argb:
                COLORS.blue,
            },
          },

          left: {
            style: "thin",

            color: {
              argb:
                COLORS.blue,
            },
          },

          right: {
            style: "thin",

            color: {
              argb:
                COLORS.blue,
            },
          },
        };
      }
    );

    // ====================================================
    // DATA ROWS
    // ====================================================

    data.forEach(
      (item, index) => {
        const amount =
          Number(
            item.amount || 0
          );

        const percentage =
          reportTotalLeakage > 0
            ? (amount /
                reportTotalLeakage) *
              100
            : 0;

        const row =
          worksheet.addRow([
            index + 1,

            item.label,

            amount,

            percentage / 100,

            "Leakage",
          ]);

        row.height =
          26;

        row.alignment = {
          horizontal: "center",

          vertical: "middle",
        };

        // ------------------------------------------------
        // BORDERS
        // ------------------------------------------------

        row.eachCell(
          (cell) => {
            cell.border = {
              top: {
                style: "thin",

                color: {
                  argb:
                    COLORS.border,
                },
              },

              bottom: {
                style: "thin",

                color: {
                  argb:
                    COLORS.border,
                },
              },

              left: {
                style: "thin",

                color: {
                  argb:
                    COLORS.border,
                },
              },

              right: {
                style: "thin",

                color: {
                  argb:
                    COLORS.border,
                },
              },
            };

            cell.font = {
              size: 10,

              color: {
                argb:
                  COLORS.text,
              },
            };

            cell.alignment = {
              horizontal:
                "center",

              vertical:
                "middle",

              wrapText: true,
            };
          }
        );

        // ------------------------------------------------
        // ALTERNATING ROWS
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
        // CATEGORY
        // ------------------------------------------------

        row.getCell(
          2
        ).font = {
          bold: true,

          size: 10,

          color: {
            argb:
              COLORS.darkBlue,
          },
        };

        // ------------------------------------------------
        // NUMBER FORMATS
        // ------------------------------------------------

        row.getCell(
          3
        ).numFmt =
          '₹ #,##0';

        row.getCell(
          4
        ).numFmt =
          "0.0%";

        // ------------------------------------------------
        // AMOUNT
        // ------------------------------------------------

        row.getCell(
          3
        ).font = {
          bold: true,

          size: 10,

          color: {
            argb:
              COLORS.redDark,
          },
        };

        row.getCell(
          3
        ).fill = {
          type: "pattern",

          pattern: "solid",

          fgColor: {
            argb:
              COLORS.redLight,
          },
        };

        // ------------------------------------------------
        // PERCENTAGE
        // ------------------------------------------------

        row.getCell(
          4
        ).font = {
          bold: true,

          size: 10,

          color: {
            argb:
              COLORS.darkBlue,
          },
        };

        // ------------------------------------------------
        // IMPACT
        // ------------------------------------------------

        const impactCell =
          row.getCell(5);

        impactCell.value =
          "Leakage";

        impactCell.font = {
          bold: true,

          size: 10,

          color: {
            argb:
              COLORS.red,
          },
        };

        impactCell.fill = {
          type: "pattern",

          pattern: "solid",

          fgColor: {
            argb:
              COLORS.redLight,
          },
        };

        impactCell.alignment = {
          horizontal:
            "center",

          vertical:
            "middle",
        };
      }
    );

    // ====================================================
    // EMPTY STATE
    // ====================================================

    if (data.length === 0) {
      const emptyRow =
        worksheet.addRow([
          "",
          "No revenue leakage data available",
          "",
          "",
          "",
        ]);

      emptyRow.height =
        30;

      worksheet.mergeCells(
        `B${emptyRow.number}:E${emptyRow.number}`
      );

      emptyRow.getCell(
        2
      ).font = {
        italic: true,

        size: 10,

        color: {
          argb:
            COLORS.muted,
        },
      };

      emptyRow.getCell(
        2
      ).alignment = {
        horizontal:
          "center",

        vertical:
          "middle",
      };
    }

    // ====================================================
    // TABLE RANGE
    // ====================================================

    const lastDataRow =
      data.length > 0
        ? tableStart +
          data.length
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

        column: 5,
      },
    };

    // ====================================================
    // PRINT TITLES
    // ====================================================

    worksheet.pageSetup.printTitlesRow =
      `${tableStart}:${tableStart}`;

    // ====================================================
    // REPORT FOOTER
    // ====================================================

    const reportFooterRow =
      lastDataRow + 3;

    const confidentialityRow =
      reportFooterRow + 1;

    worksheet.mergeCells(
      `A${reportFooterRow}:E${reportFooterRow}`
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
        argb:
          COLORS.muted,
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
      `A${confidentialityRow}:E${confidentialityRow}`
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
        argb:
          "94A3B8",
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
    // FOOTER
    // ====================================================

    worksheet.headerFooter.oddFooter =
      `&L${
        options.hospitalName ||
        "Hospital Management System"
      }&CWeekly Revenue Leakage MIS&RPage &P of &N`;

    // ====================================================
    // PRINT AREA
    // ====================================================

    worksheet.pageSetup.printArea =
      `A1:E${confidentialityRow}`;

    // ====================================================
    // PAGE SETUP
    // ====================================================

    worksheet.pageSetup.orientation =
      "landscape";

    worksheet.pageSetup.paperSize =
      9;

    worksheet.pageSetup.fitToPage =
      true;

    worksheet.pageSetup.fitToWidth =
      1;

    worksheet.pageSetup.fitToHeight =
      0;

    // ====================================================
    // NO FREEZE
    // ====================================================

    // Intentionally no worksheet.views
    // or ySplit.
    //
    // Excel sheet remains completely
    // unfrozen.

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
      `Weekly-Revenue-Leakage-Summary-${
        safeWeekLabel || "MIS"
      }.xlsx`;

    const buffer =
      await workbook.xlsx.writeBuffer();

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
      "Weekly Revenue Leakage Excel export completed:",
      fileName
    );
  } catch (error) {
    console.error(
      "Weekly Revenue Leakage Excel export failed:",
      error
    );

    alert(
      "Excel export failed. Please check the browser console."
    );
  }
}