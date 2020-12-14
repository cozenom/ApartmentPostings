const express = require("express");
const postController = require("../controller/posts.controller");
const router = express.Router();
const helper = require("./helper");

const getAllPosts = (req, res) => {
	console.log("req.query = ", req.query);
	// console.log(req);
	page = parseInt(req.query.page);
	// if (parseInt(req.query.page) > 0) {
	// 	page = parseInt(req.query.page);
	// } else {
	// 	page = 0;
	// }

	sort = req.query.sort;
	if (sort == "priceasc") {
	} else if (sort == "pricedesc") {
	} else {
		sort = "date";
	}

	let filter = req.query.filter;
	try {
		filter = decodeURIComponent(filter);
		// console.log("Filter = ", filter, JSON.parse(filter));
		filter = JSON.parse(filter);
	} catch (error) {
		filter = {};
		console.log(
			"getAllPosts: Failed to parse filter, using default values",
			filter
		);
	}

	// console.log("Posts route: ", page, sort, filter);

	// read entire table
	postController
		.readAllPosts(page, sort, filter)
		.then((result) => {
			res.json(result);
		})
		.catch((err) => {
			// Database call failed return 500 error
			res.status(500); // 500 Internal Server Error
			res.json({
				"status-code": 500,
				message: "postController error",
				err,
			});
		});
};

const getOnePost = async (req, res) => {
	const id = req.query.id;

	if (!id || id.length !== 24) {
		console.log(id, id.length);
		return res.status(400).send("id is not valid"); // Invalid ID length
	} else {
		const idExists = await helper.doesPostExist(id);
		console.log(id);
		if (!idExists) {
			return res.status(400).send("id does not exist"); // ID doesn't exist
		}
	}

	// read entire table
	postController
		.readPost(id)
		.then((post) => {
			res.json(post);
		})
		.catch((err) => {
			// Database call failed return 500 error
			res.status(500); // 500 Internal Server Error
			res.json({
				"status-code": 500,
				message: err || "failed request",
			});
		});
};

// Routes

// example: localhost:3000/post/all
router.get("/all", getAllPosts);

// example: localhost:3000/post/one?id=1b29376f-71d3-4c54-875c-cc1898a55819
router.get("/one", getOnePost);

// router.get("/search", searchInThreads);

// Export user router
module.exports = router;
