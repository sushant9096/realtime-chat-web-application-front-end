const {Server} = require("socket.io");
class SocketIO {
    static io;

    static init(exServer) {
        SocketIO.io = new Server(exServer)
    };
}

module.exports = SocketIO;