import MonthlyMISKPI from '@/component/MisDashboard/MonthlyMISKpi/MonthlyMISKPI';
import MonthyRevenueTrendChart from '@/component/charts/MonthlyMIS/MonthlyRevenueTrendChart';
import MonthlyDepartmentRevenueChart from '@/component/charts/MonthlyMIS/MonthlyDepartmentRevenueChart';
import MonthlyOccupancyTrendChart from '@/component/charts/MonthlyMIS/MonthlyOccupancyTrendChart';
import MonthlyDepartmentTable from '@/component/Department/MonthlyDepartment/MonthlyDepartmentTable';
import MonthlyDoctorPerformanceTable from '@/component/MonthlyDoctor/MonthlyDoctorPerformanceTable';
import MonthlyTopProceduresTable from '@/component/MonthlyProcedure/MonthlyTopProceduresTable';
import MonthlyFinancialHighlights from '@/component/MonthlyFinancial/MonthlyFinancialHighlights';
import MonthlyRevenueLeakageSummary from '@/component/MonthlyRevenue/MonthlyRevenueLeakageSummary';
import AlertsCard from '@/component/alert/AlertsCard';
import QuickLinks from '@/component/QuickLinks/QuickLinks';
import './MonthlyMIS.css';

function MonthlyMIS() {
    return (
    <div className="monthly-MIScard">

      {/* KPI */}
     <section className="monthlyMISKpi-Section">

       <MonthlyMISKPI />

       <div className="Monthlychartsection">

          <div className="MonthlyTrend-card">
            <MonthyRevenueTrendChart />
          </div>

          <div className="MonthlyDepartment-card">
            <MonthlyDepartmentRevenueChart />
          </div>
         
         <div className="MonthlyOccupancy-card">
           <MonthlyOccupancyTrendChart />
         </div>
         
       </div>

       <div className="Monthlytablesection">
         <div className="Monthly-departmentTable">
           <MonthlyDepartmentTable />
         </div>

         <div className="MonthlyDoctorPerformance">
           <MonthlyDoctorPerformanceTable />
         </div>

         <div className="MonthlyTopProcedures">
           <MonthlyTopProceduresTable />
         </div>
       </div>

       <div className="Monthlylastsection">
          <div className="MonthlyFinancialhighlight">
            <MonthlyFinancialHighlights />
          </div>

          <div className="MonthlyRevenueSection">
            <MonthlyRevenueLeakageSummary />
          </div>

          <div className="MonthlyMISalerts-card">
            <AlertsCard />
          </div>
          
          <div className="MonthlyMISquicklinks-card">
            <QuickLinks />
          </div>
       </div>

      </section>

    </div>
  );
  
}

export default MonthlyMIS;
