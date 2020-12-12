const { query } = require("express");
const express = require("express");
const postController = require("../controller/posts.controller");
const router = express.Router();
const helper = require("./helper");

const getAllPosts = (req, res) => {
	// const page = req.query.page;
	// read entire table
	postController
		.readAllPosts()
		.then((posts) => {
			res.json(posts);
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

const getOnePost = async (req, res) => {
	const id = req.query.id;

	if (!id || id.length !== 24) {
		return res.status(400).send("id is not valid"); // Invalid ID length
	} else {
		const idExists = await helper.doesThreadExistByThreadId(id);
		if (!idExists) {
			return res.status(400).send("id is not valid"); // ID doesn't exist
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

const searchInThreads = async (req, res) => {
	const searchTerm = req.query.searchTerm;

	if (!searchTerm) {
		return res.status(400).send("id is not valid"); // Invalid ID length
	}

	// read entire table
	postController
		.searchPost(searchTerm)
		.then((thread) => {
			res.json(thread);
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

router.get("/search", searchInThreads);

// Export user router
module.exports = router;
