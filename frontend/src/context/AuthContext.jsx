import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('mealora_user');
    return saved ? JSON.parse(saved) : {
      id: 'usr-1',
      name: 'Alex Johnson',
      email: 'alex@mealora.com',
      role: 'user', // user, restaurant, delivery, admin
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      walletBalance: 125.00,
      loyaltyCoins: 450,
      addresses: [
        { id: 'addr-1', label: 'Home', street: '742 Evergreen Terrace', city: 'New York', zip: '10001', isDefault: true },
        { id: 'addr-2', label: 'Office', street: '350 5th Ave (Empire State)', city: 'New York', zip: '10118', isDefault: false }
      ]
    };
  });

  const [activeRole, setActiveRole] = useState(() => {
    return localStorage.getItem('mealora_role') || 'user';
  });

  useEffect(() => {
    localStorage.setItem('mealora_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('mealora_role', activeRole);
  }, [activeRole]);

  const switchRole = (role) => {
    setActiveRole(role);
    if (role === 'restaurant') {
      setUser(prev => ({ ...prev, role: 'restaurant', name: "Nero's Master Chef", email: 'chef@nero.com' }));
    } else if (role === 'delivery') {
      setUser(prev => ({ ...prev, role: 'delivery', name: 'Speedy Sam (Rider)', email: 'driver@mealora.com' }));
    } else if (role === 'admin') {
      setUser(prev => ({ ...prev, role: 'admin', name: 'Mealora Admin', email: 'admin@mealora.com' }));
    } else {
      setUser(prev => ({ ...prev, role: 'user', name: 'Alex Johnson', email: 'alex@mealora.com' }));
    }
  };

  const loginUser = (userData) => {
    setUser(userData);
    setActiveRole(userData.role || 'user');
  };

  const addWalletFunds = (amount) => {
    setUser(prev => ({ ...prev, walletBalance: (prev.walletBalance || 0) + Number(amount) }));
  };

  const addLoyaltyCoins = (coins) => {
    setUser(prev => ({ ...prev, loyaltyCoins: (prev.loyaltyCoins || 0) + Number(coins) }));
  };

  return (
    <AuthContext.Provider value={{ user, activeRole, switchRole, loginUser, addWalletFunds, addLoyaltyCoins }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
