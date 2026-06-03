const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    relatedUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref:"product",
          required: true
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    orderId:{
      type:String,
      required:true,
    },
    paymentStatus: {
      type: String,
      default: "pending",
    },
    orderStatus:{
      type:String,
      default:"Placed",
    }
  },
  { timestamps: true },
);
const order = mongoose.model("order", orderSchema);
module.exports = order;
