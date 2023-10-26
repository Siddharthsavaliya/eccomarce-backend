const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config()
const database = require("./configuration/databaseConfig");
const bodyParser = require('body-parser');
const corsOptions = {
    exposedHeaders: 'Authorization',
};
const cors = require('cors');

// middleware
app.use(bodyParser.json());
app.use(express.json());


/// Routes
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const productRouter = require('./routes/product');
const cartRouter = require('./routes/cart');


app.use('/api/auth', authRouter.routes)
app.use('/api', userRouter.routes)
app.use('/api', productRouter.routes)
app.use('/api/cart', cartRouter.routes)



database()
    .then(() => console.log("Database connected"))
    .catch(() => console.log("Database connection failed"));

app.listen(8800, () => console.log('server started'))   