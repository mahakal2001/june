import { NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";



import {
  ChevronDown,
  ChevronRight,
} from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import type { LucideIcon } from "lucide-react";
import { useSidebar } from "@/context/SidebarContext";

import './SidebarItem.css';


type Props = {
  title: string;
  icon: LucideIcon;
  href: string;

  children?: {
    title: string;
    href: string;
  }[];
};

function SidebarItem({
  title,
  icon: Icon,
  href,
  children,
}: Props) {

  const { isCollapsed } = useSidebar();

  const location = useLocation();

  const isParentActive =
  location.pathname === href ||
  children?.some(child => child.href === location.pathname);

  const [open, setOpen] = useState(false);

  const hasChildren = !!children?.length;

  const activeChild = children?.some(
    (child) => child.href === location.pathname
  );
  const { setMobileOpen } = useSidebar();

useEffect(() => {
  if (activeChild) {
    setOpen(true);
  }
}, [activeChild]);

  const link = (

    <NavLink
      to={href} onClick={(e) => {
      if (hasChildren) {
        e.preventDefault(); 
        setOpen(!open);
      } else {
        setMobileOpen(false);
      }
     }}


      className={({}) => `sidebar-item
      flex
      items-center
      gap-2
      rounded-lg mt-0
      px-2
      py-2.5
      transition-all

      ${ isCollapsed ? "justify-center w-12 mx-auto": "gap-3"}


      ${
        isParentActive
          ? "bg-blue-100 text-blue-600"
          : "hover:bg-slate-100 text-slate-600"
      }
      `}
    >

      <div className="flex items-center gap-3">

  <Icon
    size={isCollapsed ? 18 : 16}
    className="transition-transform duration-300"
  />

  {!isCollapsed && (
    <span className="flex-1">
      {title}
    </span>
  )}

</div>

{!isCollapsed && hasChildren && (
  open ? (
    <ChevronDown size={16} />
  ) : (
    <ChevronRight
    size={16}
    className={`
        transition-transform duration-300
        ${open ? "rotate-90" : ""}
    `}/>
  )
)}

    </NavLink>

  );
  const content = (
  <>
    {link}

    {hasChildren && !isCollapsed && (
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-96 mt-1" : "max-h-0"
        }`}
      >
        <div className="ml-8 space-y-1 border-l border-slate-200 pl-4">
          {children!.map((child) => (
            <NavLink
              key={child.href}
              to={child.href}
              className={({ isActive }) =>
                `block rounded-lg px-3 py-2 text-sm transition-all duration-200 ${
                  isActive
                    ? "bg-blue-50 text-blue-600 font-medium"
                    : "text-slate-600 hover:bg-slate-50 hover:text-blue-600"
                }`
              }
            >
              {child.title}
            </NavLink>
          ))}
        </div>
      </div>
    )}
  </>
);
  
  if (!isCollapsed) {
  return content;
}
  return (
    <Tooltip>
      <TooltipTrigger>
        {content}
      </TooltipTrigger>

      <TooltipContent side="right">
        {title}
      </TooltipContent>
    </Tooltip>
  );
}

export default SidebarItem;