import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";
import type { AdminStats } from "@/types";

interface DashboardStatsProps {
  stats: AdminStats;
}

export function DashboardStats({ stats }: DashboardStatsProps) {
  const statCards = [
    {
      title: "Today's Orders",
      value: stats.todayOrders,
      change: stats.orderGrowth,
      icon: "fas fa-receipt",
      color: "text-blue-600",
    },
    {
      title: "Revenue",
      value: `₹${stats.revenue.toLocaleString()}`,
      change: stats.revenueGrowth,
      icon: "fas fa-rupee-sign",
      color: "text-green-600",
    },
    {
      title: "Active Customers",
      value: stats.activeCustomers.toLocaleString(),
      change: stats.customerGrowth,
      icon: "fas fa-users",
      color: "text-purple-600",
    },
    {
      title: "Avg Rating",
      value: stats.averageRating,
      change: stats.ratingGrowth,
      icon: "fas fa-star",
      color: "text-yellow-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {stat.title}
            </CardTitle>
            <div className={`${stat.color} text-2xl`}>
              <i className={stat.icon}></i>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              {stat.change > 0 ? (
                <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
              ) : (
                <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
              )}
              <span className={stat.change > 0 ? "text-green-500" : "text-red-500"}>
                {stat.change > 0 ? "+" : ""}{stat.change}%
              </span>
              <span className="ml-1">
                {stat.title === "Avg Rating" ? "this month" : "from yesterday"}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
