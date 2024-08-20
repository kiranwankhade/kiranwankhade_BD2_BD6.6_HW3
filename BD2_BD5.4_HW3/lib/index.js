let sq = require("sequelize");

let sequelize = new sq.Sequelize({
  dialect: "sqlite",
  storage: "BD2_BD5.4_HW3/dishes_database.sqlite",
});

module.exports = { DataTypes: sq.DataTypes, sequelize };
