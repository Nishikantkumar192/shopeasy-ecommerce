const { wrapAsync } = require("../utils/wrapAsync");
const Orders=require("../models/orders.js");
const ExpressError = require("../utils/ExpressError");
const { default: mongoose } = require("mongoose");
module.exports.fetchOrders=wrapAsync(async(req,res,next)=>{
    const orders=await Orders.find().populate("relatedUser");
    if(!orders) return next(new ExpressError(404,"Orders are unavailable"));
    return res.json({success:true,orders});
});
module.exports.specificOrderDetails=wrapAsync(async(req,res,next)=>{
    const {id}=req.params;
    const orderDetails=await Orders.findById(id).populate("relatedUser").populate("products.productId");
    if(!orderDetails) return next(new ExpressError(404,"Order doesn't exist"));
    return res.json({status:true,orderDetails});
})
module.exports.fetching_my_orders=async(req,res)=>{
    const {userId}=req.user;
    const myOrders=await Orders.find({relatedUser:new mongoose.Types.ObjectId(userId)}).populate("products.productId");
    const filterOrders=myOrders.filter((order)=>order.hideForUser===false);
    return res.json({success:true,myOrders:filterOrders});
}
module.exports.removeHistoryForUser=async(req,res,next)=>{
    const {id}=req.params;
    const orderHistory=await Orders.findById(id);
    if(!orderHistory) return next(new ExpressError(400,"Page not found!"));
    orderHistory.hideForUser=true;
    orderHistory.save();
    return res.json({success:true,message:"Removed history",orderHistory});
}