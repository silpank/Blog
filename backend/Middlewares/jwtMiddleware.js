//router-level middleware
const jwt = require('jsonwebtoken')
const jwtmiddleware = (req,res,next)=>{
    console.log("Inside jwt middleware - router-level-middleware");
    //get token from user request
   
    try{
        const token = req.headers['x-access-token']
    //token verification
        const tokenVerification = jwt.verify(token,'superkey2024')
        req.payload = tokenVerification.userId
        next()
    }
    catch(err){
        res.status(401).json("Authorization failed....please login again")
    }
}
module.exports = jwtmiddleware