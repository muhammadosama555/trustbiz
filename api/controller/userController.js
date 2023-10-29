const User = require("../model/User.js");
const asyncHandler=require('../middlewares/asyncHandler')
const ErrorResponse= require("../utils/errorResponse")
const sharp = require("sharp");
const cloudinary = require("../config/cloudinary");


//Get All user   => /api/auth
exports.getAllUsers =asyncHandler(async(req,res,next)=>{
   const users= await User.find().populate('businesses')

   if (!users) {
    return next(new ErrorResponse(`No user found`, 404));
  }

   res.status(200).json({
     success:true,
     users
   })
})

//Get All user   => /api/auth
exports.getSingleUser =asyncHandler(async(req,res,next)=>{
   const user= await User.findById(req.params.id).populate('businesses')

   if (!user) {
    return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404));
  }

   res.status(200).json({
     success:true,
     user
   })
})

//Update User  => /api/auth/id
exports.updateUser = async (req, res) => {

    
    let user = await User.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true});
  
    if (!user) {
      return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404));
    }
  
    // return user data
    res.json({
        success:true,
        user
    });
  
  };

//Delete User  => /api/auth/delete/id
exports.deleteUser = asyncHandler(async (req,res,next)=>{
    const user = await User.findByIdAndDelete(req.params.id)

    if (!user) {
        return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404));
      }
    
    res.status(200).json({
      success:true,
      message: 'user has been succesfully deleted'

    })
})

//update user image

exports.updateUserImage = asyncHandler(async (req, res, next) => {
    if (!req.file) {
      return next(new ErrorResponse("Please upload an image file", 400));
    }
  console.log(req.file)
    const user = await User.findById(req.params.id);
    if (!user) {
      return next(new ErrorResponse("User not found", 404));
    }
    const processedImage = await sharp(req.file.buffer)
      .resize(500, 500)
      .jpeg({ quality: 70 })
      .toBuffer();
  
    // Convert the buffer to a data URI
    const dataURI = `data:image/jpeg;base64,${processedImage.toString("base64")}`;
  
    const result = await cloudinary.uploader.upload(dataURI, {
      resource_type: "image",
      format: "jpg",
      public_id: `${req.user.id}_${Date.now()}`,
    });
  
    user.imgUrl = result.secure_url;
    const updatedUser = await user.save();
  
    res.status(200).json({
      success: true,
      data: updatedUser,
    });
  });
  