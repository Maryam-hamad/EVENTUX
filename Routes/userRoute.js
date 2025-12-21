const express = require ('express')
const { registerUser, loginUser , getProfile} = require ('../Controllers/userController');
const router = express.Router()


router.post("/register",registerUser)
router.post ("/login" , loginUser)
router.get("/me" , getProfile)



module.exports = router

