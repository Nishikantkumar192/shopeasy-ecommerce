const express=require("express");
const { register, login, logout, verificationOtp, verifyOtp } = require("../controller/auth_controller");
const { isUserExist } = require("../middleware");
const router=express.Router();

router.post("/register",register);
router.post("/login",login);
router.post("/logout",logout);
router.post("/otpVerification",isUserExist,verificationOtp);
router.post("/verifyOtp",isUserExist,verifyOtp);
module.exports=router;