const Product = require("../models/product.js");
const ExpressError = require("../utils/ExpressError.js");
const { wrapAsync } = require("../utils/wrapAsync.js");

module.exports.newItem = wrapAsync(async (req, res) => {
  const url = req.file.path;
  const filename = req.file.filename;
  const product = {
    ...req.body,
    image: { url, filename },
  };
  const newItem = await Product.create(product);
  await newItem.save();
  return res.json({ success: true, message: "product added successfully" });
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
  const item = await Product.findById(id);
  if (!item) {
    return next(new ExpressError(404, "UnAvailable product"));
  }
  //check if the details come from the body then update them otherwise remains other unchanged.
  if(req.file){
    item.image.url=req.file.path;
    item.image.filename=req.file.filename;
  }
  const updatedItem=Object.assign(item, req.body);
  item.save();
  res.json({ success: true, message: "updated successfull", updatedItem });
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

module.exports.getDetail=wrapAsync(async(req,res)=>{
  const {id}=req.params;
  const product=await Product.findById(id);
  return res.json({success:true,product});
})

module.exports.filterProducts=wrapAsync(async(req,res)=>{
  const {search}=req.query;
  // console.log(req.query);
  // we will use {search} because req.query has { search:query };
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