const express=require("express");
const { fetchOrders, specificOrderDetails } = require("../controller/order_controller");
const router=express.Router();

router.get("/fetchOrders",fetchOrders);
router.post("/specificOrderDetails/:id",specificOrderDetails);
module.exports=router;