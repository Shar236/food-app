import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('mealora_cart');
    return saved ? JSON.parse(saved) : [
      {
        id: 'food-1',
        restaurantName: "Nero's Wood-Fired Pizzeria",
        name: 'Margherita Napoletana',
        price: 14.50,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=200&q=80',
        isVeg: true
      }
    ];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [discountAmount, setDiscountAmount] = useState(0);

  useEffect(() => {
    localStorage.setItem('mealora_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (food) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === food.id);
      if (existing) {
        return prev.map(item => item.id === food.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...food, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (foodId) => {
    setCartItems(prev => prev.filter(item => item.id !== foodId));
  };

  const updateQuantity = (foodId, delta) => {
    setCartItems(prev => {
      return prev.map(item => {
        if (item.id === foodId) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean);
    });
  };

  const clearCart = () => {
    setCartItems([]);
    setAppliedCoupon(null);
    setDiscountAmount(0);
  };

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const deliveryFee = subtotal > 0 ? (subtotal > 35 ? 0 : 2.99) : 0;
  const grandTotal = Math.max(0, subtotal + deliveryFee - discountAmount);

  return (
    <CartContext.Provider value={{
      cartItems,
      isCartOpen,
      setIsCartOpen,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      subtotal,
      deliveryFee,
      discountAmount,
      setDiscountAmount,
      appliedCoupon,
      setAppliedCoupon,
      grandTotal,
      totalCount: cartItems.reduce((acc, item) => acc + item.quantity, 0)
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
