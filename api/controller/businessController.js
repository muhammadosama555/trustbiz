const Business = require("../model/Business.js")
const ErrorHandler = require('../utils/errorHandler.js')
const catchAsyncErrors= require('../middlewares/catchAsyncErrors')
const User = require("../model/User.js")
const APIFeatures= require("../utils/apiFeatures.js")
const { default: mongoose } = require("mongoose")
const cloudinary= require("cloudinary").v2

// Configuration 
cloudinary.config({
    cloud_name: "dkrttx4u2",
    api_key: "356652623198427",
    api_secret: "d3ivayyXIq8gWQwJ638gUXF0yZw"
  });



//Posting new business       => /api/business/new
exports.newBusiness = catchAsyncErrors(async (req, res, next) => {
     
    const file= req.files.photo
    cloudinary.uploader.upload(file.tempFilePath, (err,result)=>{
         console.log(result);
         const business = new Business({
            title:req.body.title,
            desc:req.body.desc,
            categories:req.body.categories,
            address:req.body.address,
            city:req.body.city,
            country:req.body.country,
            img:[{url:result.url}],
            owner:req.body.owner,

         })
         business.save()
    
         res.status(200).json({
             success: true,
             business
         })
    })

  
}) 



//Get All business        api/business
exports.getAllBusiness = catchAsyncErrors( async (req, res, next) => {
    
    const resPerPage=4

    const apiFeatures= new APIFeatures(Business.find(),req.query)
                       .search()
                       .pagination(resPerPage)

    const business = await apiFeatures.query
    res.status(200).json({
        success: true,
        count:business.length,
        business
    })
})

// Get single business      api/business/:id

exports.getSingleBusiness = catchAsyncErrors( async (req, res, next) => {
    var mongoose = require('mongoose');

    if (mongoose.isValidObjectId(req.params.id)) {

        const business = await Business.findById(req.params.id)

        if (!business) {
            return next(new ErrorHandler('product not found',404))
        } else {
            res.status(200).json({
                success: true,
                business
            })
        }
    }
    else {
        res.status(404).json({
            success: false,
            message: "Invalid ID"
        })
    }
})

// Update business      api/business/:id
exports.updateBusiness = catchAsyncErrors( async (req, res, next) => {
    var mongoose = require('mongoose');

    if (mongoose.isValidObjectId(req.params.id)) {

        let business = await Business.findByIdAndUpdate(req.params.id,req.body,{new:true, runValidators:true})

        
            res.status(200).json({
                success: true,
                business
            })
          
    }
    else {
        res.status(404).json({
            success: false,
            message: "Invalid ID"
        })
    }
})



//delete Business      => /api/business/Id
exports.deleteBusiness = catchAsyncErrors( async (req, res, next) => {
    var mongoose = require('mongoose');

    if (mongoose.isValidObjectId(req.params.id)) {

        let business = await Business.findByIdAndDelete(req.params.id)

        
            res.status(200).json({
                success: true,
                message: 'business deleted'
            })
          
    }
    else {
        res.status(404).json({
            success: false,
            message: "Invalid ID"
        })
    }
})



//Create new review => /api/business/ review

exports.createBusinessReview = catchAsyncErrors(async(req,res,next)=>{
    
    const businessId = req.params.id
      const {rating,comment}= req.body;

      const review ={
        user:req.user._id,
        rating: Number(rating),
        comment
      }

     

      const business= await Business.findById(businessId)

      const isReviewed= business.reviews.find(
        r=> r.user.toString() === req.user._id.toString()
      )

      if(isReviewed){
         business.reviews.forEach(review =>{
            if(review.user.toString() === req.user._id.toString())
            {
                review.comment=comment
                review.rating= rating
            }
         })
      }else{
        business.reviews.push(review);
        business.numOfReviews= business.reviews.length
      }

      business.ratings= business.reviews.reduce((acc,item)=> item.rating+ acc,0)/ business.reviews.length
      await business.save({validateBeforeSave:false})

      res.status(200).json({
        success:true
      })
})


//Get All business Reviews
exports.getBusinessReviews = catchAsyncErrors(async (req,res,next)=>{
    const business= await Business.findById(req.params.id);
    const reviews = await Promise.all(business.reviews.map(async (review)=>{
        let user = await User.findById(review.user)
        return {
            ...review.toObject(),
            username: user.username
        }
    }))
    
    res.status(200).json({
        success:true,
        reviews: reviews
    })
})


//Delete review
exports.deleteReview = catchAsyncErrors(async(req,res,next)=>{
     const business = await Business.findById(req.query.businessid)

     const reviews = business.reviews.filter(review => review._id.toString() !== req.query.id.toString())
     
     const numOfReviews= reviews.length
     const ratings=business.reviews.reduce((acc,item)=> item.rating +acc ,0)/ reviews.length
     
     await Business.findByIdAndUpdate(req.query.businessid,{
        reviews,
        ratings,
        numOfReviews
     },{
        new:true,
        runValidators:true,
        useFindAndModify: false

     })

     res.status(200).json({
        success: true,
        
     })
})