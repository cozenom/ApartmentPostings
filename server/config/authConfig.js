const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const userController = require("../controller/user.controller");
const mongo = require("mongodb");

const configurePassport = () => {
  // configure passport.js to use the local strategy
  passport.use(
    new LocalStrategy((username, password, done) => {
      // call db to verify info
      userController
        .readUser({ username, password })
        .then((result) => {
          if (result && result.length && result.length > 0) {
            return done(null, result[0]);
          } else {
            return done(null, false);
          }
        })
        .catch((err) => {
          return done(null, false);
        });
    })
  );

  // tell passport how to serialize the user
  passport.serializeUser((user, done) => {
    // console.log('Inside serializeUser callback. User id is save to the session file store here')
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    // console.log(`The user id passport saved in the session file store is: ${id}`)
    userController
      .readUser({ _id: mongo.ObjectId(id) })
      .then((result) => {
        if (result && result.length && result.length > 0) {
          return done(null, result[0]);
        } else {
          return done(null, false);
        }
      })
      .catch((err) => {
        return done(err, false);
      });
  });
};

module.exports = configurePassport;
