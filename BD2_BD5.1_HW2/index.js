let express = require("express");

let { employees } = require("./models/employees.model");

let { sequelize } = require("./lib/index");

let app = express();

let employeesData = [
  {
    name: "John Doe",
    age: 30,
    department: "Engineering",
    position: "Software Engineer",
    hire_year: 2015,
    salary: 75000,
  },
  {
    name: "Jane Smith",
    age: 28,
    department: "Marketing",
    position: "Marketing Manager",
    hire_year: 2018,
    salary: 68000,
  },
  {
    name: "Samuel Green",
    age: 35,
    department: "Sales",
    position: "Sales Representative",
    hire_year: 2012,
    salary: 62000,
  },
  {
    name: "Emily Brown",
    age: 32,
    department: "Human Resources",
    position: "HR Manager",
    hire_year: 2016,
    salary: 70000,
  },
  {
    name: "Michael Johnson",
    age: 40,
    department: "Finance",
    position: "Financial Analyst",
    hire_year: 2010,
    salary: 80000,
  },
  {
    name: "Linda Davis",
    age: 29,
    department: "Customer Service",
    position: "Customer Service Representative",
    hire_year: 2019,
    salary: 45000,
  },
  {
    name: "Robert Wilson",
    age: 45,
    department: "Engineering",
    position: "DevOps Engineer",
    hire_year: 2008,
    salary: 90000,
  },
  {
    name: "Jessica Garcia",
    age: 27,
    department: "Design",
    position: "UI/UX Designer",
    hire_year: 2020,
    salary: 65000,
  },
  {
    name: "William Martinez",
    age: 33,
    department: "IT",
    position: "Network Administrator",
    hire_year: 2014,
    salary: 72000,
  },
  {
    name: "Sophia Anderson",
    age: 26,
    department: "Engineering",
    position: "Frontend Developer",
    hire_year: 2021,
    salary: 70000,
  },
];


app.get("/seed_db", async (req, res) => {
  try {
    await sequelize.sync({ force: true });

    await employees.bulkCreate(employeesData);

    res.status(200).json({ message: "Database Seeding Suceessful" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error Seeding the Data", error: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
