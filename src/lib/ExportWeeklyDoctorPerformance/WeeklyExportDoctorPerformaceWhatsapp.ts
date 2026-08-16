// ======================================================
// WEEKLY DOCTOR PERFORMANCE - WHATSAPP REPORT
// ======================================================

export interface WeeklyDoctorWhatsappData {
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

interface WeeklyDoctorWhatsappOptions {
  department?: string;

  rating?: string;

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
  ).format(value)}`;

};


// ======================================================
// NUMBER FORMAT
// ======================================================

const formatNumber = (
  value: number
): string => {

  return new Intl.NumberFormat(
    "en-IN"
  ).format(value);

};


// ======================================================
// ESCAPE WHATSAPP SPECIAL CHARACTERS
// ======================================================

const cleanText = (
  value: string
): string => {

  return value
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

  if (growth > 0) {

    return `📈 +${growth.toFixed(1)}%`;

  }

  if (growth < 0) {

    return `📉 ${growth.toFixed(1)}%`;

  }

  return `➖ 0.0%`;

};


// ======================================================
// RATING FORMAT
// ======================================================

const formatRating = (
  rating: number
): string => {

  return `⭐ ${rating.toFixed(1)}`;

};


// ======================================================
// MAIN FUNCTION
// ======================================================

export function ExportWeeklyDoctorPerformanceWhatsapp(

  doctors: WeeklyDoctorWhatsappData[],

  weekLabel: string,

  options: WeeklyDoctorWhatsappOptions = {}

): void {

  // ====================================================
  // FILTER SAFETY
  // ====================================================

  const filteredDoctors =
    Array.isArray(doctors)
      ? doctors
      : [];


  // ====================================================
  // OPTIONS
  // ====================================================

  const {

    department = "all",

    rating = "all",

    search = "",

    hospitalName =
      "Hospital Management System",

    hospitalSubtitle =
      "Management Information System",

  } = options;


  // ====================================================
  // SUMMARY
  // ====================================================

  const totalDoctors =
    filteredDoctors.length;


  const totalPatients =
    filteredDoctors.reduce(
      (total, doctor) =>
        total + doctor.patients,
      0
    );


  const totalRevenue =
    filteredDoctors.reduce(
      (total, doctor) =>
        total + doctor.revenue,
      0
    );


  const averageGrowth =
    totalDoctors > 0
      ? filteredDoctors.reduce(
          (total, doctor) =>
            total + doctor.growth,
          0
        ) / totalDoctors
      : 0;


  const averageRating =
    totalDoctors > 0
      ? filteredDoctors.reduce(
          (total, doctor) =>
            total + doctor.rating,
          0
        ) / totalDoctors
      : 0;


  // ====================================================
  // TOP PERFORMERS
  // ====================================================

  const topDoctors = [
    ...filteredDoctors,
  ]
    .sort(
      (a, b) =>
        b.revenue - a.revenue
    )
    .slice(0, 5);


  // ====================================================
  // FILTER DESCRIPTION
  // ====================================================

  const filterParts: string[] = [];


  if (
    department &&
    department !== "all"
  ) {

    filterParts.push(
      `Department: ${department}`
    );

  }


  if (
    rating &&
    rating !== "all"
  ) {

    filterParts.push(
      `Rating: ${rating}+`
    );

  }


  if (search.trim()) {

    filterParts.push(
      `Search: ${search.trim()}`
    );

  }


  const filterText =
    filterParts.length > 0
      ? filterParts.join(" | ")
      : "All Doctors";


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
    "📊 *WEEKLY DOCTOR PERFORMANCE MIS*"
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
  // SUMMARY
  // ====================================================

  message.push(
    "📌 *PERFORMANCE SUMMARY*"
  );


  message.push("");


  message.push(
    `👨‍⚕️ *Doctors:* ${formatNumber(
      totalDoctors
    )}`
  );


  message.push(
    `👥 *Patients:* ${formatNumber(
      totalPatients
    )}`
  );


  message.push(
    `💰 *Revenue:* ${formatCurrency(
      totalRevenue
    )}`
  );


  message.push(
    `📈 *Avg. Growth:* ${formatGrowth(
      averageGrowth
    )}`
  );


  message.push(
    `⭐ *Avg. Rating:* ${formatRating(
      averageRating
    )}`
  );


  message.push("");


  message.push(
    "━━━━━━━━━━━━━━━━━━━━"
  );


  // ====================================================
  // TOP PERFORMERS
  // ====================================================

  if (topDoctors.length > 0) {

    message.push(
      "🏆 *TOP PERFORMERS*"
    );


    message.push("");


    topDoctors.forEach(
      (doctor, index) => {

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
            doctor.doctor
          )}*`
        );


        message.push(
          `   🏢 ${cleanText(
            doctor.department
          )}`
        );


        message.push(
          `   👥 ${formatNumber(
            doctor.patients
          )} patients`
        );


        message.push(
          `   💰 ${formatCurrency(
            doctor.revenue
          )}`
        );


        message.push(
          `   ${formatGrowth(
            doctor.growth
          )}  ${formatRating(
            doctor.rating
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
  // DETAILED PERFORMANCE
  // ====================================================

  if (filteredDoctors.length > 0) {

    message.push(
      "👨‍⚕️ *DOCTOR-WISE PERFORMANCE*"
    );


    message.push("");


    filteredDoctors.forEach(
      (doctor, index) => {

        message.push(
          `*${index + 1}. ${cleanText(
            doctor.doctor
          )}*`
        );


        message.push(
          `🏢 ${cleanText(
            doctor.department
          )}`
        );


        message.push(
          `👥 Patients: ${formatNumber(
            doctor.patients
          )}`
        );


        message.push(
          `💰 Revenue: ${formatCurrency(
            doctor.revenue
          )}`
        );


        message.push(
          `${formatGrowth(
            doctor.growth
          )}   ${formatRating(
            doctor.rating
          )}`
        );


        message.push(
          "────────────────────"
        );

      }
    );

  } else {

    message.push(
      "⚠️ *No doctor performance data found.*"
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
    "📌 *Weekly MIS Report*"
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