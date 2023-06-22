const errorHandler = require('./error.handler');
const authMiddleware = require('./auth.middleware');

module.exports = {
    errorHandler,
    authMiddleware
}