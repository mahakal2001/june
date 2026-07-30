import { HeartPulse } from "lucide-react";
import { useSidebar } from "@/context/SidebarContext";
import './SidebarHeader.css'

function SidebarHeader() {
  const { isCollapsed } = useSidebar();
  return (
    <div className="side-header shrink-0 p-6 pb-0 bg-white">

      <div className={`flex items-center gap-3 
        ${isCollapsed ? "justify-center" : "gap-3"}`}>

        <div
          className={`
          h-12
          w-12
          rounded-xl
          bg-blue-100
          flex
          items-center
          justify-center
          text-blue-500
          ${isCollapsed ? "h-14 w-14 p-4 mx-auto": "h-12 w-12"}
          `}
        >
          <HeartPulse size={isCollapsed ? 28 : 24} />
        </div>

        {!isCollapsed && (

        <div>

          <h2 className="font-bold text-lg">

            Leads <span className="block">Health Care</span>

          </h2>

        </div>

        )}

      </div>

    </div>
  );
}

export default SidebarHeader;