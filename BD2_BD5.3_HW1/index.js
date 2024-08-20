let express = require("express");

let { post } = require("./models/post.model");

let { sequelize } = require("./lib/index");

let app = express();

app.use(express.json());

let postData = [
  {
    title: "Getting Started with Node.js",
    content:
      "This post will guide you through the basics of Node.js and how to set up a Node.js project.",
    author: "Alice Smith",
  },
  {
    title: "Advanced Express.js Techniques",
    content:
      "Learn advanced techniques and best practices for building applications with Express.js.",
    author: "Bob Johnson",
  },
  {
    title: "ORM with Sequelize",
    content:
      "An introduction to using Sequelize as an ORM for Node.js applications.",
    author: "Charlie Brown",
  },
  {
    title: "Boost Your JavaScript Skills",
    content:
      "A collection of useful tips and tricks to improve your JavaScript programming.",
    author: "Dana White",
  },
  {
    title: "Designing RESTful Services",
    content: "Guidelines and best practices for designing RESTful APIs.",
    author: "Evan Davis",
  },
  {
    title: "Mastering Asynchronous JavaScript",
    content:
      "Understand the concepts and patterns for writing asynchronous code in JavaScript.",
    author: "Fiona Green",
  },
  {
    title: "Modern Front-end Technologies",
    content:
      "Explore the latest tools and frameworks for front-end development.",
    author: "George King",
  },
  {
    title: "Advanced CSS Layouts",
    content: "Learn how to create complex layouts using CSS Grid and Flexbox.",
    author: "Hannah Lewis",
  },
  {
    title: "Getting Started with React",
    content: "A beginners guide to building user interfaces with React.",
    author: "Ian Clark",
  },
  {
    title: "Writing Testable JavaScript Code",
    content:
      "An introduction to unit testing and test-driven development in JavaScript.",
    author: "Jane Miller",
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

// Exercise 2: Add a new post in the database

async function addNewPost(newPost) {
  let newPostData = await post.create(newPost);
  return { newPostData };
}

app.post("/posts/new", async (req, res) => {
  try {
    let newPost = req.body.newPost;
    let response = await addNewPost(newPost);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 3: Update post information
async function updatePostById(id, newPostData) {
  let updatedPostData = await post.findOne({
    where: { id: id },
  });

  if (!updatedPostData) {
    return {};
  }

  updatedPostData.set(newPostData);

  let updatePost = await updatedPostData.save();

  return { updatePost };
}

app.post("/posts/update/:id", async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    let newPostData = req.body;
    let response = await updatePostById(id, newPostData);
    return res
      .status(200)
      .json({ message: "Post updated successfully", response });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 4: Delete a post from the database
async function deletePostById(id) {
  let deletedData = await post.destroy({
    where: { id: id },
  });

  if (deletedData === 0) {
    return {};
  }

  return { message: "Deleted the Data Sucessully" };
}

app.post("/posts/delete", async (req, res) => {
  try {
    let id = parseInt(req.body.id);
    let response = await deletePostById(id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
