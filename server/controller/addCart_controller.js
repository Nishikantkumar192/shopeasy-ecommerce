const Cart=require("../models/cart.js");
module.exports.addToCart=async(req,res)=>{
    const {userId}=req.body;
    const {product_id}=req.params;
    try{
        const existingItem=await Cart.findOne({
            relatedUser:userId,
            relatedProduct:product_id,
        });
        if(existingItem){
            existingItem.quantity+=1;
            await existingItem.save();
        }else{
            await Cart.create({
                relatedUser:userId,
                relatedProduct:product_id,
            });
        }
        return res.json({success:true,message:"Successfully Added"});
    }catch(err){
        return res.json({success:false,message:err.message})
    }
}