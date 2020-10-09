"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const orderSchema = new mongoose_1.default.Schema({
    _id: mongoose_1.default.Schema.Types.ObjectId,
    product: { type: mongoose_1.default.Schema.Types.ObjectId, required: true, ref: 'products' },
    quantity: { type: mongoose_1.default.Schema.Types.Number, default: 1 },
});
const orderModel = mongoose_1.default.model('orders', orderSchema);
exports.default = module.exports = orderModel;
//# sourceMappingURL=orders.js.map