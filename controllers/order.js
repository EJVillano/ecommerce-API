const Order = require('../models/Order');

// Non-admin User checkout (Create order)
exports.createOrder = async (req, res) => {
  try {
    const { userId } = req.user; // Assuming userId is extracted from the authenticated user's token
    const { productsOrdered } = req.body;
    const order = new Order({ userId, productsOrdered });
    await order.save();
    res.status(201).json({ message: 'Order created successfully', order });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create order', error: error.message });
  }
};

// Retrieve authenticated user's orders
exports.getUserOrders = async (req, res) => {
  try {
    const { userId } = req.user; // Assuming userId is extracted from the authenticated user's token
    const userOrders = await Order.find({ userId });
    res.status(200).json(userOrders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch user orders', error: error.message });
  }
};

// Retrieve all orders (Admin only)
exports.getAllOrders = async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Only admin users can access this resource' });
    }
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch all orders', error: error.message });
  }
};