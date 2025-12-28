const express = require ('express')
const { registerUser, loginUser , getProfile , googleCallbackController} = require ('../Controllers/userController');
const passport = require("passport"); 
const router = express.Router()


router.post("/register",registerUser)
router.post ("/login" , loginUser)
router.get("/me" , getProfile)
//GOOGLE ROUTES
router.post(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  googleCallbackController
);



module.exports = router

