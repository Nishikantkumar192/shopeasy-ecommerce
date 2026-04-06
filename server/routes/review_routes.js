const express=require("express");
const { createReview, getReviews, deleteReview } = require("../controller/review_controller");
const { isUserExist,isAdmin } = require("../middleware");
const router=express.Router();

router.post("/createReview/:id",isUserExist,createReview);
router.get("/getReviews/:id",getReviews);
router.delete("/deleteReview/:id",isUserExist,deleteReview);
module.exports=router;