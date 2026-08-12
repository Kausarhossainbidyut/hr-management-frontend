import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Building2,
  ListChecks,
  CalendarClock,
  Clock,
  User as UserIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/app/hooks";
import { ROLES } from "@/lib/types/roles";

type NavItem = {
  to: string;
  label: string;
  icon: typeof LayoutDashboard;
  allowedRoles?: string[];
};

const NAV_ITEMS: NavItem[] = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/employees", label: "Employees", icon: Users, allowedRoles: [ROLES.ADMIN] },
  {
    to: "/departments",
    label: "Departments",
    icon: Building2,
    allowedRoles: [ROLES.ADMIN, ROLES.MANAGER],
  },
  { to: "/tasks", label: "Tasks", icon: ListChecks },
  { to: "/leaves", label: "Leaves", icon: CalendarClock },
  { to: "/attendance", label: "Attendance", icon: Clock },
  { to: "/profile", label: "Profile", icon: UserIcon },
];

export function Sidebar() {
  const role = useAppSelector((state) => state.auth.user?.role);

  const visibleItems = NAV_ITEMS.filter(
    (item) => !item.allowedRoles || (role && item.allowedRoles.includes(role))
  );

  return (
    <aside className="hidden w-60 shrink-0 flex-col border-r border-slate-200 bg-primary text-white md:flex">
      <div className="flex h-14 items-center gap-2 px-5 text-lg font-bold tracking-tight">
        HR<span className="text-primary-light">System</span>
      </div>
      <nav className="flex-1 space-y-1 px-3 py-2">
        {visibleItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive ? "bg-primary-light text-white" : "text-slate-200 hover:bg-primary-light/60"
              )
            }
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
