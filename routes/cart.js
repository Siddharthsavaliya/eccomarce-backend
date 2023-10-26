const express = require('express');
const router = express.Router();
const cartController = require('../controller/cart');

router
    .post('/addtocart', cartController.addToCart)
    .put('/update/:id', cartController.editToCart)
    .delete('/delete/:id', cartController.deleteToCart)
    .get('/', cartController.getCart)


exports.routes = router;   