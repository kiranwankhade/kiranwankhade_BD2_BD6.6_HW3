const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");

const app = express();
const PORT = process.env.PORT || 3000;
let db;

const path = require("path");

// Connect to SQLite database
const dbFilePath = path.join(__dirname, "recipes_database.sqlite");

(async () => {
  db = await open({
    filename: dbFilePath,
    driver: sqlite3.Database,
  });
})();

app.get("/", (req, res) => {
  res.status(200).json({ message: "BD4.3 HW2" });
});

// Exercise 1: Fetch All Recipes by Cuisine

async function filterByCuisine(cuisine) {
  let query = "SELECT * FROM recipes WHERE cuisine = ?";
  let response = await db.all(query, [cuisine]);
  return { recipes: response };
}

app.get("/recipes/cuisine/:cuisine", async (req, res) => {
  let cuisine = req.params.cuisine;
  try {
    let results = await filterByCuisine(cuisine);
    if (results.recipes.length === 0) {
      res.status(404).json({ message: "Not Get any recipes of this cuisine" });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Exercise 2: Fetch All Recipes by Main Ingredient

async function filterByMainIngredient(main_ingredient) {
  let query = "SELECT * FROM recipes WHERE main_ingredient = ?";
  let response = await db.all(query, [main_ingredient]);
  return { recipes: response };
}

app.get("/recipes/main_ingredient/:main_ingredient", async (req, res) => {
  let main_ingredient = req.params.main_ingredient;
  try {
    let results = await filterByMainIngredient(main_ingredient);
    if (results.recipes.length === 0) {
      res
        .status(404)
        .json({ message: "Not Get any recipes of this main_ingredient " });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Exercise 3: Fetch All Recipes by Preparation Time

async function filterByPreparationTime(preparation_time) {
  let query = "SELECT * FROM recipes WHERE preparation_time <= ?";
  let response = await db.all(query, [preparation_time]);
  return { recipes: response };
}

app.get("/recipes/preparation_time/:preparation_time", async (req, res) => {
  let preparation_time = req.params.preparation_time;
  try {
    let results = await filterByPreparationTime(preparation_time);
    if (results.recipes.length === 0) {
      res
        .status(404)
        .json({ message: "Not Get any recipes of this preparation_time " });
    }
    res.status(200).json(results);
  } catch (err) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Exercise 4: Fetch All Recipes by Difficulty
async function filterByDifficulty(difficulty) {
  let query = "SELECT * FROM recipes WHERE difficulty = ?";
  let response = await db.all(query, [difficulty]);
  return { recipes: response };
}

app.get("/recipes/difficulty/:difficulty", async (req, res) => {
  let difficulty = req.params.difficulty;
  try {
    let results = await filterByDifficulty(difficulty);
    if (results.recipes.length === 0) {
      res
        .status(404)
        .json({ message: "Not Get any recipes of this difficulty " });
    }
    res.status(200).json(results);
  } catch (err) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Exercise 5: Fetch All Recipes by Vegetarian Status

async function filterByVegetarian (vegetarian) {
  let query = "SELECT * FROM recipes WHERE vegetarian = ?";
  let response = await db.all(query, [vegetarian]);
  return { recipes: response };
}

app.get("/recipes/vegetarian/:vegetarian", async (req, res) => {
  let vegetarian = req.params.vegetarian;
  try {
    let results = await filterByVegetarian (vegetarian);
    if (results.recipes.length === 0) {
      res
        .status(404)
        .json({ message: "Not Get any recipes vegetarian" });
    }
    res.status(200).json(results);
  } catch (err) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
