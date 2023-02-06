const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, { cors: { origin: "http://127.0.0.1:5500" } });

let rooms = {}

io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on('join room', (gameId) => {
        if (!rooms[gameId]) {
            rooms[gameId] = [];
        }
        if (rooms[gameId].length < 2) {
            const playerNum = rooms[gameId].length + 1;
            rooms[gameId].push(socket.id);
            socket.join(gameId);
            socket.emit('assign player', playerNum);
            console.log(`User joined game ${gameId} as player ${playerNum}: ${socket.id}`);
        } else {
            socket.emit('game full');
            console.log(`Game ${gameId} is full`);
        }
    });

    socket.on('private message', (data) => {
        console.log(data)
        const room = rooms[data.room];
        const connectedUsers = io.sockets.adapter.rooms.get(111)
        io.to(data.room).emit('private message', data);
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