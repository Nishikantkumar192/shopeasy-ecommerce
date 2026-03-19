const Cart=require("../models/addCart.js");
module.exports.addToCart=async(req,res)=>{
    const {userId}=req.body;
    const {itemId}=req.params;
    try{
        const item=new Cart.create({userId,itemId});
        await item.save();

    }catch(err){
        return res.json({success:true,message:err.message})
    }
}