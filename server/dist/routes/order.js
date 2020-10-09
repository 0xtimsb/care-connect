"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const orders_1 = __importDefault(require("../models/orders"));
const product_1 = __importDefault(require("../models/product"));
const auth_1 = __importDefault(require("../auth/auth"));
const router = express_1.default.Router();
router.get('/', auth_1.default, (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getOrder = yield orders_1.default.find().select('_id quantity product').populate('product', 'name');
        if (getOrder.length == 0) {
            res.status(404).json({ message: 'No data found' });
        }
        else {
            res.status(200).json({
                count: getOrder.length,
                orders: getOrder,
            });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message, error: err });
    }
}));
router.post('/', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productID = yield product_1.default.findById(req.body.product);
        if (productID) {
            const order = new orders_1.default({
                _id: new mongoose_1.default.Types.ObjectId(),
                product: productID._id,
                quantity: req.body.quantity,
            });
            const savedOrder = yield order.save();
            res.status(201).json({
                msg: 'Order saved',
                order: savedOrder,
            });
        }
        else {
            res.status(404).json({ message: 'Data not found' });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message, error: err });
    }
}));
router.get('/:orderID', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderID = req.params.orderID;
        const foundOrder = yield orders_1.default.findById(orderID).select('prodId quantity _id').populate('product');
        if (foundOrder) {
            res.status(200).json(foundOrder);
        }
        else {
            res.status(404).json({ message: 'No order found' });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message, error: err });
    }
}));
router.delete('/:orderID', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderID = req.params.orderID;
        const deleteOrder = yield orders_1.default.deleteOne({ _id: orderID });
        if (deleteOrder.n == 1) {
            res.status(200).json({ message: `Order ${orderID} deleted successfully` });
        }
        else {
            res.status(404).json({ message: `Order not deleted` });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message, error: err });
    }
}));
exports.default = module.exports = router;
//# sourceMappingURL=order.js.map