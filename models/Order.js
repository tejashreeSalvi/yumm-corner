const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true
    },
    orderList: {
        type: Array,
        required: true,
    },
    price: { type: String, required: true },
});

const Order = mongoose.model('orders', orderSchema);
module.exports = Order;