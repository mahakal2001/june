// ======================================================
// WEEKLY TOP PROCEDURES - WHATSAPP REPORT
// ======================================================

export interface WeeklyProcedureWhatsappData {
  id: number | string;

  procedure: string;

  count: number;

  revenue: number;

  growth: number;
}


// ======================================================
// OPTIONS
// ======================================================

interface WeeklyProcedureWhatsappOptions {
  procedure?: string;

  growth?: string;

  search?: string;

  hospitalName?: string;

  hospitalSubtitle?: string;
}


// ======================================================
// CURRENCY FORMAT
// ======================================================

const formatCurrency = (
  value: number
): string => {
  return `₹${new Intl.NumberFormat(
    "en-IN"
  ).format(Number(value || 0))}`;
};


// ======================================================
// NUMBER FORMAT
// ======================================================

const formatNumber = (
  value: number
): string => {
  return new Intl.NumberFormat(
    "en-IN"
  ).format(Number(value || 0));
};


// ======================================================
// CLEAN WHATSAPP TEXT
// ======================================================

const cleanText = (
  value: string
): string => {
  return String(value || "")
    .replace(/\*/g, "")
    .replace(/_/g, "")
    .replace(/~/g, "")
    .trim();
};


// ======================================================
// GROWTH FORMAT
// ======================================================

const formatGrowth = (
  growth: number
): string => {

  const value = Number(growth || 0);

  if (value > 0) {
    return `📈 +${value.toFixed(1)}%`;
  }

  if (value < 0) {
    return `📉 ${value.toFixed(1)}%`;
  }

  return `➖ 0.0%`;
};


// ======================================================
// MAIN FUNCTION
// ======================================================

export function ExportWeeklyProcedureWhatsapp(
  procedures: WeeklyProcedureWhatsappData[],
  weekLabel: string,
  options: WeeklyProcedureWhatsappOptions = {}
): void {

  // ====================================================
  // SAFETY
  // ====================================================

  const filteredProcedures =
    Array.isArray(procedures)
      ? procedures
      : [];


  // ====================================================
  // OPTIONS
  // ====================================================

  const {
    procedure = "all",
    growth = "all",
    search = "",

    hospitalName =
      "Hospital Management System",

    hospitalSubtitle =
      "Management Information System",

  } = options;


  // ====================================================
  // SUMMARY
  // ====================================================

  const totalProcedures =
    filteredProcedures.length;


  const totalCount =
    filteredProcedures.reduce(
      (total, item) =>
        total + Number(item.count || 0),
      0
    );


  const totalRevenue =
    filteredProcedures.reduce(
      (total, item) =>
        total + Number(item.revenue || 0),
      0
    );


  const averageGrowth =
    totalProcedures > 0
      ? filteredProcedures.reduce(
          (total, item) =>
            total + Number(item.growth || 0),
          0
        ) / totalProcedures
      : 0;


  const positiveGrowth =
    filteredProcedures.filter(
      (item) =>
        Number(item.growth || 0) >= 0
    ).length;


  // ====================================================
  // TOP PERFORMERS
  // ====================================================

  const topProcedures = [
    ...filteredProcedures,
  ]
    .sort(
      (a, b) =>
        Number(b.revenue || 0) -
        Number(a.revenue || 0)
    )
    .slice(0, 5);


  // ====================================================
  // HIGHEST PERFORMERS
  // ====================================================

  const highestRevenue =
    filteredProcedures.length > 0
      ? [...filteredProcedures].sort(
          (a, b) =>
            Number(b.revenue || 0) -
            Number(a.revenue || 0)
        )[0]
      : null;


  const highestVolume =
    filteredProcedures.length > 0
      ? [...filteredProcedures].sort(
          (a, b) =>
            Number(b.count || 0) -
            Number(a.count || 0)
        )[0]
      : null;


  const highestGrowth =
    filteredProcedures.length > 0
      ? [...filteredProcedures].sort(
          (a, b) =>
            Number(b.growth || 0) -
            Number(a.growth || 0)
        )[0]
      : null;


  // ====================================================
  // FILTER DESCRIPTION
  // ====================================================

  const filterParts: string[] = [];


  if (
    procedure &&
    procedure !== "all"
  ) {
    filterParts.push(
      `Procedure: ${cleanText(procedure)}`
    );
  }


  if (
    growth &&
    growth !== "all"
  ) {

    let growthLabel = growth;

    if (growth === "positive") {
      growthLabel = "Positive Growth";
    }

    if (growth === "high") {
      growthLabel = "15% & Above";
    }

    if (growth === "low") {
      growthLabel = "Below 15%";
    }

    filterParts.push(
      `Growth: ${growthLabel}`
    );
  }


  if (search.trim()) {
    filterParts.push(
      `Search: ${cleanText(search.trim())}`
    );
  }


  const filterText =
    filterParts.length > 0
      ? filterParts.join(" | ")
      : "All Procedures";


  // ====================================================
  // DATE & TIME
  // ====================================================

  const generatedAt =
    new Date().toLocaleString(
      "en-IN",
      {
        dateStyle: "medium",
        timeStyle: "short",
      }
    );


  // ====================================================
  // MESSAGE
  // ====================================================

  const message: string[] = [];


  // ====================================================
  // HEADER
  // ====================================================

  message.push(
    `🏥 *${cleanText(
      hospitalName
    )}*`
  );


  message.push(
    `_${cleanText(
      hospitalSubtitle
    )}_`
  );


  message.push("");


  message.push(
    "📊 *WEEKLY TOP PROCEDURES MIS*"
  );


  message.push(
    `📅 *Period:* ${cleanText(
      weekLabel
    )}`
  );


  message.push(
    `🔎 *Filters:* ${cleanText(
      filterText
    )}`
  );


  message.push("");


  message.push(
    "━━━━━━━━━━━━━━━━━━━━"
  );


  // ====================================================
  // PERFORMANCE SUMMARY
  // ====================================================

  message.push(
    "📌 *PERFORMANCE SUMMARY*"
  );


  message.push("");


  message.push(
    `🩺 *Procedures:* ${formatNumber(
      totalProcedures
    )}`
  );


  message.push(
    `🔢 *Total Count:* ${formatNumber(
      totalCount
    )}`
  );


  message.push(
    `💰 *Total Revenue:* ${formatCurrency(
      totalRevenue
    )}`
  );


  message.push(
    `📈 *Avg. Growth:* ${formatGrowth(
      averageGrowth
    )}`
  );


  message.push(
    `🟢 *Positive Growth:* ${formatNumber(
      positiveGrowth
    )} / ${formatNumber(
      totalProcedures
    )}`
  );


  message.push("");


  message.push(
    "━━━━━━━━━━━━━━━━━━━━"
  );


  // ====================================================
  // PERFORMANCE HIGHLIGHTS
  // ====================================================

  if (
    highestRevenue ||
    highestVolume ||
    highestGrowth
  ) {

    message.push(
      "🏆 *PERFORMANCE HIGHLIGHTS*"
    );


    message.push("");


    if (highestRevenue) {

      message.push(
        `💰 *Highest Revenue*`
      );

      message.push(
        `   ${cleanText(
          highestRevenue.procedure
        )}`
      );

      message.push(
        `   ${formatCurrency(
          highestRevenue.revenue
        )}`
      );

      message.push("");

    }


    if (highestVolume) {

      message.push(
        `🔢 *Highest Volume*`
      );

      message.push(
        `   ${cleanText(
          highestVolume.procedure
        )}`
      );

      message.push(
        `   ${formatNumber(
          highestVolume.count
        )} procedures`
      );

      message.push("");

    }


    if (highestGrowth) {

      message.push(
        `📈 *Highest Growth*`
      );

      message.push(
        `   ${cleanText(
          highestGrowth.procedure
        )}`
      );

      message.push(
        `   ${formatGrowth(
          highestGrowth.growth
        )}`
      );

      message.push("");

    }


    message.push(
      "━━━━━━━━━━━━━━━━━━━━"
    );

  }


  // ====================================================
  // TOP 5 PROCEDURES
  // ====================================================

  if (topProcedures.length > 0) {

    message.push(
      "🥇 *TOP PROCEDURES*"
    );


    message.push("");


    topProcedures.forEach(
      (item, index) => {

        const rank =
          index === 0
            ? "🥇"
            : index === 1
            ? "🥈"
            : index === 2
            ? "🥉"
            : `${index + 1}.`;


        message.push(
          `${rank} *${cleanText(
            item.procedure
          )}*`
        );


        message.push(
          `   🔢 Count: ${formatNumber(
            item.count
          )}`
        );


        message.push(
          `   💰 Revenue: ${formatCurrency(
            item.revenue
          )}`
        );


        message.push(
          `   ${formatGrowth(
            item.growth
          )}`
        );


        message.push("");

      }
    );


    message.push(
      "━━━━━━━━━━━━━━━━━━━━"
    );

  }


  // ====================================================
  // DETAILED PROCEDURE PERFORMANCE
  // ====================================================

  if (filteredProcedures.length > 0) {

    message.push(
      "📋 *PROCEDURE-WISE PERFORMANCE*"
    );


    message.push("");


    filteredProcedures.forEach(
      (item, index) => {

        message.push(
          `*${index + 1}. ${cleanText(
            item.procedure
          )}*`
        );


        message.push(
          `🔢 Count: ${formatNumber(
            item.count
          )}`
        );


        message.push(
          `💰 Revenue: ${formatCurrency(
            item.revenue
          )}`
        );


        message.push(
          `${formatGrowth(
            item.growth
          )}`
        );


        message.push(
          "────────────────────"
        );

      }
    );

  } else {

    message.push(
      "⚠️ *No procedure performance data found.*"
    );

  }


  // ====================================================
  // FOOTER
  // ====================================================

  message.push("");


  message.push(
    "━━━━━━━━━━━━━━━━━━━━"
  );


  message.push(
    `🕒 *Generated:* ${generatedAt}`
  );


  message.push(
    "📌 *Weekly Procedure MIS Report*"
  );


  message.push("");


  message.push(
    "_This is an automatically generated management report._"
  );


  // ====================================================
  // FINAL MESSAGE
  // ====================================================

  const whatsappMessage =
    message.join("\n");


  // ====================================================
  // WHATSAPP URL
  // ====================================================

  const whatsappUrl =
    `https://wa.me/?text=${encodeURIComponent(
      whatsappMessage
    )}`;


  // ====================================================
  // OPEN WHATSAPP
  // ====================================================

  window.open(
    whatsappUrl,
    "_blank",
    "noopener,noreferrer"
  );
}