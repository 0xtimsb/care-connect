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
const express_1 = __importDefault(require("express"));
const users_1 = __importDefault(require("../models/users"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_1 = __importDefault(require("../auth/auth"));
const router = express_1.default.Router();
router.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield users_1.default.find({ email: req.body.signupEmail });
    if (user.length == 0) {
        bcrypt_1.default.hash(req.body.signupPassword, 10, (err, hash) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                if (!err) {
                    const user = new users_1.default({
                        _id: new mongoose_1.default.Types.ObjectId(),
                        name: req.body.name,
                        age: req.body.age,
                        dob: new Date(req.body.dob),
                        weight: req.body.weight,
                        height: req.body.height,
                        phoneNum: req.body.phoneNum,
                        email: req.body.signupEmail,
                        password: hash
                    });
                    const createdUser = yield user.save();
                    const token = yield jsonwebtoken_1.default.sign({ email: createdUser.email, userid: createdUser._id }, process.env.JWT_TOKEN, {
                        expiresIn: '24h',
                    });
                    res.status(201).json({ error: null, data: { userData: createdUser, token: token } });
                }
                else {
                    res.status(500).json({ error: "Password hashing error", data: null });
                }
            }
            catch (err) {
                res.status(500).json({ error: err.message, data: null });
            }
        }));
    }
    else {
        res.status(404).json({ error: "This email already exists", data: null });
    }
}));
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield users_1.default.findOne({ email: req.body.loginEmail });
        if (user === null)
            res.status(404).json({ error: `No user found with this email id ${req.body.loginEmail}`, data: null });
        else {
            bcrypt_1.default.compare(req.body.loginPassword, user.password, (err, pass) => {
                if (err || pass == false) {
                    res.status(404).json({ error: "Incorrect password", data: null });
                }
                else {
                    const token = jsonwebtoken_1.default.sign({ email: user.email, userid: user._id }, process.env.JWT_TOKEN, {
                        expiresIn: '72h',
                    });
                    res.status(201).json({ error: null, data: { userData: user, token: token } });
                }
            });
        }
    }
    catch (err) {
        res.status(500).json({ error: err.message, data: null });
    }
}));
router.patch('/editprofile/:userid', auth_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedUser = {};
        for (let item of req.body) {
            updatedUser[item.method] = item.value;
        }
        const updatedValue = yield users_1.default.updateOne({ _id: req.params.userid }, { $set: updatedUser });
        if (updatedValue.n === 1)
            res.status(201).json({ error: null, data: { userData: updatedValue } });
        else
            res.status(500).json({ error: 'User data not updated', data: null });
    }
    catch (err) {
        res.status(500).json({ error: err.message, data: null });
    }
}));
exports.default = module.exports = router;
//# sourceMappingURL=user.js.map