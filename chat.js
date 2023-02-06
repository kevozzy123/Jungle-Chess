import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";

const socket = io('http://localhost:3000')


var form = document.getElementById('form');
var input = document.getElementById('input');
const button = document.querySelector('.ready-btn')
const roomInfo = document.querySelector('.room-info')
const playerOne = document.querySelector('.playerOne span')
const playerTwo = document.querySelector('.playerTwo span')

let isReady = false

button.addEventListener('click', () => {
    isReady = !isReady
    socket.emit('ready', isReady)
})

form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (input.value) {
        socket.emit('private message', { room: '111', 'message': input.value });
        input.value = '';
    }
});

let username = prompt('')
let room = 111

roomInfo.textContent = `this is room ${room}`

socket.on('connect', () => {
    console.log('Connected to server');

    socket.emit('join room', room, username);
});

socket.on('ready-state', readyState => {
    console.log(readyState)
})
socket.on('res', (data) => {
    console.log(data)
    // console.log(`Private message from ${data.from}: ${data.message}`);
});

socket.on('assign player', (user) => {
    console.log(user)
    if (user.playerNum === 1) {
        playerOne.textContent = user.username
    } else {
        playerTwo.textContent = user.username
    }
})

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});


const sendMessage = (message) => {
    socket.emit('private message', { room, message });
};

