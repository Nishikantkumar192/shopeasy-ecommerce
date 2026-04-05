const express=require("express");
const { addToCart, getCartItems } = require("../controller/addCart_controller");
const { isUserExist } = require("../middleware");
const router=express.Router();

router.get("/addToCart/:id",isUserExist,addToCart);
router.get("/cart-items",isUserExist,getCartItems);
module.exports=router;