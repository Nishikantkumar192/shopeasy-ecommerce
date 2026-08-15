const { default: mongoose } = require("mongoose");
const Cart = require("../models/cart.js");
const { wrapAsync } = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const User = require("../models/user.js");
module.exports.addToCart = wrapAsync(async (req, res) => {
  const { userId, loginUser } = req.user;
  const { id } = req.params;
  const generalId = "69d73ec612513e8ba5bd5bed";
  let existingItem = null;
  if (loginUser === "user") {
    existingItem = await Cart.findOne({
      relatedUser: new mongoose.Types.ObjectId(userId),
      relatedProduct: new mongoose.Types.ObjectId(id),
    });
  } else {
    existingItem = await Cart.findOne({
      guestId: userId,
      relatedProduct: new mongoose.Types.ObjectId(id),
    });
  }
  if (existingItem) {
    existingItem.quantity += 1;
    await existingItem.save();
  } else if (loginUser === "user") {
    await Cart.create({
      relatedUser: new mongoose.Types.ObjectId(userId),
      guestId: generalId,
      relatedProduct: new mongoose.Types.ObjectId(id),
    });
  } else {
    await Cart.create({
      relatedUser: generalId,
      guestId: userId,
      relatedProduct: new mongoose.Types.ObjectId(id),
    });
  }
  const cartItems=await Cart.find({relatedUser:new mongoose.Types.ObjectId(userId)});
  return res.json({ success: true, message: "Successfully Added",cartItems });
});
module.exports.getCartItems = wrapAsync(async (req, res) => {
  const { userId, loginUser } = req.user;
  if (loginUser === "user") {
    const products = await Cart.find({
      relatedUser: new mongoose.Types.ObjectId(userId),
    }).populate("relatedProduct");
    return res.json(products);
  } else {
    const guestCartProducts = await Cart.find({ guestId: userId }).populate(
      "relatedProduct",
    );
    return res.json(guestCartProducts);
  }
});
module.exports.cartRemove = wrapAsync(async (req, res, next) => {
  const { userId, loginUser } = req.user;
  const { id } = req.params;
  let getItem = null;
  if (loginUser === "user") {
    getItem = await Cart.findOne({
      relatedUser: new mongoose.Types.ObjectId(userId),
      relatedProduct: new mongoose.Types.ObjectId(id),
    });
  } else {
    getItem = await Cart.findOne({
      guestId: userId,
      relatedProduct: new mongoose.Types.ObjectId(id),
    });
  }
  if (!getItem) return next(new ExpressError(404, "UnAvailable product"));
  if (loginUser === "user" && !getItem.relatedUser.equals(userId))
    return next(new ExpressError(403, "Permission Denied"));
  else if (loginUser === "Guest" && getItem.guestId != userId)
    return next(new ExpressError(403, "Permission Denied"));
  let removedCartItem = null;
  if (loginUser === "user") {
    removedCartItem = await Cart.findOneAndDelete({
      relatedUser: new mongoose.Types.ObjectId(userId),
      relatedProduct: new mongoose.Types.ObjectId(id),
    });
  } else {
    removedCartItem = await Cart.findOneAndDelete({
      guestId: userId,
      relatedProduct: new mongoose.Types.ObjectId(id),
    });
  }
  const products = await Cart.find({
    relatedUser: new mongoose.Types.ObjectId(userId),
  }).populate("relatedProduct");
  return res.json(products);
  return res.json({
    success: true,
    message: "successfully Removed",
    products,
  });
});
