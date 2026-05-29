const Razorpay = require("razorpay");
const crypto = require("crypto");
const { wrapAsync } = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Order=require("../models/orders.js");
const { default: mongoose } = require("mongoose");
const razorpay = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET,
});

module.exports.orderCreation = wrapAsync(async (req, res, next) => {
  const { amount,products} = req.body;
  const userId=req.user.id;
  const options = {
    amount: amount * 100,
    currency: "INR",
    receipt: "receipt_" + Date.now(),
  };
    const razorpayOrder = await razorpay.orders.create(options);
    const order=await Order.create({
      amount:razorpayOrder.amount/100,
      relatedUser:userId,
      products:products,
      orderId:razorpayOrder.id,
    });
    return res.json({
      success: true,
      message: "Order created successfully",
      order,
    });
});

module.exports.verifyPayment = wrapAsync(async (req, res, next) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  const userId=req.user.id;
  if(!razorpay_order_id && !razorpay_payment_id && !razorpay_signature) return next(new ExpressError(400,"Missing payment details"));
  const userOrderDetails=await Order.findOne({
    relatedUser:new mongoose.Types.ObjectId(userId),
    orderId:razorpay_order_id,
  });

  if(!userOrderDetails) return next(new ExpressError(400,"Order not found"));
  const sign = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSign = crypto
    .createHmac("sha256", process.env.KEY_SECRET)
    .update(sign)
    .digest("hex");

    if(expectedSign===razorpay_signature){
        userOrderDetails.paymentStatus="completed";
        await userOrderDetails.save();
        return res.json({success:true,message:"payment verified"});
    }else{
        return next(new ExpressError(400,"Invalid Signature"));
    }
});
