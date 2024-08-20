let { DataTypes, sequelize } = require("../lib/index");

let author = sequelize.define("authors", {
  name: DataTypes.TEXT,
  birthYear: DataTypes.INTEGER,
});

module.exports = {
  author,
};
