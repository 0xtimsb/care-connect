"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const productSchema = new mongoose_1.default.Schema({
    _id: mongoose_1.default.Schema.Types.ObjectId,
    name: { type: mongoose_1.default.Schema.Types.String, required: true },
    price: { type: mongoose_1.default.Schema.Types.Number, required: true },
    imageUrl: { type: mongoose_1.default.Schema.Types.String, required: true },
});
const productModel = mongoose_1.default.model('products', productSchema);
exports.default = module.exports = productModel;
//# sourceMappingURL=product.js.map