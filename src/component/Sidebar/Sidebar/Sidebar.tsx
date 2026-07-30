import {
  Sheet,
  SheetContent,
} from "@/components/ui/sheet";

import { useSidebar } from "@/context/SidebarContext";
import { useEffect } from "react";

import SidebarHeader from "../SidebarHeader/SidebarHeader";
import SidebarContent from "../SidebarContent/SidebarContent";
import SidebarFooter from "../SidebarFooter/SidebarFooter";



export default function Sidebar() {
  const {
    isCollapsed,
    mobileOpen,
    setMobileOpen,
  } = useSidebar();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
      }
    };

    window.addEventListener("keydown", handler);

    return () => {
      window.removeEventListener("keydown", handler);
    };
  }, [setMobileOpen]);

  const sidebar = (
    <div className="flex h-full flex-col">
      <SidebarHeader />

        <SidebarContent />

      <SidebarFooter />
    </div>
  );
  

  return (
    <>
      {/* Desktop */}

      <aside
        className={`
        fixed inset-y-0 left-0 z-50

        hidden lg:flex
       
        h-screen
        flex-col
        border-r
        bg-white
        transition-all
        duration-300

        ${isCollapsed ? "w-20" : "w-60"}
      `}
      >
        {sidebar}
      </aside>

      {/* Tablet & Mobile */}

      <Sheet
        open={mobileOpen}
        onOpenChange={setMobileOpen}
      >
        <SheetContent
          side="left"
          className="w-72 p-0 h-screen"
        >
          <div className="flex h-full flex-col bg-white">
            {sidebar}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}