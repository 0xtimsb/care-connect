import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  product: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'products' },
  quantity: { type: mongoose.Schema.Types.Number, default: 1 },
});

const orderModel = mongoose.model('orders', orderSchema);
export default module.exports = orderModel;
