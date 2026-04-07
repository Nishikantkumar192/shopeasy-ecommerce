const express = require("express");
const {
  register,
  login,
  logout,
  verificationOtp,
  verifyOtp,
  isLoggedIn,
  forgetPassword,
  sendOtp,
} = require("../controller/auth_controller");
const { isUserExist,isEmailTokenExist } = require("../middleware");
const router = express.Router();

router.get("/isLoggedIn", isUserExist, isLoggedIn);
router.get("/UserExist", isUserExist);
router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.post("/sendOtp", sendOtp);
router.post("/forget-password",isEmailTokenExist,forgetPassword);
router.get("/otpVerification", isUserExist, verificationOtp);
router.post("/verifyOtp", isUserExist, verifyOtp);
module.exports = router;
