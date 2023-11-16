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



module.exports= mongoose.model("Business",BusinessSchema)