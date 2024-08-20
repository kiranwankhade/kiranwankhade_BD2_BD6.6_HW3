let { DataTypes, sequelize } = require("../lib/index");

let { author } = require("./author.model");

let { book } = require("./book.model");

let bookAuthor = sequelize.define("bookAuthor", {
  bookId: {
    type: DataTypes.INTEGER,
    references: {
      model: book,
      key: "id",
    },
  },
  authorId: {
    type: DataTypes.INTEGER,
    references: {
      model: author,
      key: "id",
    },
  },
});

book.belongsToMany(author,{through: bookAuthor});

author.belongsToMany(book,{through: bookAuthor});

module.exports = {
  bookAuthor,
};
