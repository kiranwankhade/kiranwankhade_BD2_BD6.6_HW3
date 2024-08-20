let express = require("express");

let { chef } = require("./models/chef.model");

let { dish } = require("./models/dish.model");

let { sequelize } = require("./lib/index");

let app = express();

app.use(express.json());

let chefData = [
  { name: "Gordon Ramsay", birthYear: 1966 },
  { name: "Masaharu Morimoto", birthYear: 1955 },
  { name: "Ricardo Larrivée", birthYear: 1967 },
];

app.get("/seed_db", async (req, res) => {
  try {
    await sequelize.sync({ force: true });

    await chef.bulkCreate(chefData);

    res.status(200).json({ message: "Database Seeding Suceessful" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error Seeding the Data", error: error.message });
  }
});

async function fetchAllChef() {
  let chefs = await chef.findAll();
  return { chefs };
}

app.get("/chefs", async (req, res) => {
  try {
    let results = await fetchAllChef();
    if (results.chefs === null) {
      return res.status(404).json({ error: "No chefs found." });
    }
    res.json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 1: Create New chef
async function addNewChef(newChef) {
  let newData = await chef.create(newChef);

  return { newChef: newData };
}

app.post("/chefs/new", async (req, res) => {
  try {
    let newChef = req.body.newChef;
    let results = await addNewChef(newChef);
    if (results.newChef === null) {
      return res.status(404).json({ error: "No Chef found." });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 2: Update chef by ID

async function updateChefById(id, newChefData) {
  let chefDetails = await chef.findOne({ where: { id } });

  if (!chefDetails) {
    return {};
  }

  chefDetails.set(newChefData);

  let updatedChef = await chefDetails.save();

  return { message: "Chef Updated Successfully", updatedChef };
}

app.post("/chefs/update/:id", async (req, res) => {
  try {
    let newChefData = req.body;
    let id = req.params.id;
    let results = await updateChefById(id, newChefData);
    if (results.updatedChef === null) {
      return res.status(404).json({ error: "No chef found." });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
