const Product = require("../models/product.js");
const User = require("../models/user.js");
const ExpressError = require("../utils/ExpressError.js");
const { wrapAsync } = require("../utils/wrapAsync.js");

module.exports.newItem = wrapAsync(async (req, res,next) => {
  if(!req.file) return next(new ExpressError(400,"Image is required"));
  const url = req.file.path;
  const filename = req.file.filename;
  const product = {
    ...req.body,
    image: { url, filename },
  };
  const newItem = await Product.create(product);
  await newItem.save();
  return res.json({ success: true, message: "product added successfully",newItem });
});

module.exports.getProducts = wrapAsync(async (req, res, next) => {
  const allProduct = await Product.find();
  if (!allProduct) {
    return next(new ExpressError(404, "No products available"));
  }
  return res.json(allProduct);
});

module.exports.getItemDetails = wrapAsync(async (req, res, next) => {
  const { id } = req.params;
  const item = await Product.findById(id);
  if (!item) {
    return next(new ExpressError(404, "UnAvailable Product"));
  }
  return res.json({ success: true, message: "information fetch", item });
});

module.exports.updateItemInformation = wrapAsync(async (req, res, next) => {
  const { id } = req.params;
  const {userId}=req.user;
  const item = await Product.findById(id);
  if (!item) {
    return next(new ExpressError(404, "UnAvailable product"));
  }
  const user=await User.findById(userId);
  if(!user) return next(new ExpressError(400,"user doesn't exist"));
  if(user.role!=="admin") return next(new ExpressError(403,"Permission denied"));
  //check if the details come from the body then update them otherwise remains other unchanged.
  if(req.file){
    item.image.url=req.file.path;
    item.image.filename=req.file.filename;
  }
  const updatedItem=Object.assign(item, req.body);
  item.save();
  return res.json({ success: true, message: "updated successfull", updatedItem });
});

module.exports.deleteItem = wrapAsync(async (req, res, next) => {
  const { id } = req.params;
  const item = await Product.findById(id);
  if (!item) {
    return next(new ExpressError(404, "UnAvailable Item"));
  }
  await Product.findByIdAndDelete(id);
  return res.json({ success: true, message: "Item Deleted Successfully" });
});

module.exports.getDetail=wrapAsync(async(req,res,next)=>{
  const {id}=req.params;
  const product=await Product.findById(id);
  if(!product) return next(new ExpressError(404,"Not a valid Search"));
  return res.json({success:true,product});
})

module.exports.filterProducts=wrapAsync(async(req,res,next)=>{
  const {search}=req.query;
  // console.log(req.query);
  // we will use {search} because req.query has { search:query };
  if(!search?.trim()) return next(new ExpressError(400,"Search is required"));
  const searchProducts=await Product.find({
  $or: [
    { name: { $regex: search, $options: "i" } },
    { category: { $regex: search, $options: "i" } },
    { brand: { $regex: search, $options: "i" } },
    { description: { $regex: search, $options: "i" } },
  ],
});
  return res.json(searchProducts);
})
module.exports.removeProduct=wrapAsync(async(req,res,next)=>{
  const {userId,loginUser}=req.user;
  const user=await User.findById(userId);
  if(loginUser==="user" && user.role!=="admin") return next(new ExpressError(403,"Permission denied"));
  const collections=req.body;
  await Product.deleteMany({
    _id: { $in: collections }
  });
  const remainProduct=await Product.find();
  return res.json({success:true,message:"Deleted successfully",remainProduct});
})