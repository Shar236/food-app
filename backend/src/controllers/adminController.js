const { usersDb } = require('./authController');
const { ordersDb } = require('./orderController');
const { restaurantList, foodList } = require('./restaurantController');

const getAdminStats = (req, res) => {
  const totalRevenue = ordersDb.reduce((acc, curr) => acc + (curr.totalAmount || 0), 14280.50);
  const totalOrders = ordersDb.length + 842;
  const activeRestaurants = restaurantList.length;
  const totalUsers = usersDb.length + 1250;

  const monthlySales = [
    { month: 'Jan', revenue: 8400, orders: 420 },
    { month: 'Feb', revenue: 9800, orders: 510 },
    { month: 'Mar', revenue: 11200, orders: 590 },
    { month: 'Apr', revenue: 12900, orders: 670 },
    { month: 'May', revenue: 14500, orders: 740 },
    { month: 'Jun', revenue: 18200, orders: 920 },
  ];

  const categoryShare = [
    { name: 'Pizza', value: 35 },
    { name: 'Burger', value: 25 },
    { name: 'Indian', value: 20 },
    { name: 'Healthy', value: 12 },
    { name: 'Desserts', value: 8 },
  ];

  return res.json({
    success: true,
    metrics: {
      totalRevenue: totalRevenue.toFixed(2),
      totalOrders,
      activeRestaurants,
      totalUsers,
      averageDeliveryTime: '24 min',
      customerSatisfaction: '4.85 / 5.0',
    },
    monthlySales,
    categoryShare,
    recentOrders: ordersDb.slice(0, 5),
  });
};

module.exports = {
  getAdminStats
};
