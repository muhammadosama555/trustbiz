const User = require("../model/User.js");
const CryptoJs=require("crypto-js")
const jwt=require("jsonwebtoken");
const sendToken = require("../utils/jwtToken.js");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors.js");

exports.registerUser=  async(req,res)=>{
    const newUser= new User({
      username:req.body.username,
      email:req.body.email,
      password:CryptoJs.AES.encrypt(req.body.password,process.env.PASS_SEC).toString()
    })
    try {
      const savedUser= await newUser.save();
      sendToken(savedUser,200,res)
    } catch (err) {
      console.log(err);
      res.status(500).json(err)
    }
}


exports.loginUser=  async (req,res)=>{
    try {
     const user = await User.findOne({username:req.body.username})
     if(!user) return res.status(401).json("wrong credentials")

     const hashedPass= await CryptoJs.AES.decrypt( 
       user.password,
       process.env.PASS_SEC
     )
     const savedpassword= await hashedPass.toString(CryptoJs.enc.Utf8)
     if(savedpassword !==req.body.password) return res.status(401).json("wrong credentials")

     const accessToken=jwt.sign({
       id:user._id,
       isAdmin:user.isAdmin
     },process.env.JWT_SECRET,{expiresIn: process.env.JWT_EXPIRES_TIME})

     const {password,...others}=user._doc;

     sendToken(user,200,res)

    } catch (err) {
     res.status(500).json(err)
     
    }
}

//Delete User  => /api/auth/delete/id
exports.deleteUser = catchAsyncErrors(async (req,res,next)=>{
    const user = await User.findByIdAndDelete(req.params.id)
    res.status(200).json({
      success:true,
      message: 'user has been succesfully deleted'

    })
})


//Logout User    => /api/logout

exports.logout = catchAsyncErrors(async (req,res,next)=>{
    res.cookie('token',null,{
      expiresIn: new Date(Date.now()),
      httpOnly: true

    })

    res.status(200).json({
      success: true,
      message: 'logged out'
    })
})

//Get All user   => /api/auth
exports.getAllUsers =catchAsyncErrors(async(req,res,next)=>{
   const users= await User.find()
   res.status(200).json({
     success:true,
     users
   })
})

//Get All user   => /api/auth
exports.getSingleUser =catchAsyncErrors(async(req,res,next)=>{
   const user= await User.findById(req.params.id)
   res.status(200).json({
     success:true,
     user
   })
})

//Get All user   => /api/auth
exports.getUserProfile =catchAsyncErrors(async(req,res,next)=>{
   const user= await User.findById(req.user._id)
   res.status(200).json({
     success:true,
     user
   })
})