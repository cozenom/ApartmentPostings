const { v4: uuidv4 } = require("uuid");

// Class for the thread model
class Thread {
  constructor(subject, userId, tags) {
    this.subject = subject;
    this.created = Date.now();
    this.active = 1;
    this.userId = userId;
    this.user = undefined;
    this.posts = [];
    this.tags = tags;
    this.id = uuidv4();
  }

  static from(json) {
    const u = new Thread();
    return Object.assign(u, json);
  }
}

// Export user class
module.exports = Thread;
