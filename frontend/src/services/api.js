import axios from 'axios';
import { foods, restaurants, categories, coupons } from '../data/mockData';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 4000,
});

export const fetchFoods = async (params = {}) => {
  try {
    const res = await api.get('/foods', { params });
    return res.data;
  } catch (err) {
    console.warn('Backend API notice: using client mock dataset');
    let result = [...foods];
    if (params.category && params.category !== 'All') {
      result = result.filter(f => f.category.toLowerCase() === params.category.toLowerCase());
    }
    if (params.search) {
      const q = params.search.toLowerCase();
      result = result.filter(f => f.name.toLowerCase().includes(q) || f.description.toLowerCase().includes(q));
    }
    if (params.veg === true || params.veg === 'true') {
      result = result.filter(f => f.isVeg);
    }
    return { success: true, foods: result };
  }
};

export const fetchCategories = async () => {
  try {
    const res = await api.get('/foods/categories');
    return res.data;
  } catch (err) {
    return { success: true, categories };
  }
};

export const fetchRestaurants = async (params = {}) => {
  try {
    const res = await api.get('/restaurants', { params });
    return res.data;
  } catch (err) {
    let result = [...restaurants];
    if (params.search) {
      const q = params.search.toLowerCase();
      result = result.filter(r => r.name.toLowerCase().includes(q) || r.cuisine.toLowerCase().includes(q));
    }
    return { success: true, restaurants: result };
  }
};

export const fetchRestaurantById = async (id) => {
  try {
    const res = await api.get(`/restaurants/${id}`);
    return res.data;
  } catch (err) {
    const restaurant = restaurants.find(r => r.id === id) || restaurants[0];
    const menu = foods.filter(f => f.restaurantId === id || f.restaurantName === restaurant.name);
    return { success: true, restaurant, menu };
  }
};

export const getAiRecommendation = async (payload) => {
  try {
    const res = await api.post('/ai/recommend', payload);
    return res.data;
  } catch (err) {
    const mood = payload.mood || 'Happy';
    const filtered = foods.filter(f => f.moods && f.moods.includes(mood));
    const recommendations = (filtered.length > 0 ? filtered : foods).slice(0, 4).map(f => ({
      ...f,
      aiScore: Math.floor(88 + Math.random() * 11),
      aiRationale: `Handpicked for your **${mood}** moment with optimal macro balance.`
    }));
    return {
      success: true,
      momentSummary: { mood, budget: `$${payload.budget || 30}`, aiConfidence: '99.1%' },
      recommendations
    };
  }
};

export const createOrderApi = async (orderData) => {
  try {
    const res = await api.post('/orders', orderData);
    return res.data;
  } catch (err) {
    return {
      success: true,
      order: {
        id: `ord-${Date.now()}`,
        orderNumber: `#ML-${Math.floor(1000 + Math.random() * 9000)}`,
        items: orderData.items,
        totalAmount: orderData.totalAmount,
        status: 'Received',
        address: orderData.address || '742 Evergreen Terrace, New York, NY',
        estimatedDelivery: '22 mins',
        deliveryDriver: {
          name: 'Speedy Sam',
          phone: '+1 (555) 019-2834',
          vehicle: 'Tesla E-Scooter (#NY-402)',
          rating: 4.9,
        }
      }
    };
  }
};

export const validateCouponApi = async (code, subtotal) => {
  try {
    const res = await api.post('/coupons/validate', { code, subtotal });
    return res.data;
  } catch (err) {
    const match = coupons.find(c => c.code.toUpperCase() === code.toUpperCase());
    if (match) {
      const discount = Math.min((subtotal * match.discountPercent) / 100, match.maxDiscount);
      return { success: true, coupon: match, discountAmount: Number(discount.toFixed(2)), message: `Promo code ${match.code} applied!` };
    }
    return { success: false, message: 'Invalid coupon code' };
  }
};

export const fetchAdminStats = async () => {
  try {
    const res = await api.get('/admin/stats');
    return res.data;
  } catch (err) {
    return {
      success: true,
      metrics: {
        totalRevenue: '18,420.50',
        totalOrders: 1240,
        activeRestaurants: 6,
        totalUsers: 890,
        averageDeliveryTime: '22 min',
        customerSatisfaction: '4.9 / 5.0'
      },
      monthlySales: [
        { month: 'Jan', revenue: 8400, orders: 420 },
        { month: 'Feb', revenue: 9800, orders: 510 },
        { month: 'Mar', revenue: 11200, orders: 590 },
        { month: 'Apr', revenue: 12900, orders: 670 },
        { month: 'May', revenue: 14500, orders: 740 },
        { month: 'Jun', revenue: 18420, orders: 890 },
      ]
    };
  }
};
