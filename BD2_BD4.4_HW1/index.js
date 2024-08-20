const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");

const app = express();
const PORT = process.env.PORT || 3000;
let db;

const path = require("path");

// Connect to SQLite database
const dbFilePath = path.join(__dirname, "bd4.4_hw1_database.sqlite");

(async () => {
  db = await open({
    filename: dbFilePath,
    driver: sqlite3.Database,
  });
})();

app.get("/", (req, res) => {
  res.status(200).json({ message: "BD4.4 HW1" });
});

// Exercise 1: Fetch All Courses

async function fetchAllCourses() {
  let query = "SELECT * FROM courses";
  let response = await db.all(query, []);
  return response;
}

app.get("/courses", async (req, res) => {
  try {
    let results = await fetchAllCourses();
    if (results.length === 0) {
      return res.status(404).json({ error: "No Courses found." });
    }
    res.json({ courses: results });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 2: Fetch Courses by Instructor

async function fetchCoursesByInstructor(instructor) {
  let query = "SELECT * FROM courses WHERE instructor=?";
  let response = await db.all(query, [instructor]);
  return response;
}

app.get("/courses/instructor/:instructor", async (req, res) => {
  let instructor = req.params.instructor;
  try {
    let results = await fetchCoursesByInstructor(instructor);
    if (results.length === 0) {
      return res.status(404).json({ error: "No Courses found." });
    }
    res.json({ courses: results });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 3: Fetch Courses by Category

async function fetchCoursesByCategory(category) {
  let query = "SELECT * FROM courses WHERE category=?";
  let response = await db.all(query, [category]);
  return response;
}

app.get("/courses/category/:category", async (req, res) => {
  let category = req.params.category;
  try {
    let results = await fetchCoursesByCategory(category);
    if (results.length === 0) {
      return res.status(404).json({ error: "No Courses found." });
    }
    res.json({ courses: results });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 4: Fetch Courses by Year
async function fetchCoursesByYear(year) {
  let query = "SELECT * FROM courses WHERE release_year=?";
  let response = await db.all(query, [year]);
  return response;
}

app.get("/courses/year/:year", async (req, res) => {
  let year = req.params.year;
  try {
    let results = await fetchCoursesByYear(year);
    if (results.length === 0) {
      return res.status(404).json({ error: "No Courses found." });
    }
    res.json({ courses: results });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
