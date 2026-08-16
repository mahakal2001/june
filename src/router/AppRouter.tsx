import { Routes, Route } from "react-router-dom";

import DashboardLayout from "../layout/DashboardLayout";

import Dashboard from "@/pages/MIS/Dashboard/Dashboard";
import DailyMIS from "@/pages/MIS/DailyMIS/DailyMIS";
import WeeklyMIS from "@/pages/MIS/WeeklyMIS/WeeklyMIS";
import MonthlyMIS from "@/pages/MIS/MonthlyMIS/MonthlyMIS";
import RevenueAnalytics from "@/pages/Revenue/RevenueAnalytics";


function AppRouter() {
  return (
    <Routes>

      <Route
        path="/"
        element={
          <DashboardLayout>
            <Dashboard />
          </DashboardLayout>
        }
      />

      <Route
        path="/DailyMIS"
        element={
          <DashboardLayout>
            <DailyMIS />
          </DashboardLayout>
        }
      />

      <Route
        path="/WeeklyMIS"
        element={
          <DashboardLayout>
            <WeeklyMIS />
          </DashboardLayout>
        }
      />

       <Route
        path="/MonthlyMIS"
        element={
          <DashboardLayout>
            <MonthlyMIS />
          </DashboardLayout>
        }
      />

      <Route
        path="/RevenueAnalytics"
        element={
          <DashboardLayout>
           <RevenueAnalytics />
          </DashboardLayout>
        }
      />

    </Routes>
  );
}

export default AppRouter;