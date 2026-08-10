module.exports.checkBackend = (req, res) => {
  return res.status(200).json({success:true, message: "Backend is running" });
};
