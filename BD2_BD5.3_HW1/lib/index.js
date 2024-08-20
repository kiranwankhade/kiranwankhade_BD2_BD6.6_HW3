let sq = require("sequelize");

let sequelize = new sq.Sequelize({
  dialect: "sqlite",
  storage: "BD2_BD5.3_HW1/post_database.sqlite",
});

module.exports = { DataTypes: sq.DataTypes, sequelize };
