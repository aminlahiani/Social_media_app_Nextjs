const mongoose = require("mongoose");
const User = mongoose.model("User");
const passport = require("passport");
const asyncHandler = require('express-async-handler');
exports.signup = async (req, res) => {

  try {
    const { name, email, password } = req.body;
    /*const userExists = await User.findOne({ email })
  
  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }
*/
  const user = await new User({ name, email, password });
  await User.register(user, password)

  
  if (user) {
    res.status(201).json({
      user :user
  
    })
  
  }}
  catch (error) {
    res.status(500).send(err.message);
  }
};

exports.registerUser = asyncHandler (async (req, res) => {
  const { name, email, password } = req.body
  const userExists = await User.findOne({ email })
  
  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }
  const user = await new User({ name, email, password });
  await User.register(user, password)

  if (user) {
    res.status(201).json({
      user : user.name
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

exports.userSignin1 = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res.status(500).json(err.message);
    }
    if (!user) {
      return res.status(400).json(info.message);
    }

    req.logIn(user, err => {
      if (err) {
        return res.status(500).json(err.message);
      }

      res.json(user);
    });
  })(req, res, next);
};
exports.signout = (req, res) => {
  res.clearCookie("next-cookie.sid");
  req.logout();
  res.json({ message: "You are now signed out!" });
};


exports.checkAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/signin");
};

