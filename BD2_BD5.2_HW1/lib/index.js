let sq = require("sequelize");

let sequelize = new sq.Sequelize({
  dialect: "sqlite",
  storage: "BD2_BD5.2_HW1/posts_database.sqlite",
});

module.exports = { DataTypes: sq.DataTypes, sequelize };
