const model = require("../model/cart");
const token = require('../configuration/token');
const mongoose = require('mongoose');
const { Product } = require("../model/product");
CartModel = model.Cart;

exports.addToCart = async (req, res) => {
    try {
        const jwtToken = token.extractJWTFromRequest(req);
        const jwtInfo = token.extractJWTDetails(jwtToken);
        const existingCart = await CartModel.findOne({ _userId: jwtInfo.ID });

        if (existingCart) {
            req.body.products.map(product => (
                existingCart.products.push({
                    product: product.productId,
                    count: product.count,
                    totalPrice: product.totalPrice
                })));
            existingCart.cartTotal = existingCart.products.reduce((total, product) => {
                return total + product.totalPrice;
            }, 0);

            await existingCart.save();

            return res.status(201).send({
                status: "success",
                message: "product added in the cart successfully",
            });
        } else {
            const newCart = new CartModel({
                _id: new mongoose.Types.ObjectId(),
                _userId: jwtInfo.ID,
                products: req.body.products.map(product => ({
                    product: product.productId,
                    count: product.count,
                    totalPrice: product.totalPrice
                })),
            });

            await newCart.save();
        }

        return res.status(201).send({
            status: "success",
            message: "product added in the cart successfully",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            status: "Failed",
            message: "internal error",
            error: error
        });
    }



};

exports.editToCart = async (req, res) => {
    try {
        const jwtToken = token.extractJWTFromRequest(req);
        const jwtInfo = token.extractJWTDetails(jwtToken);
        const productId = req.params.id;
        const cart = await CartModel.findOne({ _userId: jwtInfo.ID });

        if (!cart) {
            return res.status(404).send({
                status: "Failed",
                message: "Cart not found",
            });
        }
        const cartProductIndex = cart.products.findIndex((cartProduct) => cartProduct._id.toString() === productId);
        if (cartProductIndex === -1) {
            return res.status(404).json({
                status: "Failed",
                message: "product not found in cart",
            });

        }
        cart.products[cartProductIndex].product = req.body.product || cart.products[cartProductIndex].product;
        cart.products[cartProductIndex].count = req.body.count || cart.products[cartProductIndex].count;
        cart.products[cartProductIndex].totalPrice = req.body.totalPrice || cart.products[cartProductIndex].totalPrice;

        await cart.save();
        return res.status(201).send({
            status: "success",
            message: "cart updated successfully",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            status: "Failed",
            message: "internal error",
            error: error
        });
    }
}
exports.deleteToCart = async (req, res) => {
    try {
        const jwtToken = token.extractJWTFromRequest(req);
        const jwtInfo = token.extractJWTDetails(jwtToken);
        const productId = req.params.id;
        const cart = await CartModel.findOne({ _userId: jwtInfo.ID });

        if (!cart) {
            return res.status(404).send({
                status: "Failed",
                message: "Cart not found",
            });
        }
        const cartProductIndex = cart.products.findIndex((cartProduct) => cartProduct._id.toString() === productId);
        if (cartProductIndex === -1) {
            return res.status(404).json({
                status: "Failed",
                message: "product not found in cart",
            });

        }
        cart.products.splice(cartProductIndex, 1);
        await cart.save();
        return res.status(201).send({
            status: "success",
            message: "Product deleted successfully",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            status: "Failed",
            message: "internal error",
            error: error
        });
    }
}
exports.getCart = async (req, res) => {
    try {
        const jwtToken = token.extractJWTFromRequest(req);
        const jwtInfo = token.extractJWTDetails(jwtToken);
        const productId = req.params.id;
        const cart = await CartModel.findOne({ _userId: jwtInfo.ID }).populate('products.product').select('-_id').select('-_userId').exec();

        if (!cart) {
            return res.status(404).send({
                status: "Failed",
                message: "Cart not found",
            });
        }
        await cart.save();
        return res.status(201).send({
            status: "success",
            message: "Cart fetched successfully",
            data: cart
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            status: "Failed",
            message: "internal error",
            error: error
        });
    }
}