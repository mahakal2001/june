import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

type AlertRow = {
  id: number;
  title: string;
  description: string;
  priority: string;
 category: string;
  status: string;
};

export const exportAlertPDF = (
  alerts: AlertRow[],
  generatedAt: Date
) => {

  const doc = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a4",
  });

  //---------------------------------------------------
  // Colors
  //---------------------------------------------------

  const primary: [number, number, number] = [15, 23, 42];
  const accent: [number, number, number] = [37, 99, 235];
  const light: [number, number, number] = [241, 245, 249];

  //---------------------------------------------------
  // Header
  //---------------------------------------------------

  doc.setFillColor(...primary);
  doc.rect(0, 0, 297, 24, "F");

  doc.setFont("helvetica", "bold");
  doc.setTextColor(255);

  doc.setFontSize(20);

  doc.text(
    "Leads Health Care",
    14,
    13
  );

  doc.setFontSize(11);

  doc.text(
    "Critical Alerts & Notifications Report",
    14,
    20
  );

  //---------------------------------------------------
  // Report Details
  //---------------------------------------------------

  doc.setTextColor(30);

  doc.setFontSize(11);

  doc.text(
    `Generated : ${generatedAt.toLocaleString()}`,
    14,
    34
  );

  doc.text(
    `Total Alerts : ${alerts.length}`,
    14,
    41
  );

  //---------------------------------------------------
  // Summary
  //---------------------------------------------------

  const critical =
    alerts.filter(
      a => a.priority === "Critical"
    ).length;

  const high =
    alerts.filter(
      a => a.priority === "High"
    ).length;

  const medium =
    alerts.filter(
      a => a.priority === "Medium"
    ).length;

  const low =
    alerts.filter(
      a => a.priority === "Low"
    ).length;

  const cardY = 48;

  const drawCard = (
    x:number,
    title:string,
    value:number,
    color:[number, number, number]
  ) => {

    doc.setFillColor(...light);

    doc.roundedRect(
      x,
      cardY,
      58,
      24,
      3,
      3,
      "F"
    );

    doc.setFillColor(...color);

    doc.rect(
      x,
      cardY,
      58,
      4,
      "F"
    );

    doc.setFontSize(10);

    doc.setTextColor(90);

    doc.text(
      title,
      x+5,
      cardY+12
    );

    doc.setFontSize(18);

    doc.setTextColor(...color);

    doc.text(
      String(value),
      x+5,
      cardY+21
    );

  };

  drawCard(
    14,
    "Critical",
    critical,
    [220,38,38]
  );

  drawCard(
    78,
    "High",
    high,
    [249,115,22]
  );

  drawCard(
    142,
    "Medium",
    medium,
    [234,179,8]
  );

  drawCard(
    206,
    "Low",
    low,
    [22,163,74]
  );

  //---------------------------------------------------
  // Legend
  //---------------------------------------------------

  let legendY = 82;

  doc.setFontSize(11);

  doc.setFont("helvetica","bold");

  doc.text(
    "Priority Legend",
    14,
    legendY
  );

  legendY += 8;

  const legend = [
    {
      name:"Critical",
      color:[220,38,38]
    },
    {
      name:"High",
      color:[249,115,22]
    },
    {
      name:"Medium",
      color:[234,179,8]
    },
    {
      name:"Low",
      color:[22,163,74]
    },
  ];

  legend.forEach((item,index)=>{

      const x = 14 + index*48;

      doc.setFillColor(...(item.color as [number, number, number]));

      doc.circle(
        x,
        legendY,
        2,
        "F"
      );

      doc.setTextColor(40);

      doc.text(
        item.name,
        x+5,
        legendY+1
      );

  });

  //---------------------------------------------------
  // Table
  //---------------------------------------------------

  autoTable(doc,{

      startY:95,

      theme:"grid",

      head:[[
          "Alert",
          "Priority",
          "Category",
          "Status",
          "Description"
      ]],

      body:alerts.map(alert=>[
          alert.title,
          alert.priority,
          alert.category,
          alert.status,
          alert.description
      ]),

      headStyles:{
          fillColor:accent,
          textColor:255,
          halign:"center",
          fontStyle:"bold"
      },

      styles:{
          fontSize:9,
          cellPadding:4,
          valign:"middle"
      },

      columnStyles:{

          0:{
              cellWidth:52
          },

          1:{
              halign:"center",
              cellWidth:28
          },

          2:{
              halign:"center",
              cellWidth:36
          },

          3:{
              halign:"center",
              cellWidth:28
          },

          4:{
              cellWidth:110
          }

      },

      alternateRowStyles:{
          fillColor:[249,250,251]
      },

      didParseCell(data){

          if(
            data.section==="body" &&
            data.column.index===1
          ){

              const value =
              String(data.cell.raw);

              if(value==="Critical"){

                  data.cell.styles.fillColor=[
                    254,226,226
                  ];

                  data.cell.styles.textColor=[
                    185,28,28
                  ];

              }

              if(value==="High"){

                  data.cell.styles.fillColor=[
                    255,237,213
                  ];

                  data.cell.styles.textColor=[
                    194,65,12
                  ];

              }

              if(value==="Medium"){

                  data.cell.styles.fillColor=[
                    254,249,195
                  ];

                  data.cell.styles.textColor=[
                    161,98,7
                  ];

              }

              if(value==="Low"){

                  data.cell.styles.fillColor=[
                    220,252,231
                  ];

                  data.cell.styles.textColor=[
                    22,101,52
                  ];

              }

          }

      }

  });

  //---------------------------------------------------
  // Footer
  //---------------------------------------------------

  const pages =
  doc.getNumberOfPages();

  for(let i=1;i<=pages;i++){

      doc.setPage(i);

      doc.setDrawColor(220);

      doc.line(
        14,
        200,
        283,
        200
      );

      doc.setFontSize(9);

      doc.setTextColor(100);

      doc.text(
        "Leads Health Care | Confidential",
        14,
        206
      );

      doc.text(
        `Page ${i} of ${pages}`,
        250,
        206
      );

  }

  doc.save("Critical_Alerts_Report.pdf");

};