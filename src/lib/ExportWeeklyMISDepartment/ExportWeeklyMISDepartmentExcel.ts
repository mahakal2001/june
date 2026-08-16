import * as XLSX from "xlsx";

interface DepartmentData {
  id: number;
  department: string;
  revenue: number;
  growth: number;
  patients: number;
  collection: number;
  collectionPercentage: number;
  avgLOS: number;
  status: "Good" | "Average";
  icon: React.ElementType;
  iconColor: string;
  iconBg: string;
}

interface ExportOptions {
  data: DepartmentData[];
  search?: string;
  status?: string;
  weekLabel?: string;
}

export function ExportWeeklyMISDepartmentExcel({
  data,
  search = "",
  status = "all",
  weekLabel = "",
}: ExportOptions) {

  // --------------------------------------------------
  // Prepare export data
  // --------------------------------------------------

  const exportData = data.map((department, index) => ({
    "#": index + 1,

    "Department":
      department.department,

    "Revenue":
      department.revenue,

    "Growth (%)":
      Number(department.growth.toFixed(1)),

    "Patients":
      department.patients,

    "Collection":
      department.collection,

    "Collection (%)":
      Number(
        department.collectionPercentage.toFixed(1)
      ),

    "Avg. LOS":
      Number(
        department.avgLOS.toFixed(1)
      ),

    "Status":
      department.status,
  }));


  // --------------------------------------------------
  // Workbook
  // --------------------------------------------------

  const workbook =
    XLSX.utils.book_new();


  // --------------------------------------------------
  // Report information
  // --------------------------------------------------

  const reportTitle =
    "Department-wise Weekly MIS";

  const subtitle =
    "Weekly Department Performance Overview";


  const generatedAt =
    new Date().toLocaleString("en-IN");


  // --------------------------------------------------
  // Build worksheet manually
  // --------------------------------------------------

  const worksheetData: any[][] = [

    [
      reportTitle
    ],

    [
      subtitle
    ],

    [
      "Week",
      weekLabel || "N/A"
    ],

    [
      "Search",
      search || "All Departments"
    ],

    [
      "Status",
      status === "all"
        ? "All Status"
        : status
    ],

    [
      "Generated",
      generatedAt
    ],

    [],

    [
      "#",
      "Department",
      "Revenue",
      "Growth (%)",
      "Patients",
      "Collection",
      "Collection (%)",
      "Avg. LOS",
      "Status"
    ],

    ...exportData.map(
      (row) => [

        row["#"],

        row["Department"],

        row["Revenue"],

        row["Growth (%)"],

        row["Patients"],

        row["Collection"],

        row["Collection (%)"],

        row["Avg. LOS"],

        row["Status"],

      ]
    ),

  ];


  const worksheet =
    XLSX.utils.aoa_to_sheet(
      worksheetData
    );


  // --------------------------------------------------
  // Column widths
  // --------------------------------------------------

  worksheet["!cols"] = [

    {
      wch: 6,
    },

    {
      wch: 28,
    },

    {
      wch: 18,
    },

    {
      wch: 14,
    },

    {
      wch: 14,
    },

    {
      wch: 18,
    },

    {
      wch: 17,
    },

    {
      wch: 12,
    },

    {
      wch: 14,
    },

  ];


  // --------------------------------------------------
  // Merge report title
  // --------------------------------------------------

  worksheet["!merges"] = [

    {
      s: {
        r: 0,
        c: 0,
      },

      e: {
        r: 0,
        c: 8,
      },
    },

    {
      s: {
        r: 1,
        c: 0,
      },

      e: {
        r: 1,
        c: 8,
      },
    },

  ];


  // --------------------------------------------------
  // Freeze table header
  // --------------------------------------------------

  worksheet["!freeze"] = {
    xSplit: 0,
    ySplit: 8,
  };


  // --------------------------------------------------
  // Number formats
  // --------------------------------------------------

  const firstDataRow = 9;

  const lastDataRow =
    firstDataRow +
    exportData.length -
    1;


  for (
    let row = firstDataRow;
    row <= lastDataRow;
    row++
  ) {

    // Revenue
    const revenueCell =
      worksheet[`C${row}`];

    if (revenueCell) {
      revenueCell.z =
        '₹#,##0.00';
    }


    // Growth
    const growthCell =
      worksheet[`D${row}`];

    if (growthCell) {
      growthCell.z =
        '0.0"%"';
    }


    // Patients
    const patientsCell =
      worksheet[`E${row}`];

    if (patientsCell) {
      patientsCell.z =
        '#,##0';
    }


    // Collection
    const collectionCell =
      worksheet[`F${row}`];

    if (collectionCell) {
      collectionCell.z =
        '₹#,##0.00';
    }


    // Collection %
    const collectionPercentageCell =
      worksheet[`G${row}`];

    if (collectionPercentageCell) {
      collectionPercentageCell.z =
        '0.0"%"';
    }


    // LOS
    const losCell =
      worksheet[`H${row}`];

    if (losCell) {
      losCell.z =
        '0.0';
    }

  }


  // --------------------------------------------------
  // Add autofilter
  // --------------------------------------------------

  if (exportData.length > 0) {

    worksheet["!autofilter"] = {
      ref:
        `A8:I${lastDataRow}`,
    };

  }


  // --------------------------------------------------
  // Add worksheet
  // --------------------------------------------------

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Weekly Department MIS"
  );


  // --------------------------------------------------
  // File name
  // --------------------------------------------------

  const safeWeekLabel =
    weekLabel
      .replace(
        /[^a-zA-Z0-9-_]/g,
        "-"
      )
      .replace(
        /-+/g,
        "-"
      );


  const fileName =
    `Weekly_Department_MIS${
      safeWeekLabel
        ? `_${safeWeekLabel}`
        : ""
    }.xlsx`;


  // --------------------------------------------------
  // Download
  // --------------------------------------------------

  XLSX.writeFile(
    workbook,
    fileName
  );
}