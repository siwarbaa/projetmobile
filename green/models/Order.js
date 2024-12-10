const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  buyerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Buyer user ID
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Seller user ID
  wasteFoodId: { type: mongoose.Schema.Types.ObjectId, ref: 'WasteFood', required: true }, // Purchased waste food item
  quantity: { type: Number, required: true }, // Quantity bought (e.g., weight in kg)
  totalPrice: { type: Number, required: true }, // Total price
  paymentStatus: { type: String, enum: ['Pending', 'Paid'], default: 'Pending' }, // Payment status
  orderStatus: { type: String, enum: ['Pending', 'Confirmed', 'Cancelled'], default: 'Pending' }, // Order status
  createdAt: { type: Date, default: Date.now }, // Order creation timestamp
});

module.exports = mongoose.model('Order', OrderSchema);
