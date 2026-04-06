const { wrapAsync } = require("../utils/wrapAsync");
const Review=require("../models/review.js");
const ExpressError=require("../utils/ExpressError.js");
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
    const reviews=await Review.find({relatedProduct:id}).populate("relatedUser");
    return res.json({success:true,reviews});
})
module.exports.deleteReview=wrapAsync(async(req,res,next)=>{
    const {id}=req.params;     //review Id
    const userId=req.user.id;
    const review=await Review.findById(id);
    if(!review) return next(new ExpressError(400,"Review doesn't Exist"));
    if(!review.relatedUser.equals(userId)) return next(new ExpressError(403,"Permission Denied"));
    await Review.findByIdAndDelete(id);
    return res.json({status:true,message:"Your comment has deleted successfully"});
})