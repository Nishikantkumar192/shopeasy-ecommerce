const Razorpay = require("razorpay");
const crypto = require("crypto");
const { wrapAsync } = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Order=require("../models/orders.js");
const razorpay = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET,
});

module.exports.orderCreation = wrapAsync(async (req, res, next) => {
  const { amount,products } = req.body;
  const userId=req.user.id;
  const options = {
    amount: amount * 100,
    currency: "INR",
    receipt: "receipt_" + Date.now(),
  };
    const razorpayOrder = await razorpay.orders.create(options);
    // const order=await Order.create({
    //   amount,
    //   userId,
    //   products,
    //   paymentStatus
    // });
    return res.json({
      success: true,
      message: "Order sreated successfully",
      razorpayOrder,
    });
    return next(new ExpressError(500, err));
});

module.exports.verifyPayment = wrapAsync(async (req, res, next) => {
  const { orderId, paymentId, signature } = req.body;
  const sign = orderId + "|" + paymentId;

  const expectedSign = crypto
    .createHmac("sha256", process.env.KEY_SECRET)
    .update(sign)
    .digest("hex");

    if(expectedSign===signature){
        return res.json({success:true,message:"payment verified"});
    }else{
        return next(new ExpressError(400,"Invalid Signature"));
    }
});
