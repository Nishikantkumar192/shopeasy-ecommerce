const Product=require("../models/product.js");

module.exports.newItem=async(req,res)=>{
    try{
        const url=req.file.path;
        const filename=req.file.filename;
        const product={
            ...req.body,
            name:req.body.name.toLowerCase(),
            category:req.body.category.toLowerCase(),
            brand:req.body.brand.toLowerCase(),
            image:{url,filename}
        }
        const newItem=await Product.create(product);
        await newItem.save();
        return res.json({success:true,message:"product added successfully"});
    }catch(err){
        return res.json({success:false,message:err.message});
    }
}
module.exports.getProducts=async(req,res)=>{
    try{
        const allProduct=await Product.find();
        if(!allProduct){
            return res.json({success:false,message:"No product Found"});
        }
        return res.json(allProduct);
    }catch(err){
        return res.json({success:false,message:err.message});
    }
}
module.exports.getItemDetails=async(req,res)=>{
    const {id}=req.params;
    try{
        const item=await Product.findById(id);
        if(!item){
            return res.json({success:false,message:"Unavailable Item"});
        }
        return res.json(item);
    }catch(err){
        return res.json({success:false,message:err.message});
    }
}
module.exports.updateItemInformation=async(req,res)=>{
    const {id}=req.params;
    try{
        const item=await Product.findById(id);
        if(!item){
            return res.json({success:false,message: "Cannot update: item does not exist"})
        }
        const updatedItem=await Product.findByIdAndUpdate(
            id,
            {$set:req.body},
            {new:true},
        )
        res.json(updatedItem);
    }catch(err){
        return res.json({success:false,message:err.message});
    }
}
module.exports.deleteItem=async(req,res)=>{
    const {id}=req.params;
    try{
        const item=await Product.findById(id);
        if(!item){
            return res.json({success:false,message:"product not found"});
        }
        await Product.findByIdAndDelete(id);
        res.json({success:true,message:"Item Deleted Successfully"});
    }catch(err){
        return res.json({success:false,message:err.message});
    }
}