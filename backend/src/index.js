require('dotenv').config()
const { app } = require("./config");
const express = require('express');
const {sequelize} = require("./models");
const {createServer} = require("http");
const expressApp = express();
const {SocketIO} = require("./config");
const routes = require("./routes");
const {errorHandler} = require("./middlewares");

// Express App Configs
expressApp.use(express.json())
expressApp.use('/', routes);
expressApp.use(errorHandler) // Error Handler Middleware

const server = createServer(expressApp);
SocketIO.init(server);
SocketIO.io.on('connection', (socket) => {
    console.log('a user connected: ', socket.id);
    socket.on("setup", (userData) => {
        socket.join(userData.id);
        console.log(userData.name, "connected");
    });
    socket.on("join chat", (room) => {
        socket.join(room);
        console.log("User joined room: " + room);
    });
    socket.on("new message", (newMessage) => {
        const chatID = newMessage.conversationId;
        const chat = {
            participants: [1,2]
        };
        if (!chat.participants) return console.log("chat.participants not defined");

        chat.participants.forEach((userId) => {
            if (userId === newMessage.senderId) return;
            socket.in(userId).emit("message received", newMessage);
        });
        socket.on("typing", (room) => {
            socket.in(room).emit("typing");
        });
        socket.on("stop typing", (room) => {
            socket.in(room).emit("stop typing");
        });
    });
    socket.off("setup", (userData) => {
        console.log("USER DISCONNECTED");
        socket.leave(userData.id);
    });
});

sequelize.authenticate().then(() => {
    console.log('DB Connected');
    server.listen(app.PORT, ()=> {
        console.log(`App Listening At: ${app.PORT}`)
    })
}).catch((err) => {
    console.error(`DB not connected due to:\n`, err)
});