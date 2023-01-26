const dotenv = require("dotenv")
dotenv.config()
const express= require("express")
const mongoose=require("mongoose")
const authRoute=require("./routes/auth.js")
const businessRoute=require("./routes/business.js")
const cookieParser= require('cookie-parser')

const errorMiddleware = require('./middlewares/errors.js')


mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("DB connected"))
.catch((err)=>{
    console.log(err)
})

const app=express()
app.use(express.json())
app.use(cookieParser())




app.use("/api",authRoute)
app.use("/api",businessRoute)


//Middleware to handle errors
app.use(errorMiddleware)




app.listen(4505,()=>{
    console.log("backend running")
})