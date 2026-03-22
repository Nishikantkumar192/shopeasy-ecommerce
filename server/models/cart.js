const mongoose=require("mongoose");

const cartSchema=new mongoose.Schema({
    relatedUser:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true,
    },
    relatedProduct:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"product",
        required:true,
    },
    quantity:{
        type:Number,
        default:1,
    }
},{timestamps:true});
const cart=mongoose.model("cart",cartSchema);
module.exports=cart;