const { v4: uuidv4 } = require("uuid");

// Class for the thread model
class Post {
  constructor(threadId, content, userId) {
    this.threadId = threadId;
    this.created = Date.now();
    this.active = 1;
    this.userId = userId;
    this.content = content;
    this.id = uuidv4();
  }

  static from(json) {
    const u = new Post();
    return Object.assign(u, json);
  }
}

// Export user class
module.exports = Post;
