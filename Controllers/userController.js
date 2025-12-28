const mongoose = require ('mongoose')
const User = require('../Models/userSchema')
const jwt = require('jsonwebtoken') 
const createToken = require ('../Utils/jwtToken.js')
const bcrypt = require ('bcryptjs')
const hashPassword = require('../Utils/bcrypt')
const dotenv = require ('dotenv')


//REGISTER USER 

const registerUser = async (req , res ) => {
  const { name , email , password , role} = req.body

  const userExist = await User.findOne({email})
   
  if(userExist) return res.status(200).json({message:"User already exist"})

  //HASHING THE PASSWORD

  const hashedPassword = await hashPassword(password);

  const user = await  User.create({ name ,email , password: hashedPassword, role})

  res.status(200).json({
      _id : user._id,
      mail: user.email,
      token : createToken(user._id , user.role),
      role:user.role 
  
    })
  }


  //LOGIN USER 

  const loginUser = async  (req , res) => {

    const { email ,password } = req.body
    
    const user = await User.findOne({email})

      //  COMPARING THE PASSWORD
     const hashedPassword = user.password;
     await bcrypt.compare(password ,hashedPassword)

     if (user && (user.password == hashedPassword)){

      res.status(200).json({
        name:user.name,
        email:user.email,
        token:createToken(user._id , user.role),
        role: user.role
      })
 
   }

  }


  
  // GOOGLE SIGNUP
    const googleCallbackController = async (req, res) => {
      const user = await googleSignUp(req.user);

      res.status(200).json({
        message: "Google signup successful",
        token: createToken(user._id, user.role), 
        user,
      });
    };




  


    //GET PROFILE
   const getProfile = async (req , res)=>{
     try{
        const token = req.headers.authorization

       const decodedData = await jwt.verify(token, process.env.JWT_SECRET ) 

       const user = await User.findOne({_id :decodedData.id})


        if (user && (decodedData.id == user._id)){
          res.status(200).json({
            name: user.name,
            email: user.email,
            role: user.role
          })
        }

      }
        catch(error){
           console.error({error: error.message})
        }
      

    }


  module.exports = {registerUser , loginUser , getProfile, googleCallbackController}