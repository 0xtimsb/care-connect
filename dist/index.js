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
const vitals_1 = __importDefault(require("./models/vitals"));
const path_1 = __importDefault(require("path"));
const app = express_1.default();
const httpserver = require('http').createServer(app);
const PORT = process.env.PORT || 8080;
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
if (process.env.NODE_ENV === 'production') {
    app.use(express_1.default.static('client/build'));
    app.get("/", (_, res) => {
        res.sendFile(path_1.default.resolve(__dirname, "../client", "build", "index.html"));
    });
    app.get("/signup", (_, res) => {
        res.sendFile(path_1.default.resolve(__dirname, "../client", "build", "index.html"));
    });
    app.get("/login", (_, res) => {
        res.sendFile(path_1.default.resolve(__dirname, "../client", "build", "index.html"));
    });
}
const io = socket_io_1.default(httpserver);
const userSocket = io.of('/');
userSocket.on('connection', (socket) => {
    console.log('Connected');
    sendData(socket);
});
const sendData = (socket) => __awaiter(void 0, void 0, void 0, function* () {
    const rand = (yield Math.floor(Math.random() * (1900 - 10))) + 10;
    const vitals = yield vitals_1.default.find().skip(rand).limit(10);
    socket.emit('data', vitals);
    setTimeout(() => {
        sendData(socket);
    }, 10000);
});
app.use(user_1.default);
app.use((_req, res, _next) => {
    const err = new Error('Invalid route');
    res.json({
        error: {
            message: err.message,
        },
    });
});
httpserver.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connect(process.env.MONGO_URI ||
        `mongodb+srv://aadi:${process.env.MONGO_PWD}@cluster0.b7dxw.mongodb.net/careconnect?retryWrites=true&w=majority`, { useUnifiedTopology: true, useNewUrlParser: true });
    console.log('Connected to Database');
    console.log(`Listening at PORT ${PORT}`);
}));
//# sourceMappingURL=index.js.map