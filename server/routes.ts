import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertMenuItemSchema, insertCategorySchema, insertOrderSchema, insertOrderItemSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth routes
  app.post("/api/auth/register", async (req, res, next) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(userData.email);
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
      
      const user = await storage.createUser(userData);
      
      // Remove password from response
      const { password, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      next(error);
    }
  });

  app.post("/api/auth/login", async (req, res, next) => {
    try {
      const { email, password } = req.body;
      
      if (!email || !password) {
        return res.status(400).json({ message: "Email and password required" });
      }
      
      const user = await storage.getUserByEmail(email);
      if (!user || user.password !== password) { // In production, use proper password hashing
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      // Remove password from response
      const { password: _, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      next(error);
    }
  });

  app.post("/api/auth/logout", (req, res) => {
    res.json({ message: "Logged out successfully" });
  });

  app.get("/api/auth/me", async (req, res, next) => {
    try {
      // In a real app, you'd get user ID from session/JWT
      // For now, returning a mock response
      res.status(401).json({ message: "Not authenticated" });
    } catch (error) {
      next(error);
    }
  });

  // Categories routes
  app.get("/api/categories", async (req, res, next) => {
    try {
      const categories = await storage.getCategories();
      res.json(categories);
    } catch (error) {
      next(error);
    }
  });

  app.get("/api/categories/:id", async (req, res, next) => {
    try {
      const category = await storage.getCategory(req.params.id);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.json(category);
    } catch (error) {
      next(error);
    }
  });

  // Menu items routes
  app.get("/api/menu-items", async (req, res, next) => {
    try {
      const filters = {
        categoryId: req.query.categoryId as string,
        isVegetarian: req.query.isVegetarian ? req.query.isVegetarian === 'true' : undefined,
        isAvailable: req.query.isAvailable ? req.query.isAvailable === 'true' : undefined,
        search: req.query.search as string,
      };
      
      // Remove undefined values
      Object.keys(filters).forEach(key => 
        filters[key as keyof typeof filters] === undefined && delete filters[key as keyof typeof filters]
      );
      
      const menuItems = await storage.getMenuItems(filters);
      res.json(menuItems);
    } catch (error) {
      next(error);
    }
  });

  app.get("/api/menu-items/:id", async (req, res, next) => {
    try {
      const menuItem = await storage.getMenuItemWithCategory(req.params.id);
      if (!menuItem) {
        return res.status(404).json({ message: "Menu item not found" });
      }
      res.json(menuItem);
    } catch (error) {
      next(error);
    }
  });

  // Orders routes
  app.post("/api/orders", async (req, res, next) => {
    try {
      const orderData = req.body;
      
      // Validate order data
      const orderSchema = insertOrderSchema.extend({
        items: z.array(z.object({
          menuItemId: z.string(),
          quantity: z.number().min(1),
          specialInstructions: z.string().optional(),
        })),
      });
      
      const validatedData = orderSchema.parse(orderData);
      
      // Calculate totals
      let subtotal = 0;
      for (const item of validatedData.items) {
        const menuItem = await storage.getMenuItem(item.menuItemId);
        if (!menuItem) {
          return res.status(400).json({ message: `Menu item ${item.menuItemId} not found` });
        }
        subtotal += parseFloat(menuItem.price) * item.quantity;
      }
      
      const taxAmount = subtotal * 0.1; // 10% tax
      const deliveryFee = subtotal > 500 ? 0 : 30;
      const totalAmount = subtotal + taxAmount + deliveryFee;
      
      // Create order
      const order = await storage.createOrder({
        ...validatedData,
        subtotal: subtotal.toFixed(2),
        taxAmount: taxAmount.toFixed(2),
        deliveryFee: deliveryFee.toFixed(2),
        discountAmount: "0.00",
        totalAmount: totalAmount.toFixed(2),
        status: "pending",
        paymentStatus: "pending",
      });
      
      // Create order items
      for (const item of validatedData.items) {
        const menuItem = await storage.getMenuItem(item.menuItemId);
        if (menuItem) {
          const unitPrice = parseFloat(menuItem.price);
          await storage.createOrderItem({
            orderId: order.id,
            menuItemId: item.menuItemId,
            quantity: item.quantity,
            unitPrice: unitPrice.toFixed(2),
            totalPrice: (unitPrice * item.quantity).toFixed(2),
            specialInstructions: item.specialInstructions || null,
          });
        }
      }
      
      // Return order with items
      const orderWithItems = await storage.getOrderWithItems(order.id);
      res.status(201).json(orderWithItems);
    } catch (error) {
      next(error);
    }
  });

  app.get("/api/orders", async (req, res, next) => {
    try {
      const userId = req.query.userId as string;
      const orders = await storage.getOrders(userId);
      res.json(orders);
    } catch (error) {
      next(error);
    }
  });

  app.get("/api/orders/:id", async (req, res, next) => {
    try {
      const order = await storage.getOrderWithItems(req.params.id);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      res.json(order);
    } catch (error) {
      next(error);
    }
  });

  app.get("/api/orders/track/:orderNumber", async (req, res, next) => {
    try {
      const order = await storage.getOrderByNumber(req.params.orderNumber);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      res.json(order);
    } catch (error) {
      next(error);
    }
  });

  // Admin routes
  app.get("/api/admin/stats", async (req, res, next) => {
    try {
      const stats = await storage.getAdminStats();
      res.json({
        ...stats,
        orderGrowth: 12,
        revenueGrowth: 8,
        customerGrowth: 5,
        ratingGrowth: 0.2
      });
    } catch (error) {
      next(error);
    }
  });

  app.get("/api/admin/orders/recent", async (req, res, next) => {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const orders = await storage.getRecentOrders(limit);
      res.json(orders);
    } catch (error) {
      next(error);
    }
  });

  app.patch("/api/admin/orders/:id/status", async (req, res, next) => {
    try {
      const { status } = req.body;
      
      if (!status) {
        return res.status(400).json({ message: "Status is required" });
      }
      
      const order = await storage.updateOrderStatus(req.params.id, status);
      res.json(order);
    } catch (error) {
      next(error);
    }
  });

  // Admin menu management
  app.post("/api/admin/menu-items", async (req, res, next) => {
    try {
      const menuItemData = insertMenuItemSchema.parse(req.body);
      const menuItem = await storage.createMenuItem(menuItemData);
      res.status(201).json(menuItem);
    } catch (error) {
      next(error);
    }
  });

  app.patch("/api/admin/menu-items/:id", async (req, res, next) => {
    try {
      const updates = req.body;
      const menuItem = await storage.updateMenuItem(req.params.id, updates);
      res.json(menuItem);
    } catch (error) {
      next(error);
    }
  });

  app.delete("/api/admin/menu-items/:id", async (req, res, next) => {
    try {
      await storage.deleteMenuItem(req.params.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  });

  // Admin category management
  app.post("/api/admin/categories", async (req, res, next) => {
    try {
      const categoryData = insertCategorySchema.parse(req.body);
      const category = await storage.createCategory(categoryData);
      res.status(201).json(category);
    } catch (error) {
      next(error);
    }
  });

  app.patch("/api/admin/categories/:id", async (req, res, next) => {
    try {
      const updates = req.body;
      const category = await storage.updateCategory(req.params.id, updates);
      res.json(category);
    } catch (error) {
      next(error);
    }
  });

  app.delete("/api/admin/categories/:id", async (req, res, next) => {
    try {
      await storage.deleteCategory(req.params.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
