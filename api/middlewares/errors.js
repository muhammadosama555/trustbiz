const ErrorHandler= require('../utils/errorHandler.js')


module.exports=(err,req,res,next)=>{

    console.log(err)
    err.statusCode= err.statusCode || 500;
    err.message= err.message || 'Internal server Error'

    res.status(err.statusCode).json({
        success: false,
        error: err
    })
}