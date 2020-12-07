const { MongoClient } = require("mongodb");

function MyDB() {
  const myDB = {};

  const uri = process.env.MONGO_URL || "mongodb://localhost:27017";

  myDB.getPosts = async () => {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    try {
      await client.connect();

      const db = client.db("posts");
      const posts = db.collection("posts");

      const query = {};

      return posts
        .find(query)
        .sort({ _id: -1 })
        .limit(10)
        .toArray()
        .finally(() => client.close());
    } catch (err) {
      console.log("Error connecting to the database", err);
    }
  };

  myDB.initialize = async () => {
    const client = new MongoClient(uri, { useUnifiedTopology: true });

    await client.connect();

    const db = client.db("posts");
    const posts = db.collection("posts");

    console.log("initializing database");
    for (let i = 0; i < 100; i++) {
      await posts.insertOne({
        text: "Something " + i,
        author: "John " + i,
      });
    }

    console.log("done");
  };

  myDB.createPost = async (post) => {
    const client = new MongoClient(uri, { useUnifiedTopology: true });

    await client.connect();

    const db = client.db("posts");
    const posts = db.collection("posts");

    return await posts.insertOne(post);
  };

  return myDB;
}

module.exports = MyDB();

// const { MongoClient } = require("mongodb");

// // Replace the uri string with your MongoDB deployment's connection string.
// const uri =
//   "mongodb+srv://<user>:<password>@<cluster-url>?retryWrites=true&w=majority";

// const client = new MongoClient(uri);

// async function run() {
//   try {
//     await client.connect();

//     const database = client.db('sample_mflix');
//     const collection = database.collection('movies');

//     // Query for a movie that has the title 'Back to the Future'
//     const query = { title: 'Back to the Future' };
//     const movie = await collection.findOne(query);

//     console.log(movie);
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);
