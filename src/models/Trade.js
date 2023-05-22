const mongoose = require('mongoose');

const tradeSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  pair: { type: String, required: true },
  lot: { type: Number, required: true },
  openTime: { type: Date, required: true },
  hour: { type: Number },
  minute: { type: Number },
  sl: { type: Number },
  tp: { type: Number },
  result: { type: String, required: false }, // Make it optional
  closeTime: { type: Date, required: false }, // Make it optional
});

module.exports = mongoose.model('Trade', tradeSchema);
