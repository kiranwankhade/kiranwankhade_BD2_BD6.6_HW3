let { DataTypes, sequelize } = require("../lib/index");

let { user } = require("./user.model");

let { book } = require("./book.model");

let likedBooks = sequelize.define("likedBooks", {
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: user,
      key: "id",
    },
  },
  bookId: {
    type: DataTypes.INTEGER,
    references: {
      model: book,
      key: "id",
    },
  },
});


user.belongsToMany(book, { through: likedBooks });

book.belongsToMany(user, { through: likedBooks });

module.exports = {
  likedBooks,
};
