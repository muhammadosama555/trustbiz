const mongoose=require('mongoose')
const Business = require('./Business.js'); // Import the Product model


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


// Define a post middleware to update the average rating when a review is added, updated, or deleted
ReviewSchema.post(['save', 'findByIdAndUpdate', 'findByIdAndRemove'], async function (doc) {
    const business = await Business.findById(doc.business);
    if (!business) {
      return;
    }
  
    const reviews = await this.model('Review').find({ business: doc.business });
    if (reviews.length === 0) {
      business.averageRating = 0;
    } else {
      const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
      business.averageRating = totalRating / reviews.length;
    }
  
    await business.save();
  });


module.exports=mongoose.model('Review',ReviewSchema)