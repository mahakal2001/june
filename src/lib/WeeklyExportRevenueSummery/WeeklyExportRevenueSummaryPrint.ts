// ======================================================
// WEEKLY REVENUE LEAKAGE SUMMARY PRINT REPORT
// ======================================================


export interface WeeklyRevenueLeakagePrintData {

  id: number | string;

  label: string;

  amount: number;

  percentage?: number;

  icon?: unknown;

}


// ======================================================
// OPTIONS
// ======================================================

interface PrintReportOptions {

  leakageFilter?: string;

  sortBy?: string;

  sortAscending?: boolean;

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

  return value
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
  ).format(
    Number(value || 0)
  )}`;

};


// ======================================================
// NUMBER
// ======================================================

const formatNumber = (
  value: number
): string => {

  return new Intl.NumberFormat(
    "en-IN"
  ).format(
    Number(value || 0)
  );

};


// ======================================================
// PERCENTAGE
// ======================================================

const formatPercentage = (
  value: number
): string => {

  return `${Number(
    value || 0
  ).toFixed(1)}%`;

};


// ======================================================
// PRINT REPORT
// ======================================================

export function WeeklyExportRevenueSummaryPrint(

  items: WeeklyRevenueLeakagePrintData[],

  totalLeakage: number,

  growth: number,

  weekLabel: string,

  options: PrintReportOptions = {}

) {


  // ====================================================
  // VALIDATION
  // ====================================================

  if (
    !items ||
    items.length === 0
  ) {

    alert(
      "No revenue leakage data available to print."
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


  const leakageFilter =
    options.leakageFilter ??
    "all";


  const sortBy =
    options.sortBy ??
    "amount";


  const sortAscending =
    options.sortAscending ??
    false;


  const search =
    options.search ??
    "";


  // ====================================================
  // SUMMARY CALCULATIONS
  // ====================================================

  const categoryCount =
    items.length;


  const calculatedTotalLeakage =
    Number(totalLeakage || 0);


  const averageLeakage =
    categoryCount > 0
      ? calculatedTotalLeakage /
        categoryCount
      : 0;


  // ====================================================
  // SORTED DATA
  // ====================================================

  const sortedItems =
    [...items].sort(
      (a, b) => {

        let comparison = 0;


        if (
          sortBy === "label"
        ) {

          comparison =
            String(a.label).localeCompare(
              String(b.label)
            );

        } else {

          comparison =
            Number(a.amount || 0) -
            Number(b.amount || 0);

        }


        return sortAscending
          ? comparison
          : -comparison;

      }
    );


  // ====================================================
  // HIGHEST LEAKAGE
  // ====================================================

  const highestLeakage =
    [...items].sort(
      (a, b) =>
        Number(b.amount || 0) -
        Number(a.amount || 0)
    )[0];


  // ====================================================
  // LOWEST LEAKAGE
  // ====================================================

  const lowestLeakage =
    [...items].sort(
      (a, b) =>
        Number(a.amount || 0) -
        Number(b.amount || 0)
    )[0];


  // ====================================================
  // TOP LEAKAGE SHARE
  // ====================================================

  const topLeakageShare =
    calculatedTotalLeakage > 0 &&
    highestLeakage
      ? (
          Number(
            highestLeakage.amount || 0
          ) /
          calculatedTotalLeakage
        ) * 100
      : 0;


  // ====================================================
  // FILTER DESCRIPTION
  // ====================================================

  const filterParts: string[] = [];


  if (
    leakageFilter &&
    leakageFilter !== "all"
  ) {

    filterParts.push(
      `Leakage: ${escapeHtml(
        leakageFilter
      )}`
    );

  }


  if (sortBy) {

    const sortLabel =
      sortBy === "label"
        ? "Category"
        : "Amount";


    filterParts.push(
      `Sort: ${sortLabel} ${
        sortAscending
          ? "Ascending"
          : "Descending"
      }`
    );

  }


  if (search.trim()) {

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
      : "All Leakage Categories";


  // ====================================================
  // GENERATED DATE
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
    sortedItems
      .map(
        (
          item,
          index
        ) => {

          const amount =
            Number(
              item.amount || 0
            );


          const percentage =
            calculatedTotalLeakage > 0
              ? (
                  amount /
                  calculatedTotalLeakage
                ) * 100
              : 0;


          return `

            <tr>

              <!-- SERIAL -->

              <td class="serial">

                ${index + 1}

              </td>


              <!-- CATEGORY -->

              <td class="category-column">

                <div class="category-cell">

                  <div class="category-icon">

                    !

                  </div>


                  <div class="category-info">

                    <div class="category-name">

                      ${escapeHtml(
                        String(
                          item.label
                        )
                      )}

                    </div>


                    <div class="category-role">

                      Revenue Leakage

                    </div>

                  </div>

                </div>

              </td>


              <!-- AMOUNT -->

              <td class="amount">

                ${formatCurrency(
                  amount
                )}

              </td>


              <!-- PERCENTAGE -->

              <td class="percentage">

                ${formatPercentage(
                  percentage
                )}

              </td>


              <!-- IMPACT -->

              <td class="impact">

                <span class="leakage-badge">

                  Leakage

                </span>

              </td>

            </tr>

          `;

        }
      )
      .join("");


  // ====================================================
  // WINDOW
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
  Weekly Revenue Leakage Summary
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

  --orange: #B54708;

  --orange-bg: #FFFAEB;

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

  padding:
    26px
    30px
    24px;

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
    2px solid
    var(--primary);

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

  background:
    var(--primary);

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

  color:
    var(--primary);

}


.hospital-subtitle {

  margin-top: 3px;

  color:
    var(--muted);

  font-size: 10.5px;

}


.header-right {

  text-align: right;

}


.report-label {

  font-size: 9px;

  font-weight: 700;

  color:
    var(--muted);

  text-transform:
    uppercase;

  letter-spacing:
    1.2px;

}


.report-title {

  margin-top: 3px;

  font-size: 16px;

  font-weight: 800;

  color:
    var(--primary);

}


.report-period {

  margin-top: 4px;

  font-size: 11px;

  font-weight: 600;

  color:
    var(--text-secondary);

}


/* =====================================================
   REPORT META
===================================================== */

.report-meta {

  display: flex;

  align-items: center;

  justify-content: space-between;

  margin-top: 14px;

  padding:
    9px
    12px;

  border:
    1px solid
    var(--border);

  border-radius: 7px;

  background:
    var(--primary-soft);

}


.meta-left {

  color:
    var(--text-secondary);

  font-size: 10.5px;

}


.meta-left strong {

  color:
    var(--primary);

}


.meta-right {

  color:
    var(--muted);

  font-size: 9.5px;

}


/* =====================================================
   SUMMARY CARDS
===================================================== */

.summary-grid {

  display: grid;

  grid-template-columns:
    repeat(5, 1fr);

  gap: 10px;

  margin-top: 14px;

}


.summary-card {

  min-height: 72px;

  padding:
    11px
    12px;

  border:
    1px solid
    var(--border);

  border-radius: 8px;

  background: #ffffff;

  text-align: center;

}


.summary-card:nth-child(1) {

  border-top:
    3px solid
    var(--primary);

}


.summary-card:nth-child(2) {

  border-top:
    3px solid
    var(--red);

}


.summary-card:nth-child(3) {

  border-top:
    3px solid
    var(--orange);

}


.summary-card:nth-child(4) {

  border-top:
    3px solid
    var(--primary);

}


.summary-card:nth-child(5) {

  border-top:
    3px solid
    var(--green);

}


.summary-label {

  color:
    var(--muted);

  font-size: 9.5px;

  font-weight: 600;

  text-transform:
    uppercase;

  letter-spacing:
    0.35px;

}


.summary-value {

  margin-top: 5px;

  color:
    var(--primary);

  font-size: 17px;

  font-weight: 800;

  line-height: 1.1;

}


.summary-description {

  margin-top: 3px;

  color:
    #98A2B3;

  font-size: 8.5px;

}


/* =====================================================
   HIGHLIGHTS
===================================================== */

.highlights {

  display: grid;

  grid-template-columns:
    repeat(3, 1fr);

  gap: 10px;

  margin-top: 12px;

}


.highlight-card {

  padding:
    10px
    12px;

  border:
    1px solid
    var(--border);

  border-radius: 8px;

  background:
    #ffffff;

}


.highlight-label {

  color:
    var(--muted);

  font-size: 8.5px;

  font-weight: 700;

  text-transform:
    uppercase;

  letter-spacing:
    0.5px;

}


.highlight-content {

  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 10px;

  margin-top: 5px;

}


.highlight-name {

  color:
    var(--primary);

  font-size: 10.5px;

  font-weight: 700;

}


.highlight-value {

  color:
    var(--red);

  font-size: 11px;

  font-weight: 800;

  white-space: nowrap;

}


.highlight-growth {

  color:
    ${
      growth >= 0
        ? "#087443"
        : "#B42318"
    };

  font-size: 11px;

  font-weight: 800;

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
    1px solid
    var(--border);

}


.section-title {

  font-size: 12px;

  font-weight: 800;

  color:
    var(--primary);

}


.section-subtitle {

  font-size: 9px;

  color:
    var(--muted);

}


/* =====================================================
   TABLE WRAPPER
===================================================== */

.table-wrapper {

  width: 100%;

  border:
    1px solid
    #CBD5E1;

  border-radius: 8px;

  overflow: hidden;

}


/* =====================================================
   TABLE
===================================================== */

table {

  width: 100%;

  border-collapse:
    collapse;

  table-layout:
    fixed;

}


thead {

  display:
    table-header-group;

}


thead tr {

  background:
    var(--primary);

  color:
    #ffffff;

}


th {

  padding:
    10px
    8px;

  font-size: 9px;

  font-weight: 700;

  text-align:
    center;

  text-transform:
    uppercase;

  letter-spacing:
    0.35px;

  border-right:
    1px solid
    rgba(
      255,
      255,
      255,
      0.18
    );

}


th:last-child {

  border-right:
    none;

}


/* =====================================================
   TABLE BODY
===================================================== */

td {

  padding:
    10px
    8px;

  border-bottom:
    1px solid
    var(--border-light);

  color:
    var(--text-secondary);

  font-size: 10.5px;

  vertical-align:
    middle;

  text-align:
    center;

}


tbody tr:nth-child(even) {

  background:
    var(--primary-soft);

}


tbody tr:nth-child(odd) {

  background:
    #ffffff;

}


tbody tr:last-child td {

  border-bottom:
    none;

}


/* =====================================================
   SERIAL
===================================================== */

.serial {

  width: 7%;

  text-align:
    center;

  color:
    #98A2B3;

  font-size: 9px;

  font-weight: 600;

}


/* =====================================================
   CATEGORY
===================================================== */

.category-column {

  width: 43%;

  text-align:
    center;

}


.category-cell {

  display: flex;

  align-items:
    center;

  justify-content:
    center;

  gap: 9px;

}


.category-icon {

  width: 28px;

  height: 28px;

  border-radius: 7px;

  display: flex;

  align-items:
    center;

  justify-content:
    center;

  flex-shrink: 0;

  background:
    var(--red-bg);

  color:
    var(--red);

  font-size: 12px;

  font-weight: 800;

  border:
    1px solid
    #FECACA;

}


.category-info {

  min-width: 0;

  text-align:
    left;

}


.category-name {

  color:
    var(--primary);

  font-weight: 700;

  font-size: 10.5px;

}


.category-role {

  margin-top: 1px;

  color:
    #98A2B3;

  font-size: 8px;

}


/* =====================================================
   AMOUNT
===================================================== */

.amount {

  width: 20%;

  text-align:
    center;

  font-weight: 700;

  color:
    var(--text);

  white-space:
    nowrap;

}


/* =====================================================
   PERCENTAGE
===================================================== */

.percentage {

  width: 15%;

  text-align:
    center;

  font-weight: 700;

  color:
    var(--red);

}


/* =====================================================
   IMPACT
===================================================== */

.impact {

  width: 15%;

  text-align:
    center;

}


.leakage-badge {

  display:
    inline-flex;

  align-items:
    center;

  justify-content:
    center;

  min-width:
    68px;

  padding:
    4px
    8px;

  border-radius:
    999px;

  color:
    var(--red);

  background:
    var(--red-bg);

  border:
    1px solid
    #FECACA;

  font-size: 8.5px;

  font-weight: 700;

}


/* =====================================================
   FOOTER
===================================================== */

.report-footer {

  display: flex;

  justify-content:
    space-between;

  align-items:
    center;

  margin-top: 18px;

  padding-top: 10px;

  border-top:
    1px solid
    var(--border);

  color:
    #98A2B3;

  font-size: 8.5px;

}


.footer-right {

  text-align:
    right;

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

    background:
      #ffffff;

    -webkit-print-color-adjust:
      exact !important;

    print-color-adjust:
      exact !important;

  }


  .report {

    padding:
      4px
      0
      0;

  }


  .table-wrapper {

    overflow:
      visible;

  }


  tr {

    break-inside:
      avoid;

    page-break-inside:
      avoid;

  }


  .summary-grid {

    break-inside:
      avoid;

    page-break-inside:
      avoid;

  }


  .highlights {

    break-inside:
      avoid;

    page-break-inside:
      avoid;

  }


  .header {

    break-inside:
      avoid;

    page-break-inside:
      avoid;

  }


  .report-meta {

    break-inside:
      avoid;

    page-break-inside:
      avoid;

  }


  .section-header {

    break-after:
      avoid;

    page-break-after:
      avoid;

  }

}


/* =====================================================
   SCREEN PREVIEW
===================================================== */

@media screen {

  body {

    background:
      #F3F4F6;

  }


  .report {

    max-width:
      1400px;

    margin:
      20px auto;

    background:
      #ffffff;

    min-height:
      100vh;

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

        Weekly Revenue Leakage Summary

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
       SUMMARY CARDS
  ================================================ -->

  <div class="summary-grid">


    <!-- CATEGORIES -->

    <div class="summary-card">

      <div class="summary-label">

        Leakage Categories

      </div>


      <div class="summary-value">

        ${formatNumber(
          categoryCount
        )}

      </div>


      <div class="summary-description">

        Categories included in report

      </div>

    </div>


    <!-- TOTAL -->

    <div class="summary-card">

      <div class="summary-label">

        Total Leakage

      </div>


      <div
        class="summary-value"
        style="
          color:#B42318;
        "
      >

        ${formatCurrency(
          calculatedTotalLeakage
        )}

      </div>


      <div class="summary-description">

        Estimated revenue leakage

      </div>

    </div>


    <!-- AVERAGE -->

    <div class="summary-card">

      <div class="summary-label">

        Average Leakage

      </div>


      <div
        class="summary-value"
        style="
          color:#B54708;
        "
      >

        ${formatCurrency(
          averageLeakage
        )}

      </div>


      <div class="summary-description">

        Average per category

      </div>

    </div>


    <!-- GROWTH -->

    <div class="summary-card">

      <div class="summary-label">

        Leakage Growth

      </div>


      <div
        class="summary-value"
        style="
          color:
            ${
              growth >= 0
                ? "#B42318"
                : "#087443"
            };
        "
      >

        ${growth >= 0
          ? "+"
          : ""}${Number(
            growth || 0
          ).toFixed(1)}%

      </div>


      <div class="summary-description">

        Compared with previous period

      </div>

    </div>


    <!-- TOP SHARE -->

    <div class="summary-card">

      <div class="summary-label">

        Top Leakage Share

      </div>


      <div
        class="summary-value"
        style="
          color:#1E3A8A;
        "
      >

        ${topLeakageShare.toFixed(
          1
        )}%

      </div>


      <div class="summary-description">

        Share of highest leakage

      </div>

    </div>


  </div>


  <!-- ===============================================
       HIGHLIGHTS
  ================================================ -->

  <div class="highlights">


    <!-- HIGHEST -->

    <div class="highlight-card">

      <div class="highlight-label">

        Highest Leakage

      </div>


      <div class="highlight-content">

        <div class="highlight-name">

          ${
            highestLeakage
              ? escapeHtml(
                  String(
                    highestLeakage.label
                  )
                )
              : "—"
          }

        </div>


        <div class="highlight-value">

          ${
            highestLeakage
              ? formatCurrency(
                  highestLeakage.amount
                )
              : "₹ 0"
          }

        </div>

      </div>

    </div>


    <!-- LOWEST -->

    <div class="highlight-card">

      <div class="highlight-label">

        Lowest Leakage

      </div>


      <div class="highlight-content">

        <div class="highlight-name">

          ${
            lowestLeakage
              ? escapeHtml(
                  String(
                    lowestLeakage.label
                  )
                )
              : "—"
          }

        </div>


        <div class="highlight-value">

          ${
            lowestLeakage
              ? formatCurrency(
                  lowestLeakage.amount
                )
              : "₹ 0"
          }

        </div>

      </div>

    </div>


    <!-- GROWTH -->

    <div class="highlight-card">

      <div class="highlight-label">

        Overall Leakage Trend

      </div>


      <div class="highlight-content">

        <div class="highlight-name">

          Weekly Revenue Leakage

        </div>


        <div class="highlight-growth">

          ${
            growth >= 0
              ? "↑"
              : "↓"
          }

          ${
            growth >= 0
              ? "+"
              : ""
          }${Number(
            growth || 0
          ).toFixed(1)}%

        </div>

      </div>

    </div>


  </div>


  <!-- ===============================================
       TABLE SECTION
  ================================================ -->

  <div class="section-header">


    <div>

      <div class="section-title">

        Revenue Leakage Details

      </div>


      <div class="section-subtitle">

        Weekly revenue leakage by category

      </div>

    </div>


    <div class="section-subtitle">

      ${formatNumber(
        categoryCount
      )}

      categories

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


          <th style="width:43%;">

            Leakage Category

          </th>


          <th style="width:20%;">

            Amount

          </th>


          <th style="width:15%;">

            % of Total

          </th>


          <th style="width:15%;">

            Impact

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

      Weekly Revenue MIS Report

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


  // ==================================================
  // AUTO PRINT
  // ==================================================

  window.onload = function () {

    setTimeout(
      function () {

        window.focus();

        window.print();

      },
      400
    );

  };


  // ==================================================
  // CLOSE AFTER PRINT
  // ==================================================

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