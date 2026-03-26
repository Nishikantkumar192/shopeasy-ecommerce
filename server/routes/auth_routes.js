const express=require("express");
const { register, login, logout, verificationOtp, verifyOtp } = require("../controller/auth_controller");
const { isUserExist } = require("../middleware");
const router=express.Router();

router.get("/UserExist",isUserExist);
router.post("/register",register);
router.post("/login",login);
router.get("/logout",logout);
router.get("/otpVerification",isUserExist,verificationOtp);
router.post("/verifyOtp",isUserExist,verifyOtp);
module.exports=router;