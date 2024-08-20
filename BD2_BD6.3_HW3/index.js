const express = require("express");
const app = express();

app.use(express.json());

let recipes = [
  {
    id: 1,
    name: "Spaghetti Bolognese",
    cuisine: "Italian",
    difficulty: "Medium",
  },
  {
    id: 2,
    name: "Chicken Tikka Masala",
    cuisine: "Indian",
    difficulty: "Hard",
  },
];

function getRecipes() {
  return recipes;
}

function getRecipesById(id) {
  return recipes.find((recipe) => recipe.id === id);
}

function addNewRecipes(recipe) {
  let newRecipe = {
    id: recipes.length + 1,
    ...recipe,
  };

  recipes.push(newRecipe);
  return newRecipe;
}

app.get("/recipes", (req, res) => {
  res.status(200).json(getRecipes());
});

app.get("/recipes/details/:id", (req, res) => {
  const recipe = getRecipesById(parseInt(req.params.id));

  if (!recipe) {
    return res.status(404).send("recipe Not Find");
  }
  res.json(recipe);
});

app.post("/recipes/new", (req, res) => {
  const recipe = addNewRecipes(req.body);
  res.status(201).json(recipe);
});

module.exports = {
  app,
  getRecipes,
  getRecipesById,
  addNewRecipes,
};
