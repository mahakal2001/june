import {
  CircleHelp,
  LogOut,
} from "lucide-react";

import SidebarItem from "../SidebarItem/SidebarItem";
import './SidebarFooter.css';

function SidebarFooter() {

  return (

    <div
      className="sidebar-footer border-t shrink-0 pt-2 pb-2 px-4 py-4 space-y-1 bg-white">

      <SidebarItem

        title="Help & Support"

        href="/help"

        icon={CircleHelp}

      />

      <SidebarItem

        title="Logout"

        href="/logout"

        icon={LogOut}

      />

    </div>

  );
}

export default SidebarFooter;