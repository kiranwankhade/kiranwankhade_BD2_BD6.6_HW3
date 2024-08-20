const express = require("express");
const app = express();
app.use(express.json());

let articles = [];

let authors = [];

function validateArticle(article) {
  if (!article.title || typeof article.title !== "string") {
    return "Title is required and should be a string.";
  }

  if (!article.content || typeof article.content !== "string") {
    return "Content is required and should be a string.";
  }

  return null;
}

app.post("/articles", (req, res) => {
  let error = validateArticle(req.body);

  if (error) {
    return res.status(400).send(error);
  }

  let article = {
    id: articles.length + 1,
    ...req.body,
  };

  articles.push(article);
  res.status(201).json(article);
});

function validateAuthor(author) {
  if (!author.name || typeof author.name !== "string") {
    return "Name is required and should be a string.";
  }

  if (!author.articleId || typeof author.articleId !== "number") {
    return "articleId is required and should be a Number.";
  }

  return null;
}

app.post("/authors", (req, res) => {
  let error = validateAuthor(req.body);

  if (error) {
    return res.status(400).send(error);
  }

  let author = {
    id: authors.length + 1,
    ...req.body,
  };

  authors.push(author);
  res.status(201).json(author);
});

module.exports = {
  app,
  validateArticle,
  validateAuthor,
};
