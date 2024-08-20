let { DataTypes, sequelize } = require("../lib/index");

let book = sequelize.define("books", {
  title: DataTypes.TEXT,
  genre: DataTypes.TEXT,
  publicationYear: DataTypes.INTEGER,
});

module.exports = {
  book,
};
