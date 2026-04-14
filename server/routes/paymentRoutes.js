const express=require("express");
const { orderCreation, verifyPayment } = require("../controller/payment_controller");
const router=express.Router();

router.post("/create-order",orderCreation);
router.post("/verifyPayment",verifyPayment);
module.exports=router;