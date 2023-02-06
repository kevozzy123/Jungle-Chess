const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, { cors: { origin: "http://127.0.0.1:5500" } });

let rooms = {}

io.on('connection', (socket) => {
    socket.username = user
    socket.isReady = false
    socket.num = null

    socket.on('join room', async (gameId, user) => {
        if (!rooms[gameId]) {
            rooms[gameId] = [];
        }
        if (rooms[gameId].length < 2) {
            socket.join('111')
            const playerNum = rooms[gameId].length + 1;
            rooms[gameId].push(socket.id);
            socket.join(gameId);
            socket.emit('player join', { playerNum, username: user, msg: 'Lobby joined!' });
            console.log(`${user} joined game ${gameId} as player ${playerNum}: ${socket.id}`);
        } else {
            socket.emit('player join', { msg: 'Lobby is full' });
        }

        io.to('111').emit("roomUsers", {
            room: gameId,
            users: io.sockets.adapter.rooms.get('111'),
        });
        const sockets = await io.fetchSockets();
        sockets.forEach(item => {
            console.log('userinfo: ', item.username, item.isReady)
        })

    });

    socket.on('ready', (status) => {
        console.log(status)
        socket.isReady = status

        io.in('111').emit('ready-state', status)
    })

    socket.on('private message', (data) => {
        const connectedUsers = io.sockets.adapter.rooms.get('111')
        console.log(connectedUsers)
        io.emit('res', data);
        // socket.broadcast.to(data.room).emit('res', data);
        // if (room) {
        //     room.forEach(async (id) => {
        //         console.log('foreach', id)

        //         console.log(connectedUsers)
        //         // if (connectedUsers[id]) {
        //         //     console.log('emiting id')
        //         //     io.sockets.connected[id].emit('private message', {
        //         //         from: socket.id,
        //         //         message: data.message,
        //         //     });
        //         // } else {
        //         //     console.log(`User ${id} is offline`);
        //         // }
        //     });
        // }
    });

    socket.on('making move', (board) => {

    })

    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
        Object.values(rooms).forEach((room) => {
            const index = room.indexOf(socket.id);
            if (index !== -1) {
                room.splice(index, 1);
            }
        });
    });
});

server.listen(3000, () => {
    console.log('listening on:3000');
});