const Cart = require("../models/cart.js");
const { wrapAsync } = require("../utils/wrapAsync.js");
module.exports.addToCart = wrapAsync(async (req, res) => {
  const { userId } = req.body;
  const { product_id } = req.params;
  const existingItem = await Cart.findOne({
    relatedUser: userId,
    relatedProduct: product_id,
  });
  if (existingItem) {
    existingItem.quantity += 1;
    await existingItem.save();
  } else {
    await Cart.create({
      relatedUser: userId,
      relatedProduct: product_id,
    });
  }
  return res.json({ success: true, message: "Successfully Added" });
});
