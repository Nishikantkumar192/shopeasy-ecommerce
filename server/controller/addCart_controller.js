const { default: mongoose } = require("mongoose");
const Cart = require("../models/cart.js");
const { wrapAsync } = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
module.exports.addToCart = wrapAsync(async (req, res) => {
  const  {userId,loginUser} = req.user;
  const { id } = req.params;  
  const generalId="69d73ec612513e8ba5bd5bed";
  let existingItem = null;
  if (loginUser === "user") {
      existingItem = await Cart.findOne({
      relatedUser: userId,
      relatedProduct: id,
    });
  }else {
    existingItem = await Cart.findOne({
      guestId: userId,
      relatedProduct: id,
    });
  }
  if (existingItem) {
    existingItem.quantity += 1;
    await existingItem.save();
  } else if(loginUser==="user"){
    await Cart.create({
      relatedUser: userId,
      guestId:generalId,
      relatedProduct: id,
    });
  }else {
    await Cart.create({
      relatedUser:generalId,
      guestId: userId,
      relatedProduct: id,
    });
  }
  return res.json({ success: true, message: "Successfully Added" });
});
module.exports.getCartItems = wrapAsync(async (req, res) => {
  const {userId,loginUser}= req.user;
  if (loginUser === "user") {
    const products = await Cart.find({ relatedUser: userId }).populate(
      "relatedProduct",
    );
    return res.json(products);
  } else {
      const guestCartProducts = await Cart.find({ guestId: userId }).populate("relatedProduct");
    return res.json(guestCartProducts);
  }
});
module.exports.cartRemove = wrapAsync(async (req, res, next) => {
  const {userId,loginUser} = req.user;
  const {id} = req.params;
  let getItem=null;
  if(loginUser==="user"){
    getItem = await Cart.findOne({
    relatedProduct: new mongoose.Types.ObjectId(id),
    relatedUser: new mongoose.Types.ObjectId(userId),
  });
}else{
  
}
  console.log(getItem); 
  if(getItem.relatedUser!=userId) return next(new ExpressError(403,"Permission Denied"));

  const removedCartItem = await Cart.findOneAndDelete({
    relatedProduct: new mongoose.Types.ObjectId(id),
    relatedUser: new mongoose.Types.ObjectId(userId),
  });
  if (!removedCartItem) return next(new ExpressError(400, "Item not found"));
  return res.json({
    success: true,
    message: "successfully Removed",
    removedCartItem,
  });
});
