import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

type Doctor = {
  id: number;
  name: string;
  department: string;
  patients: number;
  revenue: number;
  rating: number;
};

const money = (value: number) =>
  new Intl.NumberFormat("en-IN").format(value);

export function exportDoctorsPDF(rows: Doctor[]) {
  const doc = new jsPDF({
    orientation: "landscape",
    format: "a4",
    unit: "pt",
  });

  const pageWidth = doc.internal.pageSize.getWidth();

  // ---------------- Header ----------------

  doc.setFillColor(15, 23, 42);
  doc.rect(0, 0, pageWidth, 70, "F");

  doc.setTextColor(255);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(24);
  doc.text("Top Performing Doctors Report", 40, 42);

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Leads Health Care", 40, 58);

  doc.text(
    `Generated : ${new Date().toLocaleString()}`,
    pageWidth - 220,
    42
  );

  // ---------------- Summary ----------------

  const totalDoctors = rows.length;

  const totalPatients = rows.reduce(
    (sum, row) => sum + row.patients,
    0
  );

  const totalRevenue = rows.reduce(
    (sum, row) => sum + row.revenue,
    0
  );

  const averageRating =
    rows.length === 0
      ? 0
      : rows.reduce((sum, row) => sum + row.rating, 0) /
        rows.length;

  const totalDepartments = new Set(
    rows.map((r) => r.department)
  ).size;

  doc.setTextColor(0);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("Executive Summary", 40, 105);

  const cards = [
    {
      title: "Total Doctors",
      value: totalDoctors.toString(),
    },
    {
      title: "Total Patients",
      value: money(totalPatients),
    },
    {
      title: "Total Revenue",
      value: `Rs. ${money(totalRevenue)}`,
    },
    {
      title: "Average Rating",
      value: averageRating.toFixed(2),
    },
    {
      title: "Departments",
      value: totalDepartments.toString(),
    },
  ];

  let x = 40;
  let y = 125;

  cards.forEach((card, index) => {
    doc.setFillColor(247, 248, 250);

    doc.roundedRect(x, y, 170, 60, 6, 6, "F");

    doc.setTextColor(120);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(card.title, x + 12, y + 20);

    doc.setTextColor(0);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text(card.value, x + 12, y + 44);

    x += 185;

    if ((index + 1) % 3 === 0) {
      x = 40;
      y += 80;
    }
  });

  // ---------------- Table ----------------

  autoTable(doc, {
    startY: 300,

    head: [[
      "Doctor",
      "Department",
      "Patients",
      "Revenue",
      "Rating",
    ]],

    body: rows.map((doctor) => [
      doctor.name,
      doctor.department,
      doctor.patients.toLocaleString("en-IN"),
      `Rs. ${money(doctor.revenue)}`,
      `${doctor.rating}`,
    ]),

    theme: "grid",

    headStyles: {
      fillColor: [15, 23, 42],
      textColor: 255,
      fontStyle: "bold",
      fontSize: 11,
      halign: "center",
      minCellHeight: 28,
    },

    styles: {
      font: "helvetica",
      fontSize: 10,
      cellPadding: 8,
      halign: "center",
      valign: "middle",
      lineWidth: 0.2,
      lineColor: [220, 220, 220],
    },

    alternateRowStyles: {
      fillColor: [249, 250, 251],
    },

    columnStyles: {
      0: { cellWidth: 220 },
      1: { cellWidth: 170 },
      2: { cellWidth: 120 },
      3: { cellWidth: 170 },
      4: { cellWidth: 100 },
    },

    didParseCell(data) {
      if (
        data.section === "body" &&
        data.column.index === 4
      ) {
        data.cell.styles.textColor = [234, 179, 8];
        data.cell.styles.fontStyle = "bold";
      }
    },

    margin: {
      left: 40,
      right: 40,
    },
  });

  // ---------------- Footer ----------------

  const pages = doc.getNumberOfPages();

  for (let i = 1; i <= pages; i++) {
    doc.setPage(i);

    doc.setDrawColor(220);
    doc.line(
      40,
      565,
      pageWidth - 40,
      565
    );

    doc.setFontSize(9);
    doc.setTextColor(120);

    doc.text(
      "Leads Health Care",
      40,
      585
    );

    doc.text(
      `Page ${i} of ${pages}`,
      pageWidth - 80,
      585
    );
  }

  doc.save(
    `Top_Doctors_Report_${new Date()
      .toISOString()
      .slice(0, 10)}.pdf`
  );
}