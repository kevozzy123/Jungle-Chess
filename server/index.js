const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, { cors: { origin: "http://127.0.0.1:5500" } });

let rooms = {}

io.on('connection', (socket) => {


    socket.on('join room', async (gameId, user) => {
        socket.isReady = false
        socket.num = null
        socket.username = user
        if (!rooms[gameId]) {
            rooms[gameId] = [];
        }
        if (rooms[gameId].length < 2) {
            socket.join(gameId)
            rooms[gameId].push(socket.id);
            socket.join(gameId);
            socket.num = rooms[gameId].length

            const sockets = await io.fetchSockets();
            const playerNum = sockets.find(item => item.playerNum === 1) ? 2 : 1;
            let players = []
            sockets.forEach(item => {
                players.push({
                    playerNum: playerNum,
                    username: item.username,
                    id: item.id
                })
            })
            io.in(gameId).emit('player join', {
                players,
                msg: 'Lobby joined!',
                playerId: socket.id
            });
            console.log(`${user} joined game ${gameId} as player ${playerNum}: ${socket.id}`);
        } else {
            socket.emit('player join', { msg: 'Lobby is full' });
        }

        io.to(gameId).emit("roomUsers", {
            room: gameId,
            users: io.sockets.adapter.rooms.get(gameId),
        });
    });

    socket.on('ready', async (aa) => {
        console.log('ready', aa)
        // const sockets = await io.fetchSockets();
        // const i = sockets.findIndex(item => item.id === socketId)
        // console.log(i)
        // console.log('before? ', sockets[i].isReady)
        // sockets[i].isReady = isReady
        // console.log('after? ', sockets[i].isReady)
        // // const sockets = await io.fetchSockets();
        // // sockets.find()
        // io.in(gameId).emit('ready-state', 'sockets')
    })

    socket.on('private message', (data) => {
        // const connectedUsers = io.sockets.adapter.rooms.get(gameId)
        // console.log(connectedUsers)
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