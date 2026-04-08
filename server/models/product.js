const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  oldPrice: { type: Number, required: true },
  price: { type: Number, required: true, default: 0 },
  discount: { type: Number, default: 0, min: 0, max: 100 },
  image: {
    url: { type: String, required: true },
    filename: { type: String, required: true },
  },
  category: { type: String, required: true },
  brand: { type: String, required: true },
  isAvailable: { type: Boolean, default: true },
});
const product = mongoose.model("product", productSchema);
module.exports = product;
