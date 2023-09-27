const router=require("express").Router();
const User = require("../model/User.js");
const CryptoJs=require("crypto-js")
const jwt=require("jsonwebtoken");
const { registerUser, loginUser, logout, deleteUser, getAllUsers, getSingleUser, getUserProfile } = require("../controller/authController.js");
const { authorizedroles, isAuthenticatedUser } = require("../middlewares/auth.js");






//REGISTER
router.post("/auth/register", registerUser)


//LOGIN
 router.post("/auth/login", loginUser )

 //LOGOUT
 router.get("/auth/logout", logout )

//delete user
 router.delete("/auth/:id", deleteUser)
//  router.delete("/auth/:id", isAuthenticatedUser, authorizedroles('admin'),deleteUser)

 //Get All users
 router.get("/auth/users",getAllUsers)
 router.get("/auth/user/:id",getSingleUser)

//  get user profile
 router.get("/auth/me",isAuthenticatedUser,getUserProfile)




module.exports=router;