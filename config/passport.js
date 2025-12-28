const passport = require("passport")
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../Models/userSchema")

passport. use(
  new GoogleStrategy({
    clientID : process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.SIGNUP_CLIENT_SECRET,
    callbackURL:"/auth/google/callback"
  },
   
  async (accessToken, refreshToken, profile, done) => {
      try {
        // delegate user creation/lookup to controller
        const user = await findOrCreateUser(profile);
        done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

module.exports = passport; 

