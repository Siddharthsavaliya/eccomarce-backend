const mongoose = require("mongoose");

const connect = async () => {
    await mongoose.connect(process.env.DATABASE);
}

module.exports = connect;