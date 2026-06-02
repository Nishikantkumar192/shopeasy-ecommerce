const { wrapAsync } = require("../utils/wrapAsync");
const Orders=require("../models/orders.js");
const ExpressError = require("../utils/ExpressError");
module.exports.fetchOrders=wrapAsync(async(req,res,next)=>{
    const orders=await Orders.find().populate("relatedUser");
    if(!orders) return next(new ExpressError(404,"Orders are unavailable"));
    return res.json({success:true,orders});
});