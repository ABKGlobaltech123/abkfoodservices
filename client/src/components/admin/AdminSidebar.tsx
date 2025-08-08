import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  UtensilsCrossed, 
  Users, 
  BarChart3,
  Settings,
  LogOut
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Orders", href: "/admin/orders", icon: ShoppingBag },
  { name: "Menu Management", href: "/admin/menu", icon: UtensilsCrossed },
  { name: "Customers", href: "/admin/customers", icon: Users },
  { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
  const [location] = useLocation();
  const { logout } = useAuth();

  const isActive = (href: string) => {
    if (href === "/admin" && location === "/admin") return true;
    if (href !== "/admin" && location.startsWith(href)) return true;
    return false;
  };

  return (
    <div className="w-64 bg-slate-900 text-white min-h-screen">
      <div className="p-6">
        <h2 className="text-2xl font-heading font-bold">Admin Panel</h2>
      </div>
      
      <nav className="mt-6">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <Link key={item.name} href={item.href}>
              <a
                className={cn(
                  "flex items-center px-6 py-3 text-sm font-medium transition-colors",
                  isActive(item.href)
                    ? "bg-primary text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                )}
              >
                <Icon className="mr-3 h-5 w-5" />
                {item.name}
              </a>
            </Link>
          );
        })}
        
        <button
          onClick={logout}
          className="flex items-center w-full px-6 py-3 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition-colors mt-4"
        >
          <LogOut className="mr-3 h-5 w-5" />
          Logout
        </button>
      </nav>
    </div>
  );
}
