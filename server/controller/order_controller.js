const { wrapAsync } = require("../utils/wrapAsync");
const Orders=require("../models/orders.js");
const ExpressError = require("../utils/ExpressError");
const Order = require("../models/orders.js");
module.exports.fetchOrders=wrapAsync(async(req,res,next)=>{
    const orders=await Orders.find().populate("relatedUser");
    if(!orders) return next(new ExpressError(404,"Orders are unavailable"));
    return res.json({success:true,orders});
});
module.exports.specificOrderDetails=wrapAsync(async(req,res,next)=>{
    const {id}=req.params;
    const orderDetails=await Order.findById(id);
    if(!orderDetails) return next(new ExpressError(404,"Order doesn't exist"));
    return res.json({status:true,orderDetails});
})