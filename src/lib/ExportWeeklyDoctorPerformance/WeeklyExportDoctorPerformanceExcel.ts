import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

// ======================================================
// TYPE
// ======================================================

export interface WeeklyDoctorExcelData {
  id: number | string;

  doctor: string;

  department: string;

  patients: number;

  revenue: number;

  growth: number;

  rating: number;

  name?: string;

  avatar?: string;

  photo?: string;
}

// ======================================================
// OPTIONS
// ======================================================

interface ExportOptions {
  department?: string;

  rating?: string;

  search?: string;

  hospitalName?: string;

  hospitalSubtitle?: string;
}

// ======================================================
// MAIN EXPORT FUNCTION
// ======================================================

export async function ExportWeeklyDoctorPerformanceExcel(
  data: WeeklyDoctorExcelData[],
  weekLabel: string,
  options: ExportOptions = {}
) {
  try {
    console.log("Excel export started");
    console.log("Excel data:", data);

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
    // No `views` / `ySplit` here.
    // This completely removes freezing from the worksheet.

    const worksheet = workbook.addWorksheet(
      "Weekly Doctor MIS",
      {
        properties: {
          defaultRowHeight: 22,
          tabColor: { argb: COLORS.darkBlue },
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

    const departmentFilter =
      options.department &&
      options.department !== "all"
        ? options.department
        : "All Departments";

    const ratingFilter =
      options.rating &&
      options.rating !== "all"
        ? `${options.rating} & Above`
        : "All Ratings";

    const searchFilter =
      options.search?.trim()
        ? options.search.trim()
        : "All Doctors";

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

    // Slightly optimized so all 8 columns
    // fit comfortably in Excel landscape view.

    worksheet.columns = [
      {
        key: "serial",
        width: 7,
      },

      {
        key: "doctor",
        width: 30,
      },

      {
        key: "department",
        width: 22,
      },

      {
        key: "patients",
        width: 14,
      },

      {
        key: "revenue",
        width: 19,
      },

      {
        key: "growth",
        width: 13,
      },

      {
        key: "rating",
        width: 12,
      },

      {
        key: "performance",
        width: 16,
      },
    ];

    // ====================================================
    // HEADER
    // ====================================================

    worksheet.mergeCells(
      "A1:H1"
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

    worksheet.mergeCells(
      "A2:H2"
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

    worksheet.mergeCells(
      "A3:H3"
    );

    const titleCell =
      worksheet.getCell("A3");

    titleCell.value =
      "WEEKLY DOCTOR PERFORMANCE MIS";

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

    worksheet.mergeCells(
      "A4:H4"
    );

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

    worksheet.mergeCells(
      "A6:H6"
    );

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
      "Department",
      departmentFilter,

      "Rating",
      ratingFilter,

      "Search",
      searchFilter,

      "",
      "",
    ];

    filterRow.height = 28;

    const columnWidths: Record<number, number> = {
     1: 12,
     3: 14,
     5: 14,
    };

    [1, 3, 5].forEach(
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

    [2, 4, 6].forEach(
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

    // ====================================================
    // TABLE
    // ====================================================

    const tableStart = 9;

    const header =
      worksheet.getRow(
        tableStart
      );

    header.values = [
      "#",
      "Doctor",
      "Department",
      "Patients",
      "Revenue (₹)",
      "Growth %",
      "Rating",
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

        // Dark blue header
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
      (doctor, index) => {
        const row =
          worksheet.addRow([
            index + 1,

            doctor.doctor,

            doctor.department,

            Number(
              doctor.patients || 0
            ),

            Number(
              doctor.revenue || 0
            ),

            Number(
              doctor.growth || 0
            ) / 100,

            Number(
              doctor.rating || 0
            ),

            doctor.growth >= 0
              ? "Positive"
              : "Negative",
          ]);

        row.height = 24;

        row.alignment = {
          vertical: "middle",

          horizontal: "center",
        };

        // ------------------------------------------------
        // Borders
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
          }
        );

        // ------------------------------------------------
        // Alternating rows
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
        // Doctor / Department
        // ------------------------------------------------

        row.getCell(
          2
        ).alignment = {
          horizontal: "center",

          vertical: "middle",
        };

        row.getCell(
          3
        ).alignment = {
          horizontal: "center",

          vertical: "middle",
        };

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
        // Number formats
        // ------------------------------------------------

        row.getCell(
          4
        ).numFmt = "#,##0";

        row.getCell(
          5
        ).numFmt = '₹ #,##0';

        row.getCell(
          6
        ).numFmt = "0.0%";

        row.getCell(
          7
        ).numFmt = "0.0";

        // ------------------------------------------------
        // Growth
        // ------------------------------------------------

        const growth =
          Number(
            doctor.growth || 0
          );

        if (growth >= 0) {
          row.getCell(
            6
          ).font = {
            bold: true,

            color: {
              argb:
                COLORS.green,
            },
          };

          row.getCell(
            6
          ).fill = {
            type: "pattern",

            pattern: "solid",

            fgColor: {
              argb:
                COLORS.greenLight,
            },
          };
        } else {
          row.getCell(
            6
          ).font = {
            bold: true,

            color: {
              argb:
                COLORS.red,
            },
          };

          row.getCell(
            6
          ).fill = {
            type: "pattern",

            pattern: "solid",

            fgColor: {
              argb:
                COLORS.redLight,
            },
          };
        }

        // ------------------------------------------------
        // Rating
        // ------------------------------------------------

        const rating =
          Number(
            doctor.rating || 0
          );

        if (rating >= 4.8) {
          row.getCell(
            7
          ).font = {
            bold: true,

            color: {
              argb:
                COLORS.green,
            },
          };

          row.getCell(
            7
          ).fill = {
            type: "pattern",

            pattern: "solid",

            fgColor: {
              argb:
                COLORS.greenLight,
            },
          };
        } else if (
          rating >= 4.5
        ) {
          row.getCell(
            7
          ).font = {
            bold: true,

            color: {
              argb:
                COLORS.yellow,
            },
          };

          row.getCell(
            7
          ).fill = {
            type: "pattern",

            pattern: "solid",

            fgColor: {
              argb:
                COLORS.yellowLight,
            },
          };
        } else {
          row.getCell(
            7
          ).font = {
            bold: true,

            color: {
              argb:
                COLORS.red,
            },
          };

          row.getCell(
            7
          ).fill = {
            type: "pattern",

            pattern: "solid",

            fgColor: {
              argb:
                COLORS.redLight,
            },
          };
        }

        // ------------------------------------------------
        // Performance
        // ------------------------------------------------

        const performanceCell =
          row.getCell(8);

        if (growth >= 0) {
          performanceCell.value =
            "Positive";

          performanceCell.font = {
            bold: true,

            color: {
              argb:
                COLORS.green,
            },
          };

          performanceCell.fill = {
            type: "pattern",

            pattern: "solid",

            fgColor: {
              argb:
                COLORS.greenLight,
            },
          };
        } else {
          performanceCell.value =
            "Negative";

          performanceCell.font = {
            bold: true,

            color: {
              argb:
                COLORS.red,
            },
          };

          performanceCell.fill = {
            type: "pattern",

            pattern: "solid",

            fgColor: {
              argb:
                COLORS.redLight,
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
          "No doctor performance data available",
          "",
          "",
          "",
          "",
          "",
          "",
        ]);

      emptyRow.height = 28;

      worksheet.mergeCells(
        `B${emptyRow.number}:H${emptyRow.number}`
      );

      emptyRow.getCell(
        2
      ).font = {
        italic: true,

        color: {
          argb:
            COLORS.muted,
        },
      };

      emptyRow.getCell(
        2
      ).alignment = {
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

        column: 8,
      },
    };

    // ====================================================
    // IMPORTANT:
    // NO FREEZE
    // ====================================================

    // Do NOT add:
    //
    // worksheet.views = [
    //   {
    //     state: "frozen",
    //     ySplit: 13,
    //   },
    // ];
    //
    // The worksheet is completely unfrozen.

    // ====================================================
    // PRINT TITLES
    // ====================================================

    // This does NOT freeze the Excel sheet.
    //
    // It only repeats the table header when printing
    // multiple pages.

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
      `A1:H${confidentialityRow}`;

    // ====================================================
    // FOOTER
    // ====================================================

    worksheet.headerFooter.oddFooter =
      `&L${
        options.hospitalName ||
        "Hospital Management System"
      }&CWeekly Doctor Performance MIS&RPage &P of &N`;

    // ====================================================
    // REPORT FOOTER
    // ====================================================

    worksheet.mergeCells(
      `A${reportFooterRow}:H${reportFooterRow}`
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
      `A${confidentialityRow}:H${confidentialityRow}`
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
      `Weekly-Doctor-Performance-${
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
      "Excel export completed:",
      fileName
    );

  } catch (error) {
    console.error(
      "Excel export failed:",
      error
    );

    alert(
      "Excel export failed. Please check the browser console."
    );
  }
}