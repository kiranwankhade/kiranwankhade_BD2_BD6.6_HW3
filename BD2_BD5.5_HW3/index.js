let express = require("express");

let { recipe } = require("./models/recipe.model");

let { user } = require("./models/user.model");

let { sequelize } = require("./lib/index");

const { favoriteRecipe } = require("./models/favourite.model");

let { Op } = require("@sequelize/core");

let app = express();

app.use(express.json());

let recipesData = [
  {
    title: "Spaghetti Carbonara",
    chef: "Chef Luigi",
    cuisine: "Italian",
    preparationTime: 30,
    instructions:
      "Cook spaghetti. In a bowl, mix eggs, cheese, and pepper. Combine with pasta and pancetta.",
  },
  {
    title: "Chicken Tikka Masala",
    chef: "Chef Anil",
    cuisine: "Indian",
    preparationTime: 45,
    instructions:
      "Marinate chicken in spices and yogurt. Grill and serve with a creamy tomato sauce.",
  },
  {
    title: "Sushi Roll",
    chef: "Chef Sato",
    cuisine: "Japanese",
    preparationTime: 60,
    instructions:
      "Cook sushi rice. Place rice on nori, add fillings, roll, and slice into pieces.",
  },
  {
    title: "Beef Wellington",
    chef: "Chef Gordon",
    cuisine: "British",
    preparationTime: 120,
    instructions:
      "Wrap beef fillet in puff pastry with mushroom duxelles and bake until golden.",
  },
  {
    title: "Tacos Al Pastor",
    chef: "Chef Maria",
    cuisine: "Mexican",
    preparationTime: 50,
    instructions:
      "Marinate pork in adobo, grill, and serve on tortillas with pineapple and cilantro.",
  },
];

app.get("/seed_db", async (req, res) => {
  try {
    await sequelize.sync({ force: true });

    await user.create({
      username: "booklover",
      email: "booklover@gmail.com",
      password: "password123",
    });

    await recipe.bulkCreate(recipesData);

    res.status(200).json({ message: "Database Seeding Suceessful" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error Seeding the Data", error: error.message });
  }
});

// Exercise 1: Like a recipe

async function getFavoriteRecipe(data) {
  let newLike = await favoriteRecipe.create({
    userId: data.userId,
    recipeId: data.recipeId,
  });
  return { message: "recipe liked", newLike };
}

app.get("/users/:id/favorite", async (req, res) => {
  try {
    let userId = req.params.id;
    let recipeId = req.query.recipeId;
    let results = await getFavoriteRecipe({ userId, recipeId });
    if (results.newLike === null) {
      return res.status(404).json({ error: "No like found." });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 2: Dislike a Book
async function unfavoriteRecipe(data) {
  let count = await favoriteRecipe.destroy({
    where: {
      userId: data.userId,
      recipeId: data.recipeId,
    },
  });
  if (count === 0) {
    return {};
  }
  return { message: "recipe disliked" };
}

app.get("/users/:id/unfavorite", async (req, res) => {
  try {
    let userId = req.params.id;
    let recipeId = req.query.recipeId;
    let results = await unfavoriteRecipe({ userId, recipeId });
    if (!results.message) {
      return res.status(404).json({ error: "user not liked this book" });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 3: Get All Liked Books

async function getAllFavoritedRecipes(userId) {
  let recipeIds = await favoriteRecipe.findAll({
    where: { userId },
    atrributes: ["recipeId"],
  });

  let recipeRecords = [];

  for (let i = 0; i < recipeIds.length; i++) {
    recipeRecords.push(recipeIds[i].recipeId);
  }

  let favoriteRecipeList = await recipe.findAll({
    where: {
      id: {
        [Op.in]: recipeRecords,
      },
    },
  });

  return { favoriteRecipe: favoriteRecipeList };
}

app.get("/users/:id/favorites", async (req, res) => {
  try {
    let userId = req.params.id;
    let results = await getAllFavoritedRecipes(userId);
    if (results.favoriteRecipe === null) {
      return res.status(404).json({ error: "No Liked books found." });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
