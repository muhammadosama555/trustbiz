const mongoose=require("mongoose")
const jwt = require('jsonwebtoken')


const UserSchema= new mongoose.Schema({
    username:{type:String,required:true,unique:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    contact:{type:Number},
    role:{type:String},
    isActive: {
        type: Boolean,
        default: true
    },
    created: {
        type: Date,
        default: Date.now()
    }
},{timestamps:true})



//Return jet token
UserSchema.methods.getJwtToken = function (){
    
      return jwt.sign({id : this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
      });
}



module.exports= mongoose.model("User",UserSchema)