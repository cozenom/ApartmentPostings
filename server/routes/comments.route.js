const express = require("express");
const commentsController = require("../controller/comments.controller");
const router = express.Router();
const helper = require("./helper");

const addComment = async (req, res) => {
	if (req && req.body) {
		// console.log(req.body);
		helper
			.doesPostExist(req.body.postId)
			.then(() => {
				// console.log(req);
				const comment = {
					userId: req.body.userId,
					postId: req.body.postId,
					username: req.body.username,
					message: req.body.message,
					created: Date.now(),
				};
				console.log("submitting comment, ", comment);
				commentsController
					.addComment(comment)
					.then((result) => {
						res.json(result);
					})
					.catch((err) => {
						res.status(500); // 500 Internal Server Error
						res.json({
							"status-code": 500,
							message: err || "failed to add comment",
						});
					});
			})
			.catch((err) => {
				res.status(202);
				res.json(err);
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

const getComments = async (req, res) => {
	if (req) {
		console.log("getComments", req.query.id, req.query.user);
		const postId = req.query.id;
		userId = req.query.user.toString();
		if (!postId || postId.length !== 24) {
			return res.status(400).json({ message: "post id is invalid" }); // Invalid ID length
		}
		if (!userId || userId.length !== 24) {
			return res.status(400).json({ message: "user id is invalid" }); // Invalid ID length
		}
		commentsController
			.readComments(postId, userId)
			.then((post) => {
				return res.json(post);
			})
			.catch((err) => {
				// Database call failed return 500 error
				res.status(500); // 500 Internal Server Error
				res.json({
					"status-code": 500,
					message: err || "failed request",
				});
			});
	} else {
		return res.status(400).json({ message: "Failed to authenticate" });
	}
};

router.post("/add", addComment);
router.get("/all", getComments);

module.exports = router;
