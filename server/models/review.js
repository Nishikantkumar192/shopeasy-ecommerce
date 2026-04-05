const mongoose=require("mongoose");

const reviewSchema=new mongoose.Schema({
    review:{type:String,required:true},
    rating:{type:Number,default:1},
    relatedUser:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true,
    },
    relatedProduct:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"product",
        required:true,
    }
})
const review=mongoose.model("review",reviewSchema);
module.exports=review;