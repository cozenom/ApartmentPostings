const mongoClient = require("../config/mongoClient");

const readComments = (postId, userId) => {
  return new Promise((resolve, reject) => {
    mongoClient
      .getDatabase()
      .connection.collection("comments")
      .find({ postId, userId })
      .toArray((err, docs) => {
        if (err) {
          console.error("error reading comments", err);
          reject(err);
        } else {
          resolve(docs);
        }
      });
  });
};

const addComment = (comment) => {
  return new Promise((resolve, reject) => {
    mongoClient
      .getDatabase()
      .connection.collection("comments")
      .insertOne(comment)
      .then((result, err) => {
        if (err) {
          console.error("error adding comment", err);
          reject("Failed to add comment to database");
        } else {
          // result.ops: this is an array
          if (result.ops && result.ops.length && result.ops.length > 0) {
            resolve(result.ops[0]);
          } else {
            resolve(undefined);
          }
        }
      });
  });
};

module.exports = {
  readComments,
  addComment,
};
