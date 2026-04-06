const express=require("express");
const storage=require("../cloudinaryConfig.js");
const multer=require("multer");
const upload=multer({storage});
const { newItem, updateItemInformation, deleteItem, getItemDetails, getProducts, getDetail, filterProducts } = require("../controller/product_controller");
const { isAdmin,isUserExist } = require("../middleware");
const router=express.Router();

router.get("/getDetail/:id",getDetail);
router.get("/getProducts",getProducts);
router.post("/newItem",isUserExist,isAdmin,upload.single("image"),newItem);
router.get("/updateItemInformation/:id",isUserExist,isAdmin,getItemDetails);
router.put("/updateItemInformation/:id",isUserExist,isAdmin,upload.single("image"),updateItemInformation);
router.delete("/deleteItem/:id",isUserExist,isAdmin,deleteItem);
router.post("/filter-products",filterProducts);
module.exports=router;