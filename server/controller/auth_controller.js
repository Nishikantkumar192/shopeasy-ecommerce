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
        const token=jwt.sign({id:newUser._id},process.env.JWT_SECRET,{expiresIn:'14d'});
        res.cookie("token",token,{
            httpOnly:true,
            secure:false,
            sameSite:"lax",
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
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'14d'});
        res.cookie("token",token,{
            httpOnly:true,
            secure:false,
            sameSite:"lax",
            maxAge:14*24*60*60*1000,
        })
        return res.json({sucess:true,message:"Logged-in successfully"});
    }catch(err){
        return res.json({success:false,message:err.message});
    }
}

module.exports.logout=(req,res)=>{
    try{
        res.clearCookie("token",{
            httpOnly:true,
            secure:process.env.NODE_ENV==="production",
            sameSite:process.env.NODE_ENV==="production"?"none":"strict",
        })
        return res.json({success:true,message:"Successfully Logout"});
    }catch(err){
        return res.json({success:false,message:err.message});
    }
}

module.exports.verificationOtp=async(req,res)=>{
    const userId=req.user.id; 
    try{
        const user=await User.findById(userId);
        const otp=Math.floor(100000+Math.random()*900000);
        const emailSend={
            from:`ShopEasy Team <${process.env.SENDER_EMAIL}>`,
            to:user.email,
            subject:"Verifiy Your Account",
            text:`Hello ${user.username},
                Thank you for creating an account with ShopEasy.
                To verify your email address, please use the following One-Time Password (OTP):
                OTP: ${otp}
                This OTP is valid for a limited time. Please do not share this code with anyone.
                If you did not request this verification, please ignore this email.
                Best regards,
                ShopEasy Team`
        }
        user.verifyOtpExpireAt=Date.now()+5*60*1000;
        user.verifyOtp=otp;
        await user.save();
        await transporter.sendMail(emailSend);
        return res.json({success:true,message:"verification OTP send successfully"});
    }catch(err){
        return res.json({success:false,message:err.message});
    }
}
module.exports.verifyOtp=async(req,res)=>{
    const userId=req.user.id;
    const {otp}=req.body;
    try{
        const user=await User.findById(userId);
        if(otp!==user.verifyOtp){
            return res.json({success:false,message:"Invalid OTP"});
        }
        if(user.verifyOtpExpireAt < Date.now()){
            return res.json({success:false,message:"OTP Expired"});
        }
        user.verifyOtp='';
        user.verifyOtpExpireAt=0;
        await user.save();
        return res.json({success:true,message:"Account Verified Successfully"});
    }catch(err){
        return res.json({success:false,message:err.message});
    }
}
