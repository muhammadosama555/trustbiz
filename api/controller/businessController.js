const Business = require('../model/Business');
const User = require('../model/User');
const asyncHandler=require('../middlewares/asyncHandler')
const ErrorResponse= require("../utils/errorResponse")
const jwt = require('jsonwebtoken');
const sharp = require("sharp");
const cloudinary = require("../config/cloudinary");


// Create a New Business
exports.newBusiness = asyncHandler(async (req, res, next) => {
  const { title, desc, categories, address, city, country } = req.body;
  console.log(req.files,req.file)
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
    
    const images = [];
   
    if (req.files) {
        for (const file of req.files) {
            const processedImage = await sharp(file.buffer)
                .resize(500, 500)
                .jpeg({ quality: 70 })
                .toBuffer();

            const dataURI = `data:image/jpeg;base64,${processedImage.toString('base64')}`;

            const result = await cloudinary.uploader.upload(dataURI, {
                resource_type: 'image',
                format: 'jpg',
                public_id: `${userId}_${Date.now()}`,
            });

            images.push({ public_id: result.public_id, url: result.secure_url });
        }
    }
  console.log(images)
    // Create a new post object with the user ID and post data
    const business = new Business({
        title,
        desc,
        categories,
        address,
        city,
        country,
        img: images, // Use the Cloudinary URL here
        owner: userId,
      });
    
    // Save the new post to the database
    const savedBusiness = await business.save();
  
  
    // Add the new business to the user's businesses array
  // You may need to adjust this based on your data model
  const user = await User.findById(userId);
  user.businesses.push(savedBusiness._id);
  await user.save();

  res.status(201).json({
    success: true,
    business: savedBusiness,
  });
});

// Get All Businesses
exports.getAllBusinesses = asyncHandler(async (req, res, next) => {
    const { categories, search, sortBy, page, limit, maxRating } = req.query;
  
    // Parse page and limit parameters
    const parsedPage = parseInt(page, 10) || 1;
    const parsedLimit = parseInt(limit, 10) || 4;
    const skip = (parsedPage - 1) * parsedLimit;
  
    let query = Business.find();
  
    if (categories && categories.length > 0) {
      const categoriesArray = categories.split(','); // Split the query parameter into an array
      query = query.or([
          { categories: { $in: categoriesArray } } // Match businesses with any of the specified categories
      ]);
  }
  
  if (search) {
    query = query.find({ title: { $regex: search, $options: 'i' } });
  }
  

    if (maxRating) {
      // Filter businesses with a maximum rating
      query = query.where({
        'averageRating': { $lte: parseInt(maxRating) }
      });
    }
  
    let sortOptions = {};
  
    if (sortBy === 'title') {
      sortOptions.title = 1;
    } else if (sortBy === '-title') {
      sortOptions.title = -1;
    }
  
    const totalBusinesses = await Business.countDocuments(query);
    const totalPages = Math.ceil(totalBusinesses / parsedLimit);
  
    query = query.sort(sortOptions).skip(skip).limit(parsedLimit) .populate({
      path: 'reviews',
      populate: {
        path: 'user',
        select: 'username imgUrl', // Select the fields you want to populate
      }
    });
  
    const businesses = await query.exec();
  
    const pagination = {};
  
    if (skip > 0) {
      pagination.previous = {
        page: parsedPage - 1,
        limit: parsedLimit,
      };
    }
  
    if (skip + parsedLimit < totalBusinesses) {
      pagination.next = {
        page: parsedPage + 1,
        limit: parsedLimit,
      };
    }
  
    res.status(200).json({
      success: true,
      page: parsedPage,
      limit: parsedLimit,
      totalPages,
      totalBusinesses,
      pagination,
      businesses,
    });
  });
  

// Get Single Business
exports.getSingleBusiness = asyncHandler(async (req, res, next) => {
  const business = await Business.findById(req.params.id) .populate({
    path: 'reviews',
    populate: {
      path: 'user',
      select: 'username imgUrl', // Select the fields you want to populate
    }
  });

  if (!business) {
    return next(new ErrorHandler('Business not found', 404));
  }

  res.status(200).json({
    success: true,
    business,
  });
});

// Update Business
exports.updateBusiness = asyncHandler(async (req, res, next) => {
  let business = await Business.findById(req.params.id);

  if (!business) {
    return next(new ErrorHandler('Business not found', 404));
  }


  business = await Business.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    business,
  });
});

// Delete Business
exports.deleteBusiness = asyncHandler(async (req, res, next) => {
  const business = await Business.findById(req.params.id);

  if (!business) {
    return next(new ErrorHandler('Business not found', 404));
  }

  await business.remove();

  res.status(200).json({
    success: true,
    message: 'Business deleted',
  });
});
