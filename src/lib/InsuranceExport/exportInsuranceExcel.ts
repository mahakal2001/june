import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

type InsuranceClaim = {
  id: number;
  title: string;
  value: number;
};

export async function exportInsuranceExcel(
  claims: InsuranceClaim[]
) {
  const workbook = new ExcelJS.Workbook();

  workbook.creator = "Leads Health Care";
  workbook.company = "Leads Health Care";
  workbook.subject = "Insurance Claim Report";
  workbook.title = "Insurance Claim Status Report";
  workbook.created = new Date();

  const sheet = workbook.addWorksheet("Insurance Claims");

  //----------------------------------------
  // PAGE SETUP
  //----------------------------------------

  sheet.pageSetup = {
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
      header: 0.3,
      footer: 0.3,
    },
  };

  //----------------------------------------
  // COLUMN WIDTH
  //----------------------------------------

  sheet.columns = [
    { width: 35 },
    { width: 18 },
    { width: 18 },
    { width: 25 },
  ];

  //----------------------------------------
  // TITLE
  //----------------------------------------

  sheet.mergeCells("A1:D1");

  const title = sheet.getCell("A1");

  title.value = "Insurance Claim Status Report";

  title.font = {
    bold: true,
    size: 22,
    color: { argb: "1E3A8A" },
  };

  title.alignment = {
    horizontal: "center",
  };

  //----------------------------------------
  // HOSPITAL
  //----------------------------------------

  sheet.mergeCells("A2:D2");

  const hospital = sheet.getCell("A2");

  hospital.value = "Leads Health Care";

  hospital.font = {
    bold: true,
    size: 14,
  };

  hospital.alignment = {
    horizontal: "center",
  };

  //----------------------------------------
  // DATE
  //----------------------------------------

  sheet.mergeCells("A3:D3");

  const date = sheet.getCell("A3");

  date.value =
    "Generated on " + new Date().toLocaleString();

  date.alignment = {
    horizontal: "center",
  };

  date.font = {
    italic: true,
    color: { argb: "666666" },
  };

  //----------------------------------------
  // EMPTY ROW
  //----------------------------------------

  sheet.addRow([]);

  //----------------------------------------
  // HEADER
  //----------------------------------------

  const header = sheet.addRow([
    "Claim Status",
    "Claims",
    "Percentage",
    "Last Updated",
  ]);

  header.eachCell((cell) => {
    cell.font = {
      bold: true,
      color: {
        argb: "FFFFFF",
      },
    };

    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: {
        argb: "2563EB",
      },
    };

    cell.alignment = {
      horizontal: "center",
      vertical: "middle",
    };

    cell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      right: { style: "thin" },
      bottom: { style: "thin" },
    };
  });

  //----------------------------------------
  // TOTAL
  //----------------------------------------

  const total = claims.reduce(
    (sum, c) => sum + c.value,
    0
  );

  //----------------------------------------
  // DATA
  //----------------------------------------

  claims.forEach((claim) => {
    const percentage = (
      (claim.value / total) *
      100
    ).toFixed(1);

    const row = sheet.addRow([
      claim.title,
      claim.value,
      `${percentage}%`,
      new Date().toLocaleTimeString(),
    ]);

    row.eachCell((cell) => {
      cell.border = {
        top: { style: "thin", color: { argb: "DDDDDD" } },
        left: { style: "thin", color: { argb: "DDDDDD" } },
        right: { style: "thin", color: { argb: "DDDDDD" } },
        bottom: { style: "thin", color: { argb: "DDDDDD" } },
      };

      cell.alignment = {
        horizontal: "center",
      };
    });

    //----------------------------------------
    // STATUS COLORS
    //----------------------------------------

    const statusCell = row.getCell(1);

    switch (claim.title) {
      case "Claims Submitted":
        statusCell.font = {
          color: { argb: "2563EB" },
          bold: true,
        };
        break;

      case "Claims Approved":
        statusCell.font = {
          color: { argb: "16A34A" },
          bold: true,
        };
        break;

      case "Claims Pending":
        statusCell.font = {
          color: { argb: "EA580C" },
          bold: true,
        };
        break;

      case "Claims Rejected":
        statusCell.font = {
          color: { argb: "DC2626" },
          bold: true,
        };
        break;
    }
  });

  //----------------------------------------
  // FREEZE HEADER
  //----------------------------------------

  sheet.views = [
    {
      state: "frozen",
      ySplit: 5,
    },
  ];

  //----------------------------------------
  // AUTOFILTER
  //----------------------------------------

  sheet.autoFilter = {
    from: "A5",
    to: "D5",
  };

  //----------------------------------------
  // FOOTER
  //----------------------------------------

  sheet.headerFooter.oddFooter =
    "&CLeads Health Care | Insurance Claim Status Report";

  //----------------------------------------
  // DOWNLOAD
  //----------------------------------------

  const buffer = await workbook.xlsx.writeBuffer();

  saveAs(
    new Blob([buffer]),
    `Insurance_Claim_Report_${
      new Date().toISOString().split("T")[0]
    }.xlsx`
  );
}