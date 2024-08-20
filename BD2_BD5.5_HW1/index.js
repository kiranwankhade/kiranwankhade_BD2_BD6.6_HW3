let express = require("express");

let { book } = require("./models/book.model");

let { user } = require("./models/user.model");

let { sequelize } = require("./lib/index");

const { likedBooks } = require("./models/like.model");

let { Op } = require("@sequelize/core");

let app = express();

app.use(express.json());

let booksData = [
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Fiction",
    year: 1960,
    summary: "A novel about the serious issues of rape and racial inequality.",
  },
  {
    title: "1984",
    author: "George Orwell",
    genre: "Dystopian",
    year: 1949,
    summary:
      "A novel presenting a dystopian future under a totalitarian regime.",
  },
  {
    title: "Moby-Dick",
    author: "Herman Melville",
    genre: "Adventure",
    year: 1851,
    summary:
      "The narrative of the sailor Ishmael and the obsessive quest of Ahab.",
  },
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    genre: "Romance",
    year: 1813,
    summary:
      "A romantic novel that charts the emotional development of the protagonist Elizabeth Bennet.",
  },
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Fiction",
    year: 1925,
    summary: "A novel about the American dream and the roaring twenties.",
  },
];

app.get("/seed_db", async (req, res) => {
  try {
    await sequelize.sync({ force: true });

    await user.create({
      username: "booklover",
      email: "booklover@gmail.com",
      password: "password123",
    });

    await book.bulkCreate(booksData);

    res.status(200).json({ message: "Database Seeding Suceessful" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error Seeding the Data", error: error.message });
  }
});

// Exercise 1: Like a Book

async function likeBook(data) {
  let newLike = await likedBooks.create({
    userId: data.userId,
    bookId: data.bookId,
  });
  return { message: "Book liked", newLike };
}

app.get("/users/:id/like", async (req, res) => {
  try {
    let userId = req.params.id;
    let bookId = req.query.bookId;
    let results = await likeBook({ userId, bookId });
    if (results.newLike === null) {
      return res.status(404).json({ error: "No like found." });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 2: Dislike a Book
async function dislikeBook(data) {
  let count = await likedBooks.destroy({
    where: {
      userId: data.userId,
      bookId: data.bookId,
    },
  });
  if (count === 0) {
    return {};
  }
  return { message: "Book disliked" };
}

app.get("/users/:id/dislike", async (req, res) => {
  try {
    let userId = req.params.id;
    let bookId = req.query.bookId;
    let results = await dislikeBook({ userId, bookId });
    if (!results.message) {
      return res.status(404).json({ error: "user not liked this book" });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 3: Get All Liked Books

async function getAllLikedBooks(userId) {
  let booksIds = await likedBooks.findAll({
    where: { userId },
    atrributes: ["bookId"],
  });

  let bookRecords = [];

  for (let i = 0; i < booksIds.length; i++) {
    bookRecords.push(booksIds[i].bookId);
  }

  let likedBooksList = await book.findAll({
    where: {
      id: {
        [Op.in]: bookRecords,
      },
    },
  });

  return { likedBooks: likedBooksList };
}

app.get("/users/:id/liked", async (req, res) => {
  try {
    let userId = req.params.id;
    let results = await getAllLikedBooks(userId);
    if (results.likedBooks === null) {
      return res.status(404).json({ error: "No Liked books found." });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
