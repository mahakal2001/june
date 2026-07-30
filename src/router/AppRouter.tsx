import { Routes, Route } from "react-router-dom";

import DashboardLayout from "../layout/DashboardLayout";

import Dashboard from "@/pages/MIS/Dashboard";
import DailyMIS from "@/pages/MIS/DailyMIS";


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
        path="/dailyMIS"
        element={
          <DashboardLayout>
            <DailyMIS />
          </DashboardLayout>
        }
      />

    </Routes>
  );
}

export default AppRouter;