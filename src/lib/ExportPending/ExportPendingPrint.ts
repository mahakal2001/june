type PendingTask = {
  id: number;
  title: string;
  count: number;
};

type Props = {
  data: PendingTask[];
  priority: string;
  task: string;
  search: string;
};

export function ExportPendingPrint({
  data,
  priority,
  task,
  search,
}: Props) {
  const getPriority = (count: number) => {
    if (count >= 40) return "Critical";
    if (count >= 25) return "High";
    if (count >= 15) return "Medium";
    return "Low";
  };

  const totalPending = data.reduce(
    (sum, item) => sum + item.count,
    0
  );

  const critical = data.filter(
    (x) => x.count >= 40
  ).length;

  const high = data.filter(
    (x) => x.count >= 25 && x.count < 40
  ).length;

  const medium = data.filter(
    (x) => x.count >= 15 && x.count < 25
  ).length;

  const low = data.filter(
    (x) => x.count < 15
  ).length;

  const printWindow = window.open("", "", "width=1200,height=800");

  if (!printWindow) return;

  printWindow.document.write(`
<!DOCTYPE html>
<html>
<head>
<title>Pending Tasks Report</title>

<style>

*{
box-sizing:border-box;
margin:0;
padding:0;
font-family:Arial,Helvetica,sans-serif;
}

body{
padding:30px;
color:#1e293b;
background:#fff;
}

.header{
display:flex;
justify-content:space-between;
align-items:flex-start;
border-bottom:3px solid #1e40af;
padding-bottom:15px;
margin-bottom:25px;
}

.header h1{
font-size:28px;
color:#1e40af;
margin-bottom:6px;
}

.header p{
font-size:13px;
color:#64748b;
}

.info{
text-align:right;
font-size:13px;
}

.filters{
display:grid;
grid-template-columns:repeat(4,1fr);
gap:12px;
margin-bottom:25px;
}

.filter{
background:#f8fafc;
border:1px solid #e2e8f0;
padding:12px;
border-radius:8px;
text-align:center;
}

.filter span{
display:block;
font-size:11px;
color:#64748b;
margin-bottom:5px;
text-transform:uppercase;
}

.filter strong{
font-size:14px;
}

.cards{
display:grid;
grid-template-columns:repeat(5,1fr);
gap:15px;
margin-bottom:30px;
}

.card{
border-radius:10px;
color:#fff;
padding:18px;
text-align:center;
}

.card h3{
font-size:13px;
font-weight:normal;
margin-bottom:8px;
}

.card h2{
font-size:26px;
}

.blue{background:#2563eb;}
.red{background:#dc2626;}
.orange{background:#f97316;}
.yellow{background:#ca8a04;}
.green{background:#16a34a;}

table{
width:100%;
border-collapse:collapse;
margin-top:10px;
}

thead{
background:#1e40af;
color:#fff;
}

th,td{
padding:12px;
border:1px solid #dbe3eb;
text-align:center;
font-size:13px;
}

tbody tr:nth-child(even){
background:#f8fafc;
}

.footer{
margin-top:35px;
border-top:2px solid #e5e7eb;
padding-top:10px;
display:flex;
justify-content:space-between;
font-size:12px;
color:#64748b;
}

@media print{

body{
padding:18px;
}

.cards{
page-break-inside:avoid;
}

table{
page-break-inside:auto;
}

tr{
page-break-inside:avoid;
}

}

</style>

</head>

<body>

<div class="header">

<div>
<h1>Pending Tasks Report</h1>
<p>Leads Health Care • Pending Operational Tasks</p>
</div>

<div class="info">
<div><strong>${new Date().toLocaleString("en-IN")}</strong></div>
<div>Total Tasks : ${data.length}</div>
</div>

</div>

<div class="filters">

<div class="filter">
<span>Priority</span>
<strong>${priority === "all" ? "All" : priority}</strong>
</div>

<div class="filter">
<span>Task</span>
<strong>${task === "all" ? "All" : task}</strong>
</div>

<div class="filter">
<span>Search</span>
<strong>${search || "-"}</strong>
</div>

<div class="filter">
<span>Total Pending</span>
<strong>${totalPending.toLocaleString()}</strong>
</div>

</div>

<div class="cards">

<div class="card blue">
<h3>Total Pending</h3>
<h2>${totalPending.toLocaleString()}</h2>
</div>

<div class="card red">
<h3>Critical</h3>
<h2>${critical}</h2>
</div>

<div class="card orange">
<h3>High</h3>
<h2>${high}</h2>
</div>

<div class="card yellow">
<h3>Medium</h3>
<h2>${medium}</h2>
</div>

<div class="card green">
<h3>Low</h3>
<h2>${low}</h2>
</div>

</div>

<table>

<thead>

<tr>

<th>#</th>
<th>Task</th>
<th>Pending Count</th>
<th>Priority</th>

</tr>

</thead>

<tbody>

${data
  .map(
    (item, index) => `
<tr>

<td>${index + 1}</td>

<td>${item.title}</td>

<td>${item.count.toLocaleString()}</td>

<td>${getPriority(item.count)}</td>

</tr>
`
  )
  .join("")}

</tbody>

</table>

<div class="footer">

<div>
Leads Health Care • Pending Tasks Report
</div>

<div>
Generated on ${new Date().toLocaleDateString("en-IN")}
</div>

</div>

<script>

window.onload=function(){

window.print();

window.onafterprint=function(){

window.close();

};

};

</script>

</body>
</html>
`);

  printWindow.document.close();
}