const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    username:{type:String,require:true},
    email:{type:String,require:true,unique:true},
    password:{type:String,require:true},
    role:{type:String,default:"user"},
    verifyOtp:{type:String,default:''},
    verifyOtpExpireAt:{type:Number,default:0},
    resetOtp:{type:String,default:''},
    resetOtpExpireAt:{type:Number,default:0},
})
const user=mongoose.model("user",userSchema);
module.exports=user;