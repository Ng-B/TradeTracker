// models/Trade.js
const mongoose = require('mongoose');

const tradeSchema = new mongoose.Schema({
  price: { type: Number, required: true },
  pair: { type: String, required: true },
  lot: { type: Number, required: true },
  openTime: { type: Date, required: true },
  hour: { type: Number },
  minute: { type: Number },
  sl: { type: Number },
  tp: { type: Number },
  result: { type: String }, // Make it optional
  closeTime: { type: Date }, // Make it optional
  comment: { type: String }, // Make it optional
});

module.exports = mongoose.model('Trade', tradeSchema);
