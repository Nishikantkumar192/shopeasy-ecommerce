const Product=require("../models/product.js");

module.exports.newItem=async(req,res)=>{
    try{
        console.log(req.file);
        const {url}=req.file.url;
        const {filename}=req.file.filename;
        const newItem=await Product.create(req.body);
        newItem.image={url,filename};
        await newItem.save();
        return res.json({success:true,message:"item added successfully"});
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
            return res.json({success:false,message:"Item is already not in Database"});
        }
        await Product.findByIdAndDelete(id);
        res.json({success:true,message:"Item Deleted Successfully"});
    }catch(err){
        return res.json({success:false,message:err.message});
    }
}