const mongoose=require('mongoose')


const ReviewSchema = new mongoose.Schema({
    title:{
        type:String,
        trim:true,
        required:[true,'please enter review title']
    },
    text:{
        type:String,
        required:[true,'please enter some text']
    },
    rating:{
        type:Number,
        min:1,
        max:5,
        required:[true,'please add a rating']
    },
   
    createdAt: {
        type:Date,
        default:Date.now 
    },
    business:{
        type:mongoose.Schema.ObjectId,
        ref: 'Business',
        required:true
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref: 'User',
        required:true
    }
})
//Preventing user from submitting more than 1 review
ReviewSchema.index({business:1, user: 1},{unique:true})



module.exports=mongoose.model('Review',ReviewSchema)