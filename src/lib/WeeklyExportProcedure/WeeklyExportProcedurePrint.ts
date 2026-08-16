// ======================================================
// WEEKLY TOP PROCEDURES - PRINT REPORT
// ======================================================

export interface WeeklyProcedurePrintData {
  id: number | string;

  procedure: string;

  count: number;

  revenue: number;

  growth: number;
}


// ======================================================
// OPTIONS
// ======================================================

interface PrintReportOptions {
  procedure?: string;

  growth?: string;

  search?: string;

  hospitalName?: string;

  hospitalSubtitle?: string;
}


// ======================================================
// ESCAPE HTML
// ======================================================

const escapeHtml = (
  value: string
): string => {

  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

};


// ======================================================
// CURRENCY
// ======================================================

const formatCurrency = (
  value: number
): string => {

  return `₹ ${new Intl.NumberFormat(
    "en-IN"
  ).format(Number(value || 0))}`;

};


// ======================================================
// NUMBER
// ======================================================

const formatNumber = (
  value: number
): string => {

  return new Intl.NumberFormat(
    "en-IN"
  ).format(Number(value || 0));

};


// ======================================================
// PRINT REPORT
// ======================================================

export function WeeklyExportProcedurePrint(
  procedures: WeeklyProcedurePrintData[],
  weekLabel: string,
  options: PrintReportOptions = {}
) {

  // ====================================================
  // DATA SAFETY
  // ====================================================

  if (
    !procedures ||
    procedures.length === 0
  ) {

    alert(
      "No procedure performance data available to print."
    );

    return;

  }


  // ====================================================
  // OPTIONS
  // ====================================================

  const hospitalName =
    options.hospitalName ??
    "Hospital Management System";


  const hospitalSubtitle =
    options.hospitalSubtitle ??
    "Management Information System";


  const procedure =
    options.procedure ??
    "all";


  const growth =
    options.growth ??
    "all";


  const search =
    options.search ??
    "";


  // ====================================================
  // SUMMARY CALCULATIONS
  // ====================================================

  const totalProcedures =
    procedures.length;


  const totalCount =
    procedures.reduce(
      (sum, item) =>
        sum + Number(item.count || 0),
      0
    );


  const totalRevenue =
    procedures.reduce(
      (sum, item) =>
        sum + Number(item.revenue || 0),
      0
    );


  const averageGrowth =
    totalProcedures > 0
      ? procedures.reduce(
          (sum, item) =>
            sum + Number(item.growth || 0),
          0
        ) / totalProcedures
      : 0;


  const positiveGrowthProcedures =
    procedures.filter(
      (item) =>
        Number(item.growth || 0) >= 0
    ).length;


  const negativeGrowthProcedures =
    procedures.filter(
      (item) =>
        Number(item.growth || 0) < 0
    ).length;


  // ====================================================
  // TOP PERFORMERS
  // ====================================================

  const highestRevenue =
    [...procedures]
      .sort(
        (a, b) =>
          Number(b.revenue || 0) -
          Number(a.revenue || 0)
      )[0];


  const highestVolume =
    [...procedures]
      .sort(
        (a, b) =>
          Number(b.count || 0) -
          Number(a.count || 0)
      )[0];


  const highestGrowth =
    [...procedures]
      .sort(
        (a, b) =>
          Number(b.growth || 0) -
          Number(a.growth || 0)
      )[0];


  // ====================================================
  // FILTER DESCRIPTION
  // ====================================================

  const filterParts: string[] = [];


  if (
    procedure &&
    procedure !== "all"
  ) {

    filterParts.push(
      `Procedure: ${escapeHtml(
        procedure
      )}`
    );

  }


  if (
    growth &&
    growth !== "all"
  ) {

    let growthLabel =
      growth;


    if (
      growth === "positive"
    ) {

      growthLabel =
        "Positive Growth";

    }


    if (
      growth === "high"
    ) {

      growthLabel =
        "15% & Above";

    }


    if (
      growth === "low"
    ) {

      growthLabel =
        "Below 15%";

    }


    filterParts.push(
      `Growth: ${escapeHtml(
        growthLabel
      )}`
    );

  }


  if (
    search.trim()
  ) {

    filterParts.push(
      `Search: "${escapeHtml(
        search.trim()
      )}"`
    );

  }


  const filterText =
    filterParts.length > 0
      ? filterParts.join(
          "  •  "
        )
      : "All Procedures";


  // ====================================================
  // CURRENT DATE
  // ====================================================

  const generatedAt =
    new Date().toLocaleString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }
    );


  // ====================================================
  // TABLE ROWS
  // ====================================================

  const tableRows =
    procedures
      .map(
        (
          item,
          index
        ) => {

          const itemGrowth =
            Number(
              item.growth || 0
            );


          const growthClass =
            itemGrowth >= 0
              ? "positive"
              : "negative";


          const growthIcon =
            itemGrowth >= 0
              ? "↑"
              : "↓";


          const growthSign =
            itemGrowth >= 0
              ? "+"
              : "";


          return `

            <tr>

              <!-- SERIAL -->

              <td class="serial">

                ${index + 1}

              </td>


              <!-- PROCEDURE -->

              <td class="procedure-column">

                <div class="procedure-cell">

                  <div class="procedure-name">

                    ${escapeHtml(
                      item.procedure
                    )}

                  </div>

                </div>

              </td>


              <!-- COUNT -->

              <td class="number">

                ${formatNumber(
                  item.count
                )}

              </td>


              <!-- REVENUE -->

              <td class="currency">

                ${formatCurrency(
                  item.revenue
                )}

              </td>


              <!-- GROWTH -->

              <td class="growth">

                <span
                  class="${growthClass}"
                >

                  ${growthIcon}

                  ${growthSign}${itemGrowth.toFixed(
                    1
                  )}%

                </span>

              </td>

            </tr>

          `;

        }
      )
      .join("");


  // ====================================================
  // PRINT WINDOW
  // ====================================================

  const printWindow =
    window.open(
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


  // ====================================================
  // HTML
  // ====================================================

  const html = `

<!DOCTYPE html>

<html lang="en">

<head>

<meta charset="UTF-8" />

<meta
  name="viewport"
  content="width=device-width, initial-scale=1.0"
/>


<title>
  Weekly Top Procedures Report
</title>


<style>

/* =====================================================
   COLOR SYSTEM
===================================================== */

:root {

  --primary: #1E3A8A;

  --primary-dark: #172554;

  --primary-light: #EFF6FF;

  --primary-soft: #F5F8FF;

  --text: #172033;

  --text-secondary: #475467;

  --muted: #667085;

  --border: #E4E7EC;

  --border-light: #EAECF0;

  --green: #087443;

  --green-bg: #ECFDF3;

  --red: #B42318;

  --red-bg: #FEF3F2;

}


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


/* =====================================================
   BODY
===================================================== */

body {

  font-family:
    Inter,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    Arial,
    sans-serif;

  background: #ffffff;

  color: var(--text);

  font-size: 12px;

  line-height: 1.45;

}


/* =====================================================
   REPORT
===================================================== */

.report {

  width: 100%;

  padding: 26px 30px 24px;

}


/* =====================================================
   HEADER
===================================================== */

.header {

  display: flex;

  align-items: flex-start;

  justify-content: space-between;

  padding-bottom: 18px;

  border-bottom:
    2px solid var(--primary);

}


.header-left {

  display: flex;

  align-items: center;

  gap: 14px;

}


.logo {

  width: 48px;

  height: 48px;

  border-radius: 10px;

  display: flex;

  align-items: center;

  justify-content: center;

  background: var(--primary);

  color: #ffffff;

  font-size: 17px;

  font-weight: 800;

  letter-spacing: -0.5px;

}


.hospital-name {

  margin: 0;

  font-size: 19px;

  line-height: 1.2;

  font-weight: 800;

  color: var(--primary);

}


.hospital-subtitle {

  margin-top: 3px;

  color: var(--muted);

  font-size: 10.5px;

}


.header-right {

  text-align: right;

}


.report-label {

  font-size: 9px;

  font-weight: 700;

  color: var(--muted);

  text-transform: uppercase;

  letter-spacing: 1.2px;

}


.report-title {

  margin-top: 3px;

  font-size: 16px;

  font-weight: 800;

  color: var(--primary);

}


.report-period {

  margin-top: 4px;

  font-size: 11px;

  font-weight: 600;

  color: var(--text-secondary);

}


/* =====================================================
   REPORT META
===================================================== */

.report-meta {

  display: flex;

  align-items: center;

  justify-content: space-between;

  margin-top: 14px;

  padding: 9px 12px;

  border:
    1px solid var(--border);

  border-radius: 7px;

  background: var(--primary-soft);

}


.meta-left {

  color: var(--text-secondary);

  font-size: 10.5px;

}


.meta-left strong {

  color: var(--primary);

}


.meta-right {

  color: var(--muted);

  font-size: 9.5px;

}


/* =====================================================
   SUMMARY
===================================================== */

.summary-grid {

  display: grid;

  grid-template-columns:
    repeat(5, 1fr);

  gap: 10px;

  margin-top: 14px;

}


.summary-card {

  min-height: 70px;

  padding: 11px 12px;

  border:
    1px solid var(--border);

  border-radius: 8px;

  background: #ffffff;

  text-align: center;

}


.summary-card:first-child {

  border-top:
    3px solid var(--primary);

}


.summary-label {

  color: var(--muted);

  font-size: 9.5px;

  font-weight: 600;

  text-transform: uppercase;

  letter-spacing: 0.35px;

}


.summary-value {

  margin-top: 5px;

  color: var(--primary);

  font-size: 17px;

  font-weight: 800;

  line-height: 1.1;

}


.summary-description {

  margin-top: 3px;

  color: #98A2B3;

  font-size: 8.5px;

}


/* =====================================================
   SECTION HEADER
===================================================== */

.section-header {

  display: flex;

  align-items: center;

  justify-content: space-between;

  margin-top: 18px;

  margin-bottom: 8px;

  padding-bottom: 7px;

  border-bottom:
    1px solid var(--border);

}


.section-title {

  font-size: 12px;

  font-weight: 800;

  color: var(--primary);

}


.section-subtitle {

  font-size: 9px;

  color: var(--muted);

}


/* =====================================================
   TABLE WRAPPER
===================================================== */

.table-wrapper {

  width: 100%;

  border:
    1px solid #CBD5E1;

  border-radius: 8px;

  overflow: hidden;

}


/* =====================================================
   TABLE
===================================================== */

table {

  width: 100%;

  border-collapse: collapse;

  table-layout: fixed;

}


thead {

  display: table-header-group;

}


thead tr {

  background: var(--primary);

  color: #ffffff;

}


th {

  padding: 10px 8px;

  font-size: 9px;

  font-weight: 700;

  text-align: center;

  text-transform: uppercase;

  letter-spacing: 0.35px;

  border-right:
    1px solid
    rgba(255,255,255,0.18);

}


th:last-child {

  border-right: none;

}


/* =====================================================
   TABLE BODY
===================================================== */

td {

  padding: 10px 8px;

  border-bottom:
    1px solid var(--border-light);

  color: var(--text-secondary);

  font-size: 10.5px;

  vertical-align: middle;

  text-align: center;

}


tbody tr:nth-child(even) {

  background:
    var(--primary-soft);

}


tbody tr:nth-child(odd) {

  background: #ffffff;

}


tbody tr:last-child td {

  border-bottom: none;

}


/* =====================================================
   SERIAL
===================================================== */

.serial {

  width: 7%;

  text-align: center;

  color: #98A2B3;

  font-size: 9px;

  font-weight: 600;

}


/* =====================================================
   PROCEDURE
===================================================== */

.procedure-column {

  width: 42%;

  text-align: left;

}


.procedure-cell {

  display: flex;

  align-items: center;

  justify-content: flex-start;

}


.procedure-name {

  color: var(--primary);

  font-weight: 700;

  font-size: 10.5px;

  line-height: 1.35;

}


/* =====================================================
   COUNT
===================================================== */

.number {

  width: 16%;

  text-align: center;

  font-weight: 700;

  color: var(--text);

}


/* =====================================================
   REVENUE
===================================================== */

.currency {

  width: 20%;

  text-align: center;

  font-weight: 700;

  color: var(--text);

  white-space: nowrap;

}


/* =====================================================
   GROWTH
===================================================== */

.growth {

  width: 15%;

  text-align: center;

  font-weight: 700;

}


.positive {

  display: inline-flex;

  align-items: center;

  justify-content: center;

  min-width: 65px;

  padding: 4px 7px;

  border-radius: 5px;

  color: var(--green);

  background: var(--green-bg);

}


.negative {

  display: inline-flex;

  align-items: center;

  justify-content: center;

  min-width: 65px;

  padding: 4px 7px;

  border-radius: 5px;

  color: var(--red);

  background: var(--red-bg);

}


/* =====================================================
   HIGHLIGHTS
===================================================== */

.highlights-grid {

  display: grid;

  grid-template-columns:
    repeat(3, 1fr);

  gap: 10px;

  margin-top: 15px;

}


.highlight-card {

  padding: 10px 12px;

  border:
    1px solid var(--border);

  border-radius: 7px;

  background:
    var(--primary-soft);

}


.highlight-label {

  color: var(--muted);

  font-size: 8.5px;

  font-weight: 700;

  text-transform: uppercase;

  letter-spacing: 0.5px;

}


.highlight-name {

  margin-top: 4px;

  color: var(--primary);

  font-size: 10.5px;

  font-weight: 700;

}


.highlight-value {

  margin-top: 2px;

  color: var(--text);

  font-size: 10px;

  font-weight: 600;

}


/* =====================================================
   FOOTER
===================================================== */

.report-footer {

  display: flex;

  justify-content: space-between;

  align-items: center;

  margin-top: 18px;

  padding-top: 10px;

  border-top:
    1px solid var(--border);

  color: #98A2B3;

  font-size: 8.5px;

}


.footer-right {

  text-align: right;

}


/* =====================================================
   PRINT
===================================================== */

@page {

  size: A4 landscape;

  margin: 10mm;

}


@media print {

  body {

    background: #ffffff;

    -webkit-print-color-adjust:
      exact !important;

    print-color-adjust:
      exact !important;

  }


  .report {

    padding: 4px 0 0;

  }


  .table-wrapper {

    overflow: visible;

  }


  tr {

    break-inside: avoid;

    page-break-inside: avoid;

  }


  .summary-grid {

    break-inside: avoid;

    page-break-inside: avoid;

  }


  .highlights-grid {

    break-inside: avoid;

    page-break-inside: avoid;

  }


  .header {

    break-inside: avoid;

    page-break-inside: avoid;

  }


  .report-meta {

    break-inside: avoid;

    page-break-inside: avoid;

  }


  .section-header {

    break-after: avoid;

    page-break-after: avoid;

  }

}


/* =====================================================
   SCREEN PREVIEW
===================================================== */

@media screen {

  body {

    background: #F3F4F6;

  }


  .report {

    max-width: 1400px;

    margin: 20px auto;

    background: #ffffff;

    min-height: 100vh;

  }

}

</style>

</head>


<body>


<div class="report">


  <!-- ===============================================
       HEADER
  ================================================ -->

  <header class="header">


    <div class="header-left">

      <div class="logo">
        HMS
      </div>


      <div>

        <h1 class="hospital-name">

          ${escapeHtml(
            hospitalName
          )}

        </h1>


        <div class="hospital-subtitle">

          ${escapeHtml(
            hospitalSubtitle
          )}

        </div>

      </div>

    </div>


    <div class="header-right">

      <div class="report-label">

        Management Report

      </div>


      <div class="report-title">

        Weekly Top Procedures

      </div>


      <div class="report-period">

        ${escapeHtml(
          weekLabel
        )}

      </div>

    </div>


  </header>


  <!-- ===============================================
       META
  ================================================ -->

  <div class="report-meta">


    <div class="meta-left">

      <strong>
        Report Filters:
      </strong>

      &nbsp;

      ${filterText}

    </div>


    <div class="meta-right">

      Generated:
      ${generatedAt}

    </div>


  </div>


  <!-- ===============================================
       SUMMARY
  ================================================ -->

  <div class="summary-grid">


    <div class="summary-card">

      <div class="summary-label">

        Procedures

      </div>


      <div class="summary-value">

        ${formatNumber(
          totalProcedures
        )}

      </div>


      <div class="summary-description">

        Procedures included in report

      </div>

    </div>


    <div class="summary-card">

      <div class="summary-label">

        Total Count

      </div>


      <div class="summary-value">

        ${formatNumber(
          totalCount
        )}

      </div>


      <div class="summary-description">

        Weekly procedure volume

      </div>

    </div>


    <div class="summary-card">

      <div class="summary-label">

        Total Revenue

      </div>


      <div class="summary-value">

        ${formatCurrency(
          totalRevenue
        )}

      </div>


      <div class="summary-description">

        Reported procedure revenue

      </div>

    </div>


    <div class="summary-card">

      <div class="summary-label">

        Avg. Growth

      </div>


      <div
        class="summary-value"
        style="
          color:
            ${averageGrowth >= 0
              ? "#087443"
              : "#B42318"};
        "
      >

        ${averageGrowth >= 0
          ? "+"
          : ""}${averageGrowth.toFixed(1)}%

      </div>


      <div class="summary-description">

        Average procedure growth

      </div>

    </div>


    <div class="summary-card">

      <div class="summary-label">

        Positive Growth

      </div>


      <div
        class="summary-value"
        style="
          color: #087443;
        "
      >

        ${formatNumber(
          positiveGrowthProcedures
        )}

      </div>


      <div class="summary-description">

        ${formatNumber(
          negativeGrowthProcedures
        )}
        with negative growth

      </div>

    </div>


  </div>


  <!-- ===============================================
       HIGHLIGHTS
  ================================================ -->

  <div class="section-header">

    <div>

      <div class="section-title">

        Performance Highlights

      </div>


      <div class="section-subtitle">

        Key procedure-level performance indicators

      </div>

    </div>

  </div>


  <div class="highlights-grid">


    <div class="highlight-card">

      <div class="highlight-label">

        Highest Revenue

      </div>


      <div class="highlight-name">

        ${escapeHtml(
          highestRevenue?.procedure ??
          "—"
        )}

      </div>


      <div class="highlight-value">

        ${highestRevenue
          ? formatCurrency(
              highestRevenue.revenue
            )
          : "—"}

      </div>

    </div>


    <div class="highlight-card">

      <div class="highlight-label">

        Highest Volume

      </div>


      <div class="highlight-name">

        ${escapeHtml(
          highestVolume?.procedure ??
          "—"
        )}

      </div>


      <div class="highlight-value">

        ${highestVolume
          ? `${formatNumber(
              highestVolume.count
            )} procedures`
          : "—"}

      </div>

    </div>


    <div class="highlight-card">

      <div class="highlight-label">

        Highest Growth

      </div>


      <div class="highlight-name">

        ${escapeHtml(
          highestGrowth?.procedure ??
          "—"
        )}

      </div>


      <div
        class="highlight-value"
        style="
          color:
            ${(highestGrowth?.growth ?? 0) >= 0
              ? "#087443"
              : "#B42318"};
        "
      >

        ${highestGrowth
          ? `${
              highestGrowth.growth >= 0
                ? "+"
                : ""
            }${Number(
              highestGrowth.growth
            ).toFixed(1)}%`
          : "—"}

      </div>

    </div>


  </div>


  <!-- ===============================================
       TABLE SECTION
  ================================================ -->

  <div class="section-header">


    <div>

      <div class="section-title">

        Procedure Performance Details

      </div>


      <div class="section-subtitle">

        Weekly performance metrics by procedure

      </div>

    </div>


    <div class="section-subtitle">

      ${formatNumber(
        totalProcedures
      )}

      procedures

    </div>


  </div>


  <!-- ===============================================
       TABLE
  ================================================ -->

  <div class="table-wrapper">


    <table>


      <thead>

        <tr>

          <th style="width:7%;">

            #

          </th>


          <th style="width:42%;">

            Procedure

          </th>


          <th style="width:16%;">

            Count

          </th>


          <th style="width:20%;">

            Revenue

          </th>


          <th style="width:15%;">

            Growth

          </th>

        </tr>

      </thead>


      <tbody>

        ${tableRows}

      </tbody>


    </table>


  </div>


  <!-- ===============================================
       FOOTER
  ================================================ -->

  <footer class="report-footer">


    <div>

      ${escapeHtml(
        hospitalName
      )}

      &nbsp; • &nbsp;

      Weekly MIS Report

    </div>


    <div class="footer-right">

      Confidential Management Report

      <br />

      Generated:

      ${generatedAt}

    </div>


  </footer>


</div>


<script>

  window.onload = function () {

    setTimeout(
      function () {

        window.focus();

        window.print();

      },
      400
    );

  };


  window.onafterprint = function () {

    setTimeout(
      function () {

        window.close();

      },
      300
    );

  };

</script>


</body>

</html>

`;


  // ====================================================
  // WRITE DOCUMENT
  // ====================================================

  printWindow.document.open();

  printWindow.document.write(
    html
  );

  printWindow.document.close();

}