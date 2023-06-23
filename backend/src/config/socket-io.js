const {Server} = require("socket.io");

class SocketIO {
  static io;

  static init(exServer) {
    SocketIO.io = new Server(exServer, {
      cors: {
        origin: "*",
      }
    })
  };
}

module.exports = SocketIO;