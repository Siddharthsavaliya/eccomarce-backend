const AppError = require('../appError');

const errorHandler = (error, req, res, next) => {

    if (error instanceof AppError) {
        return res.status(error.statusCode).json({ status: "Failed", message: error.message });
    }
    return res.status(400).send({ status: "Failed", message: error.message });
}

module.exports = errorHandler;
