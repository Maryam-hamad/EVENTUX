const User = require("../models/user");

const googleSignUp = async (profile) => {
  let user = await User.findOne({ googleId: profile.id });

  if (!user) {
    user = await User.create({
      googleId: profile.id,
      email: profile.emails[0].value,
      name: profile.displayName,
      avatar: profile.photos?.[0]?.value,
    });
  }

  return user;
};

module.exports = googleSignUp;
