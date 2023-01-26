const User= require('../model/User.js')

const catchAsyncErrors= require("./catchAsyncErrors.js")
const jwt= require('jsonwebtoken')
const ErrorHandler = require('../utils/errorHandler.js')


//Checck if user is authenticated or not
exports.isAuthenticatedUser= catchAsyncErrors(async (req,res,next)=>{
      const {token}= req.cookies
      if(!token){
            return  next(new ErrorHandler('Login first to post business',401))
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.user = await User.findById(decoded.id)

      next()
})

//Handling users roles
exports.authorizedroles = (...roles) =>{
      return (req,res,next) =>{
            if(!roles.includes(req.user.role)){
                  return next(
                  new ErrorHandler(`role ${req.user.role}is not allowed to access`))
            }
            next()
      }
}