const express=require("express");
const { newItem, updateItemInformation, deleteItem, getItemDetails } = require("../controller/product_controller");
const router=express.Router();

router.post("/newItem",newItem);
router.get("/updateItemInformation/:id",getItemDetails);
router.post("/updateItemInformation/:id",updateItemInformation);
router.post("/deleteItem/:id",deleteItem);
module.exports=router;