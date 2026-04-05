const { wrapAsync } = require("../utils/wrapAsync");
const Review=require("../models/review.js");

module.exports.createReview=wrapAsync(async(req,res)=>{
    const {id}=req.params;
    const userId=req.user.id;
    const newReview=await Review.create({
        ...req.body,
        relatedUser:userId,
        relatedProduct:id,
    });
    return res.json({success:true,message:"Submitted succfully",newReview});
});
module.exports.getReviews=wrapAsync(async(req,res)=>{
    const {id}=req.params;
    const reviews=await Review.find({relatedProduct:id});
    return res.json({success:true,reviews});
})