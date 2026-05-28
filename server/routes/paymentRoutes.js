const express=require("express");
const { orderCreation, verifyPayment } = require("../controller/payment_controller");
const { isUserExist } = require("../middleware");
const router=express.Router();

router.post("/create-order",isUserExist,orderCreation);
router.post("/verifyPayment",isUserExist,verifyPayment);
module.exports=router;