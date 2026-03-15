const User=require("../models/user.js");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken"); 
const transporter=require("../config/nodemailer.js")

module.exports.register=async(req,res)=>{
    const {username,email,password}=req.body;
    try{
        const user=await User.findOne({email});
        if(user){
            return res.json({success:false,message:"Use another Email.This is already registered"});
        }
        const hashedPassword=await bcrypt.hash(password,10);
        const newUser=new User({
            username,email,password:hashedPassword,
        })
        await newUser.save();
        const token=await jwt.sign({id:newUser._id},process.env.JWT_SECRET,{expiresIn:'14d'});
        res.cookie("token",token,{
            httpOnly:true,
            secure:process.env.NODE_ENV==="production",
            sameSite:process.env.NODE_ENV==="production"?"none":"strict",
            maxAge:14*24*60*60*1000,
        })
        const emailSend={
            from:process.env.SENDER_EMAIL,
            to:email,
            subject:"Welcome to ShopEasy – Your Account Has Been Created",
            text:"Your account has been successfully created.You can now log in and start shopping."
        }
        await transporter.sendMail(emailSend);
        return res.json({success:true,message:"You have registered successfully"});
    }catch(err){
        return res.json({success:false,message:err.message});
    }
}

module.exports.login=async(req,res)=>{
    const {email,password}=req.body;
    try{
        const user=await User.findOne({email});
        if(!user){
            return res.json({success:false,message:"Invalid Credentials"});
        }
        const isMatched=await bcrypt.compare(password,user.password);
        if(!isMatched) {
            return res.json({success:false,message:"Invalid Credentials"});
        }
        const token=await jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'14d'});
        res.cookie("token",token,{
            httpOnly:true,
            secure:process.env.NODE_ENV==="production",
            sameSite:process.env.NODE_ENV==="production"?"none":"strict",
            maxAge:14*24*60*60*1000,
        })
        return res.json({sucess:true,message:"Logged-in successfully"});
    }catch(err){
        return res.json({success:false,message:err.message});
    }
}

module.exports.logout=()=>{
    
}