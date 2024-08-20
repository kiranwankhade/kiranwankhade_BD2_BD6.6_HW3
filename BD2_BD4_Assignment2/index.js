const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");

const app = express();
const PORT = process.env.PORT || 3000;
let db;

const path = require("path");

// Connect to SQLite database
const dbFilePath = path.join(__dirname, "bd4_assignment2_database.sqlite");

(async () => {
  db = await open({
    filename: dbFilePath,
    driver: sqlite3.Database,
  });
})();

app.get("/", (req, res) => {
  res.status(200).json({ message: "BD4 Assignment-2" });
});

// Exercise 1: Get All Games

const fetchAllGames = async () => {
  const query = "SELECT * FROM games";
  const response = await db.all(query);
  return { games: response };
};

app.get("/games", async (req, res) => {
  try {
    const results = await fetchAllGames();
    if (results.games.length === 0) {
      res.status(404).json({ error: "Games not found" });
    }
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Exercise 2: Get Game by ID
const getGameById = async (id) => {
  const query = "SELECT * FROM games WHERE id = ?";
  const response = await db.get(query, [id]);
  return { game: response };
};

app.get("/games/details/:id", async (req, res) => {
  let id = req.params.id;
  try {
    const result = await getGameById(id);
    if (result.game.length === 0) {
      res.status(404).json({ error: "game not found" });
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Exercise 3: Get Games by Genre
const getGameByGenre = async (genre) => {
  const query = "SELECT * FROM games WHERE genre = ?";
  const response = await db.all(query, [genre]);
  return { games: response };
};

app.get("/games/genre/:genre", async (req, res) => {
  let genre = req.params.genre;
  try {
    const result = await getGameByGenre(genre);
    if (result.games.length === 0) {
      res.status(404).json({ error: "games not found" });
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Exercise 4: Get Games by Platform

const getGameByPlatform = async (platform) => {
  const query = "SELECT * FROM games WHERE platform = ?";
  const response = await db.all(query, [platform]);
  return { games: response };
};

app.get("/games/platform/:platform", async (req, res) => {
  let platform = req.params.platform;
  try {
    const result = await getGameByPlatform(platform);
    if (result.games.length === 0) {
      res.status(404).json({ error: "games not found" });
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Exercise 5: Get Games Sorted by Rating

const getGamesSortedByRating = async () => {
  const query = "SELECT * FROM games ORDER BY rating DESC";
  const response = await db.all(query);
  return { games: response };
};

app.get("/games/sort-by-rating", async (req, res) => {
  try {
    const results = await getGamesSortedByRating();
    if (results.games.length === 0) {
      res.status(404).json({ error: "Games not found" });
    }
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Exercise 6: Get All Players
const fetchAllPlayers = async () => {
  const query = "SELECT * FROM players";
  const response = await db.all(query);
  return { players: response };
};

app.get("/players", async (req, res) => {
  try {
    const results = await fetchAllPlayers();
    if (results.players.length === 0) {
      res.status(404).json({ error: "players not found" });
    }
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Exercise 7: Get Player by ID
const fetchAllPlayersById = async (id) => {
  const query = "SELECT * FROM players WHERE id = ?";
  const response = await db.get(query, [id]);
  return { players: response };
};

app.get("/players/details/:id", async (req, res) => {
  let id = req.params.id;
  try {
    const results = await fetchAllPlayersById(id);
    if (results.players.length === 0) {
      res.status(404).json({ error: "players not found" });
    }
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Exercise 8: Get Players by Platform
const fetchAllPlayersByPlatform = async (platform) => {
  const query = "SELECT * FROM players WHERE platform = ?";
  const response = await db.get(query, [platform]);
  return { players: response };
};

app.get("/players/platform/:platform", async (req, res) => {
  let platform = req.params.platform;
  try {
    const results = await fetchAllPlayersByPlatform(platform);
    if (results.players.length === 0) {
      res.status(404).json({ error: "players not found" });
    }
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Exercise 9: Get Players Sorted by Rating
const getPlayersSortedByRating = async () => {
  const query = "SELECT * FROM players ORDER BY rating DESC";
  const response = await db.all(query);
  return { players: response };
};

app.get("/players/sort-by-rating", async (req, res) => {
  try {
    const results = await getPlayersSortedByRating();
    if (results.players.length === 0) {
      res.status(404).json({ error: "players not found" });
    }
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Exercise 10: Get All Tournaments
const fetchAllTournaments = async () => {
  const query = "SELECT * FROM tournaments";
  const response = await db.all(query);
  return { tournaments: response };
};

app.get("/tournaments", async (req, res) => {
  try {
    const results = await fetchAllTournaments();
    if (results.tournaments.length === 0) {
      res.status(404).json({ error: "tournaments not found" });
    }
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Exercise 11: Get Tournament by ID
const fetchAllTournamentById = async (id) => {
  const query = "SELECT * FROM tournaments WHERE id = ?";
  const response = await db.get(query, [id]);
  return { tournaments: response };
};

app.get("/tournaments/details/:id", async (req, res) => {
  let id = req.params.id;
  try {
    const results = await fetchAllTournamentById(id);
    if (results.tournaments.length === 0) {
      res.status(404).json({ error: "tournaments not found" });
    }
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Exercise 12: Get Tournaments by Game ID
const fetchAllTournamentByGameId = async (gameId) => {
  const query = "SELECT * FROM tournaments WHERE gameId = ?";
  const response = await db.get(query, [gameId]);
  return { tournaments: response };
};

app.get("/tournaments/game/:gameId", async (req, res) => {
  let gameId = req.params.gameId;
  try {
    const results = await fetchAllTournamentByGameId(gameId);
    if (results.tournaments.length === 0) {
      res.status(404).json({ error: "tournaments not found" });
    }
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Exercise 13: Get Tournaments Sorted by Prize Pool
const getTournamentsSortedByPrizePool = async () => {
  const query = "SELECT * FROM tournaments ORDER BY prizePool DESC";
  const response = await db.all(query);
  return { players: response };
};

app.get("/tournaments/sort-by-prize-pool", async (req, res) => {
  try {
    const results = await getTournamentsSortedByPrizePool();
    if (results.players.length === 0) {
      res.status(404).json({ error: "players not found" });
    }
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
