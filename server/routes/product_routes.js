const express=require("express");
const storage=require("../cloudinaryConfig.js");
const multer=require("multer");
const upload=multer({storage});
const { newItem, updateItemInformation, deleteItem, getItemDetails } = require("../controller/product_controller");
const router=express.Router();

router.post("/newItem",upload.single("image"),newItem);
router.get("/updateItemInformation/:id",getItemDetails);
router.post("/updateItemInformation/:id",updateItemInformation);
router.post("/deleteItem/:id",deleteItem);
module.exports=router;