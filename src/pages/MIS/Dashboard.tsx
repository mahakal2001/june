
import './Dashboard.css'
import KPIGrid from "@/component/MisDashboard/Kpi/KPIGrid";
import { RevenueTrendCharts } from '@/component/charts/RevenueTrendCharts';
import { DepartmentRevenue } from '@/component/charts/DepartmentRevenue';
import { CompareTarget } from '@/component/charts/CompareTarget';
import RevenueExceptionsTable from '@/component/RevenueExceptions/RevenueExceptionsTable';
import TopDoctorsTable from '@/component/doctors/TopDoctorsTable';
import InsuranceClaimTable from '@/component/Insurance/InsuranceClaimTable';
import AlertsCard from '@/component/alert/AlertsCard';
import QuickLinks from '@/component/QuickLinks/QuickLinks';
import SystemInformation from '@/component/System/SystemInformation';


function Dashboard() {
    return (
    <div className="space-y-6">
      <KPIGrid />
      <div className='lineChart'>
        <RevenueTrendCharts />
        <DepartmentRevenue />
        <div className='subChart'>
          <CompareTarget />
        </div>
      </div>
      <div className='table overflow-hidden'>
        <RevenueExceptionsTable />
        <TopDoctorsTable />
        <span className='sub-table'>
          <InsuranceClaimTable />
        </span>
      </div>
      <div className='other-sections flex relative'>
        <AlertsCard />
        <QuickLinks />
        <SystemInformation lastSync={''} dataSource={''} systemStatus={''} version={''} />
      </div>
    </div>
  );
  
}

export default Dashboard;
