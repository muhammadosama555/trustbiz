const errorResponse = require("../utils/errorResponse.js");
const asyncHandler = require('../middlewares/asyncHandler.js');
const Review = require('../model/Review.js');
const Business = require('../model/Business.js');
const ErrorResponse = require("../utils/errorResponse.js");
const jwt = require('jsonwebtoken');

// Get Reviews
// Route: GET /api/v1/reviews
// Access: Public

exports.getReviews = asyncHandler(async (req, res, next) => {
  
        const reviews = await Review.find().populate({
            path: 'business',
            select: 'title desc'
        })

        res.status(200).json({
            success: true,
            count: reviews.length,
            data: reviews
        });
   
});

// Get Single Review
// Route: GET /api/v1/reviews/:id
// Access: Public

exports.getReview = asyncHandler(async (req, res, next) => {
    const review = await Review.findById(req.params.id).populate({
        path: 'business',
        select: 'title desc'
    })
    if (!review) {
        return next(new errorResponse('No review found with the provided ID', 404));
    }
    res.status(200).json({
        success: true,
        data: review
    });
});

// Add Review
// Route: POST /api/v1/business/:businessId/reviews
// Access: Private

exports.addReview = asyncHandler(async (req, res, next) => {
    const { title, text, rating, businessId } = req.body;

  // Get the authorization header from the request
  const authHeader = req.headers.authorization;
  // If the authorization header doesn't exist, return an error
  if (!authHeader) {
      return next(new ErrorResponse('Authorization header missing', 401));
  }
  // Extract the token from the authorization header
  const token = authHeader.split(' ')[1];
  // Verify the token to get the user ID
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decodedToken.id;


  const business = await Business.findById(businessId);
  if (!business) {
      return next(new ErrorResponse('Business not found', 404));
  }


  const review = new Review({
      title,
      text,
      rating,
      user: userId,
      business: businessId
  });
// Save the new review to the database
await review.save();
   // Push the review ID to the business's review array
   business.reviews.push(review._id);
   await business.save();

   

    res.status(201).json({
        success: true,
        data: review
    });
});

// Update Review
// Route: PUT /api/v1/reviews/:id
// Access: Private

exports.updateReview = asyncHandler(async (req, res, next) => {
    let review = await Review.findById(req.params.id);

  

    if (!review) {
        return next(new ErrorResponse('No review found with the provided ID', 404));
    }

   

    review = await Review.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

  

    res.status(200).json({
        success: true,
        data: review
    });
});

// Delete Review
// Route: DELETE /api/v1/reviews/:id
// Access: Private

exports.deleteReview = asyncHandler(async (req, res, next) => {
    let review = await Review.findById(req.params.id);

    if (!review) {
        return next(new ErrorResponse('No review found with the provided ID', 404));
    }

   

    review = await review.remove();

    // Calculate average rating after removing the review
    await Business.calculateAverageRating(req.params.businessId);

    res.status(200).json({
        success: true,
        message: "Review successfully deleted"
    });
});
