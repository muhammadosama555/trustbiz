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
    categories:{type:Array,required:true},
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
    reviews:[
        {   user:{
            type:mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
            rating:{
                type:Number,
                // required:true
            },
            comment:{
                type:String,
                // required:true
            },
        }
    ],
    user:{
        type:mongoose.Schema.ObjectId,
        ref: 'User'
    }
    ,
    rating:{
        type:Number,
        default:0
        },
})

module.exports= mongoose.model("Business",BusinessSchema)