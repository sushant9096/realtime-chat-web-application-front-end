const {Server} = require("socket.io");
const SocketIO = (exServer) => new Server(exServer);

module.exports = SocketIO;