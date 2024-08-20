const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");

const app = express();
const PORT = process.env.PORT || 3000;
let db;

const path = require("path");

// Connect to SQLite database
const dbFilePath = path.join(__dirname, "tracks_database.sqlite");

(async () => {
  db = await open({
    filename: dbFilePath,
    driver: sqlite3.Database,
  });
})();

app.get("/", (req, res) => {
  res.status(200).json({ message: "BD4.1 HW2" });
});

// Exercise 1: Retrieve All Tracks

async function fetchAllTracks() {
  let query = "SELECT * FROM tracks";
  let response = await db.all(query, []);
  return { tracks: response };
}

app.get("/tracks", async (req, res) => {
  try {
    let results = await fetchAllTracks();
    res.status(200).json({ tracks: results });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Exercise 2: Retrieve Tracks by Artist
async function fetchTracksByArtist(artist) {
  let query = "SELECT * FROM tracks WHERE artist = ?";
  let response = await db.all(query, [artist]);
  // console.log("response", response);
  return { tracks: response };
}

app.get("/tracks/artist/:artist", async (req, res) => {
  try {
    let artist = req.params.artist;
    // console.log("artist", artist);
    let results = await fetchTracksByArtist(artist);
    res.status(200).json({ tracks: results });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Exercise 3: Retrieve Tracks by Genre

async function fetchTracksByGenre(genre) {
  let query = "SELECT * FROM tracks WHERE genre = ?";
  let response = await db.all(query, [genre]);
  // console.log("response", response);
  return { tracks: response };
}

app.get("/tracks/genre/:genre", async (req, res) => {
  try {
    let genre = req.params.genre;
    let results = await fetchTracksByGenre(genre);
    res.status(200).json({ tracks: results });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Exercise 4: Retrieve Tracks by Release Year

async function fetchTracksByReleaseYear(year) {
  let query = "SELECT * FROM tracks WHERE release_year = ?";
  let response = await db.all(query, [year]);
  // console.log("response", response);
  return { tracks: response };
}

app.get("/tracks/release_year/:year", async (req, res) => {
  try {
    let year = req.params.year;
    let results = await fetchTracksByReleaseYear(year);
    res.status(200).json({ tracks: results });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
