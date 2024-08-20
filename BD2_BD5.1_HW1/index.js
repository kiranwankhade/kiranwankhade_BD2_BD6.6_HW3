let express = require("express");

let { books } = require("./models/books.model");

let { sequelize } = require("./lib/index");

let app = express();

let booksData = [
  {
    title: "To Kill a Mockingbird",
    genre: "Fiction",
    publication_year: 1960,
    author: "Harper Lee",
    publisher: "J.B. Lippincott & Co.",
    pages: 281,
  },
  {
    title: "1984",
    genre: "Dystopian",
    publication_year: 1949,
    author: "George Orwell",
    publisher: "Secker & Warburg",
    pages: 328,
  },
  {
    title: "Pride and Prejudice",
    genre: "Romance",
    publication_year: 1813,
    author: "Jane Austen",
    publisher: "T. Egerton",
    pages: 279,
  },
  {
    title: "The Great Gatsby",
    genre: "Tragedy",
    publication_year: 1925,
    author: "F. Scott Fitzgerald",
    publisher: "Charles Scribner's Sons",
    pages: 180,
  },
  {
    title: "Moby-Dick",
    genre: "Adventure",
    publication_year: 1851,
    author: "Herman Melville",
    publisher: "Harper & Brothers",
    pages: 635,
  },
  {
    title: "War and Peace",
    genre: "Historical",
    publication_year: 1869,
    author: "Leo Tolstoy",
    publisher: "The Russian Messenger",
    pages: 1225,
  },
  {
    title: "The Catcher in the Rye",
    genre: "Fiction",
    publication_year: 1951,
    author: "J.D. Salinger",
    publisher: "Little, Brown and Company",
    pages: 214,
  },
  {
    title: "The Hobbit",
    genre: "Fantasy",
    publication_year: 1937,
    author: "J.R.R. Tolkien",
    publisher: "George Allen & Unwin",
    pages: 310,
  },
  {
    title: "The Adventures of Sherlock Holmes",
    genre: "Mystery",
    publication_year: 1892,
    author: "Arthur Conan Doyle",
    publisher: "George Newnes",
    pages: 307,
  },
  {
    title: "Ulysses",
    genre: "Modernist",
    publication_year: 1922,
    author: "James Joyce",
    publisher: "Shakespeare and Company",
    pages: 730,
  },
];

app.get("/seed_db", async (req, res) => {
  try {
    await sequelize.sync({ force: true });

    await books.bulkCreate(booksData);

    res.status(200).json({ message: "Database Seeding Suceessful" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error Seeding the Data", error: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
