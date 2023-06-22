require('dotenv').config()
const { app } = require("./config");
const express = require('express');
const {sequelize} = require("./models");
const {createServer} = require("http");
const expressApp = express();
const {SocketIO} = require("./config");
const routes = require("./routes");
const {errorHandler, authMiddleware} = require("./middlewares");
const {participantDAO} = require("./dao");
const {auth} = require("./config/firebase-config");

// Express App Configs
expressApp.use(express.json())
expressApp.use('/', authMiddleware, routes);
expressApp.use(errorHandler) // Error Handler Middleware

const server = createServer(expressApp);

function initSocketIO() {
    SocketIO.init(server);
    SocketIO.io.use(async (socket, next) => {
        const token = socket.handshake.auth.token;
        if (!token) {
            console.log("Unauthorized")
            return next(new Error("Unauthorized"));
        }
        try {
            const {uid} = await auth.verifyIdToken(token);
            next();
        } catch (e) {
            // console.error(e);
            return next(new Error("Unauthorized"));
        }
        next();
    });
    SocketIO.io.on('connection', (socket) => {
        console.log('a user connected: ', socket.id);
        socket.on("setup", (userData) => {
            socket.join(userData.id);
            console.log(userData.name, "connected");
        });
        socket.on("join chat", (conversationID) => {
            socket.join(conversationID);
            console.log("User joined conversation: " + conversationID);
        });
        socket.on("new message", async (newMessage) => {
            const chatID = newMessage.conversationId;
            const participants = await participantDAO.findAllParticipants({where: {conversationId: chatID}});
            if (!participants) return console.log("participants not defined");

            participants.forEach((userId) => {
                if (userId === newMessage.senderId) return;
                socket.in(userId).emit("message received", newMessage);
            });
            socket.on("typing", (room) => {
                socket.in(room).emit("typing", {conversationId: room});
            });
            socket.on("stop typing", (room) => {
                socket.in(room).emit("stop typing", {conversationId: room});
            });
        });
        socket.off("setup", (userData) => {
            console.log("USER DISCONNECTED");
            socket.leave(userData.id);
        });
    });
}

sequelize.authenticate().then(() => {
    initSocketIO();
    console.log('DB Connected');
    server.listen(app.PORT, ()=> {
        console.log(`App Listening At: ${app.PORT}`)
    })
}).catch((err) => {
    console.error(`DB not connected due to:\n`, err)
});