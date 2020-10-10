"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const vitalSchema = new mongoose_1.default.Schema({
    _id: mongoose_1.default.Schema.Types.ObjectId,
    Heart_rate: mongoose_1.default.Schema.Types.Number,
    temp: mongoose_1.default.Schema.Types.Number,
    systolic_bp: mongoose_1.default.Schema.Types.Number,
    diastoli_bp: mongoose_1.default.Schema.Types.Number,
});
const vitalModel = mongoose_1.default.model('VitalModel', vitalSchema, 'vital_data');
exports.default = module.exports = vitalModel;
//# sourceMappingURL=vitals.js.map