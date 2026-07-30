import type { ReactNode } from "react";
import { useSidebar } from "@/context/SidebarContext";

import Sidebar from "../component/Sidebar/Sidebar/Sidebar";
import Topbar from "../component/Topbar/Topbar/Topbar";
import FilterToolbar from "../component/filters/FilterToolbar";

type Props = {
  children: ReactNode;
};

export default function DashboardLayout({
  children,
}: Props) {

  const { isCollapsed } = useSidebar();

  return (

    <div className="min-h-screen bg-slate-100">

      <Sidebar />

      <div
        className={`
          transition-all
          duration-300
          ease-in-out

          ${isCollapsed ? "lg:pl-20" : "lg:pl-60"}
        `}
      >

        <Topbar />

        <FilterToolbar />

        <main className="p-6">

          {children}

        </main>

      </div>

    </div>

  );

}