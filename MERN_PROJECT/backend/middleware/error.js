const ErrorHander = require("../utils/errorhander");

module.exports = (err, req, res, next) =>{
    err.statusCode = err.statusCode || 500;
    err.massage = err.massage || "Internal Server Error";

    // Wrong Mongodb Id error
    if (err.name === "CastError"){
        const massage = `Resource not found. Invalid: ${err.path}`
        err = new ErrorHander(massage, 400);
    }


    // Mongoose duplicate key error
    if(err.code === 11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
        err = new ErrorHander(message, 400);
    }

    // Wrong JWT error
    if(err.name === "JsonWebTokenError"){
        const message = `Json Web Token is invalid, try again`;
        err = new ErrorHander(message, 400);
    }

    // Wrong EXPIRE error
    if(err.name === "TokenExpiredError"){
        const message = `Json Web Token is Expired, try again`;
        err = new ErrorHander(message, 400);
    }

    res.status(err.statusCode).json({
        success: false,
        massage: err.stack,
    })
}