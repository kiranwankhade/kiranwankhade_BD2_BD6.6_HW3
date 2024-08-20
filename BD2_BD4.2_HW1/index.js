const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
let db;

// connect with db
(async () => {
  db = await open({
    filename: path.join(__dirname, "bd4.2_books_database.sqlite"),
    driver: sqlite3.Database,
  });
})();

app.get("/", (req, res) => {
  res.status(200).json({ message: "BD4.2 HW1 " });
});

// BD-2 BD4.2 HW_1

// Exercise 1: Fetch All Books

async function fetchAllBooks() {
  let query = "SELECT * FROM books";
  let response = await db.all(query, []);
  return { books: response };
}

app.get("/books", async (req, res) => {
  try {
    let results = await fetchAllBooks();
    if (results.books.length === 0) {
      res.status(404).json({ message: "Not Books Found" });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 2: Fetch Books by Author

async function fetchBooksByAuthor(author) {
  let query = "SELECT * FROM books WHERE author = ?";
  let response = await db.all(query, [author]);
  // console.log("response", response);
  return { books: response };
}

app.get("/books/author/:author", async (req, res) => {
  try {
    let author = req.params.author;
    let results = await fetchBooksByAuthor(author);

    if (results.books.length === 0) {
      res
        .status(404)
        .json({ message: "There is no any books Found of this author" });
    }

    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 3: Fetch Books by Genre
async function fetchBooksByGenre(genre) {
  let query = "SELECT * FROM books WHERE genre = ?";
  let response = await db.all(query, [genre]);
  // console.log("response", response);
  return { books: response };
}

app.get("/books/genre/:genre", async (req, res) => {
  try {
    let genre = req.params.genre;
    // console.log("genre", genre);
    let results = await fetchBooksByGenre(genre);
    if (results.books.length === 0) {
      res
        .status(404)
        .json({ message: "There is no any books Found of this genre" });
    }
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Exercise 4: Fetch Books by Publication Year

async function fetchBooksByPublicationYear(year) {
  let query = "SELECT * FROM books WHERE publication_year = ?";
  let response = await db.all(query, [year]);
  return { books: response };
}

app.get("/books/publication_year/:year", async (req, res) => {
  try {
    let publication_year = req.params.year;

    let results = await fetchBooksByPublicationYear(publication_year);

    if (results.books.length === 0) {
      res.status(404).json({ message: "Not Any book in this year" });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
