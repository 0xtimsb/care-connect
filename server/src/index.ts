import express from 'express';
import userRouter from './routes/user';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import socketio, { Socket } from 'socket.io'
import sockRouter from './routes/sock'
const app = express();
const httpserver = require('http').createServer(app);



// Adding user globally to express.Request
declare global {
  namespace Express {
    interface Request {
      user: string | object;
    }
  }
}

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CORS Handling
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method == 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT,POST,DELETE,PATCH');
    return res.status(200).json({});
  }
  next();
  return;
});

const io = socketio(httpserver)

const userSocket = io.of('/user')
userSocket.on('connection', (socket:Socket)=> {
  sendData(socket)
})

// User Route
app.use(userRouter);

// Socket Route
app.use(sockRouter)

// Error handling
app.use((_req, res, _next) => {
  const err: Error = new Error('Invalid route');
  res.json({
    error: {
      message: err.message,
    },
  });
});

// Listening to PORT and Connecting to Data Base
httpserver.listen(4000, async () => {
  await mongoose.connect(
    `mongodb+srv://aadi:${process.env.MONGO_PWD}@cluster0.b7dxw.mongodb.net/careconnect?retryWrites=true&w=majority`,
    { useUnifiedTopology: true, useNewUrlParser: true }
    );
    console.log('Connected to Database');
    console.log('Listening at PORT 4000');
  });
  
  const sendData = (socket:Socket) => {
    socket.emit('data', Array.from({length: 8}, () => Math.floor(Math.random() * 590) + 10))
    setTimeout(() => {
      sendData(socket)
    },1000)
  }
