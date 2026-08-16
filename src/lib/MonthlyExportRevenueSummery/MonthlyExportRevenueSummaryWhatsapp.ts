// ======================================================
// TYPE
// ======================================================

export interface MonthlyRevenueLeakageWhatsappData {
  id: number | string;

  label: string;

  amount: number;

  percentage?: number;

  icon?: React.ElementType;
}


// ======================================================
// OPTIONS
// ======================================================

interface WhatsappExportOptions {
  leakageFilter?: string;

  sortBy?: string;

  sortAscending?: boolean;

  search?: string;

  hospitalName?: string;

  hospitalSubtitle?: string;

  phoneNumber?: string;
}


// ======================================================
// CURRENCY FORMAT
// ======================================================

function formatCurrency(
  value: number
) {
  return `₹ ${new Intl.NumberFormat(
    "en-IN"
  ).format(
    Number(value || 0)
  )}`;
}


// ======================================================
// NUMBER FORMAT
// ======================================================

function formatNumber(
  value: number
) {
  return new Intl.NumberFormat(
    "en-IN"
  ).format(
    Number(value || 0)
  );
}


// ======================================================
// DATE FORMAT
// ======================================================

function formatDate(
  date: Date
) {
  return date.toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
}


// ======================================================
// MAIN WHATSAPP EXPORT
// ======================================================

export function MonthlyExportRevenueSummaryWhatsapp(
  data: MonthlyRevenueLeakageWhatsappData[],
  totalLeakage: number,
  growth: number,
  monthLabel: string,
  options: WhatsappExportOptions = {}
) {

  try {

    // ====================================================
    // HOSPITAL INFORMATION
    // ====================================================

    const hospitalName =
      options.hospitalName ||
      "HOSPITAL MANAGEMENT SYSTEM";

    const hospitalSubtitle =
      options.hospitalSubtitle ||
      "Management Information System";


    // ====================================================
    // DATE / TIME
    // ====================================================

    const generatedAt =
      new Date();

    const generatedDate =
      formatDate(
        generatedAt
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
        (
          sum,
          item
        ) =>
          sum +
          Number(
            item.amount || 0
          ),
        0
      );

    const reportTotalLeakage =
      Number(
        totalLeakage || 0
      ) ||
      calculatedTotal;


    const averageLeakage =
      totalCategories > 0
        ? reportTotalLeakage /
          totalCategories
        : 0;


    // ====================================================
    // HIGHEST LEAKAGE
    // ====================================================

    const highestLeakage =
      data.length > 0
        ? [...data].sort(
            (
              a,
              b
            ) =>
              Number(
                b.amount || 0
              ) -
              Number(
                a.amount || 0
              )
          )[0]
        : null;


    const highestPercentage =
      highestLeakage &&
      reportTotalLeakage > 0
        ? (
            Number(
              highestLeakage.amount ||
              0
            ) /
            reportTotalLeakage
          ) *
          100
        : 0;


    // ====================================================
    // SORT DATA
    // ====================================================

    const sortedData =
      [...data].sort(
        (
          a,
          b
        ) => {

          let comparison = 0;


          if (
            options.sortBy ===
            "label"
          ) {

            comparison =
              a.label.localeCompare(
                b.label
              );

          } else {

            comparison =
              Number(
                a.amount || 0
              ) -
              Number(
                b.amount || 0
              );

          }


          return options.sortAscending
            ? comparison
            : -comparison;

        }
      );


    // ====================================================
    // FILTER DISPLAY
    // ====================================================

    const leakageFilter =
      options.leakageFilter &&
      options.leakageFilter !==
        "all"
        ? options.leakageFilter
        : "All Leakage Types";


    const sortFilter =
      options.sortBy ===
      "label"
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
    // GROWTH DISPLAY
    // ====================================================

    const growthValue =
      Number(
        growth || 0
      );

    const growthText =
      `${growthValue >= 0 ? "+" : ""}${growthValue.toFixed(1)}%`;


    // ====================================================
    // REPORT HEADER
    // ====================================================

    let message = "";


    message +=
      `*${hospitalName}*\n`;

    message +=
      `${hospitalSubtitle}\n`;

    message +=
      `━━━━━━━━━━━━━━━━━━━━\n`;

    message +=
      `*WEEKLY REVENUE LEAKAGE SUMMARY*\n`;

    message +=
      `━━━━━━━━━━━━━━━━━━━━\n\n`;


    // ====================================================
    // REPORTING PERIOD
    // ====================================================

    message +=
      `📅 *Reporting Period*\n`;

    message +=
      `${monthLabel}\n\n`;


    // ====================================================
    // EXECUTIVE SUMMARY
    // ====================================================

    message +=
      `📊 *EXECUTIVE SUMMARY*\n`;

    message +=
      `━━━━━━━━━━━━━━━━━━━━\n`;

    message +=
      `• Leakage Categories : *${formatNumber(
        totalCategories
      )}*\n`;

    message +=
      `• Total Leakage : *${formatCurrency(
        reportTotalLeakage
      )}*\n`;

    message +=
      `• Average Leakage : *${formatCurrency(
        averageLeakage
      )}*\n`;

    message +=
      `• Leakage Growth : *${growthText}*\n`;


    if (
      highestLeakage
    ) {

      message +=
        `• Highest Leakage : *${formatCurrency(
          highestLeakage.amount
        )}*\n`;

      message +=
        `• Top Category : *${highestLeakage.label}*\n`;

      message +=
        `• Top Category Share : *${highestPercentage.toFixed(
          1
        )}%*\n`;

    }


    message +=
      `\n`;


    // ====================================================
    // LEAKAGE BREAKDOWN
    // ====================================================

    message +=
      `🔴 *LEAKAGE BREAKDOWN*\n`;

    message +=
      `━━━━━━━━━━━━━━━━━━━━\n`;


    if (
      sortedData.length ===
      0
    ) {

      message +=
        `No revenue leakage data available.\n\n`;

    } else {

      sortedData.forEach(
        (
          item,
          index
        ) => {

          const amount =
            Number(
              item.amount ||
              0
            );


          const percentage =
            reportTotalLeakage >
            0
              ? (
                  amount /
                  reportTotalLeakage
                ) *
                100
              : 0;


          message +=
            `*${index + 1}. ${item.label}*\n`;

          message +=
            `   Amount : *${formatCurrency(
              amount
            )}*\n`;

          message +=
            `   Share  : *${percentage.toFixed(
              1
            )}%*\n`;

          message +=
            `   Impact : *Leakage*\n`;


          if (
            index <
            sortedData.length - 1
          ) {

            message +=
              `\n`;

          }

        }
      );

      message +=
        `\n`;

    }


    // ====================================================
    // APPLIED FILTERS
    // ====================================================

    message +=
      `🔎 *APPLIED FILTERS*\n`;

    message +=
      `━━━━━━━━━━━━━━━━━━━━\n`;

    message +=
      `• Leakage Type : ${leakageFilter}\n`;

    message +=
      `• Sort : ${sortFilter} - ${sortDirection}\n`;

    message +=
      `• Search : ${searchFilter}\n\n`;


    // ====================================================
    // MANAGEMENT HIGHLIGHT
    // ====================================================

    message +=
      `💡 *MANAGEMENT HIGHLIGHT*\n`;

    message +=
      `━━━━━━━━━━━━━━━━━━━━\n`;


    if (
      highestLeakage
    ) {

      message +=
        `Highest revenue leakage is from *${highestLeakage.label}*, contributing *${highestPercentage.toFixed(
          1
        )}%* of total leakage.\n\n`;

    } else {

      message +=
        `No significant leakage category identified.\n\n`;

    }


    // ====================================================
    // REPORT INFORMATION
    // ====================================================

    message +=
      `📌 *REPORT INFORMATION*\n`;

    message +=
      `━━━━━━━━━━━━━━━━━━━━\n`;

    message +=
      `• Generated : ${generatedDate}\n`;

    message +=
      `• Time : ${generatedTime}\n`;

    message +=
      `• Report : Monthly Revenue Leakage MIS\n\n`;


    // ====================================================
    // FOOTER
    // ====================================================

    message +=
      `━━━━━━━━━━━━━━━━━━━━\n`;

    message +=
      `🔒 *Confidential - For Internal Management Use Only*\n`;

    message +=
      `_${hospitalName}_`;


    // ====================================================
    // WHATSAPP URL
    // ====================================================

    const encodedMessage =
      encodeURIComponent(
        message
      );


    let whatsappUrl =
      "";


    if (
      options.phoneNumber?.trim()
    ) {

      const phone =
        options.phoneNumber
          .replace(
            /\D/g,
            ""
          );

      whatsappUrl =
        `https://wa.me/${phone}?text=${encodedMessage}`;

    } else {

      whatsappUrl =
        `https://wa.me/?text=${encodedMessage}`;

    }


    // ====================================================
    // OPEN WHATSAPP
    // ====================================================

    window.open(
      whatsappUrl,
      "_blank",
      "noopener,noreferrer"
    );


    // ====================================================
    // CONSOLE
    // ====================================================

    console.log(
      "Monthly Revenue Leakage WhatsApp report generated."
    );

    console.log(
      "WhatsApp message:",
      message
    );


  } catch (
    error
  ) {

    console.error(
      "Monthly Revenue Leakage WhatsApp export failed:",
      error
    );

    alert(
      "WhatsApp report generation failed. Please check the browser console."
    );

  }

}