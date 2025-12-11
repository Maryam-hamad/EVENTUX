const jwt= require("jsonwebtoken");
const  dotenv = require('dotenv')


const protect = (req, res , next ) =>{
try{
  let token;

  if (req.headers.authorization){
    token =req.headers.authorization

    if (!token){
      return res.status(403).json({meessage:"Access Denied"})
    }

    //VERIFY TOKEN
    const decoded = jwt.verify( token , process.env.JWT_SECRET)

    // VERIFY USER 

    const user = decoded

    next()

  }


}
  catch(error){
    console.error({error:error.message})
  }
}

module.exports = protect