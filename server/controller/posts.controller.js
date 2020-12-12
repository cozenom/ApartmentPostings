const mongoClient = require("../config/mongoClient");
const mongo = require("mongodb");
const { query } = require("express");

const readAllPosts = () => {
	return new Promise((resolve, reject) => {
		mongoClient
			.getDatabase()
			.connection.collection("Apts")
			.aggregate()
			.toArray((err, docs) => {
				if (docs) {
					resolve(docs);
				} else {
					console.error("error: getPosts", err);
					reject("Failed to get all posts from database");
				}
			});
	});
};

const readPost = (id) => {
	return new Promise((resolve, reject) => {
		mongoClient
			.getDatabase()
			.connection.collection("Apts")
			.findOne({ _id: mongo.ObjectId(id) })
			.aggregate(query)
			.then((docs) => {
				resolve(docs);
			})
			.catch((err) => {
				console.error("error: readPost", err);
				reject("Failed to get one post from database");
			});
	});
};

const searchPost = (term) => {
	return readPosts(term);
};

// Export all database functions
module.exports = {
	readAllPosts,
	// readPosts,
	readPost,
};
