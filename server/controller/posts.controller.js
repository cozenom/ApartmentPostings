const mongoClient = require("../config/mongoClient");
const mongo = require("mongodb");
// const { query } = require("express");
const PER_PAGE = 10;

const readAllPosts = (page, sort, filter) => {
	console.log("Readallposts received: ", page, sort, filter);
	return new Promise((resolve, reject) => {
		query = [];
		console.log("Readallposts received: ", page, sort, filter);

		if (filter && filter.minPrice) {
			query.push({ $match: { price: { $gte: parseInt(filter.minPrice) } } });
		}

		if (filter && filter.maxPrice) {
			query.push({ $match: { price: { $lte: parseInt(filter.maxPrice) } } });
		}

		if (filter && filter.minbedrooms) {
			query.push({
				$match: { bedrooms: { $gte: parseInt(filter.minbedrooms) } },
			});
		}

		if (filter && filter.minarea) {
			query.push({ $match: { area: { $gte: parseInt(filter.minarea) } } });
		}

		if (filter && filter.maxarea) {
			query.push({ $match: { area: { $gte: parseInt(filter.maxarea) } } });
		}

		// TODO - ugly af, fix
		if (sort && sort.sortBy) {
			if (sort.sortBy === "priceasc") {
				query.push(
					{ $sort: { price: 1 } },
					{ $skip: page && page > 0 ? 0 : page * PER_PAGE },
					{ $limit: PER_PAGE }
				);
			} else if (sort.sortBy === "pricedesc") {
				query.push(
					{ $sort: { price: -1 } },
					{ $skip: page && page > 0 ? 0 : page * PER_PAGE },
					{ $limit: PER_PAGE }
				);
			} else {
				query.push(
					{ $sort: { date: 1 } },
					{ $skip: page && page > 0 ? 0 : page * PER_PAGE },
					{ $limit: PER_PAGE }
				);
			}
		} else {
			query.push(
				{ $sort: { date: 1 } },
				{ $skip: page && page > 0 ? 0 : page * PER_PAGE },
				{ $limit: PER_PAGE }
			);
		}

		//query.push(...[]);
		console.log("Query = ", query);

		mongoClient
			.getDatabase()
			.connection.collection("Apts")
			.aggregate(query)
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
	readPost,
};
