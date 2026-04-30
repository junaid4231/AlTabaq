"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { calculateDistance, calculateDeliveryFee } from "@/lib/deliveryUtils";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
};

type CartContextType = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  // Delivery related
  userCoords: { lat: number; lng: number } | null;
  userDistance: number | null;
  deliveryFee: number;
  setDeliveryLocation: (lat: number, lng: number, restaurantLat: number, restaurantLng: number, freeRadius: number, costPerKm: number) => void;
  resetDeliveryLocation: () => void;
  isTrayOpen: boolean;
  setIsTrayOpen: (open: boolean) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Delivery State
  const [userCoords, setUserCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [userDistance, setUserDistance] = useState<number | null>(null);
  const [deliveryFee, setDeliveryFee] = useState<number>(0);
  const [isTrayOpen, setIsTrayOpen] = useState(false);

  // Load cart from localStorage on mount safely
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("al-tabaq-cart");
      if (savedCart) {
        try {
          const parsed = JSON.parse(savedCart);
          Promise.resolve().then(() => {
            setItems(parsed);
          });
        } catch (e) {
          console.error("Failed to parse cart", e);
        }
      }
      Promise.resolve().then(() => {
        setIsInitialized(true);
      });
    }
  }, []);

  // Save cart to localStorage on change
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("al-tabaq-cart", JSON.stringify(items));
    }
  }, [items, isInitialized]);

  const addItem = (newItem: Omit<CartItem, "quantity">) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === newItem.id);
      if (existingItem) {
        return currentItems.map((item) =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...currentItems, { ...newItem, quantity: 1 }];
    });
  };

  const removeItem = (id: string) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setItems((currentItems) =>
      currentItems
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => setItems([]);

  const setDeliveryLocation = (
    lat: number,
    lng: number,
    restaurantLat: number,
    restaurantLng: number,
    freeRadius: number,
    costPerKm: number
  ) => {
    setUserCoords({ lat, lng });
    const dist = calculateDistance(lat, lng, restaurantLat, restaurantLng);
    setUserDistance(dist);
    const fee = calculateDeliveryFee(dist, freeRadius, costPerKm);
    setDeliveryFee(fee);
  };

  const resetDeliveryLocation = () => {
    setUserCoords(null);
    setUserDistance(null);
    setDeliveryFee(0);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => {
    const itemPrice = Number(item.price) || 0;
    return sum + itemPrice * item.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        userCoords,
        userDistance,
        deliveryFee,
        setDeliveryLocation,
        resetDeliveryLocation,
        isTrayOpen,
        setIsTrayOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
