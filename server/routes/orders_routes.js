const express=require("express");
const { fetchOrders, specificOrderDetails, fetching_my_orders, removeHistoryForUser } = require("../controller/order_controller");
const { isUserExist } = require("../middleware");
const router=express.Router();

router.get("/fetching-my-orders",isUserExist,fetching_my_orders);
router.get("/fetchOrders",fetchOrders);
router.post("/specificOrderDetails/:id",specificOrderDetails);
router.get("/remove-order-history-for-user/:id",removeHistoryForUser);
module.exports=router;