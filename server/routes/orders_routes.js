const express=require("express");
const { fetchOrders } = require("../controller/order_controller");
const router=express.Router();

router.get("/fetchOrders",fetchOrders);
module.exports=router;