const express = require("express");
const mongoSanitize = require("express-mongo-sanitize");
const compression = require("compression");
const cors = require("cors");
const httpStatus = require("http-status");
const passport = require("passport");

// Passport config
const configurePassport = require("./config/authConfig");
configurePassport();
console.log("Passport configured");

// routes
const authRoute = require("./routes/auth.route");
const postRoute = require("./routes/posts.route");
const commentRoute = require("./routes/comments.route");

// Express app
const app = express();

// enable cors
// app.use(cors());
var whitelist = ["http://localhost:8080", "localhost:3000"];
app.use(
	cors({
		origin: function (origin, callback) {
			if (whitelist.indexOf(origin) !== -1) {
				callback(null, true);
			} else {
				callback();
			}
		},
		credentials: true,
	})
);

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(mongoSanitize());

// gzip compression
app.use(compression());

// Enable passport
app.use(passport.initialize());
app.use(passport.session());

// Default route
app.get("/", (req, res) => {
	res.send("Hello from api");
});

// user api requests
app.use("/auth", authRoute);
app.use("/posts", postRoute);
app.use("/comments", commentRoute);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
	res.status(httpStatus.NOT_FOUND);
	res.send("Not found");
});

// Export Express router
module.exports = app;
