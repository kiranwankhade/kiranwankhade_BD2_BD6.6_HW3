const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");

const app = express();
const PORT = process.env.PORT || 3000;
let db;

const path = require("path");

// Connect to SQLite database
const dbFilePath = path.join(__dirname, "companies_database.sqlite");

(async () => {
  db = await open({
    filename: dbFilePath,
    driver: sqlite3.Database,
  });
})();

app.get("/", (req, res) => {
  res.status(200).json({ message: "BD4.2 HW3" });
});

// Exercise 1: Fetch All Companies
async function fetchAllCompanies() {
  let query = "SELECT * FROM companies";
  let response = await db.all(query, []);
  return response;
}

app.get("/companies", async (req, res) => {
  try {
    let results = await fetchAllCompanies();
    if (results.length === 0) {
      return res.status(404).json({ error: "No companies found." });
    }
    res.json({ companies: results });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Exercise 2: Fetch Companies by Industry
async function fetchCompaniesByIndustry(industry) {
  let query = "SELECT * FROM companies WHERE industry = ?";
  let response = await db.all(query, [industry]);
  return response;
}

app.get("/companies/industry/:industry", async (req, res) => {
  const { industry } = req.params;
  try {
    let results = await fetchCompaniesByIndustry(industry);
    if (results.length === 0) {
      return res
        .status(404)
        .json({ error: "No companies found for this industry." });
    }
    res.json({ companies: results });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Exercise 3: Fetch Companies by Revenue Range
async function fetchCompaniesByRevenue(minRevenue, maxRevenue) {
  let query = "SELECT * FROM companies WHERE revenue BETWEEN ? AND ?";
  let response = db.all(query, [minRevenue, maxRevenue]);
  return response;
}

app.get("/companies/revenue", async (req, res) => {
  const minRevenue = req.query.minRevenue;
  const maxRevenue = req.query.maxRevenue;

  try {
    let results = await fetchCompaniesByRevenue(minRevenue, maxRevenue);
    if (results.length === 0) {
      return res
        .status(404)
        .json({ error: "No companies found in this revenue range." });
    }
    res.json({ companies: results });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Exercise 4: Fetch Companies by Employee Count
async function fetchCompaniesByEmployeesCount(employeesCount) {
  let query = "SELECT * FROM companies WHERE employee_count < ?";
  let response = db.all(query, [employeesCount]);
  return response;
}

app.get("/companies/employees/:employeesCount", async (req, res) => {
  const employeesCount = req.params.employeesCount;

  try {
    let results = await fetchCompaniesByEmployeesCount(employeesCount);
    if (results.length === 0) {
      return res
        .status(404)
        .json({ error: "No companies found with fewer employees." });
    }
    res.json({ companies: results });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Exercise 5: Fetch Companies by Founded Year
async function fetchCompaniesByFoundedYear(founded_year) {
  let query = "SELECT * FROM companies WHERE founded_year = ?";
  let response = db.all(query, [founded_year]);
  return response;
}

app.get("/companies/founded_year/:founded_year", async (req, res) => {
  const founded_year = req.params.founded_year;

  try {
    let results = await fetchCompaniesByFoundedYear(founded_year);
    if (results.length === 0) {
      return res
        .status(404)
        .json({ error: "No companies found founded in this year." });
    }
    res.json({ companies: results });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
