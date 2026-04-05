const express=require("express");
const { createReview } = require("../controller/review_controller");
const { isUserExist,isAdmin } = require("../middleware");
const router=express.Router();

router.post("/createReview/:id",isUserExist,isAdmin,createReview);

module.exports=router;