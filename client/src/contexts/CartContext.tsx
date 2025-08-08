import { createContext, useContext, useReducer, useEffect } from "react";
import type { CartContextType, CartItem, MenuItem } from "@/types";

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: "ADD_ITEM"; payload: { menuItem: MenuItem; quantity: number; specialInstructions?: string } }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "UPDATE_QUANTITY"; payload: { menuItemId: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "LOAD_CART"; payload: CartItem[] };

const CartContext = createContext<CartContextType | undefined>(undefined);

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const { menuItem, quantity, specialInstructions } = action.payload;
      const existingItemIndex = state.items.findIndex(
        item => item.menuItem.id === menuItem.id && item.specialInstructions === specialInstructions
      );

      if (existingItemIndex > -1) {
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex].quantity += quantity;
        return { items: updatedItems };
      }

      return {
        items: [...state.items, { menuItem, quantity, specialInstructions }],
      };
    }

    case "REMOVE_ITEM": {
      return {
        items: state.items.filter(item => item.menuItem.id !== action.payload),
      };
    }

    case "UPDATE_QUANTITY": {
      const { menuItemId, quantity } = action.payload;
      if (quantity <= 0) {
        return {
          items: state.items.filter(item => item.menuItem.id !== menuItemId),
        };
      }

      return {
        items: state.items.map(item =>
          item.menuItem.id === menuItemId ? { ...item, quantity } : item
        ),
      };
    }

    case "CLEAR_CART": {
      return { items: [] };
    }

    case "LOAD_CART": {
      return { items: action.payload };
    }

    default:
      return state;
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        dispatch({ type: "LOAD_CART", payload: parsedCart });
      } catch (error) {
        console.error("Failed to load cart from localStorage:", error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.items));
  }, [state.items]);

  const itemCount = state.items.reduce((total, item) => total + item.quantity, 0);
  
  const totalAmount = state.items.reduce(
    (total, item) => total + parseFloat(item.menuItem.price) * item.quantity,
    0
  );

  const addItem = (menuItem: MenuItem, quantity = 1, specialInstructions?: string) => {
    dispatch({ type: "ADD_ITEM", payload: { menuItem, quantity, specialInstructions } });
  };

  const removeItem = (menuItemId: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: menuItemId });
  };

  const updateQuantity = (menuItemId: string, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { menuItemId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const value: CartContextType = {
    items: state.items,
    itemCount,
    totalAmount,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
