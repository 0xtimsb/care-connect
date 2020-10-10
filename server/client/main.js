const socket = io('http://localhost:4000/')

socket.on('data', (res) => {
    console.log(res);
})