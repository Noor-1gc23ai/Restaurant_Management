import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CART_STORAGE_KEY = "cart";
const ORDERS_STORAGE_KEY = "orders";

const defaultCartState = {
  cart: [],
  cartCount: 0,
  subtotal: 0,
  deliveryFee: 0,
  taxAmount: 0,
  grandTotal: 0,
  addToCart: () => {},
  increaseQuantity: () => {},
  decreaseQuantity: () => {},
  removeItem: () => {},
  clearCart: () => {},
  placeOrder: () => null,
  getOrderById: () => null,
};

const CartContext = createContext(defaultCartState);

const readStorage = (key, fallbackValue) => {
  if (typeof window === "undefined") {
    return fallbackValue;
  }

  try {
    const storedValue = window.localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : fallbackValue;
  } catch {
    return fallbackValue;
  }
};

const writeStorage = (key, value) => {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore storage quota or privacy-mode failures and keep the in-memory state usable.
  }
};

const normalizeCart = (cartItems) => {
  if (!Array.isArray(cartItems)) {
    return [];
  }

  return cartItems.map((item) => ({
    ...item,
    quantity: Number(item.quantity) > 0 ? Number(item.quantity) : 1,
  }));
};

const generateOrderId = () => {
  const randomPart = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `CN-${Date.now().toString(36).toUpperCase()}-${randomPart}`;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => normalizeCart(readStorage(CART_STORAGE_KEY, [])));
  const [orders, setOrders] = useState(() => readStorage(ORDERS_STORAGE_KEY, []));

  useEffect(() => {
    writeStorage(CART_STORAGE_KEY, cart);
  }, [cart]);

  useEffect(() => {
    writeStorage(ORDERS_STORAGE_KEY, orders);
  }, [orders]);

  const cartCount = useMemo(
    () => cart.reduce((total, item) => total + item.quantity, 0),
    [cart]
  );

  const subtotal = useMemo(
    () => cart.reduce((total, item) => total + item.price * item.quantity, 0),
    [cart]
  );

  const deliveryFee = 0;
  const taxAmount = 0;
  const grandTotal = subtotal + deliveryFee + taxAmount;

  const addToCart = (item) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find((cartItem) => cartItem.id === item.id);

      if (existingItem) {
        return currentCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }

      return [...currentCart, { ...item, quantity: 1 }];
    });
  };

  const increaseQuantity = (itemId) => {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (itemId) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (itemId) => {
    setCart((currentCart) => currentCart.filter((item) => item.id !== itemId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const placeOrder = (customerDetails) => {
    if (cart.length === 0) {
      return null;
    }

    const order = {
      orderId: generateOrderId(),
      customer: customerDetails,
      items: cart,
      subtotal,
      deliveryFee,
      taxAmount,
      grandTotal,
      createdAt: new Date().toISOString(),
    };

    setOrders((currentOrders) => {
      const updatedOrders = [order, ...currentOrders];
      writeStorage(ORDERS_STORAGE_KEY, updatedOrders);
      return updatedOrders;
    });

    setCart([]);
    writeStorage(CART_STORAGE_KEY, []);

    return order;
  };

  const getOrderById = (orderId) => {
    if (!orderId) {
      return null;
    }

    const storedOrders = readStorage(ORDERS_STORAGE_KEY, []);
    return storedOrders.find((order) => order.orderId === orderId) || null;
  };

  const value = {
    cart,
    cartCount,
    subtotal,
    deliveryFee,
    taxAmount,
    grandTotal,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    clearCart,
    placeOrder,
    getOrderById,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);
