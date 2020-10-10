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
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    _id: mongoose_1.default.Schema.Types.ObjectId,
    name: { type: mongoose_1.default.Schema.Types.String, required: true },
    age: { type: mongoose_1.default.Schema.Types.Number, required: true },
    weight: { type: mongoose_1.default.Schema.Types.Number, required: true },
    height: { type: mongoose_1.default.Schema.Types.Number, required: true },
    phoneNum: {
        type: mongoose_1.default.Schema.Types.String,
        required: true,
        match: /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/
    },
    email: {
        type: mongoose_1.default.Schema.Types.String,
        required: true,
        unique: true,
        match: /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/,
    },
    password: { type: mongoose_1.default.Schema.Types.String, required: true },
});
userSchema.pre('updateOne', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const email = this.getUpdate().$set.email;
            if (email != undefined) {
                const reg = new RegExp(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/);
                const result = reg.test(email);
                if (!result)
                    return next(new Error('Incorrent email id'));
                else
                    next();
            }
            else
                next();
        }
        catch (err) {
            return next(err);
        }
    });
});
const userModel = mongoose_1.default.model('users', userSchema);
exports.default = module.exports = userModel;
//# sourceMappingURL=users.js.map