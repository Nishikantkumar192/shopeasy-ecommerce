const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    username:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    address:{type:String,default:""},
    role:{type:String,default:"user"},
    phone_no:{type:Number,default:0},
    verifyOtp:{type:String,default:''},
    verifyOtpExpireAt:{type:Number,default:0},
    resetOtp:{type:String,default:''},
    resetOtpExpireAt:{type:Number,default:0},
})
const user=mongoose.model("user",userSchema);
module.exports=user;