const express=require("express");
const { addToCart } = require("../controller/addCart_controller");
const { isUserExist } = require("../middleware");
const router=express.Router();

router.get("/addToCart/:product_id",isUserExist,(addToCart));
module.exports=router;