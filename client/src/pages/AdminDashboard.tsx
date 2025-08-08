import { useLocation } from "wouter";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { DashboardStats } from "@/components/admin/DashboardStats";
import { OrdersTable } from "@/components/admin/OrdersTable";
import { MenuManagement } from "@/components/admin/MenuManagement";
import { mockAdminStats, mockRecentOrders } from "@/data/mockData";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";

export function AdminDashboard() {
  const [location, navigate] = useLocation();
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    // Redirect if not authenticated or not admin
    if (!isAuthenticated || user?.role !== "admin") {
      navigate("/");
    }
  }, [isAuthenticated, user, navigate]);

  if (!isAuthenticated || user?.role !== "admin") {
    return null;
  }

  const renderContent = () => {
    switch (location) {
      case "/admin/orders":
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-heading font-bold">Order Management</h1>
            <OrdersTable 
              orders={mockRecentOrders}
              onViewOrder={(id) => console.log("View order:", id)}
              onUpdateStatus={(id, status) => console.log("Update status:", id, status)}
            />
          </div>
        );
      
      case "/admin/menu":
        return (
          <MenuManagement 
            onAddItem={() => console.log("Add item")}
            onEditItem={(item) => console.log("Edit item:", item)}
            onDeleteItem={(id) => console.log("Delete item:", id)}
          />
        );
      
      case "/admin/customers":
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-heading font-bold">Customer Management</h1>
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-500">Customer management coming soon...</p>
            </div>
          </div>
        );
      
      case "/admin/analytics":
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-heading font-bold">Analytics</h1>
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-500">Analytics dashboard coming soon...</p>
            </div>
          </div>
        );
      
      case "/admin/settings":
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-heading font-bold">Settings</h1>
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-500">Settings panel coming soon...</p>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-heading font-bold">Dashboard Overview</h1>
              <div className="text-sm text-gray-500">
                Welcome back, {user?.firstName}!
              </div>
            </div>
            
            <DashboardStats stats={mockAdminStats} />
            
            <OrdersTable 
              orders={mockRecentOrders}
              onViewOrder={(id) => console.log("View order:", id)}
              onUpdateStatus={(id, status) => console.log("Update status:", id, status)}
            />
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 overflow-y-auto">
        <div className="p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
