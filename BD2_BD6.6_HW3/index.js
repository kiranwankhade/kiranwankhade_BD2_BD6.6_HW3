const cors = require("cors");
const express = require("express");

const { getAllBooks, getBooksById } = require("../controllers/index.js");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("WELCOME");
});

app.get("/books", (req, res) => {
  try {
    const books = getAllBooks();
    res.status(200).json({ books });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving books", error });
  }
});

app.get("/books/details/:id", (req, res) => { 
  try {
    const bookId = parseInt(req.params.id);
    const book = getBooksById(bookId);
    if (book) {
      res.status(200).json({ book });
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error retrieving book", error });
  }
});

module.exports = { app };
