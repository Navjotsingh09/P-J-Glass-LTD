'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('pjglass-cart');
      if (saved) setItems(JSON.parse(saved));
    } catch {}
  }, []);

  // Persist cart to localStorage
  useEffect(() => {
    localStorage.setItem('pjglass-cart', JSON.stringify(items));
  }, [items]);

  const addItem = (product, quantity = 1, selectedSize = '') => {
    setItems((prev) => {
      const key = `${product.id}-${selectedSize}`;
      const existing = prev.find((item) => item.key === key);
      if (existing) {
        return prev.map((item) =>
          item.key === key ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          key,
          id: product.id,
          name: product.name,
          image: product.image,
          priceFrom: product.priceFrom,
          priceTo: product.priceTo,
          priceDisplay: product.priceDisplay,
          category: product.category,
          selectedSize,
          quantity,
        },
      ];
    });
    setIsOpen(true);
  };

  const removeItem = (key) => {
    setItems((prev) => prev.filter((item) => item.key !== key));
  };

  const updateQuantity = (key, quantity) => {
    if (quantity < 1) return removeItem(key);
    setItems((prev) =>
      prev.map((item) => (item.key === key ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.priceFrom * item.quantity, 0);
  const requiresApproval = totalPrice >= 100;

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        setIsOpen,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        requiresApproval,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
}
