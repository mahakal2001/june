import './RevenueAnalysis.css';
import RevenueAnalyticsKPI from '@/component/MisDashboard/RevenueKPI/RevenueAnalyticsKPI';
import RevenueTrendChart from '@/component/charts/Revenue/RevenueTrend/RevenueTrend';
import RevenueDepartmentPie from '@/component/charts/Revenue/RevenueDepartmentPie/RevenueDepartmentPie';
import CollectionTrend from '@/component/charts/Revenue/CollectionTrend/CollectionTrend';

function Revenue_Analytics() {
    return(
      <div className="daily-MIScard">
      
        {/* KPI */}
        <section className="dailyMISKpi-Section">
          <RevenueAnalyticsKPI />
        </section>

        {/* First Row */}
        <section className="RevenueChart-section">
        
          <div className="dailyMISdepartment-card">
            <RevenueTrendChart />
          </div>

          <div className="revenueDepartment-Section">
            <RevenueDepartmentPie />
          </div>

          <div className="CollectionTrend-Section">
            <CollectionTrend />
          </div>

        </section>

      </div>
    )
}

export default Revenue_Analytics;