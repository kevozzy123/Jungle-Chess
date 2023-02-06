import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";

const socket = io('http://localhost:3000')


var form = document.getElementById('form');
var input = document.getElementById('input');

form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (input.value) {
        console.log(33333)
        socket.emit('private message', { room, 'message': 'message' });
        input.value = '';
    }
});

let room = 111

// socket.on('chat message', function (msg) {
//     var item = document.createElement('li');
//     item.textContent = msg;
//     messages.appendChild(item);
//     window.scrollTo(0, document.body.scrollHeight);
//     socket.emit('private message', { room, message });
// })

socket.on('connect', () => {
    console.log('Connected to server');

    socket.emit('join room', room);

    socket.on('private message', (data) => {
        console.log(data)
        // console.log(`Private message from ${data.from}: ${data.message}`);
    });
});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});


const sendMessage = (message) => {
    socket.emit('private message', { room, message });
};

