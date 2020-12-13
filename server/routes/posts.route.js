const express = require("express");
const postController = require("../controller/posts.controller");
const router = express.Router();
const helper = require("./helper");

const getAllPosts = (req, res) => {
	console.log("req.query = ", req.query);
	// console.log(req);

	if (parseInt(req.query.page) > 0) {
		page = parseInt(req.query.page);
	} else {
		page = 0;
	}

	let sort = req.query.sort;
	try {
		sort = decodeURIComponent(sort);
		sort = JSON.parse(sort);
		console.log(sort);
	} catch (error) {
		sort = {
			sortBy: "date",
		};
		console.log(
			"getAllPosts: Failed to parse sorting, using default values",
			sort
		);
	}

	let filter = req.query.filter;
	try {
		filter = decodeURIComponent(filter);
		filter = JSON.parse(filter);
		console.log(filter);
	} catch (error) {
		filter = {};
		console.log(
			"getAllPosts: Failed to parse filter, using default values",
			filter
		);
	}

	console.log("Posts route: ", page, sort, filter);

	// read entire table
	postController
		.readAllPosts(page, sort, filter) // here <--
		.then((result) => {
			// console.log(result);
			res.json(result);
		})
		.catch((err) => {
			// Database call failed return 500 error
			res.status(500); // 500 Internal Server Error
			res.json({
				"status-code": 500,
				message: "postController error",
			});
		});
};

// const getOnePost = async (req, res) => {
// 	const id = req.query.id;

// 	if (!id || id.length !== 24) {
// 		return res.status(400).send("id is not valid"); // Invalid ID length
// 	} else {
// 		const idExists = await helper.doesThreadExistByThreadId(id);
// 		if (!idExists) {
// 			return res.status(400).send("id is not valid"); // ID doesn't exist
// 		}
// 	}

// 	// read entire table
// 	postController
// 		.readPost(id)
// 		.then((post) => {
// 			res.json(post);
// 		})
// 		.catch((err) => {
// 			// Database call failed return 500 error
// 			res.status(500); // 500 Internal Server Error
// 			res.json({
// 				"status-code": 500,
// 				message: err || "failed request",
// 			});
// 		});
// };

// const searchInThreads = async (req, res) => {
// 	const searchTerm = req.query.searchTerm;

// 	if (!searchTerm) {
// 		return res.status(400).send("id is not valid"); // Invalid ID length
// 	}

// 	// read entire table
// 	postController
// 		.searchPost(searchTerm)
// 		.then((thread) => {
// 			res.json(thread);
// 		})
// 		.catch((err) => {
// 			// Database call failed return 500 error
// 			res.status(500); // 500 Internal Server Error
// 			res.json({
// 				"status-code": 500,
// 				message: err || "failed request",
// 			});
// 		});
// };

// Routes

// example: localhost:3000/post/all
router.get("/all", getAllPosts);

// example: localhost:3000/post/one?id=1b29376f-71d3-4c54-875c-cc1898a55819
// router.get("/one", getOnePost);

// router.get("/search", searchInThreads);

// Export user router
module.exports = router;
