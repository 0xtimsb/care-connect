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
const user_1 = __importDefault(require("./routes/user"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const socket_io_1 = __importDefault(require("socket.io"));
const sock_1 = __importDefault(require("./routes/sock"));
const app = express_1.default();
const httpserver = require('http').createServer(app);
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
const io = socket_io_1.default(httpserver);
const userSocket = io.of('/user');
userSocket.on('connection', (socket) => {
    console.log('Connected');
    sendData(socket);
});
app.use(user_1.default);
app.use(sock_1.default);
app.use((_req, res, _next) => {
    const err = new Error('Invalid route');
    res.json({
        error: {
            message: err.message,
        },
    });
});
httpserver.listen(4000, () => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connect(`mongodb+srv://aadi:${process.env.MONGO_PWD}@cluster0.b7dxw.mongodb.net/careconnect?retryWrites=true&w=majority`, { useUnifiedTopology: true, useNewUrlParser: true });
    console.log('Connected to Database');
    console.log('Listening at PORT 4000');
}));
const sendData = (socket) => {
    socket.emit('data', Array.from({ length: 8 }, () => Math.floor(Math.random() * 590) + 10));
    setTimeout(() => {
        sendData(socket);
    }, 1000);
};
//# sourceMappingURL=index.js.map