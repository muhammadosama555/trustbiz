const mongoose =  require("mongoose")

const BusinessSchema= new mongoose.Schema({
    title: {
        type:String,
        required:true
    },
    desc: {
        type:String,
        required:true
    },
    categories: {
        type: [String],
        required: true
     
    },
    averageRating: {
        type:Number,
        default: 0,
      },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review'
        }
    ],
    address:{type:String,required:true},
    city:{type:String,required:true},
    country:{type:String,required:true},
    img: [{
        public_id: {
            type: String,
            
        },
        url: {
            type: String,
        
        }
    }],
    owner:{
        type:String,
        required:true
    },
})

// Calculate the average rating and update the 'averageRating' field
BusinessSchema.methods.calculateAverageRating = function () {
    const reviews = this.reviews;
    if (reviews.length === 0) {
        this.averageRating = 0;
    } else {
        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
        this.averageRating = totalRating / reviews.length;
    }
};

module.exports= mongoose.model("Business",BusinessSchema)