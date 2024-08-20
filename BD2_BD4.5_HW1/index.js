const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");

const app = express();
const PORT = process.env.PORT || 3000;
let db;

const path = require("path");

// Connect to SQLite database
const dbFilePath = path.join(__dirname, "bd4.5_hw1_database.sqlite");

(async () => {
  db = await open({
    filename: dbFilePath,
    driver: sqlite3.Database,
  });
})();

app.get("/", (req, res) => {
  res.status(200).json({ message: "BD4.5 HW1" });
});

// Exercise 1: Fetch Courses by Minimum Rating

async function filterCoursesByRating(minRating) {
  let query = "SELECT * FROM courses WHERE rating > ?";
  let response = await db.all(query, [minRating]);
  return response;
}

app.get("/courses/rating", async (req, res) => {
  let minRating = req.query.minRating;
  try {
    let results = await filterCoursesByRating(minRating);
    if (results.length === 0) {
      return res.status(404).json({ error: "No Courses found." });
    }
    res.json({ courses: results });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 2: Fetch Courses by Instructor and Minimum Duration

async function filterCoursesByInstructorAndDuration(instructor, minDuration) {
  let query = "SELECT * FROM courses WHERE instructor = ? AND duration > ?";
  let response = await db.all(query, [instructor, minDuration]);
  return response;
}

app.get("/courses/instructor-duration", async (req, res) => {
  let instructor = req.query.instructor;
  let minDuration = req.query.minDuration;
  try {
    let results = await filterCoursesByInstructorAndDuration(
      instructor,
      minDuration,
    );
    if (results.length === 0) {
      return res.status(404).json({ error: "No Courses found." });
    }
    res.json({ courses: results });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 3: Fetch Courses Ordered by Price

async function fetchCoursesOrderedByPrice() {
  let query = "SELECT * FROM courses ORDER BY price DESC";
  let response = await db.all(query, []);
  return response;
}

app.get("/courses/ordered-by-price", async (req, res) => {
  try {
    let results = await fetchCoursesOrderedByPrice();
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
