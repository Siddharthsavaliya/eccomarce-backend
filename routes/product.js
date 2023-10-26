const express = require('express');
const router = express.Router();
const productController = require('../controller/product');
const { validateToken } = require('../configuration/token');

router
    .post("/product/create", validateToken, productController.createProduct)
    .get("/product", validateToken, productController.getAllProduct)
    .put("/product/status/:id", validateToken, productController.updateStatus)


exports.routes = router;     