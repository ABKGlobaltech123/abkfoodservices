import { apiRequest } from "@/lib/queryClient";
import type { MenuItem, Category, Order, OrderWithItems, User, RegisterData } from "@/types";

// Auth API
export const authApi = {
  login: async (email: string, password: string) => {
    const response = await apiRequest("POST", "/api/auth/login", { email, password });
    return response.json();
  },
  
  register: async (userData: RegisterData) => {
    const response = await apiRequest("POST", "/api/auth/register", userData);
    return response.json();
  },
  
  logout: async () => {
    await apiRequest("POST", "/api/auth/logout");
  },
  
  getCurrentUser: async (): Promise<User> => {
    const response = await apiRequest("GET", "/api/auth/me");
    return response.json();
  },
};

// Menu API
export const menuApi = {
  getCategories: async (): Promise<Category[]> => {
    const response = await apiRequest("GET", "/api/categories");
    return response.json();
  },
  
  getMenuItems: async (filters?: {
    categoryId?: string;
    isVegetarian?: boolean;
    search?: string;
  }): Promise<MenuItem[]> => {
    const params = new URLSearchParams();
    if (filters?.categoryId) params.append("categoryId", filters.categoryId);
    if (filters?.isVegetarian !== undefined) params.append("isVegetarian", filters.isVegetarian.toString());
    if (filters?.search) params.append("search", filters.search);
    
    const response = await apiRequest("GET", `/api/menu-items?${params.toString()}`);
    return response.json();
  },
  
  getMenuItem: async (id: string): Promise<MenuItem> => {
    const response = await apiRequest("GET", `/api/menu-items/${id}`);
    return response.json();
  },
};

// Orders API
export const ordersApi = {
  createOrder: async (orderData: {
    items: { menuItemId: string; quantity: number; specialInstructions?: string }[];
    deliveryAddress: any;
    paymentMethod: string;
    customerNotes?: string;
  }) => {
    const response = await apiRequest("POST", "/api/orders", orderData);
    return response.json();
  },
  
  getOrders: async (): Promise<Order[]> => {
    const response = await apiRequest("GET", "/api/orders");
    return response.json();
  },
  
  getOrder: async (id: string): Promise<OrderWithItems> => {
    const response = await apiRequest("GET", `/api/orders/${id}`);
    return response.json();
  },
  
  trackOrder: async (orderNumber: string): Promise<OrderWithItems> => {
    const response = await apiRequest("GET", `/api/orders/track/${orderNumber}`);
    return response.json();
  },
};

// Admin API
export const adminApi = {
  getStats: async () => {
    const response = await apiRequest("GET", "/api/admin/stats");
    return response.json();
  },
  
  getRecentOrders: async (): Promise<OrderWithItems[]> => {
    const response = await apiRequest("GET", "/api/admin/orders/recent");
    return response.json();
  },
  
  updateOrderStatus: async (orderId: string, status: string) => {
    const response = await apiRequest("PATCH", `/api/admin/orders/${orderId}/status`, { status });
    return response.json();
  },
  
  // Menu Management
  createMenuItem: async (menuItem: Partial<MenuItem>) => {
    const response = await apiRequest("POST", "/api/admin/menu-items", menuItem);
    return response.json();
  },
  
  updateMenuItem: async (id: string, menuItem: Partial<MenuItem>) => {
    const response = await apiRequest("PATCH", `/api/admin/menu-items/${id}`, menuItem);
    return response.json();
  },
  
  deleteMenuItem: async (id: string) => {
    await apiRequest("DELETE", `/api/admin/menu-items/${id}`);
  },
  
  createCategory: async (category: Partial<Category>) => {
    const response = await apiRequest("POST", "/api/admin/categories", category);
    return response.json();
  },
  
  updateCategory: async (id: string, category: Partial<Category>) => {
    const response = await apiRequest("PATCH", `/api/admin/categories/${id}`, category);
    return response.json();
  },
  
  deleteCategory: async (id: string) => {
    await apiRequest("DELETE", `/api/admin/categories/${id}`);
  },
};
