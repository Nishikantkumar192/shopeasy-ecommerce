const Cart = require("../models/cart.js");
const { wrapAsync } = require("../utils/wrapAsync.js");
module.exports.addToCart = wrapAsync(async (req, res) => {
  const userId=req.user.id;
  const {id} = req.params;
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
  return res.json({ success: true, message: "Successfully Added", });
});
module.exports.getCartItems=wrapAsync(async(req,res)=>{
  const userId=req.user.id;
  const products=await Cart.find({relatedUser:userId}).populate("relatedProduct"); 
  return res.json(products);
})
