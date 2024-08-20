let { DataTypes, sequelize } = require("../lib/index");

let recipe = sequelize.define("recipes", {
  title: DataTypes.TEXT,
  chef: DataTypes.TEXT,
  cuisine: DataTypes.TEXT,
  preparationTime: DataTypes.INTEGER,
  instructions: DataTypes.TEXT,
});

module.exports = {
  recipe,
};
