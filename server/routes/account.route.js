const helper = require("./helper");
const express = require("express");
const userController = require("../controller/user.controller");
const threadController = require("../controller/thread.controller");
const User = require("../models/user");
const router = express.Router();

// Get all users
// Promise based functions readUsers is our database function
// Api: GET /accounts/all
const getStats = async (req, res) => {
  // read entire table
  const promises = [
    userController.getAmountOfUsers(),
    threadController.getAmountOfThreads(),
    threadController.getAmountOfPosts(),
  ];
  try {
    const result = await Promise.all(promises);
    let json = {};
    // Flatten array to single object
    if (result && result.length) {
      for (let item of result) {
        const k = Object.keys(item);
        for (let i = 0; i < k.length; i++) {
          json[k[i]] = item[k[i]];
        }
      }
    }
    res.json(json);
  } catch (error) {
    res.status(500); // 500 Internal Server Error
    res.json({
      "status-code": 500,
      message: "Failed to get stats",
    });
  }
};

// Api: POST /accounts/signup
const signUp = (req, res) => {
  if (req && req.body) {
    // Check if all fields are set
    if (!req.body.name || !req.body.email || !req.body.hashed_password) {
      return res.status(400).send("One of the required fields is not set");
    }

    // Create user object from the POST body
    const newUser = User.from(req.body);
    console.log("newUser", newUser);
    // Check if the email is used already
    helper
      .doesUserExist(newUser.email)
      .then(() => {
        // Add user and return the added user
        userController
          .addUser(newUser)
          .then((users) => {
            res.json(users);
          })
          .catch((err) => {
            // Failed to add user
            res.status(500); // 500 Internal Server Error
            res.json({
              "status-code": 500,
              message: err || "failed to signup",
            });
          });
      })
      .catch((err) => {
        res.status(202);
        res.send(err);
      });
  } else {
    // No form data found
    res.status(500); // 500 Internal Server Error
    res.json({
      "status-code": 500,
      message: "No request body found",
    });
  }
};

const signIn = (req, res) => {
  if (req && req.body) {
    // Check if all fields are set
    if (!req.body.email || !req.body.password) {
      return res.status(400).send("One of the required fields is not set");
    }

    const email = req.body.email;
    const hashed_password = req.body.password;

    userController
      .readUser({ email, hashed_password })
      .then((doc) => {
        if (doc && doc.length && doc.length > 0) {
          res.json(doc[0]);
        } else {
          res.status(202);
          res.send("No user combination found with this email and password");
        }
      })
      .catch(() => {
        // Failed to sign-in user
        res.status(500); // 500 Internal Server Error
        res.json({
          "status-code": 500,
          message: "failed to sign-in",
        });
      });
  } else {
    // No form data found
    res.status(500); // 500 Internal Server Error
    res.json({
      "status-code": 500,
      message: "No request body found",
    });
  }
};

// Routes
router.get("/stats", getStats);
router.post("/signup", signUp);
router.post("/signin", signIn);

// Export user router
module.exports = router;
