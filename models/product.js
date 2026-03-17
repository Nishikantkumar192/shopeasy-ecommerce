const mongoose=require("mongoose");

const productSchema=new mongoose.Schema({
    name:{type:String,require:true},
    description:{type:String},
    price:{type:String,require:true,default:'0'},
    category: {type:String,require:true},
    brand: {type:String,require:true},
    isAvailable: {type: Boolean, default: true },
})
const product=mongoose.model("product",productSchema);
module.exports=product;
