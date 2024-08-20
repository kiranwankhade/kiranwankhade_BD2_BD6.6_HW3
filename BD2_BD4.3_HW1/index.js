const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");

const app = express();
const PORT = process.env.PORT || 3000;
let db;

const path = require("path");

// Connect to SQLite database
const dbFilePath = path.join(__dirname, "bd4.3_hw1_employees_database.sqlite");

(async () => {
  db = await open({
    filename: dbFilePath,
    driver: sqlite3.Database,
  });
})();

app.get("/", (req, res) => {
  res.status(200).json({ message: "BD4.3 HW1" });
});

// Exercise 1: Fetch All Employees by Gender

async function filterByGender(gender) {
  let query = "SELECT * FROM employees WHERE gender = ?";
  let response = await db.all(query, [gender]);
  return { employees: response };
}

app.get("/employees/gender/:gender", async (req, res) => {
  let gender = req.params.gender;
  try {
    let results = await filterByGender(gender);
    if (results.employees.length === 0) {
      res.status(404).json({ message: "Not Get any employees" });
    }
    res.status(200).json(results);
  } catch (err) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Exercise 2: Fetch All Employees by Department
async function filterByDepartment(department) {
  let query = "SELECT * FROM employees WHERE department = ?";
  let response = await db.all(query, [department]);
  return { employees: response };
}

app.get("/employees/department/:department", async (req, res) => {
  let department = req.params.department;
  try {
    let results = await filterByDepartment(department);
    if (results.employees.length === 0) {
      res.status(404).json({ message: "Not Get any employees" });
    }
    res.status(200).json(results);
  } catch (err) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Exercise 3: Fetch All Employees by Job Title
async function filterByJobTitle(job_title) {
  let query = "SELECT * FROM employees WHERE job_title = ?";
  let response = await db.all(query, [job_title]);
  return { employees: response };
}

app.get("/employees/job_title/:job_title", async (req, res) => {
  let job_title = req.params.job_title;
  try {
    let results = await filterByJobTitle(job_title);
    if (results.employees.length === 0) {
      res.status(404).json({ message: "Not Get any employees" });
    }
    res.status(200).json(results);
  } catch (err) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Exercise 4: Fetch All Employees by Location
async function filterByLocation(location) {
  let query = "SELECT * FROM employees WHERE location = ?";
  let response = await db.all(query, [location]);
  return { employees: response };
}

app.get("/employees/location/:location", async (req, res) => {
  let location = req.params.location;
  try {
    let results = await filterByLocation(location);
    if (results.employees.length === 0) {
      res.status(404).json({ message: "Not Get any employees" });
    }
    res.status(200).json(results);
  } catch (err) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
