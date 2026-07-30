import {type LucideIcon} from "lucide-react";

export type SidebarItemType = {
  title: string;
  icon: LucideIcon;
  path: string;
  active?: boolean;
};

export type SidebarSectionType = {
  title: string;
  items: SidebarItemType[];
};