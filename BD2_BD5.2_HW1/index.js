let express = require("express");

let { post } = require("./models/post.model");

let { sequelize } = require("./lib/index");

let app = express();

let postData = [
  {
    name: "Post1",
    author: "Author1",
    content: "This is the content of post 1",
    title: "Title1",
  },
  {
    name: "Post2",
    author: "Author2",
    content: "This is the content of post 2",
    title: "Title2",
  },
  {
    name: "Post3",
    author: "Author1",
    content: "This is the content of post 3",
    title: "Title3",
  },
];

app.get("/seed_db", async (req, res) => {
  try {
    await sequelize.sync({ force: true });

    await post.bulkCreate(postData);

    res.status(200).json({ message: "Database Seeding Suceessful" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error Seeding the Data", error: error.message });
  }
});

// Exercise 1: Fetch all posts

async function fetchAllArtworks() {
  let posts = await post.findAll();
  return { posts };
}

app.get("/posts", async (req, res) => {
  try {
    let results = await fetchAllArtworks();
    if (results.posts === null) {
      return res.status(404).json({ error: "No Courses found." });
    }
    res.json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 2: Fetch post details by ID

async function fetchPostById(id) {
  let postData = await post.findOne({ where: { id } });
  return { posts: postData };
}

app.get("/posts/details/:id", async (req, res) => {
  let id = parseInt(req.params.id);
  try {
    let results = await fetchPostById(id);
    if (results.posts === null) {
      return res.status(404).json({ error: "No post found." });
    }
    res.json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 3: Fetch all posts by an author
async function fetchPostsByAuthor(author) {
  let postData = await post.findAll({ where: { author } });
  return { posts: postData };
}

app.get("/posts/author/:author", async (req, res) => {
  let author = req.params.author;
  try {
    let results = await fetchPostsByAuthor(author);
    if (results.posts.length === 0) {
      return res.status(404).json({ error: "No Author Found." });
    }
    res.json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 4: Sort all the posts by their name
async function sortPostsByName(order) {
  let postData = await post.findAll({ order: [["name", order]] });
  return { posts: postData };
}

app.get("/posts/sort/name", async (req, res) => {
  let order = req.query.order;
  try {
    let results = await sortPostsByName(order);
    if (results.posts.length === 0) {
      return res.status(404).json({ error: "No Author Found." });
    }
    res.json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
