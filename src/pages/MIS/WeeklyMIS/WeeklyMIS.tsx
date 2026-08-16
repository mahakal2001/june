
import DailyMISKPICards from '@/component/MisDashboard/DailyMISKpi/DailyMISKPICards';
import WeeklyRevenueTrendChart from '@/component/charts/WeeklyMIS/WeeklyRevenueTrendChart';
import WeeklyDepartmentRevenueChart from '@/component/charts/WeeklyMIS/WeeklyDepartmentRevenueChart';
import WeeklyOccupancyTrendChart from '@/component/charts/WeeklyMIS/WeeklyOccupancyTrendChart';
import WeeklyDepartmentTable from '@/component/Department/WeeklyDepartment/WeeklyDepartmentTable';
import WeeklyDoctorPerformanceTable from '@/component/WeeklyDoctor/WeeklyDoctorPerformanceTable';
import WeeklyTopProceduresTable from '@/component/WeeklyProcedure/WeeklyTopProceduresTable';
import WeeklyFinancialHighlights from '@/component/WeeklyFinancial/WeeklyFinancialHighlights';
import WeeklyRevenueLeakageSummary from '@/component/WeeklyRevenue/WeeklyRevenueLeakageSummary';
import AlertsCard from '@/component/alert/AlertsCard';
import QuickLinks from '@/component/QuickLinks/QuickLinks';
import './WeeklyMIS.css';

function WeeklyMIS() {
    return (
    <div className="weekly-MIScard">

      {/* KPI */}
     <section className="weeklyMISKpi-Section">

       <DailyMISKPICards />

       <div className="Weeklychartsection">

          <div className="WeeklyTrend-card">
            <WeeklyRevenueTrendChart />
          </div>

          <div className="WeeklyDepartment-card">
            <WeeklyDepartmentRevenueChart />
          </div>
         
         <div className="WeeklyOccupancy-card">
           <WeeklyOccupancyTrendChart />
         </div>
         
       </div>

       <div className="Weeklytablesection">
         <div className="Weekly-departmentTable">
           <WeeklyDepartmentTable />
         </div>

         <div className="WeeklyDoctorPerformance">
           <WeeklyDoctorPerformanceTable />
         </div>

         <div className="WeeklyTopProcedures">
           <WeeklyTopProceduresTable />
         </div>
       </div>

       <div className="Weeklylastsection">
          <div className="WeeklyFinancialhighlight">
            <WeeklyFinancialHighlights />
          </div>

          <div className="WeeklyRevenueSection">
            <WeeklyRevenueLeakageSummary />
          </div>

          <div className="WeeklyMISalerts-card">
            <AlertsCard />
          </div>
          
          <div className="WeeklyMISquicklinks-card">
            <QuickLinks />
          </div>
       </div>

      </section>

    </div>
  );
  
}

export default WeeklyMIS;
