
import './DailyMIS.css'
import DailyMISKPICards from '@/component/MisDashboard/DailyMISKpi/DailyMISKPICards';
import DepartmentSummaryTable from '@/component/Department/DepartmentSummaryTable';
import DailyRevenueTrendChart from '@/component/charts/DailyMis/DailyRevenueTrendChart';
import DailyDistributionChart from '@/component/charts/DailyMis/DailyDistributionChart';
import DailyPaymentModeChart from '@/component/charts/DailyMis/DailyPaymentModeChart';
import VarianceTable from '@/component/VarianceAnalysis/VarianceTable';
import TopDoctorsTable from '@/component/doctors/TopDoctorsTable';
import PendingTasksTable from '@/component/PendingTasks/PendingTasksTable';
import AlertsCard from '@/component/alert/AlertsCard';
import QuickLinks from '@/component/QuickLinks/QuickLinks';
import SystemInformation from '@/component/System/SystemInformation';

function DailyMIS() {
    return (
    <div className="daily-MIScard">

  {/* KPI */}
  <section className="dailyMISKpi-Section">
    <DailyMISKPICards />
  </section>

  {/* First Row */}
  <section className="dailyMIS-row1">

    <div className="dailyMISdepartment-card">
      <DepartmentSummaryTable />
    </div>

    <div className="chart-column">

      <div className="dailyMIStrend-card">
        <DailyRevenueTrendChart />
      </div>

    </div>

    <div className="right-column">

      <div className="dailyMISdistribution-card">
        <DailyDistributionChart />
      </div>

      <div className="dailyMISpayment-card">
        <DailyPaymentModeChart />
      </div>

    </div>

  </section>

  {/* Second Row */}

  <section className="dailyMIS-row2">

    <div className="dailyMISvariance-card">
      <VarianceTable />
    </div>

    <div className="dailyMISdoctor-card">
      <TopDoctorsTable />
    </div>

    <div className="dailyMISpending-card">
      <PendingTasksTable />
    </div>

  </section>

  {/* Third Row */}

  <section className="dailyMIS-row3">

    <div className="dailyMISalerts-card">
      <AlertsCard />
    </div>

    <div className="dailyMISquicklinks-card">
      <QuickLinks />
    </div>

    <div className="dailyMISsystem-card">
      <SystemInformation
        lastSync=""
        dataSource=""
        systemStatus=""
        version=""
      />
    </div>

  </section>

</div>
  );
  
}

export default DailyMIS;
