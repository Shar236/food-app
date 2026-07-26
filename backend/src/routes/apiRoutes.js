const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const foodController = require('../controllers/foodController');
const restaurantController = require('../controllers/restaurantController');
const aiController = require('../controllers/aiController');
const orderController = require('../controllers/orderController');
const adminController = require('../controllers/adminController');
const couponController = require('../controllers/couponController');

// Auth Routes
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);
router.post('/auth/google', authController.googleLogin);
router.get('/auth/profile', authController.getProfile);
router.post('/auth/wallet/add', authController.addWalletFunds);

// Food Routes
router.get('/foods', foodController.getFoods);
router.get('/foods/categories', foodController.getCategories);
router.get('/foods/:id', foodController.getFoodById);

// Restaurant Routes
router.get('/restaurants', restaurantController.getRestaurants);
router.get('/restaurants/:id', restaurantController.getRestaurantById);
router.post('/restaurants/food', restaurantController.addFoodItem);
router.delete('/restaurants/food/:id', restaurantController.deleteFoodItem);

// AI Recommendation Route
router.post('/ai/recommend', aiController.recommendFoods);

// Order Routes
router.post('/orders', orderController.createOrder);
router.get('/orders/user/:userId', orderController.getUserOrders);
router.get('/orders/:id', orderController.getOrderById);
router.patch('/orders/:id/status', orderController.updateOrderStatus);
router.get('/orders', orderController.getAllOrders);

// Admin Routes
router.get('/admin/stats', adminController.getAdminStats);

// Coupon Routes
router.post('/coupons/validate', couponController.validateCoupon);
router.get('/coupons', couponController.getCoupons);

module.exports = router;
