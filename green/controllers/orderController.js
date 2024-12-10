const Order = require('../models/Order');
const WasteFood = require('../models/WasteFood');

exports.createOrder = async (req, res) => {
  try {
    const { wasteFoodId, quantity } = req.body;

    const wasteFood = await WasteFood.findById(wasteFoodId);
    if (!wasteFood || wasteFood.status !== 'Available') {
      return res.status(404).json({ message: 'Waste food item not found or unavailable' });
    }

    const totalPrice = quantity * wasteFood.price;

    const newOrder = new Order({
      buyerId: req.user.id,
      sellerId: wasteFood.sellerId,
      wasteFoodId,
      quantity,
      totalPrice,
    });

    await newOrder.save();
    res.status(201).json({ message: 'Order created successfully', order: newOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create order' });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ buyerId: req.user.id }).populate('wasteFoodId sellerId', 'title price location');
    res.status(200).json({ orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch your orders' });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findById(id);
    if (!order || order.sellerId.toString() !== req.user.id) {
      return res.status(404).json({ message: 'Order not found or unauthorized' });
    }

    order.orderStatus = status;

    if (status === 'Confirmed') {
      const wasteFood = await WasteFood.findById(order.wasteFoodId);
      wasteFood.status = 'Sold';
      await wasteFood.save();
    }

    await order.save();
    res.status(200).json({ message: 'Order status updated successfully', order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update order status' });
  }
};
