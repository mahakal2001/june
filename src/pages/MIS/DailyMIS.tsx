
import './Dashboard.css'
import KPIGrid from "@/component/MisDashboard/Kpi/KPIGrid";
import DepartmentSummaryTable from '@/component/Department/DepartmentSummaryTable';
import DailyRevenueTrendChart from '@/component/charts/DailyMis/DailyRevenueTrendChart';
import DailyDistributionChart from '@/component/charts/DailyMis/DailyDistributionChart';
import DailyPaymentModeChart from '@/component/charts/DailyMis/DailyPaymentModeChart';

function DailyMIS() {
    return (
    <div className="space-y-6">
      <KPIGrid />
      <div className='nextDailySection1'>
        <DepartmentSummaryTable />
        <div className="nextDailysubSection flex gap-6">
           <DailyRevenueTrendChart />
           <div className="nextDailysubSection2 flex flex-col gap-6">
              <DailyDistributionChart />
              <DailyPaymentModeChart />
            </div>
        </div>
      </div>
    </div>
  );
  
}

export default DailyMIS;
