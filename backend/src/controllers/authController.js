const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'mealora_secret_key_2026';

// In-memory mock user database initialized with sample accounts
const usersDb = [
  {
    id: 'usr-1',
    name: 'Alex Johnson',
    email: 'alex@mealora.com',
    role: 'user',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    walletBalance: 125.00,
    loyaltyCoins: 450,
    addresses: [
      { id: 'addr-1', label: 'Home', street: '742 Evergreen Terrace', city: 'New York', zip: '10001', isDefault: true },
      { id: 'addr-2', label: 'Office', street: '350 5th Ave (Empire State)', city: 'New York', zip: '10118', isDefault: false }
    ],
    wishlist: ['food-1', 'food-7']
  },
  {
    id: 'usr-rest',
    name: 'Nero Master Chef',
    email: 'restaurant@mealora.com',
    role: 'restaurant',
    restaurantId: 'rest-1',
    avatar: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=200&q=80',
    walletBalance: 2450.00,
  },
  {
    id: 'usr-deliv',
    name: 'Speedy Sam (Delivery Partner)',
    email: 'delivery@mealora.com',
    role: 'delivery',
    vehicle: 'Electric Scooter',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&q=80',
    walletBalance: 380.50,
  },
  {
    id: 'usr-admin',
    name: 'Mealora System Admin',
    email: 'admin@mealora.com',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
  }
];

const register = (req, res) => {
  const { name, email, password, role = 'user' } = req.body;
  if (!name || !email) {
    return res.status(400).json({ success: false, message: 'Name and email are required' });
  }

  const existing = usersDb.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    return res.status(400).json({ success: false, message: 'User already exists' });
  }

  const newUser = {
    id: `usr-${Date.now()}`,
    name,
    email,
    role,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`,
    walletBalance: 50.00, // Welcome bonus
    loyaltyCoins: 100,
    addresses: [],
    wishlist: []
  };

  usersDb.push(newUser);

  const token = jwt.sign({ id: newUser.id, email: newUser.email, role: newUser.role }, JWT_SECRET, { expiresIn: '7d' });

  return res.json({
    success: true,
    token,
    user: newUser
  });
};

const login = (req, res) => {
  const { email, password } = req.body;
  const user = usersDb.find(u => u.email.toLowerCase() === email?.toLowerCase());

  if (!user) {
    // If not found, return demo user for convenient preview
    const fallbackUser = usersDb[0];
    const token = jwt.sign({ id: fallbackUser.id, email: fallbackUser.email, role: fallbackUser.role }, JWT_SECRET, { expiresIn: '7d' });
    return res.json({
      success: true,
      token,
      user: fallbackUser,
      message: 'Demo login successful'
    });
  }

  const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '7d' });

  return res.json({
    success: true,
    token,
    user
  });
};

const googleLogin = (req, res) => {
  const demoUser = usersDb[0];
  const token = jwt.sign({ id: demoUser.id, email: demoUser.email, role: demoUser.role }, JWT_SECRET, { expiresIn: '7d' });
  return res.json({
    success: true,
    token,
    user: demoUser,
    message: 'Signed in with Google OAuth'
  });
};

const getProfile = (req, res) => {
  const userId = req.user?.id || 'usr-1';
  const user = usersDb.find(u => u.id === userId) || usersDb[0];
  return res.json({ success: true, user });
};

const addWalletFunds = (req, res) => {
  const { amount } = req.body;
  const userId = req.user?.id || 'usr-1';
  const user = usersDb.find(u => u.id === userId) || usersDb[0];
  user.walletBalance = (user.walletBalance || 0) + Number(amount || 0);
  return res.json({ success: true, walletBalance: user.walletBalance, message: `$${amount} added to wallet` });
};

module.exports = {
  register,
  login,
  googleLogin,
  getProfile,
  addWalletFunds,
  usersDb
};
