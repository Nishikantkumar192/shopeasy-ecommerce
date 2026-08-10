const express=require("express");
const { checkBackend } = require("../controller/IsWakeUp");
const router=express.Router();

router.get("/isWorking",checkBackend);

module.exports=router;