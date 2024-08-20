const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");

const app = express();
const PORT = process.env.PORT || 3000;
let db;

const path = require("path");

// Connect to SQLite database
const dbFilePath = path.join(__dirname, "bd4.4_hw2_database.sqlite");

(async () => {
  db = await open({
    filename: dbFilePath,
    driver: sqlite3.Database,
  });
})();

app.get("/", (req, res) => {
  res.status(200).json({ message: "BD4.4 HW2" });
});

// Exercise 1: Fetch All Courses

async function fetchAllArtworks() {
  let query = "SELECT id,title,artist FROM artworks";
  let response = await db.all(query, []);
  return response;
}

app.get("/artworks", async (req, res) => {
  try {
    let results = await fetchAllArtworks();
    if (results.length === 0) {
      return res.status(404).json({ error: "No Courses found." });
    }
    res.json({ artworks: results });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 2:  Fetch Artworks by Artist

async function fetchArtworksByArtist(artist) {
  let query = "SELECT id,title,artist,year FROM artworks WHERE artist=?";
  let response = await db.all(query, [artist]);
  return response;
}

app.get("/artworks/artist/:artist", async (req, res) => {
  let artist = req.params.artist;
  try {
    let results = await fetchArtworksByArtist(artist);
    if (results.length === 0) {
      return res.status(404).json({ error: "No Courses found." });
    }
    res.json({ artworks: results });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 3: Fetch Artworks by Year

async function fetchArtworksByYear(year) {
  let query = "SELECT id,title,artist,year FROM artworks WHERE year=?";
  let response = await db.all(query, [year]);
  return response;
}

app.get("/artworks/year/:year", async (req, res) => {
  let year = req.params.year;
  try {
    let results = await fetchArtworksByYear(year);
    if (results.length === 0) {
      return res.status(404).json({ error: "No Courses found." });
    }
    res.json({ courses: results });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 4: Fetch Artworks by Medium
async function fetchArtworksByMedium(medium) {
  let query = "SELECT id,title,artist,medium FROM artworks WHERE medium=?";
  let response = await db.all(query, [medium]);
  return response;
}

app.get("/artworks/medium/:medium", async (req, res) => {
  let medium = req.params.medium;
  try {
    let results = await fetchArtworksByMedium(medium);
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
