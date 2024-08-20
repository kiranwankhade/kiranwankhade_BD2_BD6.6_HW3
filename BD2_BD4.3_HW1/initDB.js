const sqlite3 = require("sqlite3").verbose();

const path = require("path");

// Connect to SQLite database
const dbFilePath = path.join(__dirname, "bd4.3_hw1_employees_database.sqlite");

const db = new sqlite3.Database(dbFilePath, (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log("Connected to the SQLite database.");
  }
});

db.serialize(() => {
  db.run(
    `CREATE TABLE IF NOT EXISTS employees (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      gender TEXT,
      department TEXT,
      job_title TEXT,
      location TEXT
     )`,
    (err) => {
      if (err) {
        console.error("Error creating table:", err.message);
      } else {
        console.log("employees table created or already exists.");
      }
    },
  );

  // Insert random movie data
  const stmt = db.prepare(
    "INSERT INTO employees (name, gender, department, job_title,location) VALUES (?, ?, ?, ?,?)",
  );

  let employees = [
    {
      id: 1,
      name: "John Doe",
      gender: "male",
      department: "Engineering",
      job_title: "Software Engineer",
      location: "New York",
    },
    {
      id: 2,
      name: "Jane Smith",
      gender: "female",
      department: "Engineering",
      job_title: "QA Engineer",
      location: "Austin",
    },
    {
      id: 4,
      name: "Emily Davis",
      gender: "female",
      department: "Marketing",
      job_title: "Marketing Specialist",
      location: "Chicago",
    },
    {
      id: 5,
      name: "Michael Johnson",
      gender: "male",
      department: "HR",
      job_title: "HR Manager",
      location: "New York",
    },
    {
      id: 6,
      name: "Sarah Wilson",
      gender: "female",
      department: "Engineering",
      job_title: "DevOps Engineer",
      location: "Seattle",
    },
    {
      id: 8,
      name: "Laura Thompson",
      gender: "female",
      department: "Engineering",
      job_title: "Software Engineer",
      location: "Austin",
    },
    {
      id: 9,
      name: "Robert White",
      gender: "male",
      department: "Support",
      job_title: "Support Specialist",
      location: "New York",
    },
    {
      id: 10,
      name: "Linda Lewis",
      gender: "female",
      department: "Sales",
      job_title: "Sales Representative",
      location: "San Francisco",
    },
  ];

  for (let employee of employees) {
    stmt.run(
      employee.name,
      employee.gender,
      employee.department,
      employee.job_title,
      employee.location,
    );
  }
  stmt.finalize();

  console.log("Inserted 5 books added into the database.");

  // Close the database connection
  db.close((err) => {
    if (err) {
      console.error("Error closing database:", err.message);
    } else {
      console.log("Database connection closed.");
    }
  });
});
