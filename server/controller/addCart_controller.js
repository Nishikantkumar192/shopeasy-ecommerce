const Cart=require("../models/cart.js");
module.exports.addToCart=async(req,res)=>{
    const {userId}=req.body;
    const {productId}=req.params;
    try{
        const existingItem=await Cart.findOne({
            relatedUser:userId,
            relatedProduct:productId,
        });
        if(existingItem){
            existingItem.quantity+=1;
            await existingItem.save();
        }else{
            await Cart.create({
                relatedUser:userId,
                relatedProduct:productId,
            });
        }
        return res.json({success:true,message:"Successfully Added"});
    }catch(err){
        return res.json({success:false,message:err.message})
    }
}