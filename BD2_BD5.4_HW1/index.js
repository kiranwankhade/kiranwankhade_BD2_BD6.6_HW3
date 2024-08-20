let express = require("express");

let { book } = require("./models/book.model");

let { author } = require("./models/author.model");

let { sequelize } = require("./lib/index");

let app = express();

app.use(express.json());

let booksData = [
  {
    title: "Harry Potter and the Philosophers Stone",
    genre: "Fantasy",
    publicationYear: 1997,
  },
  { title: "A Game of Thrones", genre: "Fantasy", publicationYear: 1996 },
  { title: "The Hobbit", genre: "Fantasy", publicationYear: 1937 },
];

app.get("/seed_db", async (req, res) => {
  try {
    await sequelize.sync({ force: true });

    await book.bulkCreate(booksData);

    res.status(200).json({ message: "Database Seeding Suceessful" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error Seeding the Data", error: error.message });
  }
});

async function fetchAllBooks() {
  let books = await book.findAll();
  return { books };
}

app.get("/books", async (req, res) => {
  try {
    let results = await fetchAllBooks();
    if (results.books === null) {
      return res.status(404).json({ error: "No Books found." });
    }
    res.json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 1: Create New Author
async function addNewAuthor(newAuthor) {
  let newData = await author.create(newAuthor);

  return { newAuthor: newData };
}

app.post("/authors/new", async (req, res) => {
  try {
    let newAuthor = req.body.newAuthor;
    let results = await addNewAuthor(newAuthor);
    if (results.newAuthor === null) {
      return res.status(404).json({ error: "No Books found." });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Exercise 2: Update Author by ID

async function updateAuthorById(id, newAuthorData) {
  let authorDetails = await author.findOne({ where: { id } });

  if (!authorDetails) {
    return {};
  }

  authorDetails.set(newAuthorData);

  let updatedAuthor = await authorDetails.save();

  return { message: "Author Updated Successfully", updatedAuthor };
}

app.post("/authors/update/:id", async (req, res) => {
  try {
    let newAuthorData = req.body;
    let id = req.params.id;
    let results = await updateAuthorById(id, newAuthorData);
    if (results.updatedAuthor === null) {
      return res.status(404).json({ error: "No author found." });
    }
    res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
