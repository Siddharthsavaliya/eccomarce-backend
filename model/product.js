const mongoose = require('mongoose');
const { Schema } = mongoose;
const validCategories = ["Phone", "Tab", "Laptop"];
const productSchema = new Schema({
    title: { type: String, required: true, unique: [true, "title must be unique"] },
    category: { type: String, required: true, enum: validCategories },
    description: { type: String, required: true },
    price: { type: Number, min: [0, 'wrong min price'], required: true },
    status: { type: String, enum: ["Approved", "Rejected", "Initial"], message: "invalid status", default: "Initial", }
})
exports.Product = mongoose.model("Product", productSchema);