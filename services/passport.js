const passport = require("passport");
const mongoose = require("mongoose");
const localStrategy = require("passport-local").Strategy;
const User = mongoose.model("users");

// Create a passport middleware to handle user registration
passport.use(
  "signup",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    (email, password, done) => {
      return User.create({ email, password }, (error, user) => {
        if (error) {
          console.log(error);
          return done(error);
        }

        return done(null, user);
      });
    }
  )
);

// Create a passport middleware to handle User login
passport.use(
  "login",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      return User.findOne({ email })
        .then((user) => {
          // Check if user is present in the database
          if (!user) {
            return done(null, false, { message: "User not found" });
          }

          // Validate password and make sure it is valid
          if (!user.validPassword(password)) {
            return done(null, false, { message: "Wrong Password" });
          }

          return done(null, user);
        })
        .catch((error) => done(error));
    }
  )
);
