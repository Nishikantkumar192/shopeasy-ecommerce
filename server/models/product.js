const mongoose=require("mongoose");

const productSchema=new mongoose.Schema({
    name:{type:String,require:true},
    description:{type:String,require:true},
    price:{type:String,require:true,default:'0'},
    image:{url:String,filename:String,require:true},
    category: {type:String,require:true},
    brand: {type:String,require:true},
    isAvailable: {type: Boolean, default: true },
})
const product=mongoose.model("product",productSchema);
module.exports=product;
