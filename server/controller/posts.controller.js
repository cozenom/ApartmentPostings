const mongoClient = require("../config/mongoClient");
const mongo = require("mongodb");
const PER_PAGE = 10;

const readAllPosts = (page, sort, filter) => {
	return new Promise((resolve, reject) => {
		// console.log("Readallposts received: ", page, sort, filter);

		query = [];
		console.log("page: ", page);
		// console.log({ $match: { price: { $gte: parseInt(filter.minPrice) } } });
		// console.log({ $match: { price: { $lte: parseInt(filter.maxPrice) } } });
		// console.log({
		// 	$match: { bedrooms: { $gte: parseInt(filter.minbedrooms) } },
		// });
		// console.log({ $match: { area: { $gte: parseInt(filter.minarea) } } });
		// console.log({ $match: { area: { $lte: parseInt(filter.maxarea) } } });

		if (filter) {
			if (filter.minPrice) {
				query.push({ $match: { price: { $gte: parseInt(filter.minPrice) } } });
				query.push({ $match: { price: { $lte: parseInt(filter.maxPrice) } } });
				query.push({
					$match: { bedrooms: { $gte: parseInt(filter.minbedrooms) } },
				});
				query.push({ $match: { area: { $gte: parseInt(filter.minarea) } } });
				query.push({ $match: { area: { $lte: parseInt(filter.maxarea) } } });
			}
		}

		const fetchDB = new Promise((resolve, reject) => {
			queryData = [...query];
			// TODO - ugly af, fix
			if (sort) {
				if (String(sort) === "priceasc") {
					queryData.push(
						...[
							{ $sort: { price: 1 } },
							{ $skip: page * PER_PAGE },
							{ $limit: PER_PAGE },
						]
					);
				} else if (String(sort) === "pricedesc") {
					queryData.push(
						...[
							{ $sort: { price: -1 } },
							{ $skip: page * PER_PAGE },
							{ $limit: PER_PAGE },
						]
					);
				} else {
					queryData.push(
						...[
							{ $sort: { date: 1 } },
							{ $skip: page * PER_PAGE },
							{ $limit: PER_PAGE },
						]
					);
				}
			} else {
				// Default
				queryData.push(
					...[
						{ $sort: { date: 1 } },
						{ $skip: page * PER_PAGE },
						{ $limit: PER_PAGE },
					]
				);
			}
			// console.log("queryData", queryData);
			// Get data
			mongoClient
				.getDatabase()
				.connection.collection("Apts")
				.aggregate(queryData)
				.toArray((err, docs) => {
					if (err) {
						console.error("error: getPostsData", err);
						reject("Failed to get all posts from database");
					} else {
						resolve(docs);
					}
				});
		});

		const fetchcount = new Promise((resolve, reject) => {
			query.push(...[{ $count: "total" }]);
			// Get count
			mongoClient
				.getDatabase()
				.connection.collection("Apts")
				.aggregate(query)
				.toArray((err, docs) => {
					if (err) {
						console.error("error: getPostsCount", err);
						reject("Failed to get all posts from database");
					} else {
						if (docs && docs.length && docs.length > 0) {
							resolve(docs[0]);
						} else {
							resolve({ total: 0 });
						}
					}
				});
		});

		// Both
		Promise.all([fetchDB, fetchcount])
			.then((data) => {
				console.log("Got data & count");
				const result = {};
				result.Data = data[0];
				result.Count = data[1].total;
				// console.log(result);
				resolve(result);
			})
			.catch((err) => {
				reject(err);
			});
	});
};

const readPost = (id) => {
	return new Promise((resolve, reject) => {
		mongoClient
			.getDatabase()
			.connection.collection("Apts")
			.findOne({ _id: mongo.ObjectId(id) })
			.then((docs) => {
				resolve(docs);
			})
			.catch((err) => {
				console.error("error: readPost", err);
				reject("Failed to get one post from database");
			});
	});
};

// Export all database functions
module.exports = {
	readAllPosts,
	readPost,
};
