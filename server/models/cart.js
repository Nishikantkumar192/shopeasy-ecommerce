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
    },
    guestId:{
        type:String,
        required:true,
    },
    quantity:{
        type:Number,
        default:1,
    },
    expireAt:{
        type:Date,
        default:null,
    }
},{timestamps:true});
cartSchema.index(
    {expireAt:1},
    {expireAfterSeconds:0}
)
const cart=mongoose.model("cart",cartSchema);
module.exports=cart;