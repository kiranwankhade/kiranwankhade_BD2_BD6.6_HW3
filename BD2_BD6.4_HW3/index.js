let {
  getArticles,
  getArticlesById,
  getComments,
  getCommentsById,
  getUserById,
} = require("./functions");

const express = require("express");
const app = express();
app.use(express.json());

app.get("/articles", async (req, res) => {
  try {
    const articles = await getArticles();

    if (articles.length === 0) {
      return res.status(404).json({
        error: "No articles found",
      });
    }
    return res.status(200).json(articles);
  } catch (error) {
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

app.get("/articles/:id", async (req, res) => {
  try {
    const article = await getArticlesById(parseInt(req.params.id));

    if (!article) {
      return res.status(404).json({
        error: "Article not found",
      });
    }
    return res.status(200).json(article);
  } catch (error) {
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

app.get("/comments", async (req, res) => {
  try {
    const comments = await getComments();

    if (comments.length === 0) {
      return res.status(404).json({
        error: "No comments found",
      });
    }
    return res.status(200).json(comments);
  } catch (error) {
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

app.get("/comments/:id", async (req, res) => {
  try {
    const comment = await getCommentsById(parseInt(req.params.id));

    if (!comment) {
      return res.status(404).json({
        error: "Comment not found",
      });
    }
    return res.status(200).json(comment);
  } catch (error) {
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

app.get("/users/:id", async (req, res) => {
  try {
    const user = await getUserById(parseInt(req.params.id));

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

module.exports = {
  app,
};
