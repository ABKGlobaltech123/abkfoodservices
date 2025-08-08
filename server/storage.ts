import { randomUUID } from "crypto";
import type { 
  User, InsertUser,
  Category, InsertCategory,
  MenuItem, InsertMenuItem, MenuItemWithCategory,
  Order, InsertOrder, OrderWithItems,
  OrderItem, InsertOrderItem,
  Address, InsertAddress,
  Review, InsertReview,
  Coupon, InsertCoupon
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, user: Partial<User>): Promise<User>;

  // Category operations
  getCategories(): Promise<Category[]>;
  getCategory(id: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
  updateCategory(id: string, category: Partial<Category>): Promise<Category>;
  deleteCategory(id: string): Promise<void>;

  // Menu item operations
  getMenuItems(filters?: {
    categoryId?: string;
    isVegetarian?: boolean;
    isAvailable?: boolean;
    search?: string;
  }): Promise<MenuItem[]>;
  getMenuItem(id: string): Promise<MenuItem | undefined>;
  getMenuItemWithCategory(id: string): Promise<MenuItemWithCategory | undefined>;
  createMenuItem(item: InsertMenuItem): Promise<MenuItem>;
  updateMenuItem(id: string, item: Partial<MenuItem>): Promise<MenuItem>;
  deleteMenuItem(id: string): Promise<void>;

  // Order operations
  getOrders(userId?: string): Promise<Order[]>;
  getOrder(id: string): Promise<Order | undefined>;
  getOrderWithItems(id: string): Promise<OrderWithItems | undefined>;
  getOrderByNumber(orderNumber: string): Promise<OrderWithItems | undefined>;
  createOrder(order: InsertOrder): Promise<Order>;
  updateOrderStatus(id: string, status: string): Promise<Order>;
  getRecentOrders(limit?: number): Promise<OrderWithItems[]>;

  // Order item operations
  createOrderItem(item: InsertOrderItem): Promise<OrderItem>;
  getOrderItems(orderId: string): Promise<OrderItem[]>;

  // Address operations
  getUserAddresses(userId: string): Promise<Address[]>;
  createAddress(address: InsertAddress): Promise<Address>;
  updateAddress(id: string, address: Partial<Address>): Promise<Address>;
  deleteAddress(id: string): Promise<void>;

  // Review operations
  getReviews(menuItemId?: string, userId?: string): Promise<Review[]>;
  createReview(review: InsertReview): Promise<Review>;

  // Coupon operations
  getCoupons(): Promise<Coupon[]>;
  getCouponByCode(code: string): Promise<Coupon | undefined>;
  createCoupon(coupon: InsertCoupon): Promise<Coupon>;
  updateCoupon(id: string, coupon: Partial<Coupon>): Promise<Coupon>;

  // Admin stats
  getAdminStats(): Promise<{
    todayOrders: number;
    revenue: number;
    activeCustomers: number;
    averageRating: number;
  }>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User> = new Map();
  private categories: Map<string, Category> = new Map();
  private menuItems: Map<string, MenuItem> = new Map();
  private orders: Map<string, Order> = new Map();
  private orderItems: Map<string, OrderItem[]> = new Map();
  private addresses: Map<string, Address[]> = new Map();
  private reviews: Map<string, Review> = new Map();
  private coupons: Map<string, Coupon> = new Map();

  constructor() {
    this.initializeData();
  }

  private initializeData() {
    // Initialize with some sample data for development
    
    // Categories
    const categories = [
      { id: "1", name: "Pizza", description: "Delicious handcrafted pizzas", image: "", isActive: true, sortOrder: 1 },
      { id: "2", name: "Burgers", description: "Gourmet burgers", image: "", isActive: true, sortOrder: 2 },
      { id: "3", name: "Indian", description: "Authentic Indian cuisine", image: "", isActive: true, sortOrder: 3 },
      { id: "4", name: "Chinese", description: "Fresh Chinese delicacies", image: "", isActive: true, sortOrder: 4 },
    ];
    
    categories.forEach(cat => this.categories.set(cat.id, cat));

    // Menu Items
    const items = [
      {
        id: "1",
        categoryId: "1",
        name: "Margherita Pizza",
        description: "Fresh tomato sauce, mozzarella, and basil leaves",
        price: "299.00",
        originalPrice: "349.00",
        image: "",
        isVegetarian: true,
        isAvailable: true,
        preparationTime: 15,
        rating: "4.5",
        reviewCount: 120,
        tags: ["popular", "classic"],
        allergens: ["gluten", "dairy"],
        nutritionInfo: null,
        createdAt: new Date(),
      },
      {
        id: "2",
        categoryId: "2",
        name: "Classic Burger",
        description: "Beef patty, cheese, lettuce, tomato, pickles",
        price: "249.00",
        originalPrice: null,
        image: "",
        isVegetarian: false,
        isAvailable: true,
        preparationTime: 12,
        rating: "4.3",
        reviewCount: 85,
        tags: ["bestseller"],
        allergens: ["gluten", "dairy"],
        nutritionInfo: null,
        createdAt: new Date(),
      },
      {
        id: "3",
        categoryId: "3",
        name: "Chicken Biryani",
        description: "Aromatic basmati rice with spiced chicken",
        price: "349.00",
        originalPrice: null,
        image: "",
        isVegetarian: false,
        isAvailable: true,
        preparationTime: 25,
        rating: "4.7",
        reviewCount: 200,
        tags: ["spicy", "aromatic"],
        allergens: [],
        nutritionInfo: null,
        createdAt: new Date(),
      }
    ];

    items.forEach(item => this.menuItems.set(item.id, item));

    // Create admin user
    const adminUser = {
      id: "admin-1",
      email: "admin@cloudbite.com",
      password: "admin123", // In production, this would be hashed
      firstName: "Admin",
      lastName: "User",
      phone: "+1234567890",
      role: "admin",
      isActive: true,
      createdAt: new Date(),
    };
    
    this.users.set(adminUser.id, adminUser);
  }

  // User operations
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser, 
      id,
      createdAt: new Date()
    };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User> {
    const user = this.users.get(id);
    if (!user) throw new Error("User not found");
    
    const updatedUser = { ...user, ...updates };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  // Category operations
  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values()).sort((a, b) => a.sortOrder - b.sortOrder);
  }

  async getCategory(id: string): Promise<Category | undefined> {
    return this.categories.get(id);
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const id = randomUUID();
    const category: Category = { ...insertCategory, id };
    this.categories.set(id, category);
    return category;
  }

  async updateCategory(id: string, updates: Partial<Category>): Promise<Category> {
    const category = this.categories.get(id);
    if (!category) throw new Error("Category not found");
    
    const updatedCategory = { ...category, ...updates };
    this.categories.set(id, updatedCategory);
    return updatedCategory;
  }

  async deleteCategory(id: string): Promise<void> {
    this.categories.delete(id);
  }

  // Menu item operations
  async getMenuItems(filters?: {
    categoryId?: string;
    isVegetarian?: boolean;
    isAvailable?: boolean;
    search?: string;
  }): Promise<MenuItem[]> {
    let items = Array.from(this.menuItems.values());

    if (filters?.categoryId) {
      items = items.filter(item => item.categoryId === filters.categoryId);
    }

    if (filters?.isVegetarian !== undefined) {
      items = items.filter(item => item.isVegetarian === filters.isVegetarian);
    }

    if (filters?.isAvailable !== undefined) {
      items = items.filter(item => item.isAvailable === filters.isAvailable);
    }

    if (filters?.search) {
      const query = filters.search.toLowerCase();
      items = items.filter(item => 
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        (item.tags && item.tags.some(tag => tag.toLowerCase().includes(query)))
      );
    }

    return items;
  }

  async getMenuItem(id: string): Promise<MenuItem | undefined> {
    return this.menuItems.get(id);
  }

  async getMenuItemWithCategory(id: string): Promise<MenuItemWithCategory | undefined> {
    const item = this.menuItems.get(id);
    if (!item) return undefined;
    
    const category = this.categories.get(item.categoryId);
    if (!category) return undefined;

    return { ...item, category };
  }

  async createMenuItem(insertItem: InsertMenuItem): Promise<MenuItem> {
    const id = randomUUID();
    const item: MenuItem = { 
      ...insertItem, 
      id,
      createdAt: new Date()
    };
    this.menuItems.set(id, item);
    return item;
  }

  async updateMenuItem(id: string, updates: Partial<MenuItem>): Promise<MenuItem> {
    const item = this.menuItems.get(id);
    if (!item) throw new Error("Menu item not found");
    
    const updatedItem = { ...item, ...updates };
    this.menuItems.set(id, updatedItem);
    return updatedItem;
  }

  async deleteMenuItem(id: string): Promise<void> {
    this.menuItems.delete(id);
  }

  // Order operations
  async getOrders(userId?: string): Promise<Order[]> {
    let orders = Array.from(this.orders.values());
    
    if (userId) {
      orders = orders.filter(order => order.userId === userId);
    }
    
    return orders.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getOrder(id: string): Promise<Order | undefined> {
    return this.orders.get(id);
  }

  async getOrderWithItems(id: string): Promise<OrderWithItems | undefined> {
    const order = this.orders.get(id);
    if (!order) return undefined;
    
    const items = this.orderItems.get(id) || [];
    const user = this.users.get(order.userId);
    
    if (!user) return undefined;

    const itemsWithMenuItems = await Promise.all(
      items.map(async (item) => {
        const menuItem = this.menuItems.get(item.menuItemId);
        return menuItem ? { ...item, menuItem } : null;
      })
    );

    return {
      ...order,
      items: itemsWithMenuItems.filter(Boolean) as any[],
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      }
    };
  }

  async getOrderByNumber(orderNumber: string): Promise<OrderWithItems | undefined> {
    const order = Array.from(this.orders.values()).find(o => o.orderNumber === orderNumber);
    if (!order) return undefined;
    
    return this.getOrderWithItems(order.id);
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = randomUUID();
    const orderNumber = `CB${Date.now().toString().slice(-8)}`;
    
    const order: Order = {
      ...insertOrder,
      id,
      orderNumber,
      createdAt: new Date()
    };
    
    this.orders.set(id, order);
    return order;
  }

  async updateOrderStatus(id: string, status: string): Promise<Order> {
    const order = this.orders.get(id);
    if (!order) throw new Error("Order not found");
    
    const updatedOrder = { ...order, status };
    this.orders.set(id, updatedOrder);
    return updatedOrder;
  }

  async getRecentOrders(limit = 10): Promise<OrderWithItems[]> {
    const orders = Array.from(this.orders.values())
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limit);
    
    const ordersWithItems = await Promise.all(
      orders.map(order => this.getOrderWithItems(order.id))
    );
    
    return ordersWithItems.filter(Boolean) as OrderWithItems[];
  }

  // Order item operations
  async createOrderItem(insertItem: InsertOrderItem): Promise<OrderItem> {
    const id = randomUUID();
    const item: OrderItem = { ...insertItem, id };
    
    const existingItems = this.orderItems.get(insertItem.orderId) || [];
    existingItems.push(item);
    this.orderItems.set(insertItem.orderId, existingItems);
    
    return item;
  }

  async getOrderItems(orderId: string): Promise<OrderItem[]> {
    return this.orderItems.get(orderId) || [];
  }

  // Address operations
  async getUserAddresses(userId: string): Promise<Address[]> {
    return this.addresses.get(userId) || [];
  }

  async createAddress(insertAddress: InsertAddress): Promise<Address> {
    const id = randomUUID();
    const address: Address = { ...insertAddress, id };
    
    const existingAddresses = this.addresses.get(insertAddress.userId) || [];
    existingAddresses.push(address);
    this.addresses.set(insertAddress.userId, existingAddresses);
    
    return address;
  }

  async updateAddress(id: string, updates: Partial<Address>): Promise<Address> {
    // Find address across all users
    for (const [userId, addresses] of this.addresses.entries()) {
      const index = addresses.findIndex(addr => addr.id === id);
      if (index !== -1) {
        const updatedAddress = { ...addresses[index], ...updates };
        addresses[index] = updatedAddress;
        this.addresses.set(userId, addresses);
        return updatedAddress;
      }
    }
    throw new Error("Address not found");
  }

  async deleteAddress(id: string): Promise<void> {
    for (const [userId, addresses] of this.addresses.entries()) {
      const index = addresses.findIndex(addr => addr.id === id);
      if (index !== -1) {
        addresses.splice(index, 1);
        this.addresses.set(userId, addresses);
        return;
      }
    }
  }

  // Review operations
  async getReviews(menuItemId?: string, userId?: string): Promise<Review[]> {
    let reviews = Array.from(this.reviews.values());
    
    if (menuItemId) {
      reviews = reviews.filter(review => review.menuItemId === menuItemId);
    }
    
    if (userId) {
      reviews = reviews.filter(review => review.userId === userId);
    }
    
    return reviews.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async createReview(insertReview: InsertReview): Promise<Review> {
    const id = randomUUID();
    const review: Review = {
      ...insertReview,
      id,
      createdAt: new Date()
    };
    
    this.reviews.set(id, review);
    return review;
  }

  // Coupon operations
  async getCoupons(): Promise<Coupon[]> {
    return Array.from(this.coupons.values());
  }

  async getCouponByCode(code: string): Promise<Coupon | undefined> {
    return Array.from(this.coupons.values()).find(coupon => coupon.code === code);
  }

  async createCoupon(insertCoupon: InsertCoupon): Promise<Coupon> {
    const id = randomUUID();
    const coupon: Coupon = { ...insertCoupon, id };
    this.coupons.set(id, coupon);
    return coupon;
  }

  async updateCoupon(id: string, updates: Partial<Coupon>): Promise<Coupon> {
    const coupon = this.coupons.get(id);
    if (!coupon) throw new Error("Coupon not found");
    
    const updatedCoupon = { ...coupon, ...updates };
    this.coupons.set(id, updatedCoupon);
    return updatedCoupon;
  }

  // Admin stats
  async getAdminStats(): Promise<{
    todayOrders: number;
    revenue: number;
    activeCustomers: number;
    averageRating: number;
  }> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const orders = Array.from(this.orders.values());
    const todayOrders = orders.filter(order => 
      order.createdAt >= today
    ).length;
    
    const totalRevenue = orders
      .filter(order => order.status === "delivered")
      .reduce((sum, order) => sum + parseFloat(order.totalAmount), 0);
    
    const activeCustomers = this.users.size;
    
    const menuItems = Array.from(this.menuItems.values());
    const averageRating = menuItems.reduce((sum, item) => 
      sum + parseFloat(item.rating || "0"), 0
    ) / menuItems.length;
    
    return {
      todayOrders,
      revenue: totalRevenue,
      activeCustomers,
      averageRating: Math.round(averageRating * 10) / 10
    };
  }
}

export const storage = new MemStorage();
