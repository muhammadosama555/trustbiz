const express = require("express");

const { registerUser, loginUser, logout, resetPassword, changePassword, getOTP } = require("../controller/authController.js");
const { protect } = require('../middlewares/auth');
const router=express.Router()

router.post("/register", registerUser)
router.post("/login", loginUser)
router.get('/logout',logout)
router.post('/generateOtp',getOTP)
router.put('/resetPassword',resetPassword)
router.post('/change-password', protect, changePassword)


module.exports=router;