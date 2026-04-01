const User = require("../models/user.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const transporter = require("../config/nodemailer.js");
const { wrapAsync } = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");

module.exports.register = wrapAsync(async (req, res, next) => {
  const { username, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return next(
      new ExpressError(
        409,
        "An account with this email already exists. Please use another email.",
      ),
    );
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });
  await newUser.save();
  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: "14d",
  });
  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 14 * 24 * 60 * 60 * 1000,
  });
  const emailSend = {
    from: process.env.SENDER_EMAIL,
    to: email,
    subject: "Welcome to ShopEasy – Your Account Has Been Created",
    text: "Your account has been successfully created.You can now log in and start shopping.",
  };
  await transporter.sendMail(emailSend);
  return res.json({
    success: true,
    message: "You have registered successfully",
    user:newUser,
  });
});

module.exports.login = wrapAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return next(new ExpressError(401, "Invalid Credentials"));
  }
  const isMatched = await bcrypt.compare(password, user.password);
  if (!isMatched) {
    return next(new ExpressError(401, "Invalid Credentials"));
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "14d",
  });
  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 14 * 24 * 60 * 60 * 1000,
  });
  return res.json({ success: true, message: "Logged-in successfully" ,user});
});

module.exports.logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });
  return res.json({ success: true, message: "Logout successfully" });
};

module.exports.verificationOtp = wrapAsync(async (req, res, next) => {
  const userId = req.user.id;
  const user = await User.findById(userId);
  const otp = Math.floor(100000 + Math.random() * 900000);
  const emailSend = {
    from: `ShopEasy Team <${process.env.SENDER_EMAIL}>`,
    to: user.email,
    subject: "Verifiy Your Account",
    text: `Hello ${user.username},
                Thank you for creating an account with ShopEasy.
                To verify your email address, please use the following One-Time Password (OTP):
                OTP: ${otp}
                This OTP is valid for a limited time. Please do not share this code with anyone.
                If you did not request this verification, please ignore this email.
                Best regards,
                ShopEasy Team`,
  };
  user.verifyOtpExpireAt = Date.now() + 5 * 60 * 1000;
  user.verifyOtp = otp;
  await user.save();
  try {
    await transporter.sendMail(emailSend);
  } catch (err) {
    return next(
      new ExpressError(500, "Failed to send OTP. Please try again later."),
    );
  }
  return res.json({
    success: true,
    message: "verification OTP send successfully",
  });
});

module.exports.verifyOtp = wrapAsync(async (req, res, next) => {
  const userId = req.user.id;
  const { otp } = req.body;
  const user = await User.findById(userId);
  if (user.verifyOtpExpireAt < Date.now()) {
    return next(new ExpressError(400, "OTP Expired"));
  }
  if (otp !== user.verifyOtp) {
    return next(new ExpressError(400, "Invalid OTP"));
  }
  user.verifyOtp = "";
  user.verifyOtpExpireAt = 0;
  await user.save();
  return res.json({
    success: true,
    message: "Account Verified Successfully",
  });
});
