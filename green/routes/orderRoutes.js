const express = require('express');
const { createOrder, getUserOrders, updateOrderStatus } = require('../controllers/orderController');
const { verifyToken } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/orders', verifyToken, createOrder);
router.get('/orders/mine', verifyToken, getUserOrders);
router.put('/orders/:id/status', verifyToken, updateOrderStatus);

module.exports = router;
