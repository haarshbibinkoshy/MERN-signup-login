const jwt = require('jsonwebtoken');

exports.authorization=async(req,res,next) => {
    try {
        const token=req.header('Authorization');
    console.log(`token>>>>>>>>>>>>>>>>>>>>>`,token);
    const userDetails= jwt.verify(token,`secretKey`)
    req.user=userDetails
    next()
    } catch (error) {
        console.log(error);
    }
    
}