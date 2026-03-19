const mongoose=require("mongoose");

const cartSchema=new mongoose.Schema({
    relatedUser:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
    },
    relatedProduct:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"product"
    }
})
const cart=mongoose.model("cart",cartSchema);
module.exports=cart;