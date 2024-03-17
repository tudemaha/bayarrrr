const { Schema, model } = require("mongoose");

const paymentSchema = new Schema({
  name: String,
  wa: String,
  description: String,
  items: [
    {
      name: String,
      price: Number,
    },
  ],
  total: Number,
  payments: [
    {
      date: Date,
      amount: Number,
    },
  ],
  remains: Number,
}, {
  collection: 'payments'
});

const Payment = model('Payment', paymentSchema);

module.exports = Payment;
