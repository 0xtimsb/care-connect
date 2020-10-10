import io from 'socket.io-client';

const socket = io('http://localhost:4000/user');

socket.on('data', (res) => {
    console.log(res);
})