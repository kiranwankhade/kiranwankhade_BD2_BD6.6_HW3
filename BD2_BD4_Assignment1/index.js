const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");

const app = express();
const PORT = process.env.PORT || 3000;
let db;

const path = require("path");

// Connect to SQLite database
const dbFilePath = path.join(__dirname, "bd4_assignment1_database.sqlite");

(async () => {
  db = await open({
    filename: dbFilePath,
    driver: sqlite3.Database,
  });
})();

app.get("/", (req, res) => {
  res.status(200).json({ message: "BD4 Assignment-1" });
});

// Exercise 1: Get All Restaurants
const fetchAllRestaurants = async () => {
  const query = "SELECT * FROM restaurants";
  const response = await db.all(query);
  return { restaurants: response };
};

app.get("/restaurants", async (req, res) => {
  try {
    const results = await fetchAllRestaurants();
    if (results.restaurants.length === 0) {
      res.status(404).json({ error: "Restaurants not found" });
    }
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Exercise 2: Get Restaurant by ID

const getRestaurantById = async (id) => {
  const query = "SELECT * FROM restaurants WHERE id = ?";
  const response = await db.get(query, [id]);
  return { restaurant: response };
};

app.get("/restaurants/details/:id", async (req, res) => {
  let id = req.params.id;
  try {
    const result = await getRestaurantById(id);
    if (result.restaurant.length === 0) {
      res.status(404).json({ error: "Restaurants not found" });
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Exercise 3: Get Restaurants by Cuisine

const getRestaurantByCuisine = async (cuisine) => {
  const query = "SELECT * FROM restaurants WHERE cuisine = ?";
  const response = await db.all(query, [cuisine]);
  return { restaurants: response };
};

app.get("/restaurants/cuisine/:cuisine", async (req, res) => {
  let cuisine = req.params.cuisine;
  try {
    const result = await getRestaurantByCuisine(cuisine);
    if (result.restaurants.length === 0) {
      res.status(404).json({ error: "Restaurants not found" + cuisine });
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Exercise 4: Get Restaurants by Filter

const getRestaurantByFilter = async (isVeg, hasOutdoorSeating, isLuxury) => {
  const query =
    "SELECT * FROM restaurants WHERE isVeg = ? AND hasOutdoorSeating = ? AND isLuxury = ?";
  const response = await db.all(query, [isVeg, hasOutdoorSeating, isLuxury]);
  return { restaurants: response };
};

app.get("/restaurants/filter", async (req, res) => {
  let isVeg = req.query.isVeg;
  let hasOutdoorSeating = req.query.hasOutdoorSeating;
  let isLuxury = req.query.isLuxury;
  try {
    const results = await getRestaurantByFilter(
      isVeg,
      hasOutdoorSeating,
      isLuxury,
    );
    if (results.restaurants.length === 0) {
      res.status(404).json({ error: "Restaurants not found" + cuisine });
    }
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Exercise 5: Get Restaurants Sorted by Rating
const getRestaurantByRating = async () => {
  const query = "SELECT * FROM restaurants ORDER BY rating DESC";
  const response = await db.all(query);
  return { restaurants: response };
};

app.get("/restaurants/sort-by-rating", async (req, res) => {
  try {
    const results = await getRestaurantByRating();
    if (results.restaurants.length === 0) {
      res.status(404).json({ error: "Restaurants not found" + cuisine });
    }
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Exercise 6: Get All Dishes
const fetchAllDishes = async () => {
  const query = "SELECT * FROM dishes";
  const response = await db.all(query);
  return { dishes: response };
};

app.get("/dishes", async (req, res) => {
  try {
    const results = await fetchAllDishes();
    if (results.dishes.length === 0) {
      res.status(404).json({ error: "dishes not found" });
    }
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Exercise 7: Get Dish by ID
const getDishesById = async (id) => {
  const query = "SELECT * FROM dishes WHERE id = ?";
  const response = await db.get(query, [id]);
  return { dishes: response };
};

app.get("/dishes/details/:id", async (req, res) => {
  let id = req.params.id;
  try {
    const result = await getDishesById(id);
    if (result.dishes.length === 0) {
      res.status(404).json({ error: "dishes not found" });
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Exercise 8: Get Dishes by Filter

const getDishesByFilter = async (isVeg) => {
  const query = "SELECT * FROM dishes WHERE isVeg = ? ";
  const response = await db.all(query, [isVeg]);
  return { dishes: response };
};

app.get("/dishes/filter", async (req, res) => {
  let isVeg = req.query.isVeg;
  try {
    const results = await getDishesByFilter(isVeg);
    if (results.dishes.length === 0) {
      res.status(404).json({ error: "dishes not found" });
    }
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Exercise 9: Get Dishes Sorted by Price

const getDishesSortedByPrice = async () => {
  const query = "SELECT * FROM dishes ORDER BY price ASC";
  const response = await db.all(query);
  return { dishes: response };
};

app.get("/dishes/sort-by-price", async (req, res) => {
  try {
    const results = await getDishesSortedByPrice();
    if (results.dishes.length === 0) {
      res.status(404).json({ error: "dishes not found" + cuisine });
    }
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
