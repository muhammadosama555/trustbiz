const express= require("express");
const upload = require("../middlewares/multer");
const { getAllBusinesses, newBusiness, getSingleBusiness, updateBusiness, deleteBusiness, updateBusinessImages } = require("../controller/businessController");
const router=express.Router();



router.get("/",getAllBusinesses)
router.post("/",upload.array("images",5),newBusiness)
router.get("/:id",getSingleBusiness)
router.put("/:id", updateBusiness)
router.put("/update-business-images/:id",upload.array("images",5),updateBusinessImages)
router.delete("/:id", deleteBusiness)



module.exports= router
