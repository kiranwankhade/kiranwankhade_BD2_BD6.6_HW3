let sq = require("sequelize");

let sequelize = new sq.Sequelize({
  dialect: "sqlite",
  storage: "BD2_BD5.5_HW1/books_database.sqlite",
});

module.exports = { DataTypes: sq.DataTypes, sequelize };
