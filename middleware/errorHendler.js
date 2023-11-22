const errorHandler = (error, req, res, next) => {
    return res.status(400).send({ status: "Failed", message: error.message });
}

module.exports = errorHandler;
