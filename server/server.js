const express = require("express");
const mongoSanitize = require("express-mongo-sanitize");
const compression = require("compression");
const cors = require("cors");
const httpStatus = require("http-status");

// routes
const accountRoute = require("./routes/account.route");
const threadRoute = require("./routes/thread.route");
const locationRoute = require("./routes/location.route");

// Express app
const app = express();

// enable cors
app.use(cors());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(mongoSanitize());

// gzip compression
app.use(compression());

// Default route
app.get("/", (req, res) => {
  res.send("Hello from form api");
});

// user api requests
app.use("/accounts", accountRoute);
app.use("/thread", threadRoute);
app.use("/location", locationRoute);

// posts api requests

// threads api requests

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  res.status(httpStatus.NOT_FOUND);
  res.send("Not found");
});

// Export Express router
module.exports = app;
