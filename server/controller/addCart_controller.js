const { default: mongoose } = require("mongoose");
const Cart = require("../models/cart.js");
const { wrapAsync } = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
module.exports.addToCart = wrapAsync(async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;
  const existingItem = await Cart.findOne({
    relatedUser: userId,
    relatedProduct: id,
  });
  if (existingItem) {
    existingItem.quantity += 1;
    await existingItem.save();
  } else {
    await Cart.create({
      relatedUser: userId,
      relatedProduct: id,
    });
  }
  return res.json({ success: true, message: "Successfully Added" });
});
module.exports.getCartItems = wrapAsync(async (req, res) => {
  const userId = req.user.id;
  const products = await Cart.find({ relatedUser: userId }).populate(
    "relatedProduct",
  );
  return res.json(products);
});
module.exports.cartRemove = wrapAsync(async (req, res,next) => {
  const userId = req.user.id;
  const id = req.params;

  const removedCartItem = await Cart.findOneAndDelete({
    relatedProduct: new mongoose.Types.ObjectId(id),
    relatedUser: new mongoose.Types.ObjectId(userId),
  });
  if(!removedCartItem) return next(new ExpressError(400,"Item not found"));
  return res.json({success:true,message:"successfully Removed",removedCartItem});
});
