const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");

const app = express();
const PORT = process.env.PORT || 3000;
let db;

const path = require("path");

// Connect to SQLite database
const dbFilePath = path.join(__dirname, "bd4.5_hw2_database.sqlite");

(async () => {
  db = await open({
    filename: dbFilePath,
    driver: sqlite3.Database,
  });
})();

app.get("/", (req, res) => {
  res.status(200).json({ message: "BD4.5 HW2" });
});

// Exercise 1: Fetch Employees by Minimum Salary

async function filterEmployeesBySalary(minSalary) {
  let query = "SELECT * FROM employees WHERE salary >= ?";
  let response = await db.all(query, [minSalary]);
  return { employees: response };
}

app.get("/employees/salary", async (req, res) => {
  let minSalary = req.query.minSalary;
  try {
    let results = await filterEmployeesBySalary(minSalary);
    if (results.employees.length === 0) {
      res.status(404).json({ message: "Not Get any employees" });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 2: Fetch Employees by Department and Minimum Experience

async function filterEmployeesByDepartmentAndExperience(
  department,
  minExperience,
) {
  let query =
    "SELECT * FROM employees WHERE department = ? AND years_of_experience >= ?";
  let response = await db.all(query, [department, minExperience]);
  return { employees: response };
}

app.get("/employees/department-experience", async (req, res) => {
  let department = req.query.department;
  let minExperience = req.query.minExperience;
  try {
    let results = await filterEmployeesByDepartmentAndExperience(
      department,
      minExperience,
    );
    if (results.employees.length === 0) {
      res.status(404).json({ message: "Not Get any employees" });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 3: Fetch Employees Ordered by Salary
async function fetchEmployeesOrderedBySalary() {
  let query = "SELECT * FROM employees ORDER BY salary DESC ";
  let response = await db.all(query, []);
  return { employees: response };
}

app.get("/employees/ordered-by-salary", async (req, res) => {
  try {
    let results = await fetchEmployeesOrderedBySalary();
    if (results.employees.length === 0) {
      res.status(404).json({ message: "Not Get any employees" });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
