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
const products_1 = __importDefault(require("./routes/products"));
const order_1 = __importDefault(require("./routes/order"));
const user_1 = __importDefault(require("./routes/user"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = express_1.default();
app.use(morgan_1.default('dev'));
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT,POST,DELETE,PATCH');
        return res.status(200).json({});
    }
    next();
    return;
});
app.use('/product', products_1.default);
app.use('/orders', order_1.default);
app.use('/images', express_1.default.static('images'));
app.use('/', user_1.default);
app.use((_req, res, _next) => {
    const err = new Error('Invalid route');
    res.json({
        error: {
            message: err.message,
        },
    });
});
app.listen(4000, () => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connect(`mongodb+srv://aadi:${process.env.MONGO_PWD}@cluster0.b7dxw.mongodb.net/careconnect?retryWrites=true&w=majority`, { useUnifiedTopology: true, useNewUrlParser: true });
    console.log('Connected to Database');
    console.log('Listening at PORT 4000');
}));
//# sourceMappingURL=index.js.map