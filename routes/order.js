const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { authenticateUser, isAdmin } = require('../middleware/authMiddleware');

// Non-admin User checkout (Create order)
router.post('/orders', authenticateUser, orderController.createOrder);

// Retrieve authenticated user's orders
router.get('/orders/user', authenticateUser, orderController.getUserOrders);

// Retrieve all orders (Admin only)
router.get('/orders', authenticateUser, isAdmin, orderController.getAllOrders);

module.exports = router;