const mongoose = require('mongoose');

const wasteFoodSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, required: true },
  weight: { type: Number, required: true },
  price: { type: Number, required: true },
  images: { type: Array },
  expirationDate: { type: Date, required: true },
  category: { type: String, required: true },
  location: { type: String, required: true },
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, default: 'Available' },
});

module.exports = mongoose.model('WasteFood', wasteFoodSchema);
