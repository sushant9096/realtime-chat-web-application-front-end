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
    socket.on('disconnect', () => {
        console.log('user disconnected');
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