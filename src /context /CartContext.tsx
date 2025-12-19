import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Bouquet } from '@/types';
import { toast } from '@/hooks/use-toast';

interface CartContextType {
  items: CartItem[];
  addToCart: (bouquet: Bouquet) => void;
  removeFromCart: (bouquetId: string) => void;
  updateQuantity: (bouquetId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}
const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (bouquet: Bouquet) => {
    setItems(prev => {
      const existing = prev.find(item => item.bouquet.id === bouquet.id);
      if (existing) {
        return prev.map(item =>
          item.bouquet.id === bouquet.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { bouquet, quantity: 1 }];
    });
    toast({
      title: "Додано до кошика",
      description: `${bouquet.name} додано до вашого кошика`,
    });
  };

  const removeFromCart = (bouquetId: string) => {
    setItems(prev => prev.filter(item => item.bouquet.id !== bouquetId));
  };

  const updateQuantity = (bouquetId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(bouquetId);
      return;
    }
    setItems(prev =>
      prev.map(item =>
        item.bouquet.id === bouquetId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.bouquet.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
