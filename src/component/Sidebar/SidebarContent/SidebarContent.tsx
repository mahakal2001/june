import { ScrollArea } from "@/components/ui/scroll-area";
import SidebarItem from "../SidebarItem/SidebarItem";
import { sidebarSections } from "@/data/SidebarData";
import { useSidebar } from "@/context/SidebarContext";
import "./SidebarContent.css";

function SidebarContent() {
  const { isCollapsed } = useSidebar();

  return (
    <ScrollArea className="flex-1 h-0">
      <div className="p-4 space-y-6">
        {sidebarSections.map((section) => (
          <div key={section.title}>
            {!isCollapsed && (
              <h3 className="menu-title mb-2 px-3 text-xs uppercase text-slate-400">
                {section.title}
              </h3>
            )}

            <div className="space-y-1">
              {section.items.map((item) => (
                <SidebarItem
                  key={item.title}
                  {...item}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}

export default SidebarContent;