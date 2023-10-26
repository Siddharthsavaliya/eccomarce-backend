const { Product } = require("../model/product")
const token = require('../configuration/token')
exports.createProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        const jwtToken = token.extractJWTFromRequest(req);
        const jwtInfo = token.extractJWTDetails(jwtToken);
        if (jwtInfo.type !== "Admin" || jwtInfo.type !== "Vender") {
            return res.status(401).json({
                status: "Failed",
                message: "You are not allowed to create a new product",
            });
        }
        console.log(product)
        await product.save()
        return res.status(201).send({
            status: "status",
            message: "Product added successfully",
        });
    } catch (error) {
        console.log("create product error: " + error);
        return res.status(500).send({
            status: "Failedaaaaaaaa",
            message: "Internal error occurred",
            error: error
        });
    }
};
exports.updateStatus = async (req, res) => {
    try {
        const productId = req.params.id;
        const status = req.body.status;

        if (!status) {
            return res.status(400).json({
                status: "Failed",
                message: "Status not found in the request body",
            });
        }

        if (!productId) {
            return res.status(400).json({
                status: "Failed",
                message: "Product Id not found in the request parameters",
            });
        }

        const jwtToken = token.extractJWTFromRequest(req);
        const jwtInfo = token.extractJWTDetails(jwtToken);

        if (jwtInfo.type !== "Admin") {
            return res.status(401).json({
                status: "Failed",
                message: "You are not allowed to update status",
            });
        }

        const product = await Product.findOne({ _id: productId });

        if (!product) {
            return res.status(404).json({
                status: "Failed",
                message: "Product does not exist",
            });
        }

        product.status = status;

        await product.save();

        return res.status(200).json({
            status: "Success",
            message: "Product Status updated successfully",
        });
    } catch (error) {
        console.error("Update product status error: " + error);
        return res.status(500).json({
            status: "Failed",
            message: "Internal error occurred",
            error: error.message
        });
    }
};

exports.getAllProduct = async (req, res) => {
    try {
        let query = Product.find().select('-__v'); // Initialize the query

        if (req.query.category) {
            query = query.find({ category: req.query.category });
        }
        if (req.query._sort && req.query._order) {
            query = query.sort({ [req.query._sort]: req.query._order });
        }
        if (req.query._page && req.query._limit) {
            const pageSize = parseInt(req.query._limit);
            const page = parseInt(req.query._page);
            query = query.skip(pageSize * (page - 1)).limit(pageSize);
        }
        const docs = await query.exec(); // Execute the final query
        return res.status(200).send({
            status: "status",
            message: "Product Fetched successfully",
            data: docs
        });
    } catch (error) {
        console.log("Fetch all product error: " + error);
        return res.status(500).send({
            status: "Failed",
            message: "Internal error occurred",
            error: error
        });
    }
};