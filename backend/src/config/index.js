const appConf = require('./app-config')
const dbConf = require('./db-config')
const CONVERSATION_TYPES = require('./conversation-types')
const firebase = require('./firebase-config')
const SocketIO = require('./socket-io')

module.exports = {
    app: appConf,
    db: dbConf,
    CONVERSATION_TYPES,
    firebase,
    SocketIO
}