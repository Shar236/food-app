let ordersDb = [
  {
    id: 'ord-1001',
    orderNumber: '#ML-9482',
    userId: 'usr-1',
    userName: 'Alex Johnson',
    items: [
      { id: 'food-1', name: 'Margherita Napoletana', price: 14.50, quantity: 1, image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=200&q=80' },
      { id: 'food-8', name: 'Dark Chocolate Fondant', price: 9.50, quantity: 1, image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=200&q=80' }
    ],
    restaurantName: "Nero's Wood-Fired Pizzeria",
    subtotal: 24.00,
    deliveryFee: 2.99,
    discount: 4.80,
    tip: 3.00,
    totalAmount: 25.19,
    status: 'Out for Delivery', // Received, Preparing, Out for Delivery, Delivered
    paymentMethod: 'Wallet',
    address: '742 Evergreen Terrace, New York, NY',
    deliveryDriver: {
      name: 'Speedy Sam',
      phone: '+1 (555) 019-2834',
      vehicle: 'Tesla E-Scooter (#NY-402)',
      rating: 4.9,
      lat: 40.7128,
      lng: -74.0060,
    },
    createdAt: new Date(Date.now() - 15 * 60000).toISOString(),
    estimatedDelivery: '12 mins',
  }
];

const createOrder = (req, res) => {
  const { items, address, paymentMethod, couponCode, subtotal, discount, tip, deliveryFee, totalAmount, userId, userName } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ success: false, message: 'Cart is empty' });
  }

  const newOrder = {
    id: `ord-${Date.now()}`,
    orderNumber: `#ML-${Math.floor(1000 + Math.random() * 9000)}`,
    userId: userId || 'usr-1',
    userName: userName || 'Alex Johnson',
    items,
    restaurantName: items[0]?.restaurantName || "Nero's Wood-Fired Pizzeria",
    subtotal: Number(subtotal || 0),
    deliveryFee: Number(deliveryFee || 2.99),
    discount: Number(discount || 0),
    tip: Number(tip || 0),
    totalAmount: Number(totalAmount || 0),
    status: 'Received',
    paymentMethod: paymentMethod || 'Card Sandbox',
    address: address || '742 Evergreen Terrace, New York, NY',
    deliveryDriver: {
      name: 'Speedy Sam',
      phone: '+1 (555) 019-2834',
      vehicle: 'Tesla E-Scooter (#NY-402)',
      rating: 4.9,
      lat: 40.7128,
      lng: -74.0060,
    },
    createdAt: new Date().toISOString(),
    estimatedDelivery: '25 mins',
  };

  ordersDb.unshift(newOrder);

  // Emit socket event if io is attached to req
  if (req.io) {
    req.io.emit('order:created', newOrder);
  }

  return res.json({ success: true, order: newOrder, message: 'Order placed successfully!' });
};

const getOrderById = (req, res) => {
  const { id } = req.params;
  const order = ordersDb.find(o => o.id === id || o.orderNumber === id);
  if (!order) {
    return res.status(404).json({ success: false, message: 'Order not found' });
  }
  return res.json({ success: true, order });
};

const getUserOrders = (req, res) => {
  const userId = req.params.userId || 'usr-1';
  const userOrders = ordersDb.filter(o => o.userId === userId || userId === 'usr-1');
  return res.json({ success: true, count: userOrders.length, orders: userOrders });
};

const updateOrderStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const order = ordersDb.find(o => o.id === id || o.orderNumber === id);

  if (!order) {
    return res.status(404).json({ success: false, message: 'Order not found' });
  }

  order.status = status;

  if (req.io) {
    req.io.emit('order:statusUpdate', { orderId: order.id, status: order.status, order });
  }

  return res.json({ success: true, order, message: `Order status updated to ${status}` });
};

const getAllOrders = (req, res) => {
  return res.json({ success: true, count: ordersDb.length, orders: ordersDb });
};

module.exports = {
  createOrder,
  getOrderById,
  getUserOrders,
  updateOrderStatus,
  getAllOrders,
  ordersDb
};
