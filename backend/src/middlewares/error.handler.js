const httpStatus = require("http-status");

module.exports = (error, req, res, next) => {
    const statusCode =
        error.statusCode ? httpStatus.BAD_REQUEST
            : httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];

    const response = {
        code: statusCode,
        message,
    };

    console.error(error)

    res.status(statusCode).send(response);
}