const express=require("express");
const { addToCart, getCartItems, cartRemove } = require("../controller/addCart_controller");
const { isUserExist } = require("../middleware");
const router=express.Router();

router.get("/addToCart/:id",isUserExist,addToCart);
router.get("/cart-items",isUserExist,getCartItems);
router.get("/cartRemove/:id",isUserExist,cartRemove);
module.exports=router;