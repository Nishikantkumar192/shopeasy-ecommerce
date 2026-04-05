const express=require("express");
const { createReview, getReviews } = require("../controller/review_controller");
const { isUserExist,isAdmin } = require("../middleware");
const router=express.Router();

router.post("/createReview/:id",isUserExist,isAdmin,createReview);
router.get("/getReviews/:id",getReviews);
module.exports=router;