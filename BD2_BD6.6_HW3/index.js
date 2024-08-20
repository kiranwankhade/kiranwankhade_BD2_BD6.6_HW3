const cors = require("cors");
const express = require("express");

const { getAllBooks, getBooksById } = require("../contrllers/index");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", () => {
  res.send("WELCOME");
});

app.get("/books", (req, res) => {
  const books = getAllBooks();
  res.status(200).json({ books });
});

app.get("/books/details/id", (req, res) => {
  let book = getBooksById(parseInt(req.params.id));

  res.status(200).json({ book });
});

module.exports = { app };
