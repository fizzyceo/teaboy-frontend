"use client";
import { Home, Package, Settings, ShoppingCart, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/dashboard", icon: Home, label: "Dashboard" },
  { href: "/dashboard/orders", icon: ShoppingCart, label: "Orders" },
  { href: "/dashboard/menus", icon: Package, label: "Menus" },
  { href: "/dashboard/employees", icon: Users, label: "Employees" },
  { href: "/dashboard/settings", icon: Settings, label: "Settings" },
];

const DashboardSidebar = ({ isMobile }: { isMobile: boolean }) => {
  const currentPath = usePathname();

  return (
    <nav
      className={
        isMobile
          ? "grid gap-2 text-lg font-medium"
          : "grid items-start px-2 text-sm font-medium lg:px-4"
      }
    >
      {links.map(({ href, icon: Icon, label }) => (
        <Link
          key={label}
          href={href}
          className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 ${
            currentPath === href
              ? "bg-muted text-foreground hover:text-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Icon className={`h-${isMobile ? 5 : 4} w-${isMobile ? 5 : 4}`} />
          {label}
        </Link>
      ))}
    </nav>
  );
};

export default DashboardSidebar;
