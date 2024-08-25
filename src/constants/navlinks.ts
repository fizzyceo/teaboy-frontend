import {
  LucideIcon,
  Home,
  MapPin,
  FileText,
  Settings,
  Users,
  ChefHat,
  Tag,
  BookOpenText,
  Building,
  Telescope,
} from "lucide-react";

export type SideNavItem = {
  title: string;
  path: string;
  icon: LucideIcon;
  submenu?: boolean;
  subMenuItems?: SideNavItem[];
};

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: Home,
  },
  {
    title: "Locations",
    path: "/dashboard/locations",
    icon: MapPin,
    submenu: true,
    subMenuItems: [
      { title: "Sites", path: "/dashboard/sites", icon: Building },
      { title: "Spaces", path: "/dashboard/spaces", icon: Telescope },
      { title: "Kitchens", path: "/dashboard/kitchens", icon: ChefHat },
    ],
  },
  {
    title: "Menus",
    path: "/dashboard/menus",
    icon: BookOpenText,
  },
  {
    title: "Orders",
    path: "/dashboard/orders",
    icon: Tag,
  },
  {
    title: "Employees",
    path: "/dashboard/employees",
    icon: Users,
  },
  {
    title: "Settings",
    path: "/dashboard/settings",
    icon: Settings,
  },
];
