import { formatCurrency } from "@/lib/formatCurrency";

// ======================================================
// TYPE
// ======================================================

export interface WeeklyMISDepartmentData {
  id: number;
  department: string;
  revenue: number;
  growth: number;
  patients: number;
  collection: number;
  collectionPercentage: number;
  avgLOS: number;
  status: "Good" | "Average";

  icon?: React.ElementType;
  iconColor?: string;
  iconBg?: string;
}

// ======================================================
// OPTIONS
// ======================================================

type PrintReportOptions = {
  hospitalName?: string;
  hospitalSubtitle?: string;
};

// ======================================================
// ESCAPE HTML
// ======================================================

function escapeHtml(value: string): string {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// ======================================================
// PRINT FUNCTION
// ======================================================

export function WeeklyMISDepartmentPrintReport(
  data: WeeklyMISDepartmentData[],
  weekLabel: string,
  options?: PrintReportOptions
) {
  // ----------------------------------------------------
  // Hospital Information
  // ----------------------------------------------------

  const hospitalName =
    options?.hospitalName ??
    "Hospital Management System";

  const hospitalSubtitle =
    options?.hospitalSubtitle ??
    "Management Information System";

  // ----------------------------------------------------
  // Summary Calculations
  // ----------------------------------------------------

  const totalRevenue = data.reduce(
    (sum, item) => sum + item.revenue,
    0
  );

  const totalCollection = data.reduce(
    (sum, item) => sum + item.collection,
    0
  );

  const totalPatients = data.reduce(
    (sum, item) => sum + item.patients,
    0
  );

  const averageGrowth =
    data.length > 0
      ? data.reduce(
          (sum, item) => sum + item.growth,
          0
        ) / data.length
      : 0;

  const averageCollection =
    data.length > 0
      ? data.reduce(
          (sum, item) =>
            sum + item.collectionPercentage,
          0
        ) / data.length
      : 0;

  const averageLOS =
    data.length > 0
      ? data.reduce(
          (sum, item) => sum + item.avgLOS,
          0
        ) / data.length
      : 0;

  const goodDepartments = data.filter(
    (item) => item.status === "Good"
  ).length;

  const averageDepartments = data.filter(
    (item) => item.status === "Average"
  ).length;

  // ----------------------------------------------------
  // Date / Time
  // ----------------------------------------------------

  const generatedAt = new Date();

  const formattedDate =
    generatedAt.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );

  const formattedTime =
    generatedAt.toLocaleTimeString(
      "en-IN",
      {
        hour: "2-digit",
        minute: "2-digit",
      }
    );

  // ----------------------------------------------------
  // Table Rows
  // ----------------------------------------------------

  const rows =
    data.length === 0
      ? `
        <tr>
          <td
            colspan="9"
            class="empty-row"
          >
            No department records available
            for the selected period.
          </td>
        </tr>
      `
      : data
          .map(
            (department, index) => `
              <tr>

                <td class="department-cell">
                  <div class="department-name">
                    ${escapeHtml(
                      department.department
                    )}
                  </div>
                </td>

                <td class="number-cell">
                  ${formatCurrency(
                    department.revenue
                  )}
                </td>

                <td class="center-cell">
                  <span class="growth">
                    ${
                      department.growth >= 0
                        ? "↑"
                        : "↓"
                    }
                    ${Math.abs(
                      department.growth
                    ).toFixed(1)}%
                  </span>
                </td>

                <td class="number-cell">
                  ${department.patients.toLocaleString(
                    "en-IN"
                  )}
                </td>

                <td class="number-cell">
                  ${formatCurrency(
                    department.collection
                  )}
                </td>

                <td class="center-cell">
                  ${department.collectionPercentage.toFixed(
                    1
                  )}%
                </td>

                <td class="center-cell">
                  ${department.avgLOS.toFixed(1)}
                </td>

                <td class="center-cell">

                  <span
                    class="${
                      department.status ===
                      "Good"
                        ? "status status-good"
                        : "status status-average"
                    }"
                  >
                    ${department.status}
                  </span>

                </td>

                <td class="center-cell rank">
                  ${index + 1}
                </td>

              </tr>
            `
          )
          .join("");

  // ----------------------------------------------------
  // Print HTML
  // ----------------------------------------------------

  const html = `
<!DOCTYPE html>

<html>

<head>

<meta charset="UTF-8">

<meta
  name="viewport"
  content="width=device-width, initial-scale=1.0"
/>

<title>
  Weekly MIS Department Report
</title>

<style>

/* =====================================================
   RESET
===================================================== */

* {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  padding: 0;
}

body {
  font-family:
    Arial,
    Helvetica,
    sans-serif;

  background: #ffffff;

  color: #1e293b;

  font-size: 10px;

  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}

/* =====================================================
   PAGE
===================================================== */

@page {
  size: A4 landscape;
  margin: 10mm;
}

/* =====================================================
   REPORT
===================================================== */

.report {
  width: 100%;
  max-width: 277mm;
  margin: 0 auto;
}

/* =====================================================
   HEADER
===================================================== */

.header {
  display: flex;

  justify-content: space-between;

  align-items: flex-start;

  padding-bottom: 12px;

  border-bottom:
    3px solid #1e40af;

  margin-bottom: 16px;
}

.header-left {
  flex: 1;
}

.header-right {
  min-width: 190px;

  text-align: right;

  color: #64748b;

  font-size: 9px;

  line-height: 1.7;
}

.hospital-name {
  margin: 0;

  font-size: 21px;

  font-weight: 700;

  color: #1e3a8a;

  letter-spacing: -0.3px;
}

.hospital-subtitle {
  margin-top: 3px;

  font-size: 9px;

  color: #64748b;
}

.report-title {
  margin-top: 10px;

  font-size: 16px;

  font-weight: 700;

  color: #0f172a;
}

.report-period {
  margin-top: 3px;

  font-size: 9px;

  color: #64748b;
}

.header-right strong {
  color: #334155;
}

/* =====================================================
   FILTER / PERIOD BAR
===================================================== */

.period-bar {
  display: grid;

  grid-template-columns:
    1.3fr
    1fr
    1fr
    1fr;

  gap: 8px;

  margin-bottom: 14px;
}

.period-item {
  border:
    1px solid #dbe3ef;

  background: #f8fafc;

  border-radius: 6px;

  padding: 8px 10px;
}

.period-label {
  display: block;

  margin-bottom: 3px;

  font-size: 7px;

  font-weight: 700;

  text-transform: uppercase;

  letter-spacing: 0.05em;

  color: #64748b;
}

.period-value {
  font-size: 10px;

  font-weight: 700;

  color: #0f172a;
}

/* =====================================================
   SUMMARY CARDS
===================================================== */

.summary-grid {
  display: grid;

  grid-template-columns:
    repeat(6, minmax(0, 1fr));

  gap: 9px;

  margin-bottom: 18px;

  align-items: stretch;
}

.summary-card {
  position: relative;

  min-height: 70px;

  padding: 10px 11px;

  border:
    1px solid #dbe3ef;

  border-radius: 7px;

  background: #ffffff;

  overflow: hidden;

  /* CENTER KPI CONTENT */
  text-align: center;

  display: flex;

  flex-direction: column;

  justify-content: center;

  align-items: center;
}

.summary-card::before {
  content: "";

  position: absolute;

  left: 0;

  top: 0;

  bottom: 0;

  width: 3px;

  background: #2563eb;
}

.summary-label {
  width: 100%;

  font-size: 7.5px;

  font-weight: 700;

  text-transform: uppercase;

  letter-spacing: 0.04em;

  color: #64748b;

  text-align: center;
}

.summary-value {
  width: 100%;

  margin-top: 7px;

  font-size: 13px;

  line-height: 1.1;

  font-weight: 700;

  color: #0f172a;

  text-align: center;

  white-space: nowrap;
}

.summary-value.green {
  color: #047857;
}

/* =====================================================
   SECTION HEADER
===================================================== */

.section-header {
  display: flex;

  justify-content: space-between;

  align-items: center;

  margin-bottom: 7px;

  padding-bottom: 5px;

  border-bottom:
    1px solid #e2e8f0;
}

.section-title {
  font-size: 11px;

  font-weight: 700;

  color: #0f172a;
}

.section-info {
  font-size: 8px;

  color: #64748b;
}

.good-count {
  color: #047857;

  font-weight: 700;
}

.average-count {
  color: #c2410c;

  font-weight: 700;
}

/* =====================================================
   TABLE
===================================================== */

table {
  width: 100%;

  border-collapse: collapse;

  table-layout: fixed;

  text-align: center;
}

thead {
  display: table-header-group;
}

thead tr {
  background: #1e3a8a;
}

th {
  padding: 7px 6px;

  background: #1e3a8a;

  color: #ffffff;

  border:
    1px solid #1e3a8a;

  font-size: 8px;

  font-weight: 700;

  text-align: center;

  vertical-align: middle;

  white-space: normal;

  line-height: 1.25;
}

th:first-child {
  text-align: center;
}

td {
  padding: 7px 6px;

  border:
    1px solid #dbe3ef;

  font-size: 8px;

  color: #334155;

  vertical-align: middle;

  text-align: center;
}

tbody tr:nth-child(even) {
  background: #f8fafc;
}

tbody tr {
  page-break-inside: avoid;

  break-inside: avoid;
}


/* =====================================================
   TABLE ALIGNMENT
===================================================== */

.department-cell {
  text-align: center;

  vertical-align: middle;
}

.department-name {
  font-weight: 700;

  color: #0f172a;

  text-align: center;
}

.number-cell {
  text-align: center;

  white-space: nowrap;

  vertical-align: middle;
}

.center-cell {
  text-align: center;

  white-space: nowrap;

  vertical-align: middle;
}

.rank {
  font-weight: 700;

  color: #475569;

  text-align: center;
}


/* =====================================================
   GROWTH
===================================================== */

.growth {
  color: #047857;

  font-weight: 700;

  text-align: center;
}

.growth-negative {
  color: #dc2626;

  font-weight: 700;

  text-align: center;
}

/* =====================================================
   STATUS
===================================================== */

.status {
  display: inline-block;

  min-width: 50px;

  padding: 3px 7px;

  border-radius: 20px;

  font-size: 7px;

  font-weight: 700;

  text-align: center;
}

.status-good {
  color: #047857;

  background: #ecfdf5;

  border:
    1px solid #a7f3d0;
}

.status-average {
  color: #c2410c;

  background: #fff7ed;

  border:
    1px solid #fed7aa;
}

/* =====================================================
   EMPTY
===================================================== */

.empty-row {
  text-align: center;

  padding: 30px;

  color: #64748b;

  font-size: 9px;
}

/* =====================================================
   FOOTER
===================================================== */

.footer {
  display: flex;

  justify-content: space-between;

  align-items: center;

  margin-top: 14px;

  padding-top: 8px;

  border-top:
    1px solid #cbd5e1;

  color: #64748b;

  font-size: 7.5px;
}

.footer-right {
  text-align: right;
}

/* =====================================================
   PRINT
===================================================== */

@media print {

  body {
    background: #ffffff;
  }

  .report {
    width: 100%;
    max-width: none;
  }

  .header {
    break-inside: avoid;
    page-break-inside: avoid;
  }

  .period-bar {
    break-inside: avoid;
    page-break-inside: avoid;
  }

  .summary-grid {
    break-inside: avoid;
    page-break-inside: avoid;
  }

  .section-header {
    break-inside: avoid;
    page-break-inside: avoid;
  }

  table {
    page-break-inside: auto;
  }

  tr {
    page-break-inside: avoid;
    break-inside: avoid;
  }

  thead {
    display: table-header-group;
  }

  .footer {
    break-inside: avoid;
    page-break-inside: avoid;
  }
}

</style>

</head>

<body>

<div class="report">

  <!-- =================================================
       HEADER
  ================================================== -->

  <div class="header">

    <div class="header-left">

      <div class="hospital-name">
        ${escapeHtml(hospitalName)}
      </div>

      <div class="hospital-subtitle">
        ${escapeHtml(hospitalSubtitle)}
      </div>

      <div class="report-title">
        Department-wise Weekly MIS
      </div>

      <div class="report-period">
        Reporting Period:
        <strong>
          ${escapeHtml(weekLabel)}
        </strong>
      </div>

    </div>

    <div class="header-right">

      <div>
        <strong>Report Type:</strong>
        Weekly MIS
      </div>

      <div>
        <strong>Departments:</strong>
        ${data.length}
      </div>

      <div>
        <strong>Generated:</strong>
        ${formattedDate}
      </div>

      <div>
        <strong>Time:</strong>
        ${formattedTime}
      </div>

    </div>

  </div>


  <!-- =================================================
       REPORT INFORMATION
  ================================================== -->

  <div class="period-bar">

    <div class="period-item">

      <span class="period-label">
        Reporting Period
      </span>

      <span class="period-value">
        ${escapeHtml(weekLabel)}
      </span>

    </div>

    <div class="period-item">

      <span class="period-label">
        Total Departments
      </span>

      <span class="period-value">
        ${data.length}
      </span>

    </div>

    <div class="period-item">

      <span class="period-label">
        Good Performance
      </span>

      <span class="period-value">
        ${goodDepartments}
      </span>

    </div>

    <div class="period-item">

      <span class="period-label">
        Needs Attention
      </span>

      <span class="period-value">
        ${averageDepartments}
      </span>

    </div>

  </div>


  <!-- =================================================
       SUMMARY CARDS
  ================================================== -->

  <div class="summary-grid">

    <div class="summary-card">

      <div class="summary-label">
        Total Revenue
      </div>

      <div class="summary-value">
        ${formatCurrency(totalRevenue)}
      </div>

    </div>


    <div class="summary-card">

      <div class="summary-label">
        Total Collection
      </div>

      <div class="summary-value">
        ${formatCurrency(totalCollection)}
      </div>

    </div>


    <div class="summary-card">

      <div class="summary-label">
        Total Patients
      </div>

      <div class="summary-value">
        ${totalPatients.toLocaleString("en-IN")}
      </div>

    </div>


    <div class="summary-card">

      <div class="summary-label">
        Average Growth
      </div>

      <div class="summary-value green">
        ${averageGrowth >= 0 ? "↑" : "↓"}
        ${Math.abs(averageGrowth).toFixed(1)}%
      </div>

    </div>


    <div class="summary-card">

      <div class="summary-label">
        Collection %
      </div>

      <div class="summary-value">
        ${averageCollection.toFixed(1)}%
      </div>

    </div>


    <div class="summary-card">

      <div class="summary-label">
        Average LOS
      </div>

      <div class="summary-value">
        ${averageLOS.toFixed(1)}
      </div>

    </div>

  </div>


  <!-- =================================================
       SECTION HEADER
  ================================================== -->

  <div class="section-header">

    <div class="section-title">
      Department Performance
    </div>

    <div class="section-info">

      <span class="good-count">
        Good: ${goodDepartments}
      </span>

      &nbsp; • &nbsp;

      <span class="average-count">
        Average: ${averageDepartments}
      </span>

    </div>

  </div>


  <!-- =================================================
       TABLE
  ================================================== -->

  <table>

    <colgroup>

      <col style="width:20%">

      <col style="width:12%">

      <col style="width:9%">

      <col style="width:10%">

      <col style="width:13%">

      <col style="width:11%">

      <col style="width:8%">

      <col style="width:9%">

      <col style="width:8%">

    </colgroup>

    <thead>

      <tr>

        <th>
          Department
        </th>

        <th>
          Revenue
        </th>

        <th>
          Growth
        </th>

        <th>
          Patients
        </th>

        <th>
          Collection
        </th>

        <th>
          Collection %
        </th>

        <th>
          Avg. LOS
        </th>

        <th>
          Status
        </th>

        <th>
          Rank
        </th>

      </tr>

    </thead>

    <tbody>

      ${rows}

    </tbody>

  </table>


  <!-- =================================================
       FOOTER
  ================================================== -->

  <div class="footer">

    <div>
      Confidential • Internal Management Report
    </div>

    <div class="footer-right">

      Department-wise Weekly MIS

      &nbsp; • &nbsp;

      ${escapeHtml(weekLabel)}

    </div>

  </div>

</div>


<script>

window.onload = function () {

  setTimeout(function () {

    window.print();

    window.onafterprint = function () {
      window.close();
    };

  }, 300);

};

</script>

</body>

</html>
`;

  // ----------------------------------------------------
  // Open Print Window
  // ----------------------------------------------------

  const printWindow = window.open(
    "",
    "_blank",
    "width=1400,height=900"
  );

  if (!printWindow) {
    alert(
      "Unable to open print window. Please allow pop-ups for this site."
    );

    return;
  }

  printWindow.document.open();

  printWindow.document.write(html);

  printWindow.document.close();
}