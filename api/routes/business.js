const express= require("express");
const { newBusiness, getAllBusiness, getSingleBusiness, updateBusiness, deleteBusiness, createBusinessReview, getBusinessReviews, deleteReview,  } = require("../controller/businessController");
const { isAuthenticatedUser } = require("../middlewares/auth");
const router=require("express").Router();




router.post("/business/new",isAuthenticatedUser,newBusiness)
router.get("/business/all",getAllBusiness)
router.get("/business/:id",getSingleBusiness)
router.put("/business/:id",isAuthenticatedUser, updateBusiness)
router.delete("/business/:id",isAuthenticatedUser, deleteBusiness)
router.put("/:id/review",isAuthenticatedUser, createBusinessReview)
router.get("/:id/reviews",isAuthenticatedUser,getBusinessReviews)
router.delete("/reviews", isAuthenticatedUser,deleteReview)





module.exports= router
