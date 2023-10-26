const mongoose = require('mongoose');
const { Schema } = mongoose;

const productInCartSchema = new Schema({
    product: {
        type: mongoose.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    count: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    }
});

const cartSchema = new Schema({
    _id: mongoose.Types.ObjectId,
    _userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [productInCartSchema],
    cartTotal: {
        type: Number,
        default: 0,
    }
});

exports.Cart = mongoose.model('Cart', cartSchema);
