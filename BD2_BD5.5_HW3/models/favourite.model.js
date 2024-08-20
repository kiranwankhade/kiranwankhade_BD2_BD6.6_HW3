let { DataTypes, sequelize } = require("../lib/index");

let { recipe } = require("./recipe.model");

let { user } = require("./user.model");

let favoriteRecipe = sequelize.define("favoriteRecipe", {
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: user,
      key: "id",
    },
  },
  recipeId: {
    type: DataTypes.INTEGER,
    references: {
      model: recipe,
      key: "id",
    },
  },
});

user.belongsToMany(recipe, { through: favoriteRecipe });

recipe.belongsToMany(user, { through: favoriteRecipe });

module.exports = {
  favoriteRecipe,
};
