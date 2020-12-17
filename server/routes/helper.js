const userController = require("../controller/user.controller");
const postController = require("../controller/posts.controller");

const doesUserExist = (username) => {
  return new Promise((resolve, reject) => {
    userController
      .readUser({ username })
      .then((doc) => {
        if (doc && doc.length && doc.length > 0) {
          reject("User already exists");
        } else {
          resolve();
        }
      })
      .catch(() => {
        reject("Failed to check if user exits");
      });
  });
};

const doesPostExist = (id) => {
  return new Promise((resolve, reject) => {
    postController
      .readPost(id)
      .then((doc) => {
        // console.log("doc:", doc && doc._id && doc.body.length > 0);
        if (doc && doc._id) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch((err) => {
        reject("Failed to check if thread exists", err);
      });
  });
};

module.exports = {
  doesUserExist,
  doesPostExist,
};
