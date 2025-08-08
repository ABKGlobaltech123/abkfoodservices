import type { CartItem, MenuItem, Order, OrderWithItems, Category, User, MenuItemWithCategory } from "@shared/schema";

export type { CartItem, MenuItem, Order, OrderWithItems, Category, User, MenuItemWithCategory };

export interface CartContextType {
  items: CartItem[];
  itemCount: number;
  totalAmount: number;
  addItem: (menuItem: MenuItem, quantity?: number, specialInstructions?: string) => void;
  removeItem: (menuItemId: string) => void;
  updateQuantity: (menuItemId: string, quantity: number) => void;
  clearCart: () => void;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (userData: RegisterData) => Promise<void>;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

export interface OrderStatus {
  id: string;
  status: "pending" | "confirmed" | "preparing" | "ready" | "out_for_delivery" | "delivered" | "cancelled";
  estimatedTime?: number;
  currentStep: number;
  steps: OrderStep[];
}

export interface OrderStep {
  id: string;
  title: string;
  description: string;
  timestamp?: string;
  isCompleted: boolean;
  isActive: boolean;
}

export interface AdminStats {
  todayOrders: number;
  revenue: number;
  activeCustomers: number;
  averageRating: number;
  orderGrowth: number;
  revenueGrowth: number;
  customerGrowth: number;
  ratingGrowth: number;
}

export interface FilterOptions {
  category: string;
  isVegetarian?: boolean;
  priceRange?: [number, number];
  rating?: number;
  searchQuery?: string;
}
